package main

import (
	"fmt"
	"net/http"

	"github.com/go-sql-driver/mysql"
	"github.com/gorilla/sessions"
)

func ErrString(w http.ResponseWriter, errMessage string, statusCode int) {
	http.Error(w, errMessage, statusCode)
}

func CreateSession(store *sessions.CookieStore, id int, username string, role string, w http.ResponseWriter, r *http.Request) error {
	session, err := store.Get(r, "user-session")
	if err != nil {
		return fmt.Errorf("Failed to login, try again later")
	}

	session.Values["userID"] = id
	session.Values["username"] = username
	session.Values["role"] = role

	session.Options = &sessions.Options{
		Path:     "/",
		HttpOnly: true,
		Secure:   false, // for localhost only
		SameSite: http.SameSiteLaxMode,
		MaxAge:   86400 * 7,
		Domain:   "", // empty for localhost
	}

	return session.Save(r, w)
}

func IsDuplicateEntryError(err error) bool {
	if err == nil {
		return false
	}

	// MySQL driver returns *mysql.MySQLError
	if mysqlErr, ok := err.(*mysql.MySQLError); ok {
		return mysqlErr.Number == 1062
	}
	return false
}
