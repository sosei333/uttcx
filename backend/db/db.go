package db

import (
	"database/sql"
	"fmt"
	_ "github.com/go-sql-driver/mysql"
	"log"
)

var DB *sql.DB

func InitDB() {
	var err error
	dsn := "sosei:Niko#124@tcp(34.68.212.20)/hackathon"
	DB, err = sql.Open("mysql", dsn)
	if err != nil {
		log.Fatalf("DB connection error: %v", err)
	}

	if err = DB.Ping(); err != nil {
		log.Fatalf("DB ping error: %v", err)
	}

	fmt.Println("Connected to the database!")
}

func CloseDB() {
	DB.Close()
}
