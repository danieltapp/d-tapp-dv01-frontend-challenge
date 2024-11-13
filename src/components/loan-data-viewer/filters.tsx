import React from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectGroup,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useLoanStore } from "@/store/loan-store";
import { SelectLabel } from "@radix-ui/react-select";

/**
 * FiltersComponent is a React functional component that provides a set of filter options
 * for loan data. It includes dropdowns for selecting home ownership, quarter, term, and year,
 * as well as a button to reset all filters.
 *
 * The component utilizes the `useLoanStore` hook to access filter options and state management functions.
 *
 * @component
 * @example
 * return (
 *   <FiltersComponent />
 * )
 *
 * @returns {JSX.Element} The rendered component with filter options and reset button.
 */
const FiltersComponent: React.FC = () => {
  const {
    filters,
    options: { homeOwnershipOptions, quarterOptions, termOptions, yearOptions },
    setFilter,
    resetFilters,
  } = useLoanStore();

  return (
    <div data-testid="filters" className="flex flex-wrap gap-6 justify-center">
      <div className="flex flex-col w-full sm:w-auto">
        <SelectGroup>
          <SelectLabel>Home Ownership</SelectLabel>
          <Select
            value={filters.homeOwnership}
            onValueChange={(value) => setFilter("homeOwnership", value)}
            aria-label="Select home ownership"
          >
            <SelectTrigger
              className="w-full sm:w-32"
              aria-label="Home ownership selection"
            >
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
        </SelectGroup>
      </div>

      <div className="flex flex-col w-full sm:w-auto">
        <SelectGroup>
          <SelectLabel>Quarter</SelectLabel>
          <Select
            value={filters.quarter}
            onValueChange={(value) => setFilter("quarter", value)}
            aria-label="Select quarter"
          >
            <SelectTrigger
              className="w-full sm:w-32"
              aria-label="Quarter selection"
            >
              <SelectValue placeholder="Quarter" />
            </SelectTrigger>
            <SelectContent>
              {quarterOptions.map((option) => (
                <SelectItem
                  key={option}
                  value={option}
                  aria-label={`Quarter: ${
                    option === "all" ? "All" : `Q${option}`
                  }`}
                >
                  {option === "all" ? "All" : `Q${option}`}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </SelectGroup>
      </div>

      <div className="flex flex-col w-full sm:w-auto">
        <SelectGroup>
          <SelectLabel>Term</SelectLabel>
          <Select
            value={filters.term}
            onValueChange={(value) => setFilter("term", value)}
            aria-label="Select term"
          >
            <SelectTrigger
              className="w-full sm:w-32"
              aria-label="Term selection"
            >
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
        </SelectGroup>
      </div>

      <div className="flex flex-col w-full sm:w-auto">
        <SelectGroup>
          <SelectLabel>Year</SelectLabel>
          <Select
            value={filters.year}
            onValueChange={(value) => setFilter("year", value)}
            aria-label="Select year"
          >
            <SelectTrigger
              className="w-full sm:w-32"
              aria-label="Year selection"
            >
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
        </SelectGroup>
      </div>

      <div className="flex justify-center w-full sm:w-auto mt-6">
        <Button
          data-testid="reset-filters"
          variant="destructive"
          className="h-10 px-4 sm:w-32 w-full"
          onClick={resetFilters}
          aria-label="Reset all filters"
        >
          Reset
        </Button>
      </div>
    </div>
  );
};

export default FiltersComponent;
