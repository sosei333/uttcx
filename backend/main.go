package main

import (
	"backend/db"
	"backend/handlers"
	"log"
	"net/http"
	"os"
	"os/signal"
	"syscall"
)

func main() {
	db.InitDB()
	defer db.CloseDB()

	http.HandleFunc("/user", handlers.UserHandler)
	http.HandleFunc("/post", handlers.PostHandler)
	closeDBWithSysCall()

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	log.Printf("Listening on port %s...", port)
	if err := http.ListenAndServe(":"+port, nil); err != nil {
		log.Fatal(err)
	}
}

// シグナルを受信してDBを閉じる処理
func closeDBWithSysCall() {
	sig := make(chan os.Signal, 1)
	signal.Notify(sig, syscall.SIGTERM, syscall.SIGINT)
	go func() {
		s := <-sig
		log.Printf("received syscall, %v", s)

		if err := db.CloseDB(); err != nil {
			log.Fatal(err)
		}
		log.Printf("success: db.Close()")
		os.Exit(0)
	}()
}
