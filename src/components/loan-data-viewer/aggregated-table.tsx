import React from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import NumberFlow from "@number-flow/react";

interface AggregatedTableProps {
  aggregateData: Record<string, number>;
}

/**
 * AggregatedTable component displays a table with aggregated data.
 *
 * @component
 * @example
 * const aggregateData = { A: 1000, B: 2000, C: 3000 };
 * return <AggregatedTable aggregateData={aggregateData} />;
 *
 * @param {Object} props - Component props
 * @param {Record<string, number>} props.aggregateData - An object containing the aggregated data where keys are grades and values are total balances.
 *
 * @returns {JSX.Element} A table displaying the total balances by grade.
 */
const AggregatedTable: React.FC<AggregatedTableProps> = ({ aggregateData }) => {
  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden">
      <Table className="w-full" aria-labelledby="aggregated-table">
        <caption id="aggregated-table" className="sr-only">
          Aggregated table showing total balances by grade
        </caption>
        <TableHeader>
          <TableRow className="text-center">
            {Object.keys(aggregateData).map((grade, index) => (
              <TableHead
                key={index}
                className="text-center border-r last:border-r-0"
                scope="col"
                aria-label={`Grade ${grade}`}
              >
                Grade {grade}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow className="text-center">
            {Object.values(aggregateData).map((totalBalance, index) => (
              <TableCell
                key={index}
                className="border-r last:border-r-0"
                scope="row"
                aria-label={`Total balance for Grade ${
                  Object.keys(aggregateData)[index]
                }`}
              >
                <NumberFlow
                  value={totalBalance}
                  format={{
                    notation: "compact",
                    currency: "USD",
                    maximumFractionDigits: 2,
                  }}
                  locales="en-US"
                />
              </TableCell>
            ))}
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default AggregatedTable;
