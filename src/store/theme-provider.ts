import { create } from "zustand";

export type Theme = "dark" | "light" | "system";

interface ThemeState {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

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
