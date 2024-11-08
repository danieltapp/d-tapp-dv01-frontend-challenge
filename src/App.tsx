import React from "react";
import { useThemeStore } from "@/store/themeStore";
import LoanTable from "@/components/loan-table";

const App: React.FC = () => {
  const { darkMode } = useThemeStore();

  return (
    <div className={darkMode ? "dark" : ""}>
      <LoanTable />
    </div>
  );
};

export default App;
