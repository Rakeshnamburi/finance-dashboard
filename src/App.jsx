import { AppProvider, useApp } from './context/AppContext';
import Layout from './components/layout/Layout';
import DashboardPage from './pages/DashboardPage';
import TransactionsPage from './pages/TransactionsPage';
import AnalyticsPage from './pages/AnalyticsPage';
import { CheckCircle2, XCircle, Info, X } from 'lucide-react';

function Toast() {
  const { state, dispatch } = useApp();
  const notif = state.ui.notification;
  if (!notif) return null;
  
  const config = {
    success: { 
      icon: CheckCircle2, 
      border: 'border-l-incomeGreen',
      iconColor: 'text-incomeGreen',
      glow: 'shadow-glowGreen'
    },
    error: { 
      icon: XCircle, 
      border: 'border-l-expenseRed',
      iconColor: 'text-expenseRed',
      glow: 'shadow-glowRed'
    },
    info: { 
      icon: Info, 
      border: 'border-l-accentBlue',
      iconColor: 'text-accentBlue',
      glow: 'shadow-glowBlue'
    },
  };

  const cfg = config[notif.type] || config.info;
  const Icon = cfg.icon;

  return (
    <div className={`fixed top-6 right-6 z-[1000] bg-bgSecondary/95 backdrop-blur-2xl border border-borderSubtle border-l-4 ${cfg.border} rounded-xl py-3.5 px-5 text-textPrimary text-sm font-medium shadow-elevated ${cfg.glow} animate-slide-down flex items-center gap-3 max-w-[400px]`}>
      <Icon className={`w-5 h-5 ${cfg.iconColor} shrink-0`} />
      <span className="flex-1">{notif.message}</span>
      <button 
        className="w-6 h-6 rounded-md flex items-center justify-center text-textMuted hover:text-textPrimary hover:bg-bgGlassHover transition-all shrink-0"
        onClick={() => dispatch({ type: 'CLEAR_NOTIFICATION' })}
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}

function PageRenderer() {
  const { state } = useApp();
  switch (state.ui.activePage) {
    case 'transactions':
      return <TransactionsPage />;
    case 'analytics':
      return <AnalyticsPage />;
    case 'dashboard':
    default:
      return <DashboardPage />;
  }
}

function App() {
  return (
    <AppProvider>
      <Layout>
        <PageRenderer />
      </Layout>
      <Toast />
    </AppProvider>
  );
}

export default App;
