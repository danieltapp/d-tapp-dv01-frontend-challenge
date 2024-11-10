import { create } from "zustand";

export type Theme = "dark" | "light" | "system";

interface ThemeState {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

/**
 * Custom hook to manage and persist the theme state. The theme state is persisted in localStorage so that the theme is maintained on page refresh.
 *
 * This hook uses the Zustand library to create a store for managing the theme state.
 * It initializes the theme state from localStorage and provides a method to update the theme.
 * The theme is applied to the root HTML element by adding the appropriate class.
 *
 * @returns {ThemeState} The current theme state and a method to update the theme.
 */
export const useThemeStore = create<ThemeState>((set) => {
  const storedTheme =
    (localStorage.getItem("vite-ui-theme") as Theme) || "system";

  const root = window.document.documentElement;

  const setRootTheme = (theme: Theme) => {
    root.classList.remove("light", "dark");
    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";
      root.classList.add(systemTheme);
    } else {
      root.classList.add(theme);
    }
  };

  setRootTheme(storedTheme);

  return {
    theme: storedTheme,
    setTheme: (theme: Theme) => {
      localStorage.setItem("vite-ui-theme", theme);
      set({ theme });
      setRootTheme(theme);
    },
  };
});
