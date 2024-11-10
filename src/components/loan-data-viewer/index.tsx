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
    <div className="w-full max-w-screen-xl mx-auto space-y-6 px-4 py-6">
      <div className="space-y-6 sm:space-y-8">
        {hasAggregateData ? (
          <>
            <LoanChart />
            <div className="flex flex-col sm:flex-row sm:space-x-6 space-y-6 sm:space-y-0">
              <div className="overflow-x-auto w-full">
                <AggregatedTable aggregateData={aggregateData} />
              </div>
            </div>
          </>
        ) : (
          <div className="w-full">
            <ErrorMessage errorType="no-data" />
          </div>
        )}
        <Filters />
      </div>
    </div>
  );
};

export default LoanDataViewer;
