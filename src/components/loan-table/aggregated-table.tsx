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

const AggregatedTable: React.FC<AggregatedTableProps> = ({ aggregateData }) => {
  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden">
      <Table className="w-full">
        <TableHeader>
          <TableRow className="text-center">
            {Object.keys(aggregateData).map((grade, index) => (
              <TableHead
                key={index}
                className="text-center border-r last:border-r-0"
              >
                Grade {grade}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow className="text-center">
            {Object.values(aggregateData).map((totalBalance, index) => (
              <TableCell key={index} className="border-r last:border-r-0">
                <NumberFlow
                  value={totalBalance}
                  format={{ notation: "compact" }}
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
