import { createContext, useContext, useReducer, useEffect } from 'react';
import { appReducer, DEFAULT_FILTERS } from './AppReducer';
import { MOCK_TRANSACTIONS } from '../data/mockData';
import { calculateSummary, getCategoryBreakdown, getSpendingTrend, applyFilters } from '../utils/calculations';

const AppContext = createContext(null);

const initialTransactions = MOCK_TRANSACTIONS;

const initialState = {
  role: 'admin',
  transactions: initialTransactions,
  filteredTransactions: applyFilters(initialTransactions, DEFAULT_FILTERS),
  filters: { ...DEFAULT_FILTERS },
  summary: calculateSummary(initialTransactions),
  chartData: {
    spendingTrend: getSpendingTrend(initialTransactions),
    categoryBreakdown: getCategoryBreakdown(initialTransactions),
  },
  ui: {
    sidebarOpen: true,
    activeModal: null,
    activePage: 'dashboard',
    notification: null,
  },
};

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Auto-clear notifications after 3s
  useEffect(() => {
    if (state.ui.notification) {
      const timer = setTimeout(() => {
        dispatch({ type: 'CLEAR_NOTIFICATION' });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [state.ui.notification]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
