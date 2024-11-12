import type { LoanState } from "./types";
import { defaultFilters } from "./types";
import { aggregateDataByGrade } from "./helpers";
import type { LoanData } from "@/request/api";

export const setLoanData = (
  state: LoanState,
  loanData: LoanData[]
): LoanState => ({
  ...state,
  loanData: loanData,
});

export const setFilter = (
  state: LoanState,
  key: keyof LoanState["filters"],
  value: string
) => ({
  ...state,
  filters: { ...state.filters, [key]: value },
});

export const resetFilters = (state: LoanState) => ({
  ...state,
  filters: { ...defaultFilters },
});

export const setAggregateData = (
  state: LoanState,
  data: Record<string, number>
) => ({
  ...state,
  aggregateData: data,
});

export const applyFilters = (state: LoanState) => {
  const { loanData, filters } = state;
  const filteredData = loanData.filter((item) => {
    return Object.entries(filters).every(
      ([key, value]) => value === "all" || item[key as keyof LoanData] === value
    );
  });

  const aggregated = aggregateDataByGrade(filteredData);
  return { ...state, aggregateData: aggregated };
};

export const setOptions = (
  state: LoanState,
  options: LoanState["options"]
): LoanState => ({
  ...state,
  options: {
    ...state.options,
    ...options,
  },
});

export const setError = (state: LoanState, error: string) => ({
  ...state,
  error,
});
