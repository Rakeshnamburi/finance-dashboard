/**
 * Export transactions to CSV format and trigger download
 */
export function exportToCSV(transactions, filename = 'transactions') {
  const headers = ['Date', 'Description', 'Amount', 'Type', 'Category', 'Account', 'Status'];
  
  const rows = transactions.map(t => [
    t.date,
    `"${t.description}"`,
    t.amount,
    t.type,
    t.category,
    t.account,
    t.status,
  ]);

  const csvContent = [
    headers.join(','),
    ...rows.map(r => r.join(','))
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${filename}_${new Date().toISOString().split('T')[0]}.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Export transactions to JSON format and trigger download
 */
export function exportToJSON(transactions, filename = 'transactions') {
  const jsonContent = JSON.stringify(transactions, null, 2);
  const blob = new Blob([jsonContent], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${filename}_${new Date().toISOString().split('T')[0]}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
