package main

import (
	"encoding/json"
	"fmt"
	"net/http"

	"golang.org/x/crypto/bcrypt"
)

func GetInventories(w http.ResponseWriter, r *http.Request) {
	query := "SELECT inventory.id, course_title, course_code, level, semester, quantity, center_name, location, status FROM inventory JOIN courseware ON courseware.id = courseware_id JOIN study_centers ON study_centers.id = center_id"

	rows, err := DB.QueryContext(r.Context(), query)

	var inventories []Inventories
	for rows.Next() {
		var inventory Inventories
		err = rows.Scan(
			&inventory.ID,
			&inventory.CourseTitle,
			&inventory.CourseCode,
			&inventory.Level,
			&inventory.Semester,
			&inventory.Quantity,
			&inventory.CenterName,
			&inventory.Location,
			&inventory.Status,
		)
		if err != nil {
			ErrString(w, err.Error(), http.StatusInternalServerError)
			return
		}

		inventories = append(inventories, inventory)
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(inventories)

}

// retrieve recent inventoriews
func GetRecentInventories(w http.ResponseWriter, r *http.Request) {
	query := "SELECT inventory.id, course_title, course_code, level, semester, quantity, center_name, location, status FROM inventory JOIN courseware ON courseware.id = courseware_id JOIN study_centers ON study_centers.id = center_id order by courseware.created_at desc"

	rows, err := DB.QueryContext(r.Context(), query)

	var inventories []RecentInventories
	for rows.Next() {
		var inventory RecentInventories
		err = rows.Scan(
			&inventory.ID,
			&inventory.CourseTitle,
			&inventory.CourseCode,
			&inventory.Level,
			&inventory.Semester,
			&inventory.Quantity,
			&inventory.CenterName,
			&inventory.Location,
			&inventory.Status,
		)
		if err != nil {
			ErrString(w, err.Error(), http.StatusInternalServerError)
			return
		}

		inventories = append(inventories, inventory)
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(inventories)

}

// create inventory
func CreateInventory(w http.ResponseWriter, r *http.Request) {
	var newInventoryReq NewInventory

	err := json.NewDecoder(r.Body).Decode(&newInventoryReq)
	if err != nil {
		ErrString(w, err.Error(), http.StatusBadRequest)
		return
	}

	var coursewareID, centerID int
	_ = DB.QueryRow("SELECT id FROM courseware WHERE course_code = ?", newInventoryReq.CourseCode).Scan(&coursewareID)
	_ = DB.QueryRow("SELECT id FROM study_centers WHERE center_code = ?", newInventoryReq.CenterCode).Scan(&centerID)

	tx, err := DB.Begin()
	if err != nil {
		ErrString(w, err.Error(), http.StatusInternalServerError)
		return
	}
	defer tx.Rollback()

	_, err = tx.Exec(`
		INSERT INTO inventory (courseware_id, center_id, quantity)
		VALUES (?, ?, ?)
	`, coursewareID, centerID, newInventoryReq.Quantity)
	if err != nil {
		ErrString(w, "failed to update courseware: "+err.Error(), http.StatusInternalServerError)
		return
	}

	err = tx.Commit()
	if err != nil {

		ErrString(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)

}

func DeleteInventory(w http.ResponseWriter, r *http.Request) {
	var inventoryId struct {
		Id int `json:"id"`
	}

	err := json.NewDecoder(r.Body).Decode(&inventoryId)
	if err != nil {

		ErrString(w, err.Error(), http.StatusBadRequest)
		return
	}

	tx, err := DB.Begin()
	if err != nil {

		ErrString(w, err.Error(), http.StatusInternalServerError)
		return
	}
	defer tx.Rollback()

	stmt, err := tx.Prepare("DELETE FROM inventory WHERE id = ? ")
	if err != nil {

		ErrString(w, err.Error(), http.StatusInternalServerError)
		return
	}

	_, err = stmt.Exec(inventoryId.Id)
	if err != nil {

		ErrString(w, err.Error(), http.StatusInternalServerError)
		return
	}

	err = tx.Commit()
	if err != nil {

		ErrString(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)

}

// update inventory
func UpdateInventory(w http.ResponseWriter, r *http.Request) {
	var updateReq InventoryUpdate

	if err := json.NewDecoder(r.Body).Decode(&updateReq); err != nil {

		ErrString(w, "invalid JSON: "+err.Error(), http.StatusBadRequest)
		return
	}

	tx, err := DB.Begin()
	if err != nil {
		fmt.Print(err.Error())
		ErrString(w, err.Error(), http.StatusInternalServerError)
		return
	}
	defer tx.Rollback()

	// 1. Get the current courseware_id and center_id from the inventory
	var coursewareID, centerID int
	err = tx.QueryRow(`SELECT courseware_id, center_id FROM inventory WHERE id = ?`, updateReq.ID).Scan(&coursewareID, &centerID)
	if err != nil {
		http.Error(w, "inventory not found: "+err.Error(), http.StatusNotFound)
		return
	}

	// 2. Update the courseware record (using the retrieved courseware_id)
	_, err = tx.Exec(`
        UPDATE courseware
        SET course_title = ?,
            course_code  = ?,
            level        = ?,
            semester     = ?,
            status     = ?
        WHERE id = ?
    `, updateReq.CourseTitle, updateReq.CourseCode, updateReq.Level, updateReq.Semester, updateReq.Status, coursewareID)
	if err != nil {
		// Handle potential conflicts (e.g., duplicate course_code)

		ErrString(w, "failed to update courseware: "+err.Error(), http.StatusInternalServerError)
		return
	}

	// 3. Update the study_center record (using the retrieved center_id)
	_, err = tx.Exec(`
        UPDATE study_centers
        SET center_name = ?
        WHERE id = ?
    `, updateReq.CenterName, centerID)
	if err != nil {

		ErrString(w, "failed to update study_center: "+err.Error(), http.StatusInternalServerError)
		return
	}

	// 4. Update the inventory's quantity (the ID stays the same)
	_, err = tx.Exec(`
        UPDATE inventory
        SET quantity = ?
        WHERE id = ?
    `, updateReq.Quantity, updateReq.ID)
	if err != nil {

		ErrString(w, "failed to update inventory: "+err.Error(), http.StatusInternalServerError)
		return
	}

	if err := tx.Commit(); err != nil {

		ErrString(w, "commit failed: "+err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]string{"status": "updated"})
}

// retieve coursewares
func GetCoursewares(w http.ResponseWriter, r *http.Request) {
	rows, err := DB.QueryContext(r.Context(), "SELECT id, created_at, course_code, course_title, level, semester FROM courseware")
	if err != nil {

		ErrString(w, err.Error(), http.StatusInternalServerError)
		return
	}

	var coursewares []Courseware
	for rows.Next() {
		var courseware Courseware
		err = rows.Scan(
			&courseware.ID,
			&courseware.CreatedAt,
			&courseware.CourseCode,
			&courseware.CourseTitle,
			&courseware.Level,
			&courseware.Semester,
		)
		if err != nil {

			ErrString(w, err.Error(), http.StatusInternalServerError)
			return
		}

		coursewares = append(coursewares, courseware)
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(coursewares)
}

// update courseware
func UpdateCourseware(w http.ResponseWriter, r *http.Request) {
	var updateReq CoursewareUpdate

	err := json.NewDecoder(r.Body).Decode(&updateReq)
	if err != nil {

		ErrString(w, err.Error(), http.StatusBadRequest)
		return
	}

	tx, err := DB.Begin()
	if err != nil {

		return
	}
	defer tx.Rollback()

	_, err = tx.Exec(`
		UPDATE courseware 
		SET course_code = ?, 
		course_title = ?, 
		level= ?, 
		semester = ? 
		WHERE id = ? 
`, updateReq.CourseCode, updateReq.CourseTitle, updateReq.Level, updateReq.Semester, updateReq.ID)

	if err != nil {

		ErrString(w, "failed to update courseware: "+err.Error(), http.StatusInternalServerError)
		return
	}

	if err := tx.Commit(); err != nil {

		ErrString(w, "commit failed: "+err.Error(), http.StatusInternalServerError)
		return
	}

	// Send success response
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]string{"status": "updated"})
}

// delete courseware
func DeleteCourseware(w http.ResponseWriter, r *http.Request) {
	var coursewareID int

	err := json.NewDecoder(r.Body).Decode(&coursewareID)
	if err != nil {

		return
	}

	tx, err := DB.Begin()
	if err != nil {

		return
	}

	_, err = tx.Exec("DELETE FROM courseware WHERE id = ?", coursewareID)
	if err != nil {

		ErrString(w, "failed to delete courseware: "+err.Error(), http.StatusInternalServerError)
		return
	}

	if err := tx.Commit(); err != nil {

		ErrString(w, "commit failed: "+err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]string{"status": "updated"})
}

// create courseware
func CreateCourseware(w http.ResponseWriter, r *http.Request) {
	var newCoursewareReq NewCourseware

	err := json.NewDecoder(r.Body).Decode(&newCoursewareReq)
	if err != nil {

		return
	}

	tx, err := DB.Begin()
	if err != nil {

		return
	}
	defer tx.Rollback()

	_, err = tx.Exec(`
		INSERT INTO courseware (course_code, course_title, level, semester)
		VALUES (?, ?, ?, ?)
	`, newCoursewareReq.CourseCode, newCoursewareReq.CourseTitle, newCoursewareReq.Level, newCoursewareReq.Semester)
	if err != nil {

		ErrString(w, "failed to create courseware: "+err.Error(), http.StatusInternalServerError)
		return
	}

	if err := tx.Commit(); err != nil {

		ErrString(w, "commit failed: "+err.Error(), http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
}

// retrieve study centers
func GetStudyCenters(w http.ResponseWriter, r *http.Request) {
	query := "SELECT id, center_name, center_code, location FROM study_centers"

	rows, err := DB.QueryContext(r.Context(), query)
	if err != nil {

		ErrString(w, err.Error(), http.StatusInternalServerError)
		return
	}

	var studyCenters []StudyCenters
	for rows.Next() {
		var studycenter StudyCenters
		err = rows.Scan(&studycenter.ID, &studycenter.CenterName, &studycenter.CenterCode, &studycenter.Location)
		if err != nil {

			ErrString(w, err.Error(), http.StatusInternalServerError)
			return
		}

		studyCenters = append(studyCenters, studycenter)
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(studyCenters)

}

// create center
func CreateCenter(w http.ResponseWriter, r *http.Request) {
	var newCoursewareReq NewCenter

	err := json.NewDecoder(r.Body).Decode(&newCoursewareReq)
	if err != nil {

		return
	}

	tx, err := DB.Begin()
	if err != nil {

		return
	}
	defer tx.Rollback()

	_, err = tx.Exec(`
		INSERT INTO study_centers (center_name, center_code, location)
		VALUES (?, ?, ?)
	`, newCoursewareReq.CenterName, newCoursewareReq.CenterCode, newCoursewareReq.Location)
	if err != nil {

		ErrString(w, "failed to create center: "+err.Error(), http.StatusInternalServerError)
		return
	}

	if err := tx.Commit(); err != nil {

		ErrString(w, "commit failed: "+err.Error(), http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
}

// update study center
func UpdateCenter(w http.ResponseWriter, r *http.Request) {
	var updateReq CenterUpdate

	err := json.NewDecoder(r.Body).Decode(&updateReq)
	if err != nil {

		ErrString(w, err.Error(), http.StatusBadRequest)
		return
	}

	tx, err := DB.Begin()
	if err != nil {

		return
	}
	defer tx.Rollback()

	_, err = tx.Exec(`
		UPDATE study_centers 
		SET center_name = ?, 
		center_code = ?, 
		location = ?
		WHERE id = ? 
`, updateReq.CenterName, updateReq.CenterCode, updateReq.Location, updateReq.ID)

	if err != nil {

		ErrString(w, "failed to update courseware: "+err.Error(), http.StatusInternalServerError)
		return
	}

	if err := tx.Commit(); err != nil {

		ErrString(w, "commit failed: "+err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]string{"status": "updated"})
}

// delete center
func DeleteCenter(w http.ResponseWriter, r *http.Request) {
	var centerID int

	err := json.NewDecoder(r.Body).Decode(&centerID)
	if err != nil {

		return
	}

	tx, err := DB.Begin()
	if err != nil {

		return
	}

	_, err = tx.Exec("DELETE FROM study_centers WHERE id = ?", centerID)
	if err != nil {

		ErrString(w, "failed to delete center: "+err.Error(), http.StatusInternalServerError)
		return
	}

	if err := tx.Commit(); err != nil {

		ErrString(w, "commit failed: "+err.Error(), http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
}

// retrieve transaction
func GetTransactions(w http.ResponseWriter, r *http.Request) {
	query := `
	SELECT 
	IT.id,
	IT.created_at, 
	IT.user_id, 
	IT.courseware_id, 
	IT.center_id, 
	IT.transaction_type, 
	IT.quantity, 
	IT.notes,
	course_title,
	course_code,
	center_name,
	users.full_name AS performedBy,
    inventory.quantity AS balanceAfter
	FROM inventory_transactions AS IT
	JOIN users ON users.id = IT.user_id
	JOIN courseware ON courseware.id = IT.courseware_id
	JOIN study_centers ON study_centers.id = IT.center_id
    JOIN inventory ON inventory.courseware_id = IT.courseware_id
	`

	rows, err := DB.QueryContext(r.Context(), query)
	if err != nil {

		ErrString(w, err.Error(), http.StatusInternalServerError)
		return
	}

	var transactions []Transactions
	for rows.Next() {
		var transaction Transactions
		err = rows.Scan(
			&transaction.ID,
			&transaction.CreatedAt,
			&transaction.UserID,
			&transaction.CoursewareID,
			&transaction.CenterID,
			&transaction.TransactionType,
			&transaction.TransactionQuantity,
			&transaction.Notes,
			&transaction.CourseTitle,
			&transaction.CourseCode,
			&transaction.CenterName,
			&transaction.PerformedBy,
			&transaction.BalanceAfter,
		)
		if err != nil {

			ErrString(w, err.Error(), http.StatusInternalServerError)
			return
		}

		transactions = append(transactions, transaction)
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(transactions)

}

// create transaction
func CreateTransaction(w http.ResponseWriter, r *http.Request) {
	var formData NewTransaction

	err := json.NewDecoder(r.Body).Decode(&formData)
	if err != nil {

		ErrString(w, err.Error(), http.StatusBadRequest)
		return
	}

	var coursewareID, centerID int
	_ = DB.QueryRow("SELECT id FROM courseware WHERE course_code = ?", formData.CourseCode).Scan(&coursewareID)
	_ = DB.QueryRow("SELECT id FROM study_centers WHERE center_code = ?", formData.CenterCode).Scan(&centerID)

	tx, err := DB.Begin()
	if err != nil {

		return
	}
	defer tx.Rollback()

	// serach session  for user id
	session, err := Store.Get(r, "user-session")
	if err != nil {

		ErrString(w, "Session not found", http.StatusUnauthorized)
		return
	}

	userID, ok := session.Values["userID"].(int)
	if !ok {

		ErrString(w, "ID NOT FOUND", http.StatusUnauthorized)
		return
	}

	_, err = tx.Exec(`
		INSERT INTO inventory_transactions 
		(user_id, courseware_id, center_id, transaction_type, quantity, notes)
		VALUES 
			(?, ?, ?, ?, ?, ?)	
	`, userID, coursewareID, centerID, formData.TransactionType, formData.Quantity, formData.Notes)
	if err != nil {
		ErrString(w, "failed to create transaction: "+err.Error(), http.StatusInternalServerError)
		return
	}

	if err := tx.Commit(); err != nil {
		ErrString(w, "commit failed: "+err.Error(), http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
}

// get users
func GetUsers(w http.ResponseWriter, r *http.Request) {
	query := "SELECT id, username, role, full_name, email FROM users"

	rows, err := DB.QueryContext(r.Context(), query)
	if err != nil {
		ErrString(w, err.Error(), http.StatusInternalServerError)
		return
	}

	var users []Users
	for rows.Next() {
		var user Users
		err = rows.Scan(
			&user.ID,
			&user.Username,
			&user.Role,
			&user.FullName,
			&user.Email,
		)
		if err != nil {
			ErrString(w, err.Error(), http.StatusInternalServerError)
			return
		}

		users = append(users, user)
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(users)
}

// create users
func CreateUser(w http.ResponseWriter, r *http.Request) {
	var formData NewUser

	err := json.NewDecoder(r.Body).Decode(&formData)
	if err != nil {
		ErrString(w, err.Error(), http.StatusBadRequest)
		return
	}
	tx, err := DB.Begin()
	if err != nil {
		return
	}
	defer tx.Rollback()

	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(formData.Password), bcrypt.DefaultCost)
	if err != nil {
		ErrString(w, "Sorry, there was a problem registering your account", http.StatusInternalServerError)
		return
	}

	_, err = tx.Exec(`
		INSERT INTO users 
		(username, password_hash, role, full_name, email)
		VALUES (?, ?, ?, ?, ?)	
	`, formData.UserName, hashedPassword, formData.Role, formData.FullName, formData.Email)
	if err != nil {
		if IsDuplicateEntryError(err) {
			fmt.Println("Duplicate email detected!")
			ErrString(w, "duplicate entry: ", http.StatusInternalServerError)
		}

		ErrString(w, "failed to create transaction: "+err.Error(), http.StatusInternalServerError)
		return
	}

	if err := tx.Commit(); err != nil {
		ErrString(w, "commit failed: "+err.Error(), http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
}

// delete user
func DeleteUser(w http.ResponseWriter, r *http.Request) {
	var userID int

	err := json.NewDecoder(r.Body).Decode(&userID)
	if err != nil {
		return
	}

	tx, err := DB.Begin()
	if err != nil {
		return
	}

	_, err = tx.Exec("DELETE FROM users WHERE id = ?", userID)
	if err != nil {
		ErrString(w, "failed to delete center: "+err.Error(), http.StatusInternalServerError)
		return
	}

	if err := tx.Commit(); err != nil {
		ErrString(w, "commit failed: "+err.Error(), http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
}

// update user
func UpdateUser(w http.ResponseWriter, r *http.Request) {
	var updateReq UserUpdate

	err := json.NewDecoder(r.Body).Decode(&updateReq)
	if err != nil {
		return
	}

	tx, err := DB.Begin()
	if err != nil {
		return
	}

	_, err = tx.Exec(`
		UPDATE users 
		SET  
			username = ?,
			role = ?,
			full_name = ?,
			email = ?
			WHERE id = ?`, updateReq.UserName, updateReq.Role, updateReq.FullName, updateReq.Email, updateReq.ID)
	if err != nil {
		ErrString(w, "failed to update user: "+err.Error(), http.StatusInternalServerError)
		return
	}

	if err := tx.Commit(); err != nil {
		ErrString(w, "commit failed: "+err.Error(), http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)

}

// authenticate user
func Login(w http.ResponseWriter, r *http.Request) {
	var loginReq struct {
		Email    string `json:"email"`
		Password string `json:"password"`
	}

	err := json.NewDecoder(r.Body).Decode(&loginReq)
	if err != nil {
		return
	}

	var id int
	var username, email, hash, role string

	row := DB.QueryRow("SELECT id, username, email, password_hash, role FROM users WHERE email = ?", loginReq.Email)

	err = row.Scan(&id, &username, &email, &hash, &role)
	if err != nil {
		ErrString(w, "invalid email or password", http.StatusUnauthorized)
		return
	}

	err = bcrypt.CompareHashAndPassword([]byte(hash), []byte(loginReq.Password))
	if err != nil {
		ErrString(w, "invalid email or password", http.StatusUnauthorized)
		return
	}

	// create JWT token
	err = CreateSession(Store, id, username, role, w, r)
	if err != nil {
		fmt.Print(err)
		json.NewEncoder(w).Encode(map[string]string{
			"error": err.Error(),
		})
		return
	}

	w.WriteHeader(http.StatusOK)

}

// get authenticated user
func GetAuthenticatedUser(w http.ResponseWriter, r *http.Request) {

	session, err := Store.Get(r, "user-session")
	if err != nil {
		ErrString(w, "Invalid session", http.StatusUnauthorized)
		return
	}

	userID, ok := session.Values["userID"]
	if !ok {
		ErrString(w, "Unauthorized", http.StatusUnauthorized)
		return
	}

	username, ok := session.Values["username"]
	role, ok := session.Values["role"]

	json.NewEncoder(w).Encode(map[string]interface{}{
		"userID":   userID,
		"username": username,
		"role":     role,
	})
}

// logout
func Logout(w http.ResponseWriter, r *http.Request) {
	session, err := Store.Get(r, "user-session")
	if err != nil {
		ErrString(w, "Invalid session", http.StatusUnauthorized)
		return
	}

	delete(session.Values, "userID")
	delete(session.Values, "username")
	session.Options.MaxAge = -1

	err = session.Save(r, w)
	if err != nil {
		ErrString(w, "error logging out", http.StatusBadRequest)
		return
	}

}
