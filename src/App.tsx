import React from "react";
import { useThemeStore } from "@/store/theme-provider";
import ModeToggle from "@/components/loan-data-viewer/mode-toggle";
import LoanDataViewer from "@/components/loan-data-viewer";

const App: React.FC = () => {
  const { theme } = useThemeStore();

  return (
    <div className={theme}>
      <ModeToggle />
      <LoanDataViewer />
    </div>
  );
};

export default App;
