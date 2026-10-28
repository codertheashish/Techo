import React, { useState } from 'react';
import { Plus, Zap, Activity, Menu, X } from 'lucide-react';

export type NavTab = 
  | 'dashboard'
  | 'daily-schedule'
  | 'workout-engine'
  | 'form-vision'
  | 'recovery-lab'
  | 'telemetry-logs'
  | 'coach-consult';

interface NavbarProps {
  currentTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  onOpenQuickLog: () => void;
  onStartLiveWorkout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onSelectTab,
  onOpenQuickLog,
  onStartLiveWorkout,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Map sub-views to their parent active main tab for highlight
  const isDashboardActive = currentTab === 'dashboard' || currentTab === 'daily-schedule' || currentTab === 'form-vision';

  const handleNavClick = (tab: NavTab) => {
    onSelectTab(tab);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/95 backdrop-blur-md shadow-xs">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Zone 1: Brand Wordmark with subtle athletic accent */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => handleNavClick('dashboard')}
            className="group flex items-center gap-2.5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-lime-500 rounded-md"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-950 text-lime-400 font-black text-base shadow-sm">
              <Activity className="h-5 w-5" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-black tracking-tight text-slate-950 group-hover:text-lime-700 transition-colors leading-none">
                Techo
              </span>
              <span className="text-[10px] font-semibold text-slate-500 tracking-wider uppercase mt-0.5">
                Athletic Engine
              </span>
            </div>
          </button>
        </div>

        {/* Zone 2: Focused 5-Section Desktop Navigation (Clean, unboxed links with active indicator) */}
        <nav className="hidden lg:flex items-center gap-1 bg-slate-100/80 p-1 rounded-xl border border-slate-200/80 text-xs font-semibold">
          <button
            onClick={() => handleNavClick('dashboard')}
            className={`px-3.5 py-1.5 rounded-lg transition-all ${
              isDashboardActive
                ? 'bg-white text-slate-950 shadow-xs font-bold border border-slate-200/60'
                : 'text-slate-600 hover:text-slate-950'
            }`}
          >
            Dashboard
          </button>

          <button
            onClick={() => handleNavClick('workout-engine')}
            className={`px-3.5 py-1.5 rounded-lg transition-all ${
              currentTab === 'workout-engine'
                ? 'bg-white text-slate-950 shadow-xs font-bold border border-slate-200/60'
                : 'text-slate-600 hover:text-slate-950'
            }`}
          >
            Workout Engine
          </button>

          <button
            onClick={() => handleNavClick('recovery-lab')}
            className={`px-3.5 py-1.5 rounded-lg transition-all ${
              currentTab === 'recovery-lab'
                ? 'bg-white text-slate-950 shadow-xs font-bold border border-slate-200/60'
                : 'text-slate-600 hover:text-slate-950'
            }`}
          >
            Recovery Lab
          </button>

          <button
            onClick={() => handleNavClick('telemetry-logs')}
            className={`px-3.5 py-1.5 rounded-lg transition-all ${
              currentTab === 'telemetry-logs'
                ? 'bg-white text-slate-950 shadow-xs font-bold border border-slate-200/60'
                : 'text-slate-600 hover:text-slate-950'
            }`}
          >
            Training Logs
          </button>

          <button
            onClick={() => handleNavClick('coach-consult')}
            className={`px-3.5 py-1.5 rounded-lg transition-all ${
              currentTab === 'coach-consult'
                ? 'bg-white text-slate-950 shadow-xs font-bold border border-slate-200/60'
                : 'text-slate-600 hover:text-slate-950'
            }`}
          >
            AI Coach
          </button>
        </nav>

        {/* Zone 3: High-contrast athletic action buttons */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={onStartLiveWorkout}
            className="hidden sm:inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-slate-950 transition-colors shadow-2xs whitespace-nowrap"
            title="Start live interactive workout timer with voice coaching"
          >
            <Zap className="h-3.5 w-3.5 text-lime-600" />
            <span>Live Session</span>
          </button>

          <button
            onClick={onOpenQuickLog}
            className="inline-flex items-center gap-1.5 rounded-xl bg-lime-500 hover:bg-lime-400 text-slate-950 font-bold px-3.5 sm:px-4 py-2 text-xs shadow-xs transition-all whitespace-nowrap active:scale-95"
          >
            <Plus className="h-3.5 w-3.5 stroke-[2.5]" />
            <span>Log Workout</span>
          </button>

          {/* Mobile hamburger menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl text-slate-600 hover:text-slate-950 hover:bg-slate-100 transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer Navigation (responsive for tablets & phones) */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 py-3 shadow-lg space-y-1 animate-in slide-in-from-top-2 duration-150">
          <button
            onClick={() => handleNavClick('dashboard')}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
              isDashboardActive ? 'bg-slate-100 text-slate-950 font-bold' : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <span>Dashboard</span>
            {isDashboardActive && <span className="h-1.5 w-1.5 rounded-full bg-lime-500" />}
          </button>

          <button
            onClick={() => handleNavClick('workout-engine')}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
              currentTab === 'workout-engine' ? 'bg-slate-100 text-slate-950 font-bold' : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <span>Workout Engine</span>
            {currentTab === 'workout-engine' && <span className="h-1.5 w-1.5 rounded-full bg-lime-500" />}
          </button>

          <button
            onClick={() => handleNavClick('recovery-lab')}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
              currentTab === 'recovery-lab' ? 'bg-slate-100 text-slate-950 font-bold' : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <span>Recovery Lab</span>
            {currentTab === 'recovery-lab' && <span className="h-1.5 w-1.5 rounded-full bg-lime-500" />}
          </button>

          <button
            onClick={() => handleNavClick('telemetry-logs')}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
              currentTab === 'telemetry-logs' ? 'bg-slate-100 text-slate-950 font-bold' : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <span>Training Logs</span>
            {currentTab === 'telemetry-logs' && <span className="h-1.5 w-1.5 rounded-full bg-lime-500" />}
          </button>

          <button
            onClick={() => handleNavClick('coach-consult')}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
              currentTab === 'coach-consult' ? 'bg-slate-100 text-slate-950 font-bold' : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <span>AI Coach</span>
            {currentTab === 'coach-consult' && <span className="h-1.5 w-1.5 rounded-full bg-lime-500" />}
          </button>

          <div className="pt-2 border-t border-slate-100 flex items-center gap-2">
            <button
              onClick={() => {
                onStartLiveWorkout();
                setMobileMenuOpen(false);
              }}
              className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 py-2 text-xs font-semibold text-slate-700"
            >
              <Zap className="h-3.5 w-3.5 text-lime-600" />
              <span>Live Session</span>
            </button>
            <button
              onClick={() => {
                onOpenQuickLog();
                setMobileMenuOpen(false);
              }}
              className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-lg bg-lime-500 py-2 text-xs font-bold text-slate-950"
            >
              <Plus className="h-3.5 w-3.5" />
              <span>Log Workout</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
