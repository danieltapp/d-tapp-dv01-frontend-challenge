import React, { Profiler, useEffect } from "react";
import { useThemeStore } from "@/store/theme-provider";
import type { Theme } from "@/store/theme-provider";
import LoanTable from "@/components/loan-table";
import { ModeToggle } from "./components/mode-toggle";

const App: React.FC = () => {
  const { theme, setTheme } = useThemeStore();

  useEffect(() => {
    // Initialize theme on mount
    const storedTheme =
      (localStorage.getItem("vite-ui-theme") as Theme) || "system";
    setTheme(storedTheme);
  }, [setTheme]);

  return (
    <Profiler id="App" onRender={() => {}}>
      <div className={theme === "dark" ? "dark" : ""}>
        <ModeToggle />
        <LoanTable />
      </div>
    </Profiler>
  );
};

export default App;
