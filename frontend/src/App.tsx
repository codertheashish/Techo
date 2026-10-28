import React, { useState, useEffect } from 'react';
import { Navbar, NavTab } from './components/Navbar';
import { DashboardView } from './components/DashboardView';
import { DailyLifeScheduleView } from './components/DailyLifeScheduleView';
import { WorkoutBuilderView } from './components/WorkoutBuilderView';
import { FormVisionView } from './components/FormVisionView';
import { RecoveryLabView } from './components/RecoveryLabView';
import { TelemetryLogView } from './components/TelemetryLogView';
import { CoachConsultView } from './components/CoachConsultView';
import { AthleteProfile, TrainingLogEntry, WorkoutPlan } from './types';
import { 
  defaultTodayWorkout, 
  initialAthlete, 
  initialTrainingLogs 
} from './data/mockData';
import { ArrowLeft } from 'lucide-react';

export default function App() {
  const [currentTab, setCurrentTab] = useState<NavTab>('dashboard');
  const [athlete, setAthlete] = useState<AthleteProfile>(initialAthlete);
  const [todayWorkout, setTodayWorkout] = useState<WorkoutPlan>(() => {
    const saved = localStorage.getItem('techo_active_workout') || localStorage.getItem('athlit_active_workout');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // fallback
      }
    }
    return defaultTodayWorkout;
  });

  const [logs, setLogs] = useState<TrainingLogEntry[]>(() => {
    const saved = localStorage.getItem('techo_training_logs') || localStorage.getItem('athlit_training_logs');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // fallback
      }
    }
    return initialTrainingLogs;
  });

  const [isLiveModeActive, setIsLiveModeActive] = useState(false);
  const [isQuickLogOpen, setIsQuickLogOpen] = useState(false);

  // Persist workout changes
  useEffect(() => {
    localStorage.setItem('techo_active_workout', JSON.stringify(todayWorkout));
  }, [todayWorkout]);

  // Persist logs
  useEffect(() => {
    localStorage.setItem('techo_training_logs', JSON.stringify(logs));
  }, [logs]);

  const handleAddLog = (newLog: TrainingLogEntry) => {
    setLogs((prev) => [newLog, ...prev]);
  };

  const handleStartLiveWorkout = () => {
    setIsLiveModeActive(true);
    setCurrentTab('workout-engine');
  };

  return (
    <div className="min-h-screen bg-[#f1f5f9] text-slate-900 flex flex-col font-sans selection:bg-lime-400 selection:text-slate-950">
      
      {/* 3-Zone Focused Navigation Bar (5 Core Sections) */}
      <Navbar
        currentTab={currentTab}
        onSelectTab={(tab) => setCurrentTab(tab)}
        onOpenQuickLog={() => setIsQuickLogOpen(true)}
        onStartLiveWorkout={handleStartLiveWorkout}
      />

      {/* Main Viewport Content Area */}
      <main className="flex-1 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8">
        
        {/* Back navigation banner when inside secondary sub-tools */}
        {currentTab === 'form-vision' && (
          <div className="mb-6 flex items-center justify-between">
            <button
              onClick={() => setCurrentTab('dashboard')}
              className="inline-flex items-center gap-2 rounded-xl bg-white border border-slate-200 px-4 py-2 text-xs font-bold text-slate-700 hover:text-slate-950 hover:bg-slate-50 transition-colors shadow-2xs"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Back to Dashboard</span>
            </button>
            <span className="text-xs font-semibold text-slate-500">
              Biomechanical 3D & Computer Vision Lab
            </span>
          </div>
        )}

        {currentTab === 'daily-schedule' && (
          <div className="mb-6">
            <button
              onClick={() => setCurrentTab('dashboard')}
              className="inline-flex items-center gap-2 rounded-xl bg-white border border-slate-200 px-4 py-2 text-xs font-bold text-slate-700 hover:text-slate-950 hover:bg-slate-50 transition-colors shadow-2xs mb-4"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Back to Dashboard</span>
            </button>
            <DailyLifeScheduleView />
          </div>
        )}

        {currentTab === 'dashboard' && (
          <DashboardView
            athlete={athlete}
            todayWorkout={todayWorkout}
            recentLogs={logs}
            onOpenWorkoutBuilder={() => setCurrentTab('workout-engine')}
            onOpenLiveWorkout={handleStartLiveWorkout}
            onOpenFormVision={() => setCurrentTab('form-vision')}
            onOpenRecoveryLab={() => setCurrentTab('recovery-lab')}
            onOpenCoachConsult={() => setCurrentTab('coach-consult')}
            onOpenQuickLog={() => setIsQuickLogOpen(true)}
            onOpenDailySchedule={() => setCurrentTab('daily-schedule')}
          />
        )}

        {currentTab === 'workout-engine' && (
          <WorkoutBuilderView
            currentWorkout={todayWorkout}
            onUpdateWorkout={(updated) => setTodayWorkout(updated)}
            isLiveModeActive={isLiveModeActive}
            onCloseLiveMode={() => setIsLiveModeActive(false)}
          />
        )}

        {currentTab === 'form-vision' && <FormVisionView />}

        {currentTab === 'recovery-lab' && <RecoveryLabView />}

        {currentTab === 'telemetry-logs' && (
          <TelemetryLogView
            logs={logs}
            onAddLog={handleAddLog}
            isQuickLogOpen={isQuickLogOpen}
            onCloseQuickLog={() => setIsQuickLogOpen(false)}
          />
        )}

        {currentTab === 'coach-consult' && (
          <CoachConsultView athlete={athlete} />
        )}
      </main>

      {/* Editorial, clean sports-technology footer */}
      <footer className="border-t border-slate-200 bg-white py-8 mt-14 text-xs text-slate-500">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-slate-900 text-sm">Techo</span>
            <span>·</span>
            <span>Intelligent Athletic Engine</span>
          </div>

          <div className="flex flex-wrap items-center gap-6 font-medium">
            <button
              onClick={() => setCurrentTab('dashboard')}
              className="hover:text-slate-900 transition-colors cursor-pointer"
            >
              Dashboard
            </button>
            <button
              onClick={() => setCurrentTab('workout-engine')}
              className="hover:text-slate-900 transition-colors cursor-pointer"
            >
              Workout Engine
            </button>
            <button
              onClick={() => setCurrentTab('recovery-lab')}
              className="hover:text-slate-900 transition-colors cursor-pointer"
            >
              Recovery Lab
            </button>
            <button
              onClick={() => setCurrentTab('telemetry-logs')}
              className="hover:text-slate-900 transition-colors cursor-pointer"
            >
              Training Logs
            </button>
            <button
              onClick={() => setCurrentTab('coach-consult')}
              className="hover:text-slate-900 transition-colors cursor-pointer"
            >
              AI Coach
            </button>
          </div>

          <div>
            © {new Date().getFullYear()} Techo. High-Performance Athletic Science.
          </div>
        </div>
      </footer>

    </div>
  );
}
