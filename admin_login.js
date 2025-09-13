// Hardcoded admin credentials
const admins = [
  { email: "sajed_manager@gamevee.com", password: "sajed@121212" },
  { email: "ali@gamevee.com", password: "ali@121212" },
  { email: "support@gamevee.com", password: "support_@121212" }
];

// Load warnings and login attempts from localStorage
let loginAttempts = JSON.parse(localStorage.getItem("loginAttempts")) || {};
let warnings = JSON.parse(localStorage.getItem("warnings")) || [];

// Save state back to localStorage
function saveState() {
  localStorage.setItem("loginAttempts", JSON.stringify(loginAttempts));
  localStorage.setItem("warnings", JSON.stringify(warnings));
}

// Add a warning
function logWarning(email, reason) {
  const warning = { email, reason, time: new Date().toISOString() };
  warnings.push(warning);
  saveState();
}

// Handle admin login form
document.getElementById("adminLoginForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const email = document.getElementById("adminEmail").value;
  const password = document.getElementById("adminPassword").value;

  // Check if blocked
  if (loginAttempts[email]?.blocked) {
    const notification = document.getElementById("notification7");
    notification.classList.add("show");
    setTimeout(() => notification.classList.remove("show"), 3000);

    logWarning(email, "Blocked email tried to login");
    return;
  }

  // Validate credentials
  const admin = admins.find(a => a.email === email && a.password === password);

  if (!admin) {
    // Record failed attempt
    if (!loginAttempts[email]) loginAttempts[email] = { attempts: 0, blocked: false };
    loginAttempts[email].attempts++;
    saveState();

    logWarning(email, "Invalid login attempt");

    if (loginAttempts[email].attempts >= 3) {
      loginAttempts[email].blocked = true;
      logWarning(email, "Account blocked due to suspicious activity");
    }

    const notification = document.getElementById("notification5");
    notification.classList.add("show");
    setTimeout(() => notification.classList.remove("show"), 3000);

    return;
  }

  // Success
  loginAttempts[email] = { attempts: 0, blocked: false };
  saveState();

  localStorage.setItem("currentAdmin", JSON.stringify(admin));

  const notification = document.getElementById("notification6");
  notification.classList.add("show");
  setTimeout(() => notification.classList.remove("show"), 2000);

  setTimeout(() => {
    window.location.href = "admin.html";
  }, 2000);
});
