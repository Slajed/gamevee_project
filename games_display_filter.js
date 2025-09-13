document.addEventListener("DOMContentLoaded", () => {
  const sidebar = document.querySelector('.sidebar');
  const toggleBtn = document.querySelector('.toggle-sidebar');
  const closeBtn = document.querySelector('.close-btn');
  const filterBar = document.getElementById("filterBar");
  const sortButtons = document.querySelectorAll(".sort-btn");
  const gamesContainer = document.querySelector(".gamesContainer");

  // Open sidebar
  toggleBtn.addEventListener('click', () => {
    sidebar.classList.add('active');
    toggleBtn.classList.add('hidden'); // hide hamburger
  });

  // Close sidebar
  closeBtn.addEventListener('click', () => {
    sidebar.classList.remove('active');
    toggleBtn.classList.remove('hidden'); // show hamburger again
  });

  // Category filtering
  document.querySelectorAll('.category-btn').forEach(button => {
    button.addEventListener('click', () => {
      document.querySelectorAll('.category-btn').forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      const category = button.getAttribute('data-category');
      const games = document.querySelectorAll('.game-card');

      games.forEach(game => {
        const gameCats = (game.getAttribute('data-category') || "").split(" ");
        if (category === 'all' || gameCats.includes(category)) {
          game.style.display = 'block';
        } else {
          game.style.display = 'none';
        }
      });
    });
  });

  // Show/hide filter bar depending on category
  document.querySelectorAll('.category-btn').forEach(button => {
    button.addEventListener('click', () => {
      const category = button.getAttribute('data-category');
      if (filterBar) {
        filterBar.style.display = category === "all" ? "flex" : "none";
      }
    });
  });

  // Sorting logic
  sortButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const sortType = btn.getAttribute("data-sort");
      const games = Array.from(document.querySelectorAll(".game-card"));

      let sortedGames;
      if (sortType === "alphabetical") {
        sortedGames = games.sort((a, b) =>
          a.querySelector("h3").innerText.localeCompare(
            b.querySelector("h3").innerText
          )
        );
      } else if (sortType === "newest") {
        sortedGames = games.sort(
          (a, b) =>
            new Date(b.getAttribute("data-added")) -
            new Date(a.getAttribute("data-added"))
        );
      }

      // Re-append sorted
      gamesContainer.innerHTML = "";
      sortedGames.forEach(game => gamesContainer.appendChild(game));
    });
  });
});
