package main

import (
	"database/sql"
	"fmt"

	_ "github.com/go-sql-driver/mysql"
)

var DB *sql.DB

func DbConn() {
	var err error

	DB, err = sql.Open("mysql", "workbench:workbench123@tcp(127.0.0.1:3306)/inventory_management_sys_NOUN?parseTime=true&loc=UTC")

	if err != nil {
		fmt.Println(err)
	}

	err = DB.Ping()
	if err != nil {
		fmt.Println(err)
	}

	fmt.Println("DB connected successful 🎉")
}
