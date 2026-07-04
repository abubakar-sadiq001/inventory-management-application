package main

import (
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/gorilla/sessions"
	"github.com/joho/godotenv"
)

var Store *sessions.CookieStore

func main() {
	err := godotenv.Load(".env")
	if err != nil {
		fmt.Println("Error loading .env file")

		log.Fatal("COOKIE_STORE_KEY is required")
	}

	key := os.Getenv("COOKIE_STORE_KEY")
	if key == "" {
		log.Fatal("COOKIE_STORE_KEY not set in environment")
	}
	Store = sessions.NewCookieStore([]byte(key))

	DbConn()
	RegisterRoutes()

	log.Println("🚀 Server running on :8080")
	err = http.ListenAndServe("localhost:8080", enableCORS(http.DefaultServeMux))
	if err != nil {
		fmt.Println(err)
	}
}

func enableCORS(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		origin := r.Header.Get("Origin")

		w.Header().Set("Access-Control-Allow-Origin", origin)
		w.Header().Set("Access-Control-Allow-Credentials", "true")
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

		if r.Method == "OPTIONS" {
			w.WriteHeader(http.StatusOK)
			return
		}

		next.ServeHTTP(w, r)
	})
}
