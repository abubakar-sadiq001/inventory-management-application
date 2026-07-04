const URL = "http://localhost:8080/api/inventorysys";

export async function getInventories() {
  const res = await fetch(`${URL}/inventories`, {
    credentials: "include",
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) throw { error: res.text, code: res.status };

  const result = await res.json();
  return result;
}

// recent inventories
export async function getRecentInventories() {
  const res = await fetch(`${URL}/inventories/recent`, {
    credentials: "include",
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) throw { error: res.text, code: res.status };

  const result = await res.json();
  return result;
}

// create inventory
export async function createInventory(formData) {
  const res = await fetch(`${URL}/inventories/create`, {
    credentials: "include",
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });

  if (!res.ok) {
    console.log(res.text);
    console.log(res.status);
    if (res.status === 500)
      throw new Error("Failed: Invalid or Duplicate code entry");
    return { error: res.text, code: res.status };
  }
}

// update Inventory
export async function updateInventory(formData) {
  console.log(formData);
  const res = await fetch(`${URL}/inventories/update`, {
    credentials: "include",
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });

  if (!res.ok) {
    console.log(res.text);
    console.log(res.status);
    if (res.status === 500)
      throw new Error("Failed: Invalid or Duplicate code entry");
    return { error: res.text, code: res.status };
  }
}

// Delete Inventory
export async function deleteInventory(id) {
  const res = await fetch(`${URL}/inventories/delete`, {
    credentials: "include",
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id }),
  });

  if (!res.ok) return { error: res.text, code: res.status };
}

export async function getCoursewares() {
  const res = await fetch(`${URL}/coursewares`, {
    credentials: "include",
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) throw { error: res.text, code: res.status };

  const result = await res.json();
  return result;
}

export async function updateCourseware(formData) {
  const res = await fetch(`${URL}/coursewares/update`, {
    credentials: "include",
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });

  if (!res.ok) {
    console.log(res.text);
    console.log(res.status);
    if (res.status === 500)
      throw new Error("Failed: Invalid or Duplicate code entry");
    return { error: res.text, code: res.status };
  }
}

export async function deleteCourseware(coursewareID) {
  const res = await fetch(`${URL}/coursewares/delete`, {
    credentials: "include",
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(coursewareID),
  });

  if (!res.ok) throw { error: res.text, code: res.status };
}

// create new courseware
export async function createCourseware(formData) {
  const res = await fetch(`${URL}/coursewares/create`, {
    credentials: "include",
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });

  if (!res.ok) throw { error: res.text, code: res.status };
}

// get study centers
export async function getStudyCenters() {
  const res = await fetch(`${URL}/studycenters`, {
    credentials: "include",
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) throw { error: res.text, code: res.status };

  const result = await res.json();
  return result;
}

// create study center
export async function createCenter(formData) {
  const res = await fetch(`${URL}/studycenters/create`, {
    credentials: "include",
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });

  if (!res.ok) {
    console.log(res.text);
    console.log(res.status);
    if (res.status === 500)
      throw new Error("Failed: Invalid or Duplicate code entry");
    return { error: res.text, code: res.status };
  }
}

// update study center
export async function updateCenter(formData) {
  const res = await fetch(`${URL}/studycenters/update`, {
    credentials: "include",
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });

  if (!res.ok) {
    console.log(res.text);
    console.log(res.status);
    if (res.status === 500)
      throw new Error("Failed: Invalid or Duplicate code entry");
    return { error: res.text, code: res.status };
  }
}

// delete study center
export async function deleteCenter(id) {
  const res = await fetch(`${URL}/studycenters/delete`, {
    credentials: "include",
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(id),
  });

  if (!res.ok) throw { error: res.text, code: res.status };
}

// get transactions
export async function getTransactions() {
  const res = await fetch(`${URL}/transactions`, {
    credentials: "include",
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) throw { error: res.text, code: res.status };

  const result = await res.json();
  return result;
}

// create transaction
export async function createTransaction(formData) {
  const res = await fetch(`${URL}/transactions/create`, {
    credentials: "include",
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });

  if (!res.ok) {
    console.log(res.text);
    console.log(res.status);
    if (res.status === 500)
      throw new Error("Failed: Invalid or Duplicate code entry");
    return { error: res.text, code: res.status };
  }
}

// get users
export async function getUsers() {
  const res = await fetch(`${URL}/users`, {
    credentials: "include",
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) throw { error: res.text, code: res.status };

  const result = await res.json();
  return result;
}

// create user
export async function createUser(formData) {
  console.log(formData);
  const res = await fetch(`${URL}/users/create`, {
    credentials: "include",
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });

  if (!res.ok) {
    console.log(res.text);
    console.log(res.status);
    if (res.status === 500)
      throw new Error("Failed: Invalid or Duplicate email entry");
    return { error: res.text, code: res.status };
  }
}

// update user
export async function updateUser(formData) {
  const res = await fetch(`${URL}/users/update`, {
    credentials: "include",
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });

  if (!res.ok) {
    console.log(res.text);
    console.log(res.status);
    if (res.status === 500)
      throw new Error("Failed: Invalid or Duplicate code entry");
    return { error: res.text, code: res.status };
  }
}

// delete user
export async function deleteUser(id) {
  const res = await fetch(`${URL}/users/delete`, {
    credentials: "include",
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(id),
  });

  if (!res.ok) throw { error: res.text, code: res.status };
}

// login
export async function login(credentials) {
  const res = await fetch(`${URL}/auth/signin`, {
    credentials: "include",
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });

  if (!res.ok) {
    console.log(res.status);
    if (res.status === 401 || res.statusText === "Unauthorized") {
      throw { code: 401, message: "Invalid email or password" };
    }
    throw new Error("Failed to login");
  }
}

// get signed user
export async function getAuthUser() {
  const res = await fetch(`${URL}/auth/me`, {
    credentials: "include",
  });

  if (!res.ok) throw new Error("Something went wrong", await res.text());

  const data = await res.json();
  return data;
}

// logout
export async function logout() {
  const res = await fetch(`${URL}/auth/siginout`, {
    credentials: "include",
  });

  if (!res.ok) throw new Error("Something went wrong", await res.text());
}
