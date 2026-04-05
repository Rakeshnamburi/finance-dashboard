import { CATEGORIES } from '../data/mockData';

/**
 * Calculate summary totals from transactions
 */
export function calculateSummary(transactions) {
  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalBalance = totalIncome - totalExpenses;
  const savingsRate = totalIncome > 0
    ? ((totalIncome - totalExpenses) / totalIncome * 100).toFixed(1)
    : 0;

  return { totalBalance, totalIncome, totalExpenses, savingsRate: Number(savingsRate) };
}

/**
 * Get category breakdown for donut chart
 */
export function getCategoryBreakdown(transactions) {
  const expenseMap = {};

  transactions
    .filter(t => t.type === 'expense')
    .forEach(t => {
      if (!expenseMap[t.category]) {
        expenseMap[t.category] = 0;
      }
      expenseMap[t.category] += t.amount;
    });

  return Object.entries(expenseMap)
    .map(([category, amount]) => ({
      name: category,
      value: amount,
      color: CATEGORIES[category]?.color || '#6B7080',
      icon: CATEGORIES[category]?.icon || '📦',
      bgColor: CATEGORIES[category]?.bgColor || 'rgba(107,112,128,0.12)',
    }))
    .sort((a, b) => b.value - a.value);
}

/**
 * Get spending trend data (daily aggregation)
 */
export function getSpendingTrend(transactions) {
  const dailyMap = {};

  transactions.forEach(t => {
    if (!dailyMap[t.date]) {
      dailyMap[t.date] = { date: t.date, income: 0, expense: 0 };
    }
    if (t.type === 'income') {
      dailyMap[t.date].income += t.amount;
    } else {
      dailyMap[t.date].expense += t.amount;
    }
  });

  return Object.values(dailyMap).sort((a, b) => a.date.localeCompare(b.date));
}

/**
 * Apply all filters to transactions
 */
export function applyFilters(transactions, filters) {
  let result = [...transactions];

  // Search filter
  if (filters.search) {
    const query = filters.search.toLowerCase();
    result = result.filter(t =>
      t.description.toLowerCase().includes(query) ||
      t.category.toLowerCase().includes(query) ||
      t.account.toLowerCase().includes(query)
    );
  }

  // Category filter
  if (filters.category && filters.category !== 'all') {
    result = result.filter(t => t.category === filters.category);
  }

  // Type filter
  if (filters.type && filters.type !== 'all') {
    result = result.filter(t => t.type === filters.type);
  }

  // Date range filter
  if (filters.dateRange?.start) {
    result = result.filter(t => t.date >= filters.dateRange.start);
  }
  if (filters.dateRange?.end) {
    result = result.filter(t => t.date <= filters.dateRange.end);
  }

  // Sort
  switch (filters.sortBy) {
    case 'date_asc':
      result.sort((a, b) => a.date.localeCompare(b.date));
      break;
    case 'amount_high':
      result.sort((a, b) => b.amount - a.amount);
      break;
    case 'amount_low':
      result.sort((a, b) => a.amount - b.amount);
      break;
    case 'date_desc':
    default:
      result.sort((a, b) => b.date.localeCompare(a.date));
      break;
  }

  return result;
}
