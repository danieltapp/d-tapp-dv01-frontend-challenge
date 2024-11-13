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
 * Aggregates the loan data by grade and calculates the total balance for each grade.
 * Rounds all balances to two decimal places during accumulation.
 *
 * @param {LoanData[]} filteredData - The array of filtered loan data objects.
 * @returns {Record<string, number>} - An object where the keys are grades and the values are the total balances for each grade.
 */
export const aggregateDataByGrade = (filteredData: LoanData[]) => {
  return filteredData.reduce((acc, item) => {
    const grade = item.grade;
    const balance = parseFloat(item.currentBalance);

    if (isNaN(balance)) return acc;
    acc[grade] = Math.round(((acc[grade] || 0) + balance) * 100) / 100;
    return acc;
  }, {} as Record<string, number>);
};
