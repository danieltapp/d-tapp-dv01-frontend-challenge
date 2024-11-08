import React from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useLoanStore } from "@/store/loanStore";

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
  );
};

export default FiltersComponent;
