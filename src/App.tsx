import React, { Profiler } from "react";
import { useThemeStore } from "@/store/theme-provider";
import LoanTable from "@/components/loan-table";
import { ModeToggle } from "./components/mode-toggle";
import { LoanChart } from "./components/loan-chart";

const App: React.FC = () => {
  const { theme } = useThemeStore();

  return (
    <Profiler id="App" onRender={() => {}}>
      <div className={theme === "dark" ? "dark" : ""}>
        <div className="fixed top-4 right-4 z-10">
          <ModeToggle />
        </div>
        <div className="w-full max-w-screen-xl mx-auto space-y-6 px-4 py-6">
          <div className="space-y-6 sm:space-y-8">
            <LoanChart />
            <div className="flex flex-col sm:flex-row sm:space-x-6 space-y-6 sm:space-y-0">
              <div className="overflow-x-auto w-full">
                <LoanTable />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Profiler>
  );
};

export default App;
