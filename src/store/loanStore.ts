import { create } from "zustand";
import { persist } from "zustand/middleware";
import { getLoanData } from "@/request/api";
import type { LoanData } from "@/request/api";

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
  setAggregateData: (data: Record<string, number>) => void; // Add this line
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

        // Extract unique options
        const homeOwnershipOptions = [
          "all",
          ...new Set(csvData.map((item) => item.homeOwnership)),
        ];
        const quarterOptions = [
          "all",
          ...new Set(csvData.map((item) => item.quarter)),
        ];
        const termOptions = [
          "all",
          ...new Set(csvData.map((item) => item.term)),
        ];
        const yearOptions = [
          "all",
          ...new Set(csvData.map((item) => item.year)),
        ];

        set({
          homeOwnershipOptions,
          quarterOptions,
          termOptions,
          yearOptions,
        });
      },
      setFilter: (key, value) => {
        set((state) => ({
          filters: { ...state.filters, [key]: value },
        }));
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
      },
      setAggregateData: (data) => {
        set({ aggregateData: data });
      },
    }),
    {
      name: "loan-storage",
    }
  )
);
