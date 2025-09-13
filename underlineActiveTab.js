document.addEventListener("DOMContentLoaded", function () {
    // Map page filenames to nav link selectors
    const pageToNav = {
        "home.html": ".home",
        "home_loggedin.html": ".home2",
        "games.html": ".games",
        "downloads.html": ".downloads"
        // Add more mappings if needed
    };

    // Get current page filename
    const path = window.location.pathname;
    const page = path.substring(path.lastIndexOf("/") + 1).toLowerCase();

    // Find the matching nav link
    const navSelector = pageToNav[page];
    if (navSelector) {
        const navLink = document.querySelector(`nav ${navSelector}`);
        if (navLink) {
            // Remove previous active underline if any
            const oldUnderline = navLink.querySelector('.active-underline');
            if (oldUnderline) oldUnderline.remove();

            // Create underline element
            const underline = document.createElement('span');
            underline.className = 'active-underline';
            navLink.appendChild(underline);
        }
    }
});