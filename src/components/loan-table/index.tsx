import React from "react";
import AggregatedTable from "./aggregated-table";
import Filters from "./filters";
import { useLoanStore } from "@/store/loan-store";

/**
 * LoanTable component renders the aggregated loan data and filters.
 * It uses the `useLoanStore` hook to retrieve the aggregated data.
 *
 * @component
 * @example
 * return (
 *   <LoanTable />
 * )
 */
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
