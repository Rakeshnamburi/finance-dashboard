const MONTH_NAMES = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];

const FULL_MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

/**
 * Format date string to "Apr 5, 2026"
 */
export function formatDate(dateStr) {
  const d = new Date(dateStr);
  return `${MONTH_NAMES[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
}

/**
 * Format date to "05 Apr"
 */
export function formatDateShort(dateStr) {
  const d = new Date(dateStr);
  return `${String(d.getDate()).padStart(2, '0')} ${MONTH_NAMES[d.getMonth()]}`;
}

/**
 * Get relative date label: "Today", "Yesterday", or formatted date
 */
export function getRelativeDate(dateStr) {
  const d = new Date(dateStr);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  d.setHours(0, 0, 0, 0);

  const diff = (today - d) / (1000 * 60 * 60 * 24);

  if (diff === 0) return 'Today';
  if (diff === 1) return 'Yesterday';
  if (diff < 7) return `${Math.floor(diff)} days ago`;
  return formatDate(dateStr);
}

/**
 * Get the full month name
 */
export function getMonthName(monthIndex) {
  return FULL_MONTH_NAMES[monthIndex];
}
