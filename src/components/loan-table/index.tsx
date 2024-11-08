import React, { useEffect } from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useLoanStore } from "@/store/loanStore";
import NumberFlow from "@number-flow/react";

const LoanTable: React.FC = () => {
  const {
    filters,
    homeOwnershipOptions,
    quarterOptions,
    termOptions,
    yearOptions,
    aggregateData,
    fetchData,
    setFilter,
    resetFilters,
  } = useLoanStore();

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="p-6 space-y-6">
      {/* Aggregated Table */}
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

      {/* Filters */}
      <div className="flex items-center space-x-4 justify-center">
        <Select
          value={filters.homeOwnership}
          onValueChange={(value) => setFilter("homeOwnership", value)}
        >
          <SelectTrigger className="w-32">
            <SelectValue placeholder="Home Ownership" />
          </SelectTrigger>
          <SelectContent>
            {homeOwnershipOptions.map((option) => (
              <SelectItem key={option} value={option}>
                {option === "all" ? "All" : option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={filters.quarter}
          onValueChange={(value) => setFilter("quarter", value)}
        >
          <SelectTrigger className="w-24">
            <SelectValue placeholder="Quarter" />
          </SelectTrigger>
          <SelectContent>
            {quarterOptions.map((option) => (
              <SelectItem key={option} value={option}>
                {option === "all" ? "All" : `Q${option}`}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={filters.term}
          onValueChange={(value) => setFilter("term", value)}
        >
          <SelectTrigger className="w-24">
            <SelectValue placeholder="Term" />
          </SelectTrigger>
          <SelectContent>
            {termOptions.map((option) => (
              <SelectItem key={option} value={option}>
                {option === "all" ? "All" : option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={filters.year}
          onValueChange={(value) => setFilter("year", value)}
        >
          <SelectTrigger className="w-24">
            <SelectValue placeholder="Year" />
          </SelectTrigger>
          <SelectContent>
            {yearOptions.map((option) => (
              <SelectItem key={option} value={option}>
                {option === "all" ? "All" : option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button variant="outline" className="h-10 px-4" onClick={resetFilters}>
          Reset
        </Button>
      </div>
    </div>
  );
};

export default LoanTable;
