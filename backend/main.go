package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"
	"os/signal"
	"syscall"

	_ "github.com/go-sql-driver/mysql"
)

type User struct {
	Id   string `json:"id"`
	Name string `json:"name"`
}

var db *sql.DB

func init() {
	mysqlUser := "sosei"
	mysqlUserPwd := "Niko#124"
	mysqlDatabase := "hackathon"

	_db, err := sql.Open("mysql", fmt.Sprintf("%s:%s@(localhost:3306)/%s", mysqlUser, mysqlUserPwd, mysqlDatabase))
	if err != nil {
		log.Fatalf("fail: sql.Open, %v\n", err)
	}
	if err := _db.Ping(); err != nil {
		log.Fatalf("fail: _db.Ping, %v\n", err)
	}
	db = _db
}

func handler(w http.ResponseWriter, r *http.Request) {
	// CORSヘッダーを設定
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

	if r.Method == http.MethodOptions {
		w.WriteHeader(http.StatusOK)
		return
	}

	switch r.Method {
	case http.MethodGet:
		name := r.URL.Query().Get("name")
		if name == "" {
			log.Println("fail: name is empty")
			w.WriteHeader(http.StatusBadRequest)
			return
		}

		rows, err := db.Query("SELECT id, name FROM users WHERE name = ?", name)
		if err != nil {
			log.Printf("fail: db.Query, %v\n", err)
			w.WriteHeader(http.StatusInternalServerError)
			return
		}
		defer rows.Close()

		users := make([]User, 0)
		for rows.Next() {
			var u User
			if err := rows.Scan(&u.Id, &u.Name); err != nil {
				log.Printf("fail: rows.Scan, %v\n", err)
				w.WriteHeader(http.StatusInternalServerError)
				return
			}
			users = append(users, u)
		}

		bytes, err := json.Marshal(users)
		if err != nil {
			log.Printf("fail: json.Marshal, %v\n", err)
			w.WriteHeader(http.StatusInternalServerError)
			return
		}
		w.Header().Set("Content-Type", "application/json")
		w.Write(bytes)

	case http.MethodPost:
		var newUser User
		if err := json.NewDecoder(r.Body).Decode(&newUser); err != nil {
			log.Printf("fail: json.Decode, %v\n", err)
			w.WriteHeader(http.StatusBadRequest)
			return
		}
		print(newUser.Id)
		_, err := db.Exec("INSERT INTO users (id, email) VALUES (?, ?)", newUser.Id, newUser.Name)
		if err != nil {
			log.Printf("fail: db.Exec, %v\n", err)
			w.WriteHeader(http.StatusInternalServerError)
			return
		}
		w.WriteHeader(http.StatusCreated)
		w.Write([]byte("User created successfully"))

	default:
		log.Printf("fail: HTTP Method is %s\n", r.Method)
		w.WriteHeader(http.StatusBadRequest)
	}
}

func main() {
	http.HandleFunc("/user", handler)
	closeDBWithSysCall()

	log.Println("Listening on port 8000...")
	if err := http.ListenAndServe(":8000", nil); err != nil {
		log.Fatal(err)
	}
}

func closeDBWithSysCall() {
	sig := make(chan os.Signal, 1)
	signal.Notify(sig, syscall.SIGTERM, syscall.SIGINT)
	go func() {
		s := <-sig
		log.Printf("received syscall, %v", s)

		if err := db.Close(); err != nil {
			log.Fatal(err)
		}
		log.Printf("success: db.Close()")
		os.Exit(0)
	}()
}
