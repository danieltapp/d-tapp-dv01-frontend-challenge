import { create } from "zustand";
import { persist } from "zustand/middleware";
import { getLoanData } from "@/request/api";
import type { LoanData } from "@/request/api";

// TODOS:
// order options correct (ex: Q1, Q2, Q3, Q4)

interface LoanState {
  loanData: LoanData[];
  filters: {
    homeOwnership: string;
    quarter: string;
    term: string;
    year: string;
  };
  homeOwnershipOptions: string[];
  quarterOptions: string[];
  termOptions: string[];
  yearOptions: string[];
  aggregateData: Record<string, number>;
  fetchData: () => Promise<void>;
  setFilter: (key: keyof LoanState["filters"], value: string) => void;
  resetFilters: () => void;
  setAggregateData: (data: Record<string, number>) => void;
  applyFilters: () => void;
}

export const useLoanStore = create<LoanState>()(
  persist(
    (set, get) => ({
      loanData: [],
      filters: {
        homeOwnership: "all",
        quarter: "all",
        term: "all",
        year: "all",
      },
      homeOwnershipOptions: [],
      quarterOptions: [],
      termOptions: [],
      yearOptions: [],
      aggregateData: {},
      fetchData: async () => {
        const csvData = await getLoanData();
        set({ loanData: csvData });

        const createOptions = (key: keyof LoanData) => [
          "all",
          ...new Set(csvData.map((item) => item[key])),
        ];

        set({
          homeOwnershipOptions: createOptions("homeOwnership"),
          quarterOptions: createOptions("quarter"),
          termOptions: createOptions("term"),
          yearOptions: createOptions("year"),
        });
      },
      setFilter: (key, value) => {
        set((state) => ({
          filters: { ...state.filters, [key]: value },
        }));
        get().applyFilters();
      },
      resetFilters: () => {
        set({
          filters: {
            homeOwnership: "all",
            quarter: "all",
            term: "all",
            year: "all",
          },
        });
        get().applyFilters();
      },
      setAggregateData: (data) => {
        set({ aggregateData: data });
      },
      applyFilters: () => {
        const { loanData, filters, setAggregateData } = get();
        const filteredData = loanData.filter((item) => {
          return (
            (filters.homeOwnership === "all" ||
              item.homeOwnership === filters.homeOwnership) &&
            (filters.quarter === "all" || item.quarter === filters.quarter) &&
            (filters.term === "all" || item.term === filters.term) &&
            (filters.year === "all" || item.year === filters.year)
          );
        });

        // Aggregate by grade
        const aggregated = filteredData.reduce((acc, item) => {
          const grade = item.grade;
          const balance = parseFloat(item.currentBalance) || 0;

          if (acc[grade]) {
            acc[grade] += balance;
          } else {
            acc[grade] = balance;
          }
          return acc;
        }, {} as Record<string, number>);

        setAggregateData(aggregated);
      },
    }),
    {
      name: "loan-storage",
      onRehydrateStorage: (state) => {
        if (Object.keys(state.aggregateData).length === 0) {
          state.fetchData(); // This can remain for the case where the state is loaded
        }
      },
    }
  )
);
