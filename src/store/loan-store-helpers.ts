import type { LoanData } from "@/request/api";

/**
 * Creates and sorts options based on the provided CSV data and key.
 *
 * @param {LoanData[]} csvData - The array of loan data objects.
 * @param {keyof LoanData} key - The key to extract and sort options by.
 * @returns {string[]} - The sorted array of options, including "all" as the first element.
 *
 * The function handles sorting differently based on the key:
 * - If the key is "quarter", it sorts the options numerically based on the quarter number.
 * - If the key is "year", it sorts the options numerically in descending order.
 * - For other keys, it returns the options without additional sorting.
 */
export const createAndSortOptions = (
  csvData: LoanData[],
  key: keyof LoanData
) => {
  const options = ["all", ...new Set(csvData.map((item) => item[key]))];

  if (key === "quarter" || key === "year") {
    return options.sort((a, b) => {
      if (a === "all") return -1;
      if (b === "all") return 1;
      if (key === "quarter") {
        const numA = parseInt(a.replace(/\D/g, ""), 10);
        const numB = parseInt(b.replace(/\D/g, ""), 10);
        return numA - numB;
      } else {
        return parseInt(b, 10) - parseInt(a, 10);
      }
    });
  }

  return options;
};

/**
 * Aggregates loan data by grade based on the provided filters.
 *
 * @param {LoanData[]} loanData - The array of loan data objects to be aggregated.
 * @param {Record<string, string>} filters - The filters to apply to the loan data.
 * @param {string} filters.homeOwnership - The home ownership filter value. Use "all" to include all home ownership types.
 * @param {string} filters.quarter - The quarter filter value. Use "all" to include all quarters.
 * @param {string} filters.term - The term filter value. Use "all" to include all terms.
 * @param {string} filters.year - The year filter value. Use "all" to include all years.
 * @returns {Record<string, number>} - An object where the keys are loan grades and the values are the aggregated balances for those grades.
 */
export const aggregateDataByGrade = (
  loanData: LoanData[],
  filters: Record<string, string>
) => {
  const filteredData = loanData.filter((item) => {
    return (
      (filters.homeOwnership === "all" ||
        item.homeOwnership === filters.homeOwnership) &&
      (filters.quarter === "all" || item.quarter === filters.quarter) &&
      (filters.term === "all" || item.term === filters.term) &&
      (filters.year === "all" || item.year === filters.year)
    );
  });

  return filteredData && filteredData.length > 0
    ? filteredData.reduce((acc, item) => {
        const grade = item.grade;
        const balance = parseFloat(item.currentBalance) || 0;

        if (acc[grade]) {
          acc[grade] += balance;
        } else {
          acc[grade] = balance;
        }
        return acc;
      }, {} as Record<string, number>)
    : loanData.reduce((acc, item) => {
        const grade = item.grade;
        if (!acc[grade]) {
          acc[grade] = 0;
        }
        return acc;
      }, {} as Record<string, number>);
};
