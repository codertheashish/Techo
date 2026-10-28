import React, { useState } from 'react';
import { 
  Play, 
  Sparkles, 
  ArrowUpRight, 
  Heart, 
  Flame, 
  Timer, 
  TrendingUp, 
  ShieldCheck, 
  Compass, 
  Volume2,
  Calendar,
  Layers,
  ChevronRight,
  Activity,
  CheckCircle2
} from 'lucide-react';
import { AthleteProfile, TrainingLogEntry, WorkoutPlan } from '../types';
import { speakCue } from '../utils/audioCoach';
import { TrainingVolumeRpeTrendsChart } from './TrainingVolumeRpeTrendsChart';
import { LiveHeartRateSensorHUD } from './LiveHeartRateSensorHUD';
import { DailyLifeScheduleView } from './DailyLifeScheduleView';

interface DashboardViewProps {
  athlete: AthleteProfile;
  todayWorkout: WorkoutPlan;
  recentLogs: TrainingLogEntry[];
  onOpenWorkoutBuilder: () => void;
  onOpenLiveWorkout: () => void;
  onOpenFormVision: () => void;
  onOpenRecoveryLab: () => void;
  onOpenCoachConsult: () => void;
  onOpenQuickLog?: () => void;
  onOpenDailySchedule?: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  athlete,
  todayWorkout,
  recentLogs,
  onOpenWorkoutBuilder,
  onOpenLiveWorkout,
  onOpenFormVision,
  onOpenRecoveryLab,
  onOpenCoachConsult,
  onOpenQuickLog,
  onOpenDailySchedule,
}) => {
  const [isPlayingCue, setIsPlayingCue] = useState(false);
  const [activeSubTab, setActiveSubTab] = useState<'overview' | 'daily-schedule'>('overview');

  const handlePlayHeroCue = () => {
    if (todayWorkout.audioCoachCues && todayWorkout.audioCoachCues.length > 0) {
      setIsPlayingCue(true);
      speakCue(todayWorkout.audioCoachCues[0], () => setIsPlayingCue(false));
    }
  };

  // Weekly zone distribution calculation (simulated telemetry based on logs)
  const zoneHours = {
    z1: 1.8,
    z2: 4.2,
    z3: 2.1,
    z4: 1.4,
    z5: 0.5,
  };
  const totalHours = Object.values(zoneHours).reduce((a, b) => a + b, 0);

  return (
    <div className="space-y-8 pb-14">

      {/* Sub-navigation switcher for Dashboard: Overview vs Integrated Daily Schedule */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200/80 pb-3">
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-200/70 border border-slate-300/50 w-fit text-xs font-semibold">
          <button
            onClick={() => setActiveSubTab('overview')}
            className={`px-4 py-1.5 rounded-lg transition-all ${
              activeSubTab === 'overview'
                ? 'bg-white text-slate-950 shadow-xs font-bold'
                : 'text-slate-600 hover:text-slate-950'
            }`}
          >
            Performance Overview
          </button>
          <button
            onClick={() => setActiveSubTab('daily-schedule')}
            className={`flex items-center gap-1.5 px-4 py-1.5 rounded-lg transition-all ${
              activeSubTab === 'daily-schedule'
                ? 'bg-white text-slate-950 shadow-xs font-bold'
                : 'text-slate-600 hover:text-slate-950'
            }`}
          >
            <Calendar className="h-3.5 w-3.5 text-lime-600" />
            <span>Daily Schedule</span>
          </button>
        </div>

        <div className="text-xs text-slate-500 font-medium">
          Athlete: <strong className="text-slate-800">{athlete.name}</strong> · {athlete.primarySport} ({athlete.experienceLevel})
        </div>
      </div>

      {/* When Daily Schedule view is selected, render it seamlessly inside Dashboard */}
      {activeSubTab === 'daily-schedule' ? (
        <div>
          <div className="mb-4">
            <button
              onClick={() => setActiveSubTab('overview')}
              className="text-xs font-semibold text-lime-700 hover:text-lime-800 hover:underline flex items-center gap-1"
            >
              ← Back to Performance Overview
            </button>
          </div>
          <DailyLifeScheduleView />
        </div>
      ) : (
        <>
          {/* ============================================================== */}
          {/* 1. HERO SHOWCASE: High-Contrast, Crystal-Clear Typography      */}
          {/* ============================================================== */}
          <section className="relative overflow-hidden rounded-3xl bg-[#090d16] border border-slate-800 shadow-xl">
            {/* Background Image Container with Measured Multi-Stage Scrims */}
            <div className="absolute inset-0 pointer-events-none">
              <img
                src="/src/assets/images/athlit_hero_runner_1790658093515.jpg"
                alt="Elite runner training on all-weather track"
                referrerPolicy="no-referrer"
                className="absolute right-0 top-0 h-full w-full md:w-3/5 lg:w-1/2 object-cover object-top opacity-55 md:opacity-75 filter brightness-105 contrast-110"
              />
              {/* Horizontal linear dark gradient ensures 100% text legibility */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#090d16] via-[#090d16]/95 via-50% md:via-60% to-transparent" />
              {/* Vertical gradient protection */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#090d16] via-[#090d16]/40 to-transparent" />
            </div>

            {/* Content Foreground */}
            <div className="relative z-10 px-6 py-8 sm:px-10 sm:py-12 lg:py-14 flex flex-col justify-between min-h-[360px]">
              
              {/* Zero-pill unboxed metadata strip with high-contrast neutral text */}
              <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-slate-300">
                <span className="text-lime-400 font-bold tracking-wide">{athlete.name}</span>
                <span aria-hidden="true" className="text-slate-500">·</span>
                <span className="text-slate-200">{athlete.primarySport}</span>
                <span aria-hidden="true" className="text-slate-500">·</span>
                <span className="text-slate-300">{athlete.experienceLevel}</span>
                <span aria-hidden="true" className="text-slate-500">·</span>
                <span className="text-slate-400">{athlete.currentMesocycle}</span>
              </div>

              {/* Main Headline & Description */}
              <div className="max-w-2xl space-y-3.5 my-6">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white leading-[1.12] text-balance">
                  Train Smarter. Perform Better.
                </h1>
                <p className="text-base sm:text-lg text-slate-200 leading-relaxed max-w-xl font-normal">
                  Personalized workouts, recovery insights, and AI-powered coaching in one place.
                </p>
                <div className="pt-1 flex items-center gap-2 text-xs text-lime-400 font-semibold">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-lime-400" />
                  <span>Today's prescribed session: {todayWorkout.workoutName} ({todayWorkout.targetHeartRateZone})</span>
                </div>
              </div>

              {/* Action Buttons: High-Contrast, Professional, Tactile */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={onOpenLiveWorkout}
                  className="inline-flex items-center gap-2 rounded-xl bg-lime-500 hover:bg-lime-400 text-slate-950 font-bold px-5 py-3 text-xs sm:text-sm shadow-md transition-all active:scale-95 whitespace-nowrap cursor-pointer"
                >
                  <Play className="h-4 w-4 fill-current" />
                  <span>Launch Live Workout</span>
                </button>

                <button
                  onClick={onOpenWorkoutBuilder}
                  className="inline-flex items-center gap-2 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-white font-semibold px-4 py-3 text-xs sm:text-sm border border-slate-700 transition-colors whitespace-nowrap cursor-pointer"
                >
                  <Sparkles className="h-3.5 w-3.5 text-lime-400" />
                  <span>Adapt Session with AI</span>
                </button>

                <button
                  onClick={handlePlayHeroCue}
                  disabled={isPlayingCue}
                  className="inline-flex items-center gap-2 rounded-xl bg-slate-900/60 hover:bg-slate-800 text-slate-300 hover:text-white px-3.5 py-3 text-xs font-medium border border-slate-800 transition-colors whitespace-nowrap cursor-pointer"
                  title="Hear pre-workout voice cue from Coach Techo"
                >
                  <Volume2 className={`h-3.5 w-3.5 ${isPlayingCue ? 'text-lime-400 animate-pulse' : 'text-slate-400'}`} />
                  <span>{isPlayingCue ? 'Playing Voice Cue...' : 'Audio Cue'}</span>
                </button>
              </div>

            </div>
          </section>

          {/* ============================================================== */}
          {/* 2. METRIC CARDS: Clean, Consistent, Explicitly Labeled Demo    */}
          {/* ============================================================== */}
          <section>
            <div className="flex items-center justify-between mb-3 px-1">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                <Activity className="h-3.5 w-3.5 text-lime-600" />
                <span>Physiological Profile Status</span>
              </h2>
              <span className="text-[11px] font-semibold text-slate-500">
                Sample Baseline Telemetry
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-4">
              
              {/* Readiness */}
              <div 
                onClick={onOpenRecoveryLab}
                className="group cursor-pointer rounded-2xl bg-white border border-slate-200/90 p-4 sm:p-5 shadow-xs hover:border-lime-500 hover:shadow-md transition-all"
              >
                <div className="flex items-center justify-between text-slate-500 text-xs mb-2">
                  <span className="font-semibold text-slate-700">Readiness</span>
                  <div className="p-1 rounded-lg bg-lime-50 text-lime-700">
                    <ShieldCheck className="h-4 w-4" />
                  </div>
                </div>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-2xl sm:text-3xl font-black text-slate-950 tabular-nums">88</span>
                  <span className="text-xs text-slate-500 font-mono">/ 100</span>
                </div>
                <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] font-bold text-lime-700">Peak Capacity</span>
                  <span className="text-[10px] text-slate-400 font-medium">Sample</span>
                </div>
              </div>

              {/* HRV */}
              <div className="rounded-2xl bg-white border border-slate-200/90 p-4 sm:p-5 shadow-xs">
                <div className="flex items-center justify-between text-slate-500 text-xs mb-2">
                  <span className="font-semibold text-slate-700">HRV (rMSSD)</span>
                  <div className="p-1 rounded-lg bg-emerald-50 text-emerald-700">
                    <TrendingUp className="h-4 w-4" />
                  </div>
                </div>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-2xl sm:text-3xl font-black text-slate-950 tabular-nums">72</span>
                  <span className="text-xs text-slate-500 font-mono">ms</span>
                </div>
                <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] font-bold text-emerald-700">+8 ms vs baseline</span>
                  <span className="text-[10px] text-slate-400 font-medium">Sample</span>
                </div>
              </div>

              {/* Resting Heart Rate */}
              <div className="rounded-2xl bg-white border border-slate-200/90 p-4 sm:p-5 shadow-xs">
                <div className="flex items-center justify-between text-slate-500 text-xs mb-2">
                  <span className="font-semibold text-slate-700">Resting HR</span>
                  <div className="p-1 rounded-lg bg-rose-50 text-rose-600">
                    <Heart className="h-4 w-4" />
                  </div>
                </div>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-2xl sm:text-3xl font-black text-slate-950 tabular-nums">{athlete.restingHeartRate}</span>
                  <span className="text-xs text-slate-500 font-mono">bpm</span>
                </div>
                <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] font-medium text-slate-600">Nominal baseline</span>
                  <span className="text-[10px] text-slate-400 font-medium">Sample</span>
                </div>
              </div>

              {/* ACWR Workload Ratio */}
              <div className="rounded-2xl bg-white border border-slate-200/90 p-4 sm:p-5 shadow-xs">
                <div className="flex items-center justify-between text-slate-500 text-xs mb-2">
                  <span className="font-semibold text-slate-700">Workload (ACWR)</span>
                  <div className="p-1 rounded-lg bg-cyan-50 text-cyan-700">
                    <Compass className="h-4 w-4" />
                  </div>
                </div>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-2xl sm:text-3xl font-black text-slate-950 tabular-nums">1.12</span>
                  <span className="text-xs text-slate-500 font-mono">ratio</span>
                </div>
                <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] font-bold text-cyan-700">Optimal (0.8–1.3)</span>
                  <span className="text-[10px] text-slate-400 font-medium">Sample</span>
                </div>
              </div>

              {/* VO2 Max Estimate */}
              <div className="col-span-2 sm:col-span-1 rounded-2xl bg-white border border-slate-200/90 p-4 sm:p-5 shadow-xs">
                <div className="flex items-center justify-between text-slate-500 text-xs mb-2">
                  <span className="font-semibold text-slate-700">VO2 Max Est.</span>
                  <div className="p-1 rounded-lg bg-amber-50 text-amber-700">
                    <Flame className="h-4 w-4" />
                  </div>
                </div>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-2xl sm:text-3xl font-black text-slate-950 tabular-nums">{athlete.vo2MaxEstimate}</span>
                  <span className="text-xs text-slate-500 font-mono">mL/kg</span>
                </div>
                <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] font-bold text-amber-700">Top 2% Division</span>
                  <span className="text-[10px] text-slate-400 font-medium">Sample</span>
                </div>
              </div>

            </div>
          </section>

          {/* ============================================================== */}
          {/* 3. SIMULATED HEART RATE & INTENSITY SENSOR HUD (Demo Label)     */}
          {/* ============================================================== */}
          <section>
            <div className="mb-2 flex items-center justify-between px-1">
              <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">
                Interactive Heart Rate HUD · Audio Sensor & ECG Simulator (Demo)
              </span>
            </div>
            <LiveHeartRateSensorHUD athlete={athlete} />
          </section>

          {/* ============================================================== */}
          {/* 4. WORKOUT & PERIODIZATION SPLIT                               */}
          {/* ============================================================== */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Today's Prescribed Session (7 cols) */}
            <div className="lg:col-span-7 rounded-3xl bg-white border border-slate-200/90 p-6 sm:p-7 shadow-xs space-y-5">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <div className="text-xs font-bold text-lime-700 uppercase tracking-wider mb-1">
                    Today's Training Prescription
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-950">
                    {todayWorkout.workoutName}
                  </h2>
                </div>
                <button
                  onClick={onOpenWorkoutBuilder}
                  className="rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 px-3.5 py-1.5 text-xs font-bold text-slate-700 hover:text-slate-950 flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <span>Edit Session</span>
                  <ArrowUpRight className="h-3.5 w-3.5 text-lime-700" />
                </button>
              </div>

              {/* Session Specs Line */}
              <div className="rounded-xl bg-slate-50 border border-slate-200/80 px-4 py-3 flex flex-wrap items-center gap-3 text-xs text-slate-700 font-mono tabular-nums">
                <div className="flex items-center gap-1.5 font-semibold text-slate-900">
                  <Timer className="h-4 w-4 text-slate-500" />
                  <span>60 mins</span>
                </div>
                <span className="text-slate-300">|</span>
                <div className="flex items-center gap-1.5 font-semibold text-slate-900">
                  <Heart className="h-4 w-4 text-rose-500" />
                  <span>{todayWorkout.targetHeartRateZone}</span>
                </div>
                <span className="text-slate-300">|</span>
                <div className="flex items-center gap-1.5 font-semibold text-slate-900">
                  <Flame className="h-4 w-4 text-amber-600" />
                  <span>RPE {todayWorkout.targetRPE}/10</span>
                </div>
                <span className="text-slate-300">|</span>
                <span className="font-semibold text-slate-900">~{todayWorkout.estimatedCaloricBurn} kcal</span>
              </div>

              {/* Rationale explanation */}
              <div className="rounded-xl bg-lime-50/70 border border-lime-200/60 p-4 text-xs text-slate-800 leading-relaxed">
                <strong className="font-bold text-lime-900">Target Adaptation: </strong>
                <span>{todayWorkout.physiologicalAdaptation}</span>
              </div>

              {/* Interval preview list */}
              <div className="space-y-2">
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Interval Blocks ({todayWorkout.mainBlocks.length} phases)
                </div>
                {todayWorkout.mainBlocks.map((block, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-3.5 rounded-xl border border-slate-100 bg-slate-50/70 hover:bg-slate-50 transition-colors text-xs"
                  >
                    <div className="space-y-0.5">
                      <div className="font-bold text-slate-900">
                        {block.title}
                      </div>
                      <div className="text-slate-500 tabular-nums">
                        {block.intervalsOrReps} · Rest: {block.restInterval}
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="px-2.5 py-1 rounded-md bg-white border border-slate-200 text-slate-800 font-mono text-[11px] tabular-nums font-bold">
                        {block.intensity}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Actions */}
              <div className="pt-2 flex items-center justify-between">
                <button
                  onClick={onOpenLiveWorkout}
                  className="inline-flex items-center gap-2 rounded-xl bg-lime-500 hover:bg-lime-400 text-slate-950 px-5 py-2.5 text-xs font-bold transition-all shadow-xs cursor-pointer active:scale-95"
                >
                  <Play className="h-3.5 w-3.5 fill-current" />
                  <span>Begin Workout</span>
                </button>

                <button
                  onClick={onOpenWorkoutBuilder}
                  className="px-3.5 py-2 rounded-xl text-xs font-bold text-slate-700 hover:text-slate-950 hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  Modify with AI Coach →
                </button>
              </div>
            </div>

            {/* Periodization & 3D Tools (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Weekly Zone 1-5 Distribution */}
              <div className="rounded-3xl bg-white border border-slate-200/90 p-6 sm:p-7 shadow-xs space-y-4">
                <div className="border-b border-slate-100 pb-3">
                  <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-0.5">
                    Polarized Training Balance
                  </div>
                  <h3 className="text-base font-extrabold text-slate-950">
                    Weekly Zone Exposure ({totalHours.toFixed(1)} hrs total)
                  </h3>
                </div>

                {/* Zone bar graphic */}
                <div className="space-y-3 pt-1">
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-slate-700 font-medium">Zone 1: Active Recovery (&lt;135 bpm)</span>
                      <span className="font-mono text-slate-500 tabular-nums">{zoneHours.z1} hrs (18%)</span>
                    </div>
                    <div className="h-2.5 w-full rounded-full bg-slate-100 overflow-hidden">
                      <div className="h-full bg-blue-500 rounded-full" style={{ width: '18%' }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-slate-900 font-bold">Zone 2: Aerobic Base (135–152 bpm)</span>
                      <span className="font-mono text-lime-700 tabular-nums font-bold">{zoneHours.z2} hrs (42%)</span>
                    </div>
                    <div className="h-2.5 w-full rounded-full bg-slate-100 overflow-hidden">
                      <div className="h-full bg-lime-500 rounded-full" style={{ width: '42%' }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-slate-700 font-medium">Zone 3: Tempo (153–165 bpm)</span>
                      <span className="font-mono text-slate-500 tabular-nums">{zoneHours.z3} hrs (21%)</span>
                    </div>
                    <div className="h-2.5 w-full rounded-full bg-slate-100 overflow-hidden">
                      <div className="h-full bg-amber-400 rounded-full" style={{ width: '21%' }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-slate-700 font-medium">Zone 4: Lactate Threshold (166–175 bpm)</span>
                      <span className="font-mono text-slate-500 tabular-nums">{zoneHours.z4} hrs (14%)</span>
                    </div>
                    <div className="h-2.5 w-full rounded-full bg-slate-100 overflow-hidden">
                      <div className="h-full bg-orange-500 rounded-full" style={{ width: '14%' }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-slate-700 font-medium">Zone 5: VO2 Max (176+ bpm)</span>
                      <span className="font-mono text-slate-500 tabular-nums">{zoneHours.z5} hrs (5%)</span>
                    </div>
                    <div className="h-2.5 w-full rounded-full bg-slate-100 overflow-hidden">
                      <div className="h-full bg-rose-500 rounded-full" style={{ width: '5%' }} />
                    </div>
                  </div>
                </div>

                <p className="text-[11px] text-slate-500 leading-normal pt-1">
                  Adheres to 80/20 polarized distribution: 80% low-intensity aerobic base, 20% high-intensity threshold density.
                </p>
              </div>

              {/* Integrated Daily Life Schedule Fast Link */}
              <div 
                onClick={() => setActiveSubTab('daily-schedule')}
                className="group cursor-pointer rounded-3xl bg-white border border-slate-200/90 p-5 shadow-xs hover:border-lime-500 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-lime-700 uppercase tracking-wider flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5" />
                      <span>Circadian Routine</span>
                    </span>
                    <span className="text-xs font-semibold text-slate-600 group-hover:text-slate-950 flex items-center gap-1 transition-colors">
                      <span>Open Timetable</span>
                      <ChevronRight className="h-3.5 w-3.5 text-lime-600" />
                    </span>
                  </div>
                  <h4 className="text-base font-extrabold text-slate-950">
                    Daily Life Athletic Schedule
                  </h4>
                  <p className="mt-1.5 text-xs text-slate-600 leading-relaxed">
                    Circadian morning sunlight, joint mobility, nutrition fueling windows, study/work breaks, and sleep down-regulation.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <span className="font-semibold text-slate-800">12 Synchronized Daily Habits</span>
                  <span className="font-bold text-lime-700">Chronobiology Tuned</span>
                </div>
              </div>

              {/* Biomechanical Form & 3D Kinematics Studio Card */}
              <div 
                onClick={onOpenFormVision}
                className="group cursor-pointer rounded-3xl bg-white border border-slate-200/90 overflow-hidden shadow-xs hover:border-lime-500 hover:shadow-md transition-all"
              >
                <div className="h-32 w-full overflow-hidden relative bg-slate-950">
                  <img
                    src="/src/assets/images/athlit_game_basketball_1790677377887.jpg"
                    alt="Biomechanical Form & 3D Analysis"
                    referrerPolicy="no-referrer"
                    className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-65"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                  <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between">
                    <span className="text-xs font-bold text-white tracking-wide flex items-center gap-1.5">
                      <Layers className="h-3.5 w-3.5 text-lime-400" />
                      <span>Biomechanical Form & 3D Studio</span>
                    </span>
                    <span className="text-xs font-semibold text-lime-400 flex items-center gap-1">
                      <span>Explore</span>
                      <ArrowUpRight className="h-3 w-3" />
                    </span>
                  </div>
                </div>
                <div className="p-4 text-xs text-slate-600 leading-relaxed">
                  230+ athletic games, interactive 3D skeletal posture guide, and Gemini video kinematic critique.
                </div>
              </div>

            </div>

          </section>

          {/* ============================================================== */}
          {/* 5. 30-DAY TRAINING VOLUME & RPE TRENDS CHART                  */}
          {/* ============================================================== */}
          <TrainingVolumeRpeTrendsChart 
            recentLogs={recentLogs}
            athleteName={athlete.name}
            onOpenQuickLog={onOpenQuickLog}
          />

          {/* ============================================================== */}
          {/* 6. RECENT TRAINING LOGS FEED                                   */}
          {/* ============================================================== */}
          <section className="rounded-3xl bg-white border border-slate-200/90 p-6 sm:p-7 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-base font-extrabold text-slate-950">Recent Training Sessions</h3>
                <p className="text-xs text-slate-500">Last recorded sessions with TRIMP load and physiological notes</p>
              </div>
              <button
                onClick={onOpenCoachConsult}
                className="text-xs font-bold text-lime-700 hover:text-lime-800 transition-colors flex items-center gap-1 cursor-pointer"
              >
                <span>Ask Coach Techo</span>
                <ChevronRight className="h-3.5 w-3.5" />
              </button>
            </div>

            <div className="divide-y divide-slate-100">
              {recentLogs.slice(0, 3).map((log) => (
                <div key={log.id} className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-900">{log.title}</span>
                      <span className="text-slate-300 text-xs">·</span>
                      <span className="text-xs text-slate-600">{log.sport}</span>
                      <span className="text-slate-300 text-xs">·</span>
                      <span className="text-xs text-slate-400">{log.date}</span>
                    </div>
                    <p className="text-xs text-slate-500 leading-snug line-clamp-1">{log.notes}</p>
                  </div>

                  <div className="flex items-center gap-3 text-xs text-slate-700 font-mono tabular-nums shrink-0">
                    {log.distanceKm && (
                      <span className="font-semibold text-slate-900">{log.distanceKm} km</span>
                    )}
                    <span>{log.durationMinutes} min</span>
                    <span>Avg {log.avgHeartRate} bpm</span>
                    <span className="px-2 py-0.5 rounded-md bg-amber-50 text-amber-800 border border-amber-200 font-semibold text-[11px]">
                      RPE {log.rpe}/10
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-lime-50 text-lime-800 border border-lime-200 font-bold text-[11px]">
                      TRIMP {log.trimpLoad}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </>
      )}

    </div>
  );
};
