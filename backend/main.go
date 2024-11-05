package main

import (
	handlers "be/controller"
	"be/db"
	"fmt"
	"github.com/gorilla/mux"
	"log"
	"net/http"
)

func main() {
	db.InitDB()
	defer db.CloseDB()

	r := mux.NewRouter()
	r.HandleFunc("/signup", handlers.SignUpHandler).Methods("POST")

	fmt.Println("Server is running on port 8080")
	log.Fatal(http.ListenAndServe(":8080", r))
}
