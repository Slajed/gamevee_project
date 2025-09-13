// loginHandler.js
document.getElementById("login-form").addEventListener("submit", function(e) {
  e.preventDefault();
  const loggin_in_message = document.getElementById("notification3");
  const incorrect_credentials_message = document.getElementById("notification2");

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const users = JSON.parse(localStorage.getItem("users")) || [];

  const user = users.find(u => u.email === email && u.password === password);

  if (!user) {
    incorrect_credentials_message.classList.add("show");
    setTimeout(() => incorrect_credentials_message.classList.remove("show"), 3000);
    return;
  }

  if (user.status === "Banned") {
    const banned_message = document.getElementById("notification4");
    banned_message.classList.add("show");
    setTimeout(() => banned_message.classList.remove("show"), 3000);
    return;
  }

  // ✅ Save currentUser
  const currentUser = { name: user.name, email: user.email, login: new Date().toISOString() };
  localStorage.setItem("currentUser", JSON.stringify(currentUser));

  // ✅ Record session
  let sessions = JSON.parse(localStorage.getItem("sessions")) || [];
  sessions.push({
    currentUser
  });
  localStorage.setItem("sessions", JSON.stringify(sessions));

  // ✅ Success message
  loggin_in_message.classList.add("show");
  setTimeout(() => loggin_in_message.classList.remove("show"), 3000);

  // ✅ Redirect
  setTimeout(() => {
    window.location.href = "home_loggedin.html";
  }, 4000);
});
