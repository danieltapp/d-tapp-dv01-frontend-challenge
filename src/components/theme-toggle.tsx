import React from "react";
import { useThemeStore } from "@/store/themeStore";

const ThemeToggle: React.FC = () => {
  const { darkMode, toggleDarkMode } = useThemeStore();

  return (
    <button
      onClick={toggleDarkMode}
      className={`p-2 rounded ${darkMode ? "bg-gray-800" : "bg-gray-200"}`}
    >
      {darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
    </button>
  );
};

export default ThemeToggle;
