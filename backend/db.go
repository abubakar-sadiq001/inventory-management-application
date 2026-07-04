package main

import (
	"database/sql"
	"fmt"
	"log"
	"os"

	_ "github.com/go-sql-driver/mysql"
)

var DB *sql.DB

func DbConn() {
	var err error

	dbms := "workbench:"
	key := os.Getenv("DB_KEY")
	if key == "" {
		log.Fatal("DB_KEY not set in environment")
	}
	dbPassword := key
	connMethod := "@tcp"
	hostName := "(127.0.0.1:3306)/"
	dbName := "inventory_management_sys_NOUN"

	DB, err = sql.Open("mysql", dbms+dbPassword+connMethod+hostName+dbName)

	if err != nil {
		fmt.Println(err)
	}

	err = DB.Ping()
	if err != nil {
		fmt.Println(err)
	}

	fmt.Println("DB connected successful 🎉")
}
