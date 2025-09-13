document.getElementById('hamburger').onclick = function() {
    document.getElementById('hamburgerMenu').classList.remove('hide');
};
document.getElementById('hamburgerMenu').onclick = function(e) {
    // Close menu if clicked outside nav-list or nav-actions
    if (e.target === this) {
        this.classList.add('hide');
    }
};