import { LoanData } from "@/request/api";

export const defaultFilters = {
  homeOwnership: "all",
  quarter: "all",
  term: "all",
  year: "all",
} as const;

/**
 * Represents the entire state of loan-related data and operations.
 *
 * @interface LoanState
 * @property {LoanData[]} loanData - The array of loan data objects.
 * @property {typeof defaultFilters} filters - The filters applied to the loan data.
 * @property {Object} options - Available options for filters like home ownership, quarter, term, and year.
 * @property {string[]} options.homeOwnershipOptions - Options for filtering by home ownership status.
 * @property {string[]} options.quarterOptions - Options for filtering by quarter.
 * @property {string[]} options.termOptions - Options for filtering by loan term.
 * @property {string[]} options.yearOptions - Options for filtering by year.
 * @property {Record<string, number>} aggregateData - Aggregated data (e.g., totals by grade).
 * @property {string} [error] - Optional field for storing error messages.
 * @property {() => Promise<void>} fetchData - Function to fetch loan data asynchronously.
 * @property {(key: keyof LoanState["filters"], value: string) => void} setFilter - Function to set individual filters.
 * @property {() => void} resetFilters - Function to reset all filters to their default values.
 * @property {(data: Record<string, number>) => void} setAggregateData - Function to set the aggregated data.
 * @property {() => void} applyFilters - Function to apply the filters to the loan data and update aggregate data.
 */
export interface LoanState {
  loanData: LoanData[];
  filters: typeof defaultFilters;
  options: {
    homeOwnershipOptions: string[];
    quarterOptions: string[];
    termOptions: string[];
    yearOptions: string[];
  };
  aggregateData: Record<string, number>;
  error?: string;
  fetchData: () => Promise<void>;
  setFilter: (key: keyof LoanState["filters"], value: string) => void;
  resetFilters: () => void;
  setAggregateData: (data: Record<string, number>) => void;
  applyFilters: () => void;
  setDefaultOptions: () => void;
}
