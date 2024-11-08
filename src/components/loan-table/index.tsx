import React from "react";
import ThemeToggleComponent from "@/components/theme-toggle";
import AggregatedTable from "./aggregated-table";
import Filters from "./filters";
import { useLoanStore } from "@/store/loanStore";

const LoanTable: React.FC = () => {
  const { aggregateData } = useLoanStore();

  // useEffect(() => {
  //   fetchData();
  // }, [fetchData]);

  return (
    <div className="p-6 space-y-6">
      <ThemeToggleComponent />
      <AggregatedTable aggregateData={aggregateData} />
      <Filters />
    </div>
  );
};

export default LoanTable;
