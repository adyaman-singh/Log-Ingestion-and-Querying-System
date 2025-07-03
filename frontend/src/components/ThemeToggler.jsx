import { useEffect } from "react";

/**
 * ThemeToggle Component
 * - Allows toggle between "cyberpunk" and "rust" themes , default is cyberpunk
 * - Theme is persisted in localStorage
 */

export default function ThemeToggle() {
  const toggleTheme = () => {
    const newTheme =
      document.documentElement.getAttribute("data-theme") === "cyberpunk"
        ? "rust"
        : "cyberpunk";
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "cyberpunk";
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  return (
    <button
      onClick={toggleTheme}
      className="theme-toggle"
      aria-label="Switch theme"
    >
      <span className="theme-icon">🎮</span>
      <span className="theme-text">Switch Theme</span>
    </button>
  );
}
