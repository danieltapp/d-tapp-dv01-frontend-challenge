import React from "react";
import LoanChart from "./loan-chart";
import AggregatedTable from "./aggregated-table";
import Filters from "./filters";
import ErrorMessage from "./error-message"; // Import the ErrorMessage component
import { useLoanStore } from "@/store/loan-store";

/**
 * LoanDataViewer component is responsible for displaying loan data.
 * It fetches aggregate data from the loan store and conditionally renders
 * either the loan chart and aggregated table or an error message if no data is available.
 *
 * @component
 * @returns {JSX.Element} The rendered component.
 */
const LoanDataViewer: React.FC = () => {
  const { aggregateData } = useLoanStore();
  const hasAggregateData = Object.keys(aggregateData).length > 0;

  return (
    <div className="w-full max-w-screen-xl mx-auto p-8 space-y-8">
      <div className="space-y-6 sm:space-y-8">
        {hasAggregateData ? (
          <>
            <LoanChart />
            <AggregatedTable aggregateData={aggregateData} />
          </>
        ) : (
          <ErrorMessage errorType="no-data" />
        )}
        <Filters />
      </div>
    </div>
  );
};

export default LoanDataViewer;
