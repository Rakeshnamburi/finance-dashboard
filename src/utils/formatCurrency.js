/**
 * Format a number as Indian Rupee currency
 * @param {number} amount
 * @param {boolean} showSign - whether to show +/- prefix
 * @returns {string}
 */
export function formatCurrency(amount, showSign = false) {
  const formatted = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(Math.abs(amount));

  if (showSign) {
    return amount >= 0 ? `+${formatted}` : `-${formatted}`;
  }
  return formatted;
}

/**
 * Format a number with commas (Indian numbering)
 */
export function formatNumber(num) {
  return new Intl.NumberFormat('en-IN').format(num);
}
