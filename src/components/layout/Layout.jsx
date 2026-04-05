import Sidebar from './Sidebar';
import TopBar from './TopBar';

export default function Layout({ children }) {
  return (
    <div className="flex min-h-screen relative">
      {/* Global ambient effects */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-accentBlue/[0.03] blur-[100px]" />
        <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-accentPurple/[0.03] blur-[100px]" />
        <div className="absolute top-[40%] left-[30%] w-[400px] h-[400px] rounded-full bg-accentCyan/[0.02] blur-[100px]" />
      </div>
      
      <Sidebar />
      <div className="flex-1 flex flex-col min-h-screen ml-0 md:ml-[272px] transition-[margin-left] duration-300 relative z-10">
        <TopBar />
        <main className="flex-1 p-4 md:p-6 lg:p-8 animate-fade-in">
          {children}
        </main>
      </div>
    </div>
  );
}
