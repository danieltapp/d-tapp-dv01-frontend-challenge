import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";
import { getLoanData } from "@/request/api";
import type { LoanData } from "@/request/api";
import {
  createAndSortOptions,
  aggregateDataByGrade,
} from "./loan-store-helpers";

const defaultFilters = {
  homeOwnership: "all",
  quarter: "all",
  term: "all",
  year: "all",
};

interface LoanState {
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
}

/**
 * Zustand store for managing loan data and filters.
 *
 * @remarks
 * This store uses Zustand to manage the state of loan data,
 * filters, options, and aggregated data. It provides methods to fetch loan data, set filters, reset filters,
 * set aggregated data, and apply filters. The `persist` and `devtools` middleware ensures options are persisted in localStorage and provides a Redux DevTools extension for debugging.
 *
 * @example
 * ```typescript
 * import { useLoanStore } from './loan-store';
 *
 * const loanStore = useLoanStore();
 * loanStore.fetchData();
 * loanStore.setFilter('homeOwnership', 'OWN');
 * loanStore.resetFilters();
 * ```
 *
 * @returns Zustand store hook for loan data management.
 */
export const useLoanStore = create<LoanState>()(
  devtools(
    persist(
      (set, get) => ({
        loanData: [],
        filters: { ...defaultFilters },
        options: {
          homeOwnershipOptions: [],
          quarterOptions: [],
          termOptions: [],
          yearOptions: [],
        },
        aggregateData: {},
        error: undefined,
        fetchData: async () => {
          try {
            const csvData = await getLoanData();
            set({ loanData: csvData });

            // Generate options for the filters
            set((state) => ({
              options: {
                ...state.options,
                homeOwnershipOptions: createAndSortOptions(
                  csvData,
                  "homeOwnership"
                ),
                quarterOptions: createAndSortOptions(csvData, "quarter"),
                termOptions: createAndSortOptions(csvData, "term"),
                yearOptions: createAndSortOptions(csvData, "year"),
              },
            }));

            // Apply filters and calculate aggregate data after fetching loan data
            get().applyFilters();
          } catch (error) {
            set({ error: "An error occurred." });
            console.error(error);
          }
        },
        setFilter: (key, value) => {
          set((state) => ({
            filters: { ...state.filters, [key]: value },
          }));
          get().applyFilters();
        },
        resetFilters: () => {
          set({ filters: { ...defaultFilters } });
          get().applyFilters();
        },
        setAggregateData: (data) => {
          set({ aggregateData: data });
        },
        applyFilters: () => {
          const { loanData, filters, setAggregateData } = get();
          const filteredData = loanData.filter((item) => {
            return Object.entries(filters).every(
              ([key, value]) =>
                value === "all" || item[key as keyof LoanData] === value
            );
          });

          const aggregated = aggregateDataByGrade(filteredData, filters);
          setAggregateData(aggregated);
        },
      }),
      {
        name: "loan-storage",
        onRehydrateStorage: (state) => {
          if (Object.keys(state.aggregateData).length === 0) {
            state.fetchData();
          }
        },
      }
    ),
    { name: "LoanStore" }
  )
);
