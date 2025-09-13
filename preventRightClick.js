const notification = document.getElementById("notification");
    let hideTimeout;

    document.addEventListener("contextmenu", function(e) {
    e.preventDefault(); // block right-click menu

    // Clear any previous hide timers
    clearTimeout(hideTimeout);

    // Show notification
    notification.classList.add("show");

    // Hide after 5 seconds
    hideTimeout = setTimeout(() => {
        notification.classList.remove("show");
    }, 2000);
});