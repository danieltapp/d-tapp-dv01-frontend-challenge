import React from "react";
import AggregatedTable from "./aggregated-table";
import Filters from "./filters";
import { useLoanStore } from "@/store/loan-store";

const LoanTable: React.FC = () => {
  const { aggregateData } = useLoanStore();

  return (
    <div className="space-y-6 w-full max-w-full">
      <AggregatedTable aggregateData={aggregateData} />
      <Filters />
    </div>
  );
};

export default LoanTable;
