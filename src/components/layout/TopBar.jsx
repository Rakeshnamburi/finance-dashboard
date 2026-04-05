import { useApp } from '../../context/AppContext';
import { ACTIONS } from '../../context/AppReducer';
import { Search, Bell, Menu, Calendar, Command } from 'lucide-react';

const PAGE_TITLES = {
  dashboard: { title: 'Dashboard', subtitle: 'Welcome back, Rakesh 👋' },
  transactions: { title: 'Transactions', subtitle: 'Manage your money flow' },
  analytics: { title: 'Analytics', subtitle: 'Deep dive into your finances' },
};

export default function TopBar() {
  const { state, dispatch } = useApp();
  const page = PAGE_TITLES[state.ui.activePage] || PAGE_TITLES.dashboard;

  const handleSearch = (e) => {
    dispatch({
      type: ACTIONS.SET_FILTER,
      payload: { search: e.target.value },
    });
  };

  const now = new Date();
  const dateStr = now.toLocaleDateString('en-IN', { 
    weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' 
  });

  return (
    <header className="h-[72px] bg-bgSecondary/40 border-b border-borderSubtle flex items-center justify-between px-4 md:px-8 sticky top-0 z-50 backdrop-blur-xl">
      {/* Left section */}
      <div className="flex items-center gap-4">
        <button
          className="md:hidden flex w-10 h-10 rounded-xl items-center justify-center hover:bg-bgGlassHover transition-all duration-300 active:scale-95"
          onClick={() => dispatch({ type: ACTIONS.TOGGLE_SIDEBAR })}
        >
          <Menu className="w-5 h-5 text-textSecondary" />
        </button>
        <div className="flex flex-col">
          <h1 className="text-lg font-bold text-textPrimary tracking-tight">
            {page.title}
          </h1>
          <p className="text-[0.7rem] text-textMuted hidden sm:block">
            {page.subtitle}
          </p>
        </div>
      </div>

      {/* Right section */}
      <div className="flex items-center gap-3">
        {/* Date badge */}
        <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-bgTertiary/50 border border-borderSubtle text-xs text-textMuted">
          <Calendar className="w-3.5 h-3.5 text-accentBlue" />
          {dateStr}
        </div>

        {/* Search */}
        <div className="relative hidden sm:block group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-textMuted pointer-events-none group-focus-within:text-accentBlue transition-colors duration-300" />
          <input
            type="text"
            className="w-[180px] md:w-[260px] pl-10 pr-4 bg-bgTertiary/50 border border-borderSubtle rounded-xl h-[40px] text-xs placeholder:text-textMuted/60 focus:border-accentBlue focus:ring-2 focus:ring-accentBlueGlow focus:w-[300px] outline-none transition-all duration-300"
            placeholder="Search transactions..."
            value={state.filters.search}
            onChange={handleSearch}
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 hidden md:flex items-center gap-1 px-1.5 py-0.5 rounded bg-bgPrimary/60 border border-borderSubtle">
            <Command className="w-2.5 h-2.5 text-textMuted" />
            <span className="text-[0.6rem] text-textMuted font-medium">K</span>
          </div>
        </div>

        {/* Notification bell */}
        <button className="relative w-10 h-10 rounded-xl flex items-center justify-center hover:bg-bgGlassHover transition-all duration-300 active:scale-95 group">
          <Bell className="w-[18px] h-[18px] text-textSecondary group-hover:text-textPrimary transition-colors" />
          <span className="notification-dot top-1.5 right-1.5 bg-expenseRed" />
        </button>

        {/* Profile (visible on mobile) */}
        <div className="md:hidden w-8 h-8 rounded-lg bg-gradient-to-br from-accentBlue to-accentPurple flex items-center justify-center font-bold text-white text-xs">
          R
        </div>
      </div>
    </header>
  );
}
