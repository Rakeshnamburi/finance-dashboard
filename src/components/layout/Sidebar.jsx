import { useApp } from '../../context/AppContext';
import { ACTIONS } from '../../context/AppReducer';
import { 
  LayoutDashboard, ArrowLeftRight, BarChart3, 
  ShieldCheck, Eye, ChevronRight, Wallet,
  TrendingUp, Settings, LogOut, Sparkles
} from 'lucide-react';

const NAV_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'transactions', label: 'Transactions', icon: ArrowLeftRight },
  { id: 'analytics', label: 'Analytics', icon: BarChart3 },
];

const BOTTOM_ITEMS = [
  { id: 'settings', label: 'Settings', icon: Settings },
];

export default function Sidebar() {
  const { state, dispatch } = useApp();
  const { role, ui } = state;

  const setPage = (page) => {
    dispatch({ type: ACTIONS.SET_ACTIVE_PAGE, payload: page });
    if (window.innerWidth <= 768) {
      dispatch({ type: ACTIONS.TOGGLE_SIDEBAR });
    }
  };

  const toggleRole = (newRole) => {
    dispatch({ type: ACTIONS.SET_ROLE, payload: newRole });
    dispatch({
      type: ACTIONS.SHOW_NOTIFICATION,
      payload: { type: 'info', message: `Switched to ${newRole} mode` },
    });
  };

  return (
    <>
      <div
        className={`md:hidden fixed inset-0 bg-black/70 z-[99] backdrop-blur-md transition-opacity duration-300 ${ui.sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={() => dispatch({ type: ACTIONS.TOGGLE_SIDEBAR })}
      />
      <aside className={`w-[272px] h-screen fixed left-0 top-0 z-[100] flex flex-col transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${ui.sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
        {/* Sidebar background with glass effect */}
        <div className="absolute inset-0 bg-bgSecondary/80 backdrop-blur-2xl border-r border-borderSubtle" />
        
        {/* Ambient glow */}
        <div className="absolute top-0 left-0 w-full h-[200px] bg-gradient-to-b from-accentBlue/5 to-transparent pointer-events-none" />
        
        <div className="relative flex flex-col h-full py-6">
          {/* Logo */}
          <div className="flex items-center gap-3.5 px-6 mb-10">
            <div className="relative shrink-0">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accentBlue via-accentPurple to-accentCyan p-[1.5px] shadow-glowBlue">
                <div className="w-full h-full bg-bgSecondary rounded-[10px] flex items-center justify-center">
                  <Wallet className="w-5 h-5 text-accentBlue" strokeWidth={2} />
                </div>
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-incomeGreen rounded-full border-2 border-bgSecondary animate-pulse-soft" />
            </div>
            <div className="flex flex-col">
              <span className="text-[1.05rem] font-bold gradient-text tracking-tight leading-tight">
                FinDash
              </span>
              <span className="text-[0.65rem] text-textMuted font-medium tracking-wide uppercase">
                Finance Pro
              </span>
            </div>
          </div>

          {/* Menu Label */}
          <div className="px-6 mb-2">
            <span className="text-[0.6rem] font-bold text-textMuted/60 uppercase tracking-[0.15em]">
              Main Menu
            </span>
          </div>

          {/* Navigation */}
          <nav className="flex-1 flex flex-col gap-0.5 px-3">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = ui.activePage === item.id;
              return (
                <button
                  key={item.id}
                  className={`nav-link group ${isActive ? 'active' : ''}`}
                  onClick={() => setPage(item.id)}
                >
                  <div className={`w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-300 ${
                    isActive 
                      ? 'bg-accentBlue/20 shadow-inner' 
                      : 'bg-bgTertiary/50 group-hover:bg-bgTertiary'
                  }`}>
                    <Icon className={`w-[18px] h-[18px] transition-colors duration-300 ${
                      isActive ? 'text-accentBlue' : 'text-textMuted group-hover:text-textSecondary'
                    }`} strokeWidth={1.8} />
                  </div>
                  <span className="flex-1 text-left">{item.label}</span>
                  {isActive && (
                    <ChevronRight className="w-4 h-4 text-accentBlue/50" />
                  )}
                </button>
              );
            })}

            <div className="h-px bg-borderSubtle my-4 mx-2" />

            <div className="px-2 mb-2">
              <span className="text-[0.6rem] font-bold text-textMuted/60 uppercase tracking-[0.15em]">
                System
              </span>
            </div>

            {BOTTOM_ITEMS.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  className="nav-link group"
                  onClick={() => {}}
                >
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center bg-bgTertiary/50 group-hover:bg-bgTertiary transition-all duration-300">
                    <Icon className="w-[18px] h-[18px] text-textMuted group-hover:text-textSecondary transition-colors duration-300" strokeWidth={1.8} />
                  </div>
                  <span className="flex-1 text-left">{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Role Switcher */}
          <div className="mx-3 mb-4">
            <div className="p-4 glass-card !rounded-xl">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-3.5 h-3.5 text-accentAmber" />
                <span className="text-[0.65rem] font-bold uppercase tracking-[0.12em] text-textMuted">
                  Access Mode
                </span>
              </div>
              <div className="flex bg-bgPrimary/80 rounded-lg p-0.5 gap-0.5">
                <button
                  className={`flex-1 py-2 px-3 text-xs font-semibold text-center transition-all duration-300 rounded-md flex items-center justify-center gap-1.5 ${
                    role === 'admin' 
                      ? 'bg-gradient-to-r from-accentBlue to-accentPurple text-white shadow-glowBlue' 
                      : 'text-textMuted hover:text-textSecondary hover:bg-bgGlassHover'
                  }`}
                  onClick={() => toggleRole('admin')}
                >
                  <ShieldCheck className="w-3.5 h-3.5" /> Admin
                </button>
                <button
                  className={`flex-1 py-2 px-3 text-xs font-semibold text-center transition-all duration-300 rounded-md flex items-center justify-center gap-1.5 ${
                    role === 'viewer' 
                      ? 'bg-gradient-to-r from-accentBlue to-accentPurple text-white shadow-glowBlue' 
                      : 'text-textMuted hover:text-textSecondary hover:bg-bgGlassHover'
                  }`}
                  onClick={() => toggleRole('viewer')}
                >
                  <Eye className="w-3.5 h-3.5" /> Viewer
                </button>
              </div>
            </div>
          </div>

          {/* User Profile */}
          <div className="px-3 mt-auto">
            <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-bgGlassHover transition-all duration-300 cursor-pointer group">
              <div className="relative">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accentBlue via-accentPurple to-accentCyan flex items-center justify-center font-bold text-white text-sm shrink-0 shadow-lg">
                  R
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-incomeGreen border-2 border-bgSecondary" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[0.85rem] font-semibold text-textPrimary truncate">Rakesh</div>
                <div className="text-[0.65rem] text-textMuted capitalize flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-incomeGreen inline-block" />
                  {role} • Online
                </div>
              </div>
              <LogOut className="w-4 h-4 text-textMuted opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
