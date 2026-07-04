package main

import "net/http"

func RegisterRoutes() {
	// inventories
	http.HandleFunc("/api/inventorysys/inventories", GetInventories)
	http.HandleFunc("/api/inventorysys/inventories/recent", GetRecentInventories)
	http.HandleFunc("/api/inventorysys/inventories/create", CreateInventory)
	http.HandleFunc("/api/inventorysys/inventories/delete", DeleteInventory)
	http.HandleFunc("/api/inventorysys/inventories/update", UpdateInventory)
	// coursewares
	http.HandleFunc("/api/inventorysys/coursewares", GetCoursewares)
	http.HandleFunc("/api/inventorysys/coursewares/create", CreateCourseware)
	http.HandleFunc("/api/inventorysys/coursewares/update", UpdateCourseware)
	http.HandleFunc("/api/inventorysys/coursewares/delete", DeleteCourseware)
	// study centers
	http.HandleFunc("/api/inventorysys/studycenters", GetStudyCenters)
	http.HandleFunc("/api/inventorysys/studycenters/create", CreateCenter)
	http.HandleFunc("/api/inventorysys/studycenters/update", UpdateCenter)
	http.HandleFunc("/api/inventorysys/studycenters/delete", DeleteCenter)
	// transactions
	http.HandleFunc("/api/inventorysys/transactions", GetTransactions)
	http.HandleFunc("/api/inventorysys/transactions/create", CreateTransaction)
	// users
	http.HandleFunc("/api/inventorysys/users", GetUsers)
	http.HandleFunc("/api/inventorysys/users/create", CreateUser)
	http.HandleFunc("/api/inventorysys/users/update", UpdateUser)
	http.HandleFunc("/api/inventorysys/users/delete", DeleteUser)
	// ----------
	// AUTH ROUTES
	// ----------
	http.HandleFunc("/api/inventorysys/auth/signin", Login)
	http.HandleFunc("/api/inventorysys/auth/siginout", Logout)
	http.HandleFunc("/api/inventorysys/auth/me", GetAuthenticatedUser)

}
