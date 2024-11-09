import React from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useLoanStore } from "@/store/loan-store";

const FiltersComponent: React.FC = () => {
  const {
    filters,
    homeOwnershipOptions,
    quarterOptions,
    termOptions,
    yearOptions,
    setFilter,
    resetFilters,
  } = useLoanStore();

  return (
    <div className="flex items-center space-x-4 justify-center">
      <Select
        value={filters.homeOwnership}
        onValueChange={(value) => setFilter("homeOwnership", value)}
        aria-label="Select home ownership"
      >
        <SelectTrigger className="w-32" aria-label="Home ownership selection">
          <SelectValue placeholder="Home Ownership" />
        </SelectTrigger>
        <SelectContent>
          {homeOwnershipOptions.map((option) => (
            <SelectItem
              key={option}
              value={option}
              aria-label={`Home ownership: ${option}`}
            >
              {option === "all" ? "All" : option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={filters.quarter}
        onValueChange={(value) => setFilter("quarter", value)}
        aria-label="Select quarter"
      >
        <SelectTrigger className="w-24" aria-label="Quarter selection">
          <SelectValue placeholder="Quarter" />
        </SelectTrigger>
        <SelectContent>
          {quarterOptions.map((option) => (
            <SelectItem
              key={option}
              value={option}
              aria-label={`Quarter: ${option === "all" ? "All" : `Q${option}`}`}
            >
              {option === "all" ? "All" : `Q${option}`}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={filters.term}
        onValueChange={(value) => setFilter("term", value)}
        aria-label="Select term"
      >
        <SelectTrigger className="w-24" aria-label="Term selection">
          <SelectValue placeholder="Term" />
        </SelectTrigger>
        <SelectContent>
          {termOptions.map((option) => (
            <SelectItem
              key={option}
              value={option}
              aria-label={`Term: ${option === "all" ? "All" : option}`}
            >
              {option === "all" ? "All" : option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={filters.year}
        onValueChange={(value) => setFilter("year", value)}
        aria-label="Select year"
      >
        <SelectTrigger className="w-24" aria-label="Year selection">
          <SelectValue placeholder="Year" />
        </SelectTrigger>
        <SelectContent>
          {yearOptions.map((option) => (
            <SelectItem
              key={option}
              value={option}
              aria-label={`Year: ${option === "all" ? "All" : option}`}
            >
              {option === "all" ? "All" : option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Button
        variant="outline"
        className="h-10 px-4"
        onClick={resetFilters}
        aria-label="Reset all filters"
      >
        Reset
      </Button>
    </div>
  );
};

export default FiltersComponent;
