import { applyFilters, calculateSummary, getCategoryBreakdown, getSpendingTrend } from '../utils/calculations';

// Action Types
export const ACTIONS = {
  SET_ROLE: 'SET_ROLE',
  ADD_TRANSACTION: 'ADD_TRANSACTION',
  DELETE_TRANSACTION: 'DELETE_TRANSACTION',
  EDIT_TRANSACTION: 'EDIT_TRANSACTION',
  SET_FILTER: 'SET_FILTER',
  RESET_FILTERS: 'RESET_FILTERS',
  TOGGLE_SIDEBAR: 'TOGGLE_SIDEBAR',
  SET_ACTIVE_PAGE: 'SET_ACTIVE_PAGE',
  OPEN_MODAL: 'OPEN_MODAL',
  CLOSE_MODAL: 'CLOSE_MODAL',
  SHOW_NOTIFICATION: 'SHOW_NOTIFICATION',
  CLEAR_NOTIFICATION: 'CLEAR_NOTIFICATION',
};

const DEFAULT_FILTERS = {
  search: '',
  category: 'all',
  type: 'all',
  dateRange: { start: null, end: null },
  sortBy: 'date_desc',
};

function recalculate(state) {
  const filtered = applyFilters(state.transactions, state.filters);
  return {
    ...state,
    filteredTransactions: filtered,
    summary: calculateSummary(state.transactions),
    chartData: {
      spendingTrend: getSpendingTrend(state.transactions),
      categoryBreakdown: getCategoryBreakdown(state.transactions),
    },
  };
}

export function appReducer(state, action) {
  switch (action.type) {
    case ACTIONS.SET_ROLE:
      return { ...state, role: action.payload };

    case ACTIONS.ADD_TRANSACTION: {
      const newState = {
        ...state,
        transactions: [action.payload, ...state.transactions],
      };
      return recalculate(newState);
    }

    case ACTIONS.DELETE_TRANSACTION: {
      const newState = {
        ...state,
        transactions: state.transactions.filter(t => t.id !== action.payload),
      };
      return recalculate(newState);
    }

    case ACTIONS.EDIT_TRANSACTION: {
      const newState = {
        ...state,
        transactions: state.transactions.map(t =>
          t.id === action.payload.id ? { ...t, ...action.payload } : t
        ),
      };
      return recalculate(newState);
    }

    case ACTIONS.SET_FILTER: {
      const newFilters = { ...state.filters, ...action.payload };
      const newState = { ...state, filters: newFilters };
      return {
        ...newState,
        filteredTransactions: applyFilters(state.transactions, newFilters),
      };
    }

    case ACTIONS.RESET_FILTERS: {
      const newState = { ...state, filters: { ...DEFAULT_FILTERS } };
      return {
        ...newState,
        filteredTransactions: applyFilters(state.transactions, DEFAULT_FILTERS),
      };
    }

    case ACTIONS.TOGGLE_SIDEBAR:
      return { ...state, ui: { ...state.ui, sidebarOpen: !state.ui.sidebarOpen } };

    case ACTIONS.SET_ACTIVE_PAGE:
      return { ...state, ui: { ...state.ui, activePage: action.payload } };

    case ACTIONS.OPEN_MODAL:
      return { ...state, ui: { ...state.ui, activeModal: action.payload } };

    case ACTIONS.CLOSE_MODAL:
      return { ...state, ui: { ...state.ui, activeModal: null } };

    case ACTIONS.SHOW_NOTIFICATION:
      return { ...state, ui: { ...state.ui, notification: action.payload } };

    case ACTIONS.CLEAR_NOTIFICATION:
      return { ...state, ui: { ...state.ui, notification: null } };

    default:
      return state;
  }
}

export { DEFAULT_FILTERS };
