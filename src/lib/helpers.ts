/**
 * Formats a given amount as a compact currency string in USD.
 *
 * @param {number} amount - The amount to format.
 * @returns {string} The formatted currency string.
 */
export const formatAmountForDisplay = (amount: number) => {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    notation: "compact",
    maximumFractionDigits: 2,
  });

  return formatter.format(amount);
};
