const usersList = document.getElementById("usersList");

// Load users from localStorage

function loadUsers() {
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const deletedUsers = JSON.parse(localStorage.getItem("deletedUsers")) || [];
  usersList.innerHTML = "";

  users.forEach((user, index) => {
    const row = document.createElement("tr");

    // Wrap buttons in a flex container for spacing
    row.innerHTML = `
      <td>${user.name}</td>
      <td>${user.email}</td>
      <td>${new Date(user.created).toLocaleString()}</td>
      <td>${user.status || "Active"}</td>
      <td style="display:flex; gap:8px;">
        <button class="edit-btn" onclick="editUser(${index})">Edit</button>
        <button class="ban-btn" onclick="toggleBanUser(${index})">
          ${user.status === "Banned" ? "Unban" : "Ban"}
        </button>
        <button class="delete-btn" onclick="deleteUser(${index})">Delete</button>
        <button class="delete-btn" onclick="deleteUserPermanent(${index})" style="background:#900;">Delete Permanently</button>
      </td>
    `;
    usersList.appendChild(row);
  });

  // Render deleted users for undo
  if (deletedUsers.length > 0) {
    const deletedSection = document.createElement("tr");
    deletedSection.innerHTML = `
      <td colspan="5">
        <strong>Recently Deleted:</strong>
        ${deletedUsers
          .map(
            (u, i) =>
              `${u.name} (${u.email}) 
               <button onclick="undoDelete(${i})">Undo</button>`
          )
          .join(" | ")}
      </td>
    `;
    usersList.appendChild(deletedSection);
  }
}


// Edit user (only name for now)
function editUser(index) {
  let users = JSON.parse(localStorage.getItem("users")) || [];
  let user = users[index];

  const newName = prompt("Edit Full Name:", user.name);
  if (newName) {
    users[index].name = newName;
    localStorage.setItem("users", JSON.stringify(users));
    loadUsers();
  }
}

// Toggle Ban / Unban
function toggleBanUser(index) {
  let users = JSON.parse(localStorage.getItem("users")) || [];
  users[index].status = users[index].status === "Banned" ? "Active" : "Banned";
  localStorage.setItem("users", JSON.stringify(users));
  loadUsers();
}

// Soft Delete user
function deleteUser(index) {
  if (confirm("Are you sure you want to delete this user?")) {
    let users = JSON.parse(localStorage.getItem("users")) || [];
    let deletedUsers = JSON.parse(localStorage.getItem("deletedUsers")) || [];

    const removed = users.splice(index, 1)[0];
    deletedUsers.push(removed);

    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("deletedUsers", JSON.stringify(deletedUsers));

    loadUsers();
  }
}

// Permanent Delete user
function deleteUserPermanent(index) {
  if (confirm("Are you sure you want to permanently delete this user?")) {
    let users = JSON.parse(localStorage.getItem("users")) || [];
    users.splice(index, 1);
    localStorage.setItem("users", JSON.stringify(users));
    loadUsers();
  }
}

// Undo delete
function undoDelete(index) {
  let users = JSON.parse(localStorage.getItem("users")) || [];
  let deletedUsers = JSON.parse(localStorage.getItem("deletedUsers")) || [];

  const restored = deletedUsers.splice(index, 1)[0];
  users.push(restored);

  localStorage.setItem("users", JSON.stringify(users));
  localStorage.setItem("deletedUsers", JSON.stringify(deletedUsers));

  loadUsers();
}


// load login sessions
// Load sessions
function loadSessions() {
  const sessions = JSON.parse(localStorage.getItem("sessions")) || [];
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const sessionsList = document.getElementById("sessionsList");
  sessionsList.innerHTML = "";

  // Count sessions per user per day
  const dailyCounts = {};
  sessions.forEach(s => {
    const loginDate = new Date(s.login).toDateString();
    if (!dailyCounts[s.email]) dailyCounts[s.email] = {};
    dailyCounts[s.email][loginDate] = (dailyCounts[s.email][loginDate] || 0) + 1;
  });

  sessions.forEach(s => {
    const user = users.find(u => u.email === s.email) || {};
    const loginTime = new Date(s.login);
    const logoutTime = s.logout ? new Date(s.logout) : null;
    const duration = logoutTime
      ? ((logoutTime - loginTime) / 1000 / 60).toFixed(2) + " seconds"
      : "-";

    const loginDate = loginTime.toDateString();
    const sessionsToday = dailyCounts[s.email]?.[loginDate] || 1;

    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${user.name || "Unknown"}</td>
      <td>${s.email}</td>
      <td>${loginTime.toLocaleString()}</td>
      <td>${duration}</td>
      <td>${sessionsToday}</td>
    `;
    sessionsList.appendChild(row);
  });
}


// Initial load
loadUsers();
loadSessions();