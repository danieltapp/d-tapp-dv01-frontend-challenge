import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";
import { getLoanData } from "@/request/api";
import type { LoanState } from "./types";
import { defaultFilters } from "./types";
import {
  setFilter,
  resetFilters,
  setAggregateData,
  applyFilters,
} from "./reducers";
import { createAndSortOptions } from "./helpers";

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
            get().setDefaultOptions();
            get().applyFilters();
          } catch (error) {
            set({ error: "An error occurred while fetching loan data." });
            console.error(error);
          }
        },
        setDefaultOptions: () => {
          set((state) => ({
            options: {
              ...state.options,
              homeOwnershipOptions: createAndSortOptions(
                state.loanData,
                "homeOwnership"
              ),
              quarterOptions: createAndSortOptions(state.loanData, "quarter"),
              termOptions: createAndSortOptions(state.loanData, "term"),
              yearOptions: createAndSortOptions(state.loanData, "year"),
            },
          }));
        },
        setFilter: (key, value) => {
          set((state) => setFilter(state, key, value));
          get().applyFilters();
        },
        resetFilters: () => {
          set((state) => resetFilters(state));
          get().applyFilters();
        },
        setAggregateData: (data) => {
          set((state) => setAggregateData(state, data));
        },
        applyFilters: () => {
          set((state) => applyFilters(state));
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
