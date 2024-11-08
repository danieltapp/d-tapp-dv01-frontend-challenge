import React from "react";
import AggregatedTable from "./aggregated-table";
import Filters from "./filters";
import { useLoanStore } from "@/store/loan-store";

const LoanTable: React.FC = () => {
  const { aggregateData } = useLoanStore();

  return (
    <div className="p-6 space-y-6">
      <AggregatedTable aggregateData={aggregateData} />
      <Filters />
    </div>
  );
};

export default LoanTable;
