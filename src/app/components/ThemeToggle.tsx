"use client";
import { useEffect } from "react";
import { useTheme } from "./ThemeContext";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    // Cập nhật class của body dựa theo theme
    document.body.className = theme === "dark" ? "dark-mode" : "";
  }, [theme]);

  return (
    <button onClick={toggleTheme}>
      {theme === "light" ? "Dark Mode" : "Light Mode"}
    </button>
  );
};

export default ThemeToggle;
