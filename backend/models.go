package main

import "time"

type Inventories struct {
	ID          int    `json:"id"`
	CourseTitle string `json:"course_title"`
	CourseCode  string `json:"course_code"`
	Level       string `json:"level"`
	Semester    string `json:"semester"`
	Quantity    int    `json:"quantity"`
	CenterName  string `json:"center_name"`
	Location    string `json:"location"`
	Status      string `json:"status"`
	// TransactionType string `json:"transaction_type"`
	// TransactionQty  string `json:"transactionQTY"`
}

type RecentInventories struct {
	ID          int    `json:"id"`
	CourseTitle string `json:"course_title"`
	CourseCode  string `json:"course_code"`
	Level       string `json:"level"`
	Semester    string `json:"semester"`
	Quantity    int    `json:"quantity"`
	CenterName  string `json:"center_name"`
	Location    string `json:"location"`
	Status      string `json:"status"`
}

type NewInventory struct {
	CourseCode string `json:"course_code"`
	CenterCode string `json:"center_code"`
	Quantity   int    `json:"quantity"`
}

type InventoryUpdate struct {
	ID          int    `json:"id" db:"id"`
	CourseTitle string `json:"course_title" db:"course_title"`
	CourseCode  string `json:"course_code" db:"course_code"`
	Level       string `json:"level" db:"level"`
	Semester    string `json:"semester" db:"semester"`
	Quantity    int    `json:"quantity" db:"quantity"`
	Status      string `json:"status" db:"status"`
	CenterName  string `json:"center_name" db:"center_name"`
}

type Courseware struct {
	ID        int       `json:"id"`
	CreatedAt time.Time `json:"created_at"`
	// UpdatedAt         time.Time `json:"updated_at"`
	CourseCode  string `json:"course_code"`
	CourseTitle string `json:"course_title"`
	Level       string `json:"level"`
	Semester    string `json:"semester"`
}

type CoursewareUpdate struct {
	ID          int    `json:"id" db:"id"`
	CourseCode  string `json:"course_code" db:"course_code"`
	CourseTitle string `json:"course_title" db:"course_title"`
	Level       string `json:"level" db:"level"`
	Semester    string `json:"semester" db:"semester"`
}

type NewCourseware struct {
	CourseCode  string `json:"course_code"`
	CourseTitle string `json:"course_title"`
	Level       string `json:"level"`
	Semester    string `json:"semester"`
}

type StudyCenters struct {
	ID         int    `json:"id"`
	CenterName string `json:"center_name"`
	CenterCode string `json:"center_code"`
	Location   string `json:"location"`
}

type NewCenter struct {
	CenterName string `json:"center_name"`
	CenterCode string `json:"center_code"`
	Location   string `json:"location"`
}

type CenterUpdate struct {
	ID         int    `json:"id"`
	CenterName string `json:"center_name"`
	CenterCode string `json:"center_code"`
	Location   string `json:"location"`
}

type Transactions struct {
	ID                  int       `json:"id" db:"id"`
	CreatedAt           time.Time `json:"created_at" db:"created_at"`
	UserID              int       `json:"user_id" db:"user_id"`
	CoursewareID        int       `json:"courseware_id" db:"courseware_id"`
	CenterID            int       `json:"center_id" db:"center_id"`
	TransactionType     string    `json:"transaction_type" db:"transaction_type"`
	TransactionQuantity int       `json:"quantity" db:"quantity"`
	Notes               string    `json:"notes" db:"notes"`
	CourseTitle         string    `json:"course_title" db:"course_title"`
	CourseCode          string    `json:"course_code" db:"course_code"`
	CenterName          string    `json:"center_name" db:"center_name"`
	PerformedBy         string    `json:"performedBy" db:"performedBy"`
	BalanceAfter        int       `json:"balanceAfter" db:"balanceAfter"`
}

type NewTransaction struct {
	// UserID          int `json:"user_id"`
	CourseCode      string `json:"course_code"`
	CenterCode      string `json:"center_code"`
	TransactionType string `json:"transaction_type"`
	Quantity        int    `json:"quantity"`
	Notes           string `json:"notes"`
}

type Users struct {
	ID       int    `json:"id"`
	Username string `json:"username"`
	Role     string `json:"role"`
	FullName string `json:"full_name"`
	Email    string `json:"email"`
}

type NewUser struct {
	UserName string `json:"username"`
	Password string `json:"password" db:"password_hash"`
	Role     string `json:"role"`
	FullName string `json:"full_name"`
	Email    string `json:"email"`
}

type UserUpdate struct {
	ID       int    `json:"id"`
	UserName string `json:"username"`
	Role     string `json:"role"`
	FullName string `json:"full_name"`
	Email    string `json:"email"`
}
