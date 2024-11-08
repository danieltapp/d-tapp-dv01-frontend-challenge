import Papa from "papaparse";

export interface LoanData {
  currentBalance: string;
  grade: string;
  loanId: string;
  homeOwnership: string;
  quarter: string;
  term: string;
  year: string;
}

/**
 * Parses CSV data and maps it to LoanData objects.
 */
const parseData = (
  result: Papa.ParseResult<Record<string, string>>
): LoanData[] => {
  return result.data.map((row) => ({
    year: row["v_year"] ?? "",
    quarter: row["v_quarter"] ?? "",
    grade: row["grade_2"] ?? "",
    homeOwnership: row["home_ownership"] ?? "",
    term: row["term"] ?? "",
    currentBalance: row["V1"] ?? "",
    loanId: "", // Default value if loanId column isn’t present
  }));
};

/**
 * Fetches loan data from the CSV file at runtime and parses it.
 */
export const getLoanData = async (): Promise<LoanData[]> => {
  try {
    const response = await fetch("/loansize.csv");
    if (!response.ok) {
      throw new Error("Failed to fetch the CSV file");
    }
    const csvData = await response.text();

    return new Promise((resolve, reject) => {
      Papa.parse<Record<string, string>>(csvData, {
        header: true,
        delimiter: ",",
        skipEmptyLines: true,
        transformHeader: (header: string): string => header.trim(), // Trims whitespace in headers
        complete: (result: Papa.ParseResult<Record<string, string>>): void => {
          const validRows: Record<string, string>[] = result.data.filter(
            (row: Record<string, string>): boolean =>
              row["v_year"] !== "" &&
              row["v_quarter"] !== "" &&
              row["grade_2"] !== "" &&
              row["home_ownership"] !== "" &&
              row["term"] !== "" &&
              row["V1"] !== ""
          );
          resolve(parseData({ data: validRows, errors: [], meta: {} }));
        },
        error: (error: Error): void => {
          console.error("Parsing error:", error);
          reject(error);
        },
      });
    });
  } catch (error) {
    console.error("Error fetching or parsing CSV data:", error);
    throw error;
  }
};
