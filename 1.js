
  // Make sure the user is logged in
  window.addEventListener("DOMContentLoaded", () => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (!currentUser) {
      // Not logged in → redirect to login page
      window.location.href = "login.html";
    }
  });

  // Logout button
  const logoutBtn = document.getElementById("logoutBtn");
  logoutBtn.addEventListener("click", () => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (currentUser) {
      // Log the logout time in sessions
      let sessions = JSON.parse(localStorage.getItem("loginSessions")) || [];
      const lastSession = sessions.find(
        s => s.email === currentUser.email && !s.logout
      );
      if (lastSession) {
        lastSession.logout = new Date().toISOString();
        lastSession.duration = 
          new Date(lastSession.logout) - new Date(lastSession.login); // duration in ms
      }
      localStorage.setItem("loginSessions", JSON.stringify(sessions));
    }

    // Clear the current user
    localStorage.removeItem("currentUser");

    // Redirect to login page
    window.location.href = "login.html";
});
