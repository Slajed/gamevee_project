const form = document.getElementById("addGameForm");
const gamesList = document.getElementById("gamesList");

// Load games from localStorage
function loadGames() {
  const games = JSON.parse(localStorage.getItem("games")) || [];
  gamesList.innerHTML = "";

  games.forEach((game, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${game.title}</td>
      <td>${Array.isArray(game.categories) ? game.categories.map(capitalize).join(", ") : capitalize(game.category)}</td>
      <td>${new Date(game.added).toLocaleString()}</td>
      <td>
        <button class="edit-btn" onclick="editGame(${index})">Edit</button>
        <button class="delete-btn" onclick="deleteGame(${index})">Delete</button>
      </td>
    `;
    gamesList.appendChild(row);
  });
}

// Capitalize helper
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

// Add a new game
form.addEventListener("submit", e => {
  e.preventDefault();

  const fileInput = document.getElementById("gameIcon");
  const file = fileInput.files[0];

  if (!file) {
    alert("Please select an image.");
    return;
  }

  const reader = new FileReader();
  reader.onload = function(event) {
    const categoryInput = document.getElementById("gameCategory").value.trim();
    const categories = categoryInput
      .split(",")
      .map(c => c.trim().toLowerCase())
      .filter(c => c !== "");

    const game = {
      title: document.getElementById("gameTitle").value.trim(),
      categories: categories, // ✅ now supports multiple categories
      icon: event.target.result,
      added: new Date().toISOString(),
      state: "Free"
    };

    let games = JSON.parse(localStorage.getItem("games")) || [];
    games.push(game);
    localStorage.setItem("games", JSON.stringify(games));

    form.reset();
    loadGames();
  };

  reader.readAsDataURL(file);
});

// Edit game
function editGame(index) {
  let games = JSON.parse(localStorage.getItem("games")) || [];
  const game = games[index];

  const newTitle = prompt("Edit Title:", game.title);
  const newCategoryInput = prompt("Edit Categories (comma separated):", (game.categories || []).join(", "));
  const newIcon = prompt("Edit Icon URL (leave blank to keep current):", "");

  if (newTitle && newCategoryInput) {
    games[index] = {
      ...game,
      title: newTitle.trim(),
      categories: newCategoryInput.split(",").map(c => c.trim().toLowerCase()).filter(c => c !== ""),
      icon: newIcon.trim() !== "" ? newIcon : game.icon
    };
    localStorage.setItem("games", JSON.stringify(games));
    loadGames();
  }
}

// Delete game
function deleteGame(index) {
  if (confirm("Are you sure you want to delete this game?")) {
    let games = JSON.parse(localStorage.getItem("games")) || [];
    games.splice(index, 1);
    localStorage.setItem("games", JSON.stringify(games));
    loadGames();
  }
}

loadGames();