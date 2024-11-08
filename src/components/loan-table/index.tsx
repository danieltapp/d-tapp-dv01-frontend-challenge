import React, { useEffect, useState } from "react";
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
import { getLoanData } from "@/request/api";
import type { LoanData } from "@/request/api";

const LoanTable: React.FC = () => {
  const [loanData, setLoanData] = useState<LoanData[]>([]);
  const [aggregatedData, setAggregatedData] = useState<Record<string, number>>(
    {}
  );

  // Unique filter options states
  const [homeOwnershipOptions, setHomeOwnershipOptions] = useState<string[]>(
    []
  );
  const [quarterOptions, setQuarterOptions] = useState<string[]>([]);
  const [termOptions, setTermOptions] = useState<string[]>([]);
  const [yearOptions, setYearOptions] = useState<string[]>([]);

  // Filter states
  const [homeOwnership, setHomeOwnership] = useState("all");
  const [quarter, setQuarter] = useState("all");
  const [term, setTerm] = useState("all");
  const [year, setYear] = useState("all");

  useEffect(() => {
    // Fetch loan data when component mounts
    getLoanData().then((data) => {
      setLoanData(data);

      // Gather unique options for each filter based on loanData
      setHomeOwnershipOptions([
        "all",
        ...new Set(data.map((item) => item.homeOwnership)),
      ]);
      setQuarterOptions(["all", ...new Set(data.map((item) => item.quarter))]);
      setTermOptions(["all", ...new Set(data.map((item) => item.term))]);
      setYearOptions(["all", ...new Set(data.map((item) => item.year))]);
    });
  }, []);

  useEffect(() => {
    // Filter and aggregate data whenever loanData or filters change
    const filteredData = loanData.filter((item) => {
      return (
        (homeOwnership === "all" || item.homeOwnership === homeOwnership) &&
        (quarter === "all" || item.quarter === quarter) &&
        (term === "all" || item.term === term) &&
        (year === "all" || item.year === year)
      );
    });
    aggregateDataByGrade(filteredData);
  }, [loanData, homeOwnership, quarter, term, year]);

  const aggregateDataByGrade = (data: LoanData[]) => {
    // Aggregate the currentBalance by grade
    const aggregated = data.reduce((acc, item) => {
      const grade = item.grade;
      const balance = parseFloat(item.currentBalance) || 0; // Ensure the balance is a number

      if (acc[grade]) {
        acc[grade] += balance;
      } else {
        acc[grade] = balance;
      }
      return acc;
    }, {} as Record<string, number>);

    setAggregatedData(aggregated);
  };

  const resetFilters = () => {
    setHomeOwnership("all");
    setQuarter("all");
    setTerm("all");
    setYear("all");
  };

  return (
    <div className="p-6 space-y-6">
      {/* Aggregated Table */}
      <div className="border border-gray-300 rounded-lg overflow-hidden">
        <Table className="w-full">
          <TableHeader>
            <TableRow className="text-center">
              {Object.keys(aggregatedData).map((grade, index) => (
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
              {Object.values(aggregatedData).map((totalBalance, index) => (
                <TableCell key={index} className="border-r last:border-r-0">
                  ${totalBalance.toFixed(2)}
                </TableCell>
              ))}
            </TableRow>
          </TableBody>
        </Table>
      </div>

      {/* Filters */}
      <div className="flex items-center space-x-4 justify-center">
        <Select
          value={homeOwnership}
          onValueChange={(value) => setHomeOwnership(value)}
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

        <Select value={quarter} onValueChange={(value) => setQuarter(value)}>
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

        <Select value={term} onValueChange={(value) => setTerm(value)}>
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

        <Select value={year} onValueChange={(value) => setYear(value)}>
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
