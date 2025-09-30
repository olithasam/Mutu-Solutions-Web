const themeToggle = document.getElementById("theme-toggle");
const body = document.body;

function applyTheme(theme) {
  body.classList.remove("light-mode", "dark-mode");
  body.classList.add(theme === "light" ? "light-mode" : "dark-mode");
}

// Load saved theme
const savedTheme = localStorage.getItem("theme") || "dark";
applyTheme(savedTheme);

// Toggle button
themeToggle.addEventListener("click", () => {
  const currentTheme = body.classList.contains("light-mode") ? "light" : "dark";
  const newTheme = currentTheme === "light" ? "dark" : "light";
  applyTheme(newTheme);
  localStorage.setItem("theme", newTheme);
});
