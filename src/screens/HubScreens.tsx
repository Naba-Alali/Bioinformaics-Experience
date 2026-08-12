import { useState, useRef, useEffect } from "react";
import { motion } from "motion/react";
import {
  ArrowLeft, Bell, CheckCircle2, ChevronRight, TrendingUp, Sparkles,
} from "lucide-react";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import mascotCharImg from "@/imports/____________2026-07-28_155021-2.png";
import type { CategoryId, Locale } from "../types";
import { nutritionPlan, buildExercisePlan } from "../data";
import {
  Habit, RoutineStep,
  EditableHabitList, EditableRoutineList, MascotBubble,
} from "../shared";

// ─── Recovery Hub ─────────────────────────────────────────────────────────────

export function RecoveryHubScreen({ hasCoach, onBack, onCategory }: {
  hasCoach: boolean;
  onBack: () => void;
  onCategory: (id: CategoryId) => void;
}) {
  const [tab, setTab] = useState<"sleep" | "physical" | "habits">("sleep");
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
  const toggle = (k: string) => setCheckedItems(p => ({ ...p, [k]: !p[k] }));
  const [habits, setHabits] = useState<Habit[]>([
    { id: "rh1", icon: "🌙", label: "8h sleep at a fixed time every night", sublabel: "Every night" },
    { id: "rh2", icon: "💧", label: "Drink 2.5L water daily", sublabel: "Ongoing" },
    { id: "rh3", icon: "☀️", label: "15-min morning sunlight walk", sublabel: "Before 10am" },
    { id: "rh4", icon: "🚶", label: "Post-meal walks × 2", sublabel: "After lunch + dinner" },
    { id: "rh5", icon: "🧘", label: "5-min evening breathing or stretch", sublabel: "Before bed" },
  ]);

  const [sleepProtocol, setSleepProtocol] = useState<RoutineStep[]>([
    { id: "s1", time: "9:00 PM",  icon: "💡", action: "Dim all lights and screens" },
    { id: "s2", time: "9:30 PM",  icon: "📵", action: "Phone to aeroplane mode" },
    { id: "s3", time: "10:00 PM", icon: "🌡️", action: "Cool bedroom to 18–20°C" },
    { id: "s4", time: "10:15 PM", icon: "🧘", action: "5-min breathing or body scan" },
    { id: "s5", time: "10:30 PM", icon: "🛌", action: "Sleep target — 8 hours" },
  ]);
  const [physicalProtocol, setPhysicalProtocol] = useState<RoutineStep[]>([
    { id: "p1", time: "8:00 AM",  icon: "☀️", action: "15-min morning sunlight walk" },
    { id: "p2", time: "1:00 PM",  icon: "🚶", action: "10-min post-lunch walk" },
    { id: "p3", time: "4:00 PM",  icon: "💧", action: "Check hydration — 2.5L goal" },
    { id: "p4", time: "7:30 PM",  icon: "🚶", action: "10-min post-dinner walk" },
    { id: "p5", time: "9:00 PM",  icon: "🧘", action: "Light stretching — 10 min" },
  ]);

  const score = 82;

  return (
    <div className="flex flex-col pb-6">
      <div className="px-5 pt-12 pb-4 flex items-center gap-3">
        <button onClick={onBack} className="w-10 h-10 rounded-full bg-white shadow-[0_2px_12px_rgba(0,0,0,0.08)] flex items-center justify-center flex-shrink-0">
          <ArrowLeft size={17} className="text-[#555]" />
        </button>
        <div className="flex-1">
          <p className="text-[10px] font-bold text-[#aaa] uppercase tracking-[0.14em]">Daily Protocol</p>
          <h1 className="text-[22px] font-bold text-[#1a1a1a] leading-tight">Recovery</h1>
        </div>
        <button className="relative w-10 h-10 rounded-full bg-white shadow-[0_2px_12px_rgba(0,0,0,0.08)] flex items-center justify-center">
          <Bell size={17} className="text-[#555]" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#ef4444] border-[1.5px] border-white" />
        </button>
      </div>

      <div className="mx-5 mb-4 bg-gradient-to-br from-[#061e1e] to-[#1e5e5e] rounded-[28px] p-5 flex items-center gap-4 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-[120px] h-[120px] rounded-full bg-[#4db8b8]/15 blur-3xl pointer-events-none" />
        <div className="flex-shrink-0 relative">
          <svg width="80" height="80" viewBox="0 0 80 80">
            <circle cx="40" cy="40" r="32" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="8" />
            <circle cx="40" cy="40" r="32" fill="none" stroke="#4db8b8" strokeWidth="8"
              strokeDasharray={`${2 * Math.PI * 32 * score / 100} ${2 * Math.PI * 32}`}
              strokeLinecap="round" transform="rotate(-90 40 40)" />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-[20px] font-bold text-white leading-none">{score}</span>
            <span className="text-[8px] text-white/50 font-semibold">/ 100</span>
          </div>
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-1.5 mb-1">
            <span className="w-2 h-2 rounded-full bg-[#4db8b8]" />
            <p className="text-[10px] font-bold text-[#4db8b8] uppercase tracking-[0.12em]">{hasCoach ? "Coach Reviewed" : "AI Score"}</p>
          </div>
          <p className="text-[17px] font-bold text-white leading-snug mb-1">Good Recovery</p>
          <p className="text-[11px] text-white/60 leading-relaxed">Sleep quality improved. Keep your evening protocol consistent.</p>
        </div>
      </div>

      <div className="mx-5 mb-4 bg-white rounded-[18px] p-1.5 flex gap-1.5 shadow-[0_2px_10px_rgba(0,0,0,0.05)]">
        {([["sleep","🌙","Sleep"],["physical","❤️","Physical"],["habits","✅","Habits"]] as const).map(([t, emoji, label]) => (
          <button key={t} onClick={() => setTab(t as typeof tab)}
            className={`flex-1 py-2 rounded-[12px] text-[11px] font-bold flex items-center justify-center gap-1 transition-all ${tab === t ? "bg-[#1e5e5e] text-white shadow-sm" : "text-[#888]"}`}>
            <span>{emoji}</span>{label}
          </button>
        ))}
      </div>

      {tab !== "habits" && (
        <div className="mx-5">
          <EditableRoutineList
            steps={tab === "sleep" ? sleepProtocol : physicalProtocol}
            onStepsChange={tab === "sleep" ? setSleepProtocol : setPhysicalProtocol}
            onToggle={toggle}
            checkedItems={checkedItems}
            title={tab === "sleep" ? "Tonight's Sleep Protocol" : "Today's Movement Protocol"}
          />
          <button onClick={() => onCategory(tab === "sleep" ? "sleep" : "physical")}
            className="w-full mt-3 py-3.5 rounded-[18px] border-2 border-[#1e5e5e] text-[#1e5e5e] font-bold text-[13px] flex items-center justify-center gap-2 active:bg-[#e8f5f5] transition-colors">
            View Full {tab === "sleep" ? "Sleep" : "Physical"} Plan
          </button>
        </div>
      )}

      {tab === "habits" && (
        <div className="mx-5">
          <EditableHabitList habits={habits} onChange={setHabits} />
        </div>
      )}

      <div className="mx-5 mt-4">
        <MascotBubble text={tab === "sleep" ? "Consistent sleep times matter more than total hours. Pick one bedtime and stick to it this week." : tab === "physical" ? "Two post-meal walks a day is the single highest-impact habit for your blood sugar and energy levels." : "Build one recovery habit at a time. Start with the morning sunlight walk — it sets off a chain reaction."} size="sm" />
      </div>
    </div>
  );
}

// ─── Mental Health Hub ─────────────────────────────────────────────────────────

export function MentalHubScreen({ hasCoach, onBack, onCategory }: {
  hasCoach: boolean;
  onBack: () => void;
  onCategory: () => void;
}) {
  const [mood, setMood] = useState<number | null>(null);
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
  const [breathPhase, setBreathPhase] = useState<"idle" | "in" | "hold1" | "out" | "hold2">("idle");
  const [breathCount, setBreathCount] = useState(0);
  const [mentalHabits, setMentalHabits] = useState<Habit[]>([
    { id: "mh1", icon: "🧘", label: "5-min box breathing on waking", sublabel: "Before phone" },
    { id: "mh2", icon: "📝", label: "Write 3 intentions for today", sublabel: "Morning" },
    { id: "mh3", icon: "🚶", label: "10-min outdoor walk — phone-free", sublabel: "Midday" },
    { id: "mh4", icon: "📵", label: "30-min screen-free focus block", sublabel: "Afternoon" },
    { id: "mh5", icon: "📓", label: "Gratitude — write 3 things", sublabel: "Evening" },
    { id: "mh6", icon: "💡", label: "No news or social after 8pm", sublabel: "Evening" },
  ]);
  const toggle = (k: string) => setCheckedItems(p => ({ ...p, [k]: !p[k] }));

  const [dailyProtocol, setDailyProtocol] = useState<RoutineStep[]>([
    { id: "m1", time: "Morning",   icon: "🧘", action: "5-min box breathing on waking" },
    { id: "m2", time: "Morning",   icon: "📝", action: "Write 3 intentions for today" },
    { id: "m3", time: "Midday",    icon: "🚶", action: "10-min outdoor walk without phone" },
    { id: "m4", time: "Afternoon", icon: "📵", action: "30-min screen-free focus block" },
    { id: "m5", time: "Evening",   icon: "📓", action: "3 things you are grateful for" },
    { id: "m6", time: "Evening",   icon: "💡", action: "Dim lights — no news after 8pm" },
  ]);

  const [breathTimer, setBreathTimer] = useState(4);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (breathPhase === "idle") {
      if (timerRef.current) clearInterval(timerRef.current);
      setBreathTimer(4);
      return;
    }
    setBreathTimer(4);
    timerRef.current = setInterval(() => {
      setBreathTimer(t => {
        if (t <= 1) { if (timerRef.current) clearInterval(timerRef.current); return 4; }
        return t - 1;
      });
    }, 1000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [breathPhase]);

  const startBreath = () => {
    if (breathPhase !== "idle") return;
    setBreathPhase("in");
    setTimeout(() => setBreathPhase("hold1"), 4000);
    setTimeout(() => setBreathPhase("out"), 8000);
    setTimeout(() => setBreathPhase("hold2"), 12000);
    setTimeout(() => { setBreathPhase("idle"); setBreathCount(c => c + 1); }, 16000);
  };

  const sideActive = { idle: -1, in: 0, hold1: 1, out: 2, hold2: 3 }[breathPhase];
  const sideLabels = ["Inhale", "Hold", "Exhale", "Hold"];
  const phaseColors: Record<string, string> = { idle: "#a78bfa", in: "#60a5fa", hold1: "#fbbf24", out: "#34d399", hold2: "#f472b6" };
  const phaseColor = phaseColors[breathPhase];
  const breathLabel = breathPhase === "idle" ? "Box Breathing" : breathPhase === "in" ? "Breathe In" : breathPhase === "hold1" ? "Hold" : breathPhase === "out" ? "Breathe Out" : "Hold";
  const sidePositions = [
    { x1: 24, y1: 176, x2: 176, y2: 176 },
    { x1: 176, y1: 176, x2: 176, y2: 24 },
    { x1: 176, y1: 24, x2: 24, y2: 24 },
    { x1: 24, y1: 24, x2: 24, y2: 176 },
  ];

  const moods = ["😔","😕","😐","🙂","😊"];

  return (
    <div className="flex flex-col pb-6">
      <div className="px-5 pt-12 pb-4 flex items-center gap-3">
        <button onClick={onBack} className="w-10 h-10 rounded-full bg-white shadow-[0_2px_12px_rgba(0,0,0,0.08)] flex items-center justify-center flex-shrink-0">
          <ArrowLeft size={17} className="text-[#555]" />
        </button>
        <div className="flex-1">
          <p className="text-[10px] font-bold text-[#aaa] uppercase tracking-[0.14em]">Daily Protocol</p>
          <h1 className="text-[22px] font-bold text-[#1a1a1a] leading-tight">Mental Health</h1>
        </div>
        <button className="relative w-10 h-10 rounded-full bg-white shadow-[0_2px_12px_rgba(0,0,0,0.08)] flex items-center justify-center">
          <Bell size={17} className="text-[#555]" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#ef4444] border-[1.5px] border-white" />
        </button>
      </div>

      <div className="mx-5 mb-4 bg-white rounded-[24px] p-4 shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
        <p className="text-[13px] font-bold text-[#1a1a1a] mb-3">How are you feeling today?</p>
        <div className="flex gap-2 justify-between">
          {moods.map((m, i) => (
            <button key={i} onClick={() => setMood(i)}
              className={`flex-1 py-2.5 rounded-[14px] text-[22px] transition-all ${mood === i ? "bg-[#e8f5f5] scale-110 shadow-sm" : "bg-[#f5f5f5]"}`}>
              {m}
            </button>
          ))}
        </div>
        {mood !== null && (
          <p className="text-[11px] text-[#1e5e5e] font-semibold mt-2.5 text-center">
            {["Let's work on lifting that mood today.", "Small steps forward — you've got this.", "A neutral day is a foundation day.", "Great! Let's keep that energy going.", "Excellent! Channel this into your plan."][mood]}
          </p>
        )}
      </div>

      <div className="mx-5 mb-4">
        <EditableRoutineList
          steps={dailyProtocol}
          onStepsChange={setDailyProtocol}
          onToggle={toggle}
          checkedItems={checkedItems}
          title="Today's Mental Protocol"
        />
      </div>

      <div className="mx-5 mb-4">
        <p className="text-[14px] font-bold text-[#1a1a1a] mb-3">Box Breathing</p>
        <div className="bg-gradient-to-br from-[#0f0c2e] to-[#2d1f6e] rounded-[28px] overflow-hidden">
          <div className="h-1 transition-all duration-700" style={{ backgroundColor: phaseColor }} />
          <div className="p-6 flex flex-col items-center">
            <div className="relative mb-3">
              <svg width="200" height="200" viewBox="0 0 200 200">
                <defs>
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                    <feMerge><feMergeNode in="coloredBlur" /><feMergeNode in="SourceGraphic" /></feMerge>
                  </filter>
                </defs>
                {sidePositions.map((s, i) => (
                  <line key={i} x1={s.x1} y1={s.y1} x2={s.x2} y2={s.y2}
                    stroke="rgba(255,255,255,0.08)" strokeWidth="2.5" strokeLinecap="round" />
                ))}
                {sidePositions.map((s, i) => {
                  const completed = sideActive > i || (sideActive === -1 && breathCount > 0);
                  return completed ? (
                    <line key={`done-${i}`} x1={s.x1} y1={s.y1} x2={s.x2} y2={s.y2}
                      stroke="rgba(255,255,255,0.22)" strokeWidth="2.5" strokeLinecap="round" />
                  ) : null;
                })}
                {sideActive >= 0 && (
                  <motion.line
                    x1={sidePositions[sideActive].x1} y1={sidePositions[sideActive].y1}
                    x2={sidePositions[sideActive].x2} y2={sidePositions[sideActive].y2}
                    stroke={phaseColor} strokeWidth="4" strokeLinecap="round"
                    filter="url(#glow)"
                    animate={{ strokeWidth: [3.5, 4.5, 3.5] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  />
                )}
                {[[24,24],[176,24],[176,176],[24,176]].map(([cx,cy], i) => (
                  <circle key={i} cx={cx} cy={cy} r="5"
                    fill={sideActive >= 0 && (i === sideActive || i === (sideActive + 1) % 4) ? phaseColor : "rgba(255,255,255,0.18)"}
                    style={{ transition: "fill 0.4s" }}
                  />
                ))}
                {sideActive >= 0 && (
                  <motion.circle r="7" fill="white" filter="url(#glow)"
                    animate={{
                      cx: [sidePositions[sideActive].x1, sidePositions[sideActive].x2],
                      cy: [sidePositions[sideActive].y1, sidePositions[sideActive].y2],
                    }}
                    transition={{ duration: 4, ease: "linear" }}
                  />
                )}
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <p className="text-[11px] font-bold uppercase tracking-[0.15em] mb-1" style={{ color: breathPhase === "idle" ? "rgba(255,255,255,0.4)" : phaseColor }}>
                  {breathLabel}
                </p>
                {breathPhase !== "idle" ? (
                  <p className="text-[42px] font-bold text-white leading-none" style={{ textShadow: `0 0 20px ${phaseColor}` }}>
                    {breathTimer}
                  </p>
                ) : (
                  <p className="text-[13px] font-semibold text-white/30">4 · 4 · 4 · 4</p>
                )}
              </div>
            </div>

            <div className="flex gap-4 mb-5">
              {sideLabels.map((label, i) => (
                <div key={i} className={`flex flex-col items-center gap-1.5 transition-all duration-300 ${i === sideActive ? "opacity-100 scale-110" : "opacity-25"}`}>
                  <div className="w-6 h-1 rounded-full transition-all duration-300"
                    style={{ backgroundColor: i === sideActive ? phaseColor : "rgba(255,255,255,0.3)" }} />
                  <span className="text-[9px] font-bold text-white/70">{label}</span>
                </div>
              ))}
            </div>

            <p className="text-[11px] text-white/35 mb-4 text-center">
              {breathCount > 0 ? `${breathCount} round${breathCount > 1 ? "s" : ""} completed` : "Lowers cortisol in under 2 minutes"}
            </p>
            <button onClick={startBreath} disabled={breathPhase !== "idle"}
              className="px-8 py-3 rounded-full font-bold text-[13px] transition-all active:scale-95"
              style={{ backgroundColor: breathPhase === "idle" ? phaseColor : "rgba(255,255,255,0.1)", color: breathPhase === "idle" ? "white" : "rgba(255,255,255,0.4)" }}>
              {breathPhase === "idle" ? "Start Session" : "Breathing…"}
            </button>
          </div>
        </div>
      </div>

      <div className="mx-5 mb-4">
        <EditableHabitList habits={mentalHabits} onChange={setMentalHabits} />
      </div>

      <div className="mx-5">
        <button onClick={onCategory}
          className="w-full py-3.5 rounded-[18px] border-2 border-[#1e5e5e] text-[#1e5e5e] font-bold text-[13px] flex items-center justify-center gap-2 active:bg-[#e8f5f5] transition-colors">
          View Full Mental Health Plan
        </button>
      </div>

      <div className="mx-5 mt-4">
        <MascotBubble text={hasCoach ? "Your coach flagged this: a 10-min midday walk without your phone is the highest-impact mental reset you can do today." : "The 10-min phone-free walk is the single most evidence-backed mental reset. Even once a week makes a measurable difference."} size="sm" />
      </div>
    </div>
  );
}

// ─── Nutrition Hub ─────────────────────────────────────────────────────────────

export function NutritionHubScreen({ hasCoach }: { hasCoach: boolean }) {
  const [activeSection, setActiveSection] = useState<"meals" | "supplements" | "hydration" | "habits">("meals");
  const [hydration, setHydration] = useState(3);
  const [checkedSupps, setCheckedSupps] = useState<Record<string, boolean>>({});
  const [nutritionHabits, setNutritionHabits] = useState<Habit[]>([
    { id: "nh1", icon: "🥩", label: "Eat 30g+ protein at breakfast", sublabel: "Sets the day right" },
    { id: "nh2", icon: "🥗", label: "Vegetables with every main meal", sublabel: "Fiber + micronutrients" },
    { id: "nh3", icon: "⏰", label: "Eat within a 10-hour window", sublabel: "Time-restricted eating" },
    { id: "nh4", icon: "🚫", label: "No processed sugar after 7pm", sublabel: "Supports sleep quality" },
    { id: "nh5", icon: "🌰", label: "Include healthy fats daily", sublabel: "Avocado, nuts, olive oil" },
  ]);

  const hydrationGoal = 10;
  const hydrationMl = hydration * 250;
  const goalMl = hydrationGoal * 250;

  return (
    <div className="flex flex-col pb-6">
      <div className="px-5 pt-14 pb-4 flex items-center justify-between">
        <div>
          <p className="text-[11px] font-bold text-[#aaa] uppercase tracking-[0.14em] mb-0.5">Daily Nutrition</p>
          <h1 className="text-[24px] font-bold text-[#1a1a1a]">Nutrition</h1>
        </div>
        <button className="relative w-10 h-10 rounded-full bg-white shadow-[0_2px_12px_rgba(0,0,0,0.08)] flex items-center justify-center">
          <Bell size={17} className="text-[#555]" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#ef4444] border-[1.5px] border-white" />
        </button>
      </div>

      <div className="mx-5 mb-4 bg-white rounded-[24px] p-4 shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
        <div className="flex items-center justify-between mb-3">
          <p className="text-[13px] font-bold text-[#1a1a1a]">Today&apos;s Macros</p>
          <span className="text-[11px] font-semibold text-[#888]">1,840 / 2,200 kcal</span>
        </div>
        {[
          { label: "Protein", val: 142, goal: 170, unit: "g", color: "#ef4444" },
          { label: "Carbs",   val: 195, goal: 240, unit: "g", color: "#f59e0b" },
          { label: "Fats",    val: 62,  goal: 75,  unit: "g", color: "#4db8b8" },
        ].map(m => (
          <div key={m.label} className="mb-2.5">
            <div className="flex items-center justify-between mb-1">
              <p className="text-[11px] font-semibold text-[#666]">{m.label}</p>
              <p className="text-[11px] font-bold text-[#1a1a1a]">{m.val}g / {m.goal}g</p>
            </div>
            <div className="h-1.5 rounded-full bg-[#f5f5f5]">
              <div className="h-full rounded-full transition-all" style={{ width: `${Math.min(100, m.val / m.goal * 100)}%`, backgroundColor: m.color }} />
            </div>
          </div>
        ))}
      </div>

      <div className="mx-5 mb-4 bg-white rounded-[18px] p-1.5 flex gap-1.5 shadow-[0_2px_10px_rgba(0,0,0,0.05)]">
        {([["meals","🥗","Meals"],["supplements","💊","Supps"],["hydration","💧","Hydration"],["habits","✅","Habits"]] as const).map(([t, emoji, label]) => (
          <button key={t} onClick={() => setActiveSection(t as typeof activeSection)}
            className={`flex-1 py-2 rounded-[12px] text-[10px] font-bold flex items-center justify-center gap-1 transition-all ${activeSection === t ? "bg-[#1e5e5e] text-white shadow-sm" : "text-[#888]"}`}>
            <span>{emoji}</span>{label}
          </button>
        ))}
      </div>

      {activeSection === "meals" && (
        <div className="mx-5 flex flex-col gap-3">
          {nutritionPlan.meals.map((meal, i) => (
            <div key={i} className="bg-white rounded-[22px] p-4 shadow-[0_2px_10px_rgba(0,0,0,0.05)]">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-[#f0f9f9] flex items-center justify-center text-[20px]">{meal.icon}</div>
                <div className="flex-1">
                  <p className="text-[13px] font-bold text-[#1a1a1a]">{meal.label}</p>
                  <p className="text-[11px] text-[#aaa]">{meal.time} · {meal.calories} kcal</p>
                </div>
              </div>
              <div className="flex flex-col gap-1 mb-2">
                {meal.items.map((item, j) => (
                  <div key={j} className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#4db8b8] flex-shrink-0" />
                    <p className="text-[12px] text-[#555]">{item}</p>
                  </div>
                ))}
              </div>
              <p className="text-[11px] text-[#1e5e5e] font-semibold bg-[#f0f9f9] rounded-[10px] px-3 py-2 leading-snug">{meal.note}</p>
            </div>
          ))}
        </div>
      )}

      {activeSection === "supplements" && (
        <div className="mx-5">
          <div className="flex items-center gap-2 mb-3">
            <div className="relative flex-shrink-0">
              <div className="absolute inset-0 rounded-full bg-[#4db8b8]/20 blur-lg scale-[2]" />
              <ImageWithFallback src={mascotCharImg} alt="Mulhim" className="w-10 h-10 object-contain relative z-10" />
            </div>
            <div className="flex-1 bg-white rounded-[16px] rounded-bl-[4px] px-3 py-2 shadow-[0_2px_10px_rgba(0,0,0,0.06)]">
              <p className="text-[11px] text-[#555] leading-snug">{hasCoach ? "Your coach reviewed these supplements. Take them consistently for 8–12 weeks." : "All your supplements and vitamins are here. Consistency over 8–12 weeks is what creates results."}</p>
            </div>
          </div>
          <div className="bg-white rounded-[24px] overflow-hidden shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
            {nutritionPlan.supplements.map((s, i) => {
              const done = checkedSupps[s.name];
              return (
                <button key={i} onClick={() => setCheckedSupps(p => ({ ...p, [s.name]: !p[s.name] }))}
                  className={`w-full flex items-start gap-3 px-4 py-4 text-left transition-all ${i < nutritionPlan.supplements.length - 1 ? "border-b border-[#f5f5f5]" : ""} ${done ? "opacity-60" : ""}`}>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-[18px] flex-shrink-0 transition-all ${done ? "bg-[#1e5e5e]" : "bg-[#f0f9f9]"}`}>
                    {done ? <CheckCircle2 size={18} className="text-white" /> : <span>{s.icon}</span>}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-[13px] font-bold ${done ? "line-through text-[#bbb]" : "text-[#1a1a1a]"}`}>{s.name}</p>
                    <p className="text-[11px] text-[#1e5e5e] font-semibold mt-0.5">{s.dose} · {s.timing}</p>
                    <p className="text-[11px] text-[#888] mt-1 leading-snug">{s.reason}</p>
                  </div>
                </button>
              );
            })}
          </div>
          <div className="mt-3 bg-[#f0f9f9] rounded-[18px] p-4 border border-[#d0eeee]">
            <p className="text-[11px] font-bold text-[#1e5e5e] mb-1">📍 All supplements are centralized here</p>
            <p className="text-[11px] text-[#666] leading-relaxed">Vitamins, minerals, and supplements for all your health areas — Sleep, Physical, Mental, and Skin — are managed from this single Nutrition page to avoid confusion.</p>
          </div>
        </div>
      )}

      {activeSection === "hydration" && (
        <div className="mx-5">
          <div className="bg-white rounded-[24px] p-5 shadow-[0_2px_12px_rgba(0,0,0,0.06)] mb-4">
            <div className="flex items-center justify-between mb-4">
              <p className="text-[14px] font-bold text-[#1a1a1a]">Hydration Today</p>
              <p className="text-[13px] font-bold text-[#1e5e5e]">{hydrationMl}ml / {goalMl}ml</p>
            </div>
            <div className="grid grid-cols-5 gap-2 mb-4">
              {Array.from({ length: hydrationGoal }).map((_, i) => (
                <button key={i} onClick={() => setHydration(i < hydration ? i : i + 1)}
                  className={`aspect-square rounded-[12px] flex items-center justify-center text-[20px] transition-all ${i < hydration ? "bg-[#e8f5f5] scale-105" : "bg-[#f5f5f5] opacity-40"}`}>
                  💧
                </button>
              ))}
            </div>
            <div className="h-2 rounded-full bg-[#f0f0f0]">
              <div className="h-full rounded-full bg-[#4db8b8] transition-all duration-500" style={{ width: `${hydration / hydrationGoal * 100}%` }} />
            </div>
            <p className="text-[11px] text-center text-[#888] mt-2">{hydrationGoal - hydration > 0 ? `${(hydrationGoal - hydration) * 250}ml to reach your goal` : "🎉 Daily goal reached!"}</p>
          </div>
          <div className="bg-white rounded-[22px] p-4 shadow-[0_2px_10px_rgba(0,0,0,0.05)]">
            <p className="text-[13px] font-bold text-[#1a1a1a] mb-3">Hydration Tips</p>
            {[
              { icon: "🌅", tip: "Start with 2 glasses on waking — before coffee" },
              { icon: "☕", tip: "For every coffee, add 1 extra glass of water" },
              { icon: "🍽️", tip: "Drink a glass before each meal to aid digestion" },
              { icon: "🌙", tip: "Last glass 1 hour before bed — not right before" },
            ].map((t, i) => (
              <div key={i} className={`flex items-center gap-3 py-2.5 ${i < 3 ? "border-b border-[#f5f5f5]" : ""}`}>
                <span className="text-[18px]">{t.icon}</span>
                <p className="text-[12px] text-[#555] leading-snug">{t.tip}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeSection === "habits" && (
        <div className="mx-5 mb-4">
          <EditableHabitList habits={nutritionHabits} onChange={setNutritionHabits} />
        </div>
      )}
    </div>
  );
}

// ─── Exercise Hub ──────────────────────────────────────────────────────────────

export function ExerciseHubScreen({ hasCoach, locale, onFullPlan, onHairSkin }: {
  hasCoach: boolean; locale: Locale; onFullPlan: () => void; onHairSkin: () => void;
}) {
  const weekPlan = buildExercisePlan(locale);
  const dowMap: Record<string, number> = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
  const todayDow = new Date().getDay();
  const todayIdx = weekPlan.findIndex(d => dowMap[d.day] === todayDow);
  const startIdx = todayIdx < 0 ? 0 : todayIdx;
  const [selDay, setSelDay] = useState(startIdx);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [exDone, setExDone] = useState<Record<string, boolean>>({});
  const [weekDone, setWeekDone] = useState<Record<number, boolean>>({ 0: true, 1: true, 2: true });

  const [exerciseHabits, setExerciseHabits] = useState<Habit[]>([
    { id: "ex1", icon: "🥩", label: "Eat protein within 30 min post-workout", sublabel: "30g+ target" },
    { id: "ex2", icon: "💧", label: "Drink 500ml water before training", sublabel: "Pre-session" },
    { id: "ex3", icon: "😴", label: "Sleep 8h for muscle recovery", sublabel: "Every night" },
    { id: "ex4", icon: "🧘", label: "10-min mobility work daily", sublabel: "Morning or evening" },
    { id: "ex5", icon: "🚶", label: "10,000 steps on rest days", sublabel: "NEAT movement" },
  ]);

  const day = weekPlan[selDay];
  const isRest = day.type === "Rest";

  const exDetails: Record<string, { muscles: string; equipment: string; steps: string[] }> = {
    "Barbell Squat":           { muscles: "Quads · Glutes · Hamstrings", equipment: "Barbell + Rack",        steps: ["Feet shoulder-width, bar on upper traps", "Brace core, push knees out over toes", "Descend until thighs parallel or below", "Drive through heels explosively to top"] },
    "Romanian Deadlift":       { muscles: "Hamstrings · Glutes · Low Back", equipment: "Barbell",            steps: ["Hold bar at hips, slight knee bend", "Hinge hips back — bar slides down legs", "Lower until strong hamstring stretch", "Drive hips forward, squeeze glutes at top"] },
    "Box Jumps":               { muscles: "Quads · Glutes · Calves",      equipment: "Plyo box",             steps: ["Stand arm-length from box, feet hip-width", "Dip into quarter squat, swing arms back", "Explode up — pull knees to chest", "Land softly on full foot, absorb through hips"] },
    "Bike or brisk walk":      { muscles: "Aerobic — full body",           equipment: "Bike / outdoors",      steps: ["Warm up 5 min at easy pace", "Maintain heart rate 120–140 bpm", "Breathe through nose when possible", "Cool down 5 min — gradual slowdown"] },
    "Post-session stretch":    { muscles: "Hip flexors · Hamstrings",      equipment: "Mat",                  steps: ["Hip flexor lunge — 60s each side", "Seated hamstring stretch — 60s each", "Standing calf stretch — 30s each"] },
    "Incline Dumbbell Press":  { muscles: "Upper Chest · Front Delts",     equipment: "Dumbbells + Bench",    steps: ["Set bench to 30–45°, dumbbells at chest", "Press up and slightly inward to lockout", "Lower slowly over 3 seconds", "Keep shoulder blades pinched back"] },
    "Barbell Row":             { muscles: "Lats · Rhomboids · Biceps",     equipment: "Barbell",              steps: ["Hinge to 45°, overhand grip outside knees", "Pull bar to lower chest, elbows first", "Pause 1s at top — full contraction", "Lower with control over 2 seconds"] },
    "Weighted Pull-Ups":       { muscles: "Lats · Biceps · Core",          equipment: "Pull-up bar + belt",   steps: ["Dead hang, arms fully extended", "Pull elbows down toward hips", "Chin clears bar at top", "Lower slowly over 3s — no kipping"] },
    "15 min morning sunlight walk": { muscles: "Recovery — full body",     equipment: "Outdoors",             steps: ["Go outside within 30 min of waking", "Easy conversational pace", "Expose face and arms to sunlight", "No sunglasses — let light reach eyes"] },
    "Yoga flow or stretching": { muscles: "Full body flexibility",          equipment: "Mat",                  steps: ["Cat-cow × 10 reps", "Downward dog — 30s hold", "Pigeon pose — 60s each side", "Child's pose — 30s finish"] },
    "Sprint intervals":        { muscles: "Full body — power output",       equipment: "Track / treadmill",    steps: ["10 min progressive warm-up jog", "Sprint at 90% max effort for 30s", "Walk/jog easy for 90s recovery", "Repeat × 8 rounds, cool down 5 min"] },
    "Core circuit":            { muscles: "Abs · Obliques · Low Back",      equipment: "Mat + band",           steps: ["Plank — 45s hold", "Dead bug — 10 reps each side", "Pallof press — 12 reps each side", "Rest 45s — repeat × 3 rounds"] },
    "Outdoor walk":            { muscles: "Recovery — legs, aerobic",        equipment: "Outdoors",            steps: ["Target 60 minutes minimum", "Varied terrain if possible", "Maximum sunlight exposure", "Easy pace — NEAT, not cardio"] },
    "Bodyweight mobility":     { muscles: "Hips · Thoracic spine",           equipment: "Mat",                 steps: ["Hip 90/90 — 60s each side", "World's greatest stretch × 5 each", "Thoracic rotation × 10 each side", "Cat-cow — 10 reps slow"] },
  };

  const typeAccents: Record<string, string> = {
    Strength: "#1e5e5e", Cardio: "#6366f1", HIIT: "#ec4899", Recovery: "#f59e0b", Rest: "#9ca3af",
  };

  const doneCnt = day.exercises.filter(e => exDone[`${selDay}-${e.name}`]).length;
  const allDone = doneCnt === day.exercises.length && day.exercises.length > 0;
  const weekDoneCnt = Object.values(weekDone).filter(Boolean).length;
  const weeklyGoals = [
    { label: "Strength sessions", target: 2, done: weekDoneCnt >= 2 },
    { label: "Cardio sessions", target: 2, done: weekDoneCnt >= 4 },
    { label: "Rest day observed", target: 1, done: true },
  ];

  return (
    <div className="flex flex-col pb-6">
      <div className="px-5 pt-14 pb-4 flex items-center justify-between">
        <div>
          <p className="text-[11px] font-bold text-[#aaa] uppercase tracking-[0.14em] mb-0.5">Daily Workout</p>
          <h1 className="text-[24px] font-bold text-[#1a1a1a]">Exercise</h1>
        </div>
        <button className="relative w-10 h-10 rounded-full bg-white shadow-[0_2px_12px_rgba(0,0,0,0.08)] flex items-center justify-center">
          <Bell size={17} className="text-[#555]" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#ef4444] border-[1.5px] border-white" />
        </button>
      </div>

      <div className="px-5 mb-4">
        <div className="flex gap-1.5 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
          {weekPlan.map((d, i) => {
            const accent = typeAccents[d.type] ?? "#1e5e5e";
            const isSel = i === selDay;
            const isTdy = i === startIdx;
            return (
              <button key={i} onClick={() => setSelDay(i)}
                className="flex-shrink-0 flex flex-col items-center gap-1 px-3 py-2 rounded-[14px] transition-all"
                style={{ backgroundColor: isSel ? accent : "rgba(255,255,255,0.8)" }}>
                <span className={`text-[9px] font-bold uppercase tracking-wide ${isSel ? "text-white/70" : isTdy ? "text-[#1e5e5e]" : "text-[#aaa]"}`}>{d.day}</span>
                <span className="text-[14px]">{d.icon}</span>
                <span className={`text-[8px] font-bold ${isSel ? "text-white" : "text-[#888]"}`}>{d.type}</span>
                {weekDone[i] && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mx-5 mb-4 rounded-[24px] overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.10)]"
        style={{ backgroundColor: typeAccents[day.type] ?? "#1e5e5e" }}>
        <div className="p-4 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-20 pointer-events-none bg-white"
            style={{ filter: "blur(30px)", transform: "translate(30%,-30%)" }} />
          <div className="flex items-start gap-3 relative z-10">
            <span className="text-[36px]">{day.icon}</span>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <p className="text-white font-bold text-[17px]">{day.label}</p>
                {hasCoach && <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-white/20 text-white">👨‍⚕️ ✓</span>}
              </div>
              <p className="text-white/70 text-[12px] mb-3">{day.focus}</p>
              <div className="flex gap-2 flex-wrap">
                {day.duration !== "—" && <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-white/20 text-white">⏱ {day.duration}</span>}
                {day.intensity !== "—" && <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-white/20 text-white">🔥 {day.intensity}</span>}
                <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-white/20 text-white">{day.type}</span>
              </div>
            </div>
          </div>
        </div>
        {!isRest && (
          <div className="px-4 py-2.5 flex items-center justify-between border-t border-white/10 bg-black/15">
            <span className="text-[11px] text-white/60 font-semibold">{doneCnt}/{day.exercises.length} done</span>
            <div className="flex gap-1">
              {day.exercises.map((_, i) => (
                <div key={i} className={`w-2 h-2 rounded-full transition-all ${i < doneCnt ? "bg-white" : "bg-white/25"}`} />
              ))}
            </div>
          </div>
        )}
      </div>

      {!isRest ? (
        <div className="mx-5 mb-4">
          <p className="text-[14px] font-bold text-[#1a1a1a] mb-3">Today&apos;s Exercises</p>
          <div className="flex flex-col gap-3">
            {day.exercises.map((ex, i) => {
              const done = exDone[`${selDay}-${ex.name}`];
              const key = `${selDay}-${ex.name}`;
              const isOpen = expanded === key;
              const detail = exDetails[ex.name];
              return (
                <div key={i} className={`bg-white rounded-[20px] overflow-hidden shadow-[0_2px_10px_rgba(0,0,0,0.05)] ${done ? "opacity-60" : ""}`}>
                  <button className="w-full flex items-center gap-3 p-4 text-left" onClick={() => setExpanded(isOpen ? null : key)}>
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-all ${done ? "bg-[#1e5e5e]" : "bg-[#f0f9f9]"}`}>
                      {done ? <CheckCircle2 size={18} className="text-white" /> : <span>💪</span>}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`text-[13px] font-bold ${done ? "line-through text-[#bbb]" : "text-[#1a1a1a]"}`}>{ex.name}</p>
                      <p className="text-[11px] text-[#1e5e5e] font-semibold">{ex.sets}</p>
                      {detail && <p className="text-[10px] text-[#aaa]">🎯 {detail.muscles} · 🏋️ {detail.equipment}</p>}
                    </div>
                    <ChevronRight size={14} className={`text-[#ccc] flex-shrink-0 transition-transform ${isOpen ? "rotate-90" : ""}`} />
                  </button>
                  {isOpen && detail && (
                    <div className="px-4 pb-4 border-t border-[#f5f5f5]">
                      <p className="text-[11px] font-bold text-[#1a1a1a] mt-3 mb-2">Step-by-step:</p>
                      {detail.steps.map((step, si) => (
                        <div key={si} className="flex gap-2.5 mb-2">
                          <span className="w-5 h-5 rounded-full bg-[#1e5e5e] text-white text-[9px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">{si + 1}</span>
                          <p className="text-[12px] text-[#555] leading-snug">{step}</p>
                        </div>
                      ))}
                      <p className="text-[11px] text-[#888] bg-[#f5f5f5] rounded-[10px] px-3 py-2 mt-2 leading-snug italic">{ex.note}</p>
                      <button onClick={() => setExDone(p => ({ ...p, [key]: !p[key] }))}
                        className={`w-full mt-3 py-3 rounded-[14px] font-bold text-[13px] transition-all ${done ? "bg-[#f5f5f5] text-[#888]" : "bg-[#1e5e5e] text-white active:scale-[0.98]"}`}>
                        {done ? "✓ Done — Tap to undo" : "Mark as Done"}
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          {allDone && (
            <div className="mt-3 bg-[#e8f5f5] rounded-[14px] p-3 text-center">
              <p className="text-[13px] font-bold text-[#1e5e5e]">🎉 Workout complete! Eat protein within 30 min for best recovery.</p>
            </div>
          )}
        </div>
      ) : (
        <div className="mx-5 mb-4 bg-white rounded-[24px] p-5 shadow-[0_2px_12px_rgba(0,0,0,0.06)] text-center">
          <span className="text-[48px]">😴</span>
          <p className="text-[16px] font-bold text-[#1a1a1a] mt-3 mb-1">Full Rest Day</p>
          <p className="text-[12px] text-[#888] leading-relaxed">Muscles grow during recovery, not during training. Protect today — light walking only, 8h sleep.</p>
        </div>
      )}

      <div className="mx-5 mb-4 bg-white rounded-[24px] p-4 shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
        <div className="flex items-center justify-between mb-3">
          <p className="text-[14px] font-bold text-[#1a1a1a]">Weekly Progress</p>
          <span className="text-[11px] font-bold text-[#1e5e5e]">{weekDoneCnt}/7 sessions</span>
        </div>
        <div className="flex gap-1.5 mb-4">
          {weekPlan.map((d, i) => (
            <button key={i} onClick={() => setWeekDone(p => ({ ...p, [i]: !p[i] }))}
              className={`flex-1 rounded-[8px] py-1.5 text-[8px] font-bold transition-all ${weekDone[i] ? "bg-[#1e5e5e] text-white" : "bg-[#f5f5f5] text-[#aaa]"}`}>
              {d.day}
            </button>
          ))}
        </div>
        <div className="flex flex-col gap-2">
          {weeklyGoals.map((g, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${g.done ? "bg-[#1e5e5e]" : "bg-[#f5f5f5]"}`}>
                {g.done ? <CheckCircle2 size={12} className="text-white" /> : <span className="text-[10px] text-[#ccc]">○</span>}
              </div>
              <p className={`text-[12px] font-semibold flex-1 ${g.done ? "text-[#1a1a1a]" : "text-[#aaa]"}`}>{g.label}</p>
              <span className="text-[11px] font-bold text-[#1e5e5e]">×{g.target}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mx-5 mb-4">
        <EditableHabitList habits={exerciseHabits} onChange={setExerciseHabits} />
      </div>

      <div className="mx-5 mb-4">
        <MascotBubble
          text={isRest ? "Rest is not laziness — it's where the adaptation happens. Your body builds muscle, repairs tissue, and strengthens during recovery, not during the workout." : hasCoach ? `Coach says: ${day.label} today. ${day.exercises[0]?.note ?? "Focus on form over weight."}` : `${day.label}: ${day.focus}. ${day.exercises[0]?.note ?? "Quality over quantity every rep."}`}
          size="sm" />
      </div>

      <div className="mx-5 flex flex-col gap-3">
        <button onClick={onFullPlan} className="w-full py-3.5 rounded-[18px] border-2 border-[#1e5e5e] text-[#1e5e5e] font-bold text-[13px] flex items-center justify-center gap-2 active:bg-[#e8f5f5] transition-colors">
          View Full Exercise Plan
        </button>
        <button onClick={onHairSkin} className="w-full py-3 rounded-[18px] bg-white shadow-[0_2px_10px_rgba(0,0,0,0.06)] text-[#1a1a1a] font-semibold text-[13px] flex items-center justify-center gap-2 active:scale-[0.98] transition-transform">
          <span>✨</span> Hair &amp; Skin Protocol
        </button>
      </div>
    </div>
  );
}

// ─── Hair & Skin Hub ───────────────────────────────────────────────────────────

export function HairSkinHubScreen({ hasCoach, onBack }: { hasCoach: boolean; onBack: () => void; }) {
  const [tab, setTab] = useState<"morning" | "evening" | "hair" | "habits">("morning");
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const toggle = (k: string) => setChecked(p => ({ ...p, [k]: !p[k] }));

  const [morningRoutine, setMorningRoutine] = useState<RoutineStep[]>([
    { id: "sk1", time: "7:00", icon: "💦", action: "Splash face with cold water — tightens pores" },
    { id: "sk2", time: "7:05", icon: "🧴", action: "Gentle cleanser — massage 60s, rinse cool" },
    { id: "sk3", time: "7:10", icon: "💧", action: "Hyaluronic acid serum on damp skin" },
    { id: "sk4", time: "7:13", icon: "🌿", action: "Lightweight moisturiser — neck too" },
    { id: "sk5", time: "7:16", icon: "☀️", action: "SPF 50 — every morning, indoors or out" },
  ]);
  const [eveningRoutine, setEveningRoutine] = useState<RoutineStep[]>([
    { id: "ev1", time: "9:00", icon: "🧼", action: "Double cleanse: oil cleanser first to remove SPF" },
    { id: "ev2", time: "9:08", icon: "🌀", action: "AHA/BHA exfoliant 2–3× per week only" },
    { id: "ev3", time: "9:12", icon: "🫁", action: "Retinol or niacinamide serum — thin layer" },
    { id: "ev4", time: "9:16", icon: "🌙", action: "Rich night cream or ceramide moisturiser" },
    { id: "ev5", time: "9:22", icon: "💤", action: "Silk pillowcase — reduces friction and lines" },
  ]);
  const [hairRoutine, setHairRoutine] = useState<RoutineStep[]>([
    { id: "hr1", time: "2–3×/wk", icon: "🚿", action: "Scalp-focused shampoo — massage 2 min" },
    { id: "hr2", time: "Each wash", icon: "🪴", action: "Conditioner on mid-lengths to ends only" },
    { id: "hr3", time: "1×/week", icon: "🫧", action: "Deep conditioning mask — 20 min" },
    { id: "hr4", time: "Daily", icon: "💆", action: "Scalp massage 3 min — stimulates follicles" },
    { id: "hr5", time: "Pre-heat", icon: "🛡️", action: "Heat protectant before any styling tool" },
  ]);
  const [skinHabits, setSkinHabits] = useState<Habit[]>([
    { id: "sh1", icon: "💧", label: "Drink 2.5L water daily", sublabel: "Hydration = glow" },
    { id: "sh2", icon: "☀️", label: "SPF every single morning", sublabel: "Even indoors" },
    { id: "sh3", icon: "🌙", label: "Sleep 8h — back or side position", sublabel: "Collagen repair" },
    { id: "sh4", icon: "🥗", label: "Omega-3 foods 3× per week", sublabel: "Anti-inflammatory" },
    { id: "sh5", icon: "🧘", label: "Manage stress daily", sublabel: "Prevents breakouts" },
  ]);
  const weeklyGoals = [
    { label: "Full morning routine", current: 5, target: 7 },
    { label: "Evening routine", current: 4, target: 7 },
    { label: "Hair wash + condition", current: 2, target: 3 },
    { label: "Deep hair mask", current: 1, target: 1 },
  ];

  const currentRoutine = tab === "morning" ? morningRoutine : tab === "evening" ? eveningRoutine : tab === "hair" ? hairRoutine : [];
  const currentSetter = tab === "morning" ? setMorningRoutine : tab === "evening" ? setEveningRoutine : setHairRoutine;

  return (
    <div className="flex flex-col pb-6">
      <div className="px-5 pt-12 pb-4 flex items-center gap-3">
        <button onClick={onBack} className="w-10 h-10 rounded-full bg-white shadow-[0_2px_12px_rgba(0,0,0,0.08)] flex items-center justify-center flex-shrink-0">
          <ArrowLeft size={17} className="text-[#555]" />
        </button>
        <div className="flex-1">
          <p className="text-[10px] font-bold text-[#aaa] uppercase tracking-[0.14em]">Daily Protocol</p>
          <h1 className="text-[22px] font-bold text-[#1a1a1a] leading-tight">Hair &amp; Skin</h1>
        </div>
        <button className="relative w-10 h-10 rounded-full bg-white shadow-[0_2px_12px_rgba(0,0,0,0.08)] flex items-center justify-center">
          <Bell size={17} className="text-[#555]" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#ef4444] border-[1.5px] border-white" />
        </button>
      </div>

      <div className="mx-5 mb-4 bg-gradient-to-br from-[#3a1a00] to-[#7c4500] rounded-[28px] p-5 flex items-center gap-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[120px] h-[120px] rounded-full bg-[#fbbf24]/20 blur-3xl pointer-events-none" />
        <div className="flex-shrink-0 relative">
          <svg width="80" height="80" viewBox="0 0 80 80">
            <circle cx="40" cy="40" r="32" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="8" />
            <circle cx="40" cy="40" r="32" fill="none" stroke="#fbbf24" strokeWidth="8"
              strokeDasharray={`${2 * Math.PI * 32 * 72 / 100} ${2 * Math.PI * 32}`}
              strokeLinecap="round" transform="rotate(-90 40 40)" />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-[20px] font-bold text-white leading-none">72</span>
            <span className="text-[8px] text-white/50 font-semibold">/ 100</span>
          </div>
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-1.5 mb-1">
            <span className="w-2 h-2 rounded-full bg-[#fbbf24]" />
            <p className="text-[10px] font-bold text-[#fbbf24] uppercase tracking-[0.12em]">{hasCoach ? "Coach Score" : "AI Score"}</p>
          </div>
          <p className="text-[17px] font-bold text-white mb-1">Good Routine</p>
          <p className="text-[11px] text-white/60 leading-relaxed">SPF consistency is your biggest win. Add evening retinol to level up.</p>
        </div>
      </div>

      <div className="mx-5 mb-4 bg-white rounded-[22px] p-4 shadow-[0_2px_10px_rgba(0,0,0,0.05)]">
        <p className="text-[13px] font-bold text-[#1a1a1a] mb-3">Weekly Goals</p>
        {weeklyGoals.map((g, i) => (
          <div key={i} className="mb-2.5">
            <div className="flex justify-between mb-1">
              <p className="text-[11px] font-semibold text-[#666]">{g.label}</p>
              <p className="text-[11px] font-bold text-[#1e5e5e]">{g.current}/{g.target}</p>
            </div>
            <div className="h-1.5 rounded-full bg-[#f5f5f5]">
              <div className="h-full rounded-full bg-[#fbbf24] transition-all" style={{ width: `${Math.min(100, g.current / g.target * 100)}%` }} />
            </div>
          </div>
        ))}
      </div>

      <div className="mx-5 mb-4 bg-white rounded-[18px] p-1.5 grid grid-cols-4 gap-1 shadow-[0_2px_10px_rgba(0,0,0,0.05)]">
        {([["morning","🌅","Morning"],["evening","🌙","Evening"],["hair","💇","Hair"],["habits","✅","Habits"]] as const).map(([t, emoji, label]) => (
          <button key={t} onClick={() => setTab(t)}
            className={`py-2 rounded-[12px] text-[10px] font-bold flex flex-col items-center gap-0.5 transition-all ${tab === t ? "bg-[#1e5e5e] text-white shadow-sm" : "text-[#888]"}`}>
            <span className="text-[13px]">{emoji}</span>{label}
          </button>
        ))}
      </div>

      {tab !== "habits" && (
        <div className="mx-5 mb-4">
          <EditableRoutineList
            steps={currentRoutine}
            onStepsChange={currentSetter}
            onToggle={toggle}
            checkedItems={checked}
            title={tab === "morning" ? "Morning Skincare" : tab === "evening" ? "Evening Skincare" : "Hair Care Routine"}
          />
        </div>
      )}

      {tab === "habits" && (
        <div className="mx-5 mb-4">
          <EditableHabitList habits={skinHabits} onChange={setSkinHabits} />
        </div>
      )}

      <div className="mx-5">
        <MascotBubble
          text={hasCoach ? "Your coach recommends: Add retinol 0.25% to your evening routine 3× per week. Start low and build up — this is the highest-impact addition for long-term skin health." : "SPF is the single most evidence-backed anti-ageing product. Wear it every day — UV damage through windows is real and cumulative."}
          size="sm" />
      </div>
    </div>
  );
}

// ─── Plans Hub ─────────────────────────────────────────────────────────────────

export function PlansHubScreen({ hasCoach, planGenerated, userGoals, onCategory, onSetGoals, onReport }: {
  hasCoach: boolean;
  planGenerated: boolean;
  userGoals: string[];
  onCategory: (id: CategoryId) => void;
  onSetGoals: () => void;
  onReport: () => void;
}) {
  if (!planGenerated) {
    return (
      <div className="flex flex-col pb-10">
        <div className="px-5 pt-14 pb-4">
          <p className="text-[11px] font-bold text-[#aaa] uppercase tracking-[0.14em] mb-0.5">AI Generated</p>
          <h1 className="text-[24px] font-bold text-[#1a1a1a]">My Plans</h1>
        </div>
        <div className="mx-5 bg-gradient-to-br from-[#0a3030] to-[#1e5e5e] rounded-[28px] p-6 flex flex-col items-center text-center">
          <div className="relative mb-4">
            <div className="absolute inset-0 rounded-full bg-[#4db8b8]/25 blur-2xl scale-[2.5]" />
            <ImageWithFallback src={mascotCharImg} alt="Mulhim" className="relative z-10 object-contain" style={{ width: 90, height: 90 }} />
          </div>
          <p className="text-[17px] font-bold text-white mb-2">No plans yet</p>
          <p className="text-[13px] text-white/65 leading-relaxed mb-5">Set your goals and I will build 6 personalised AI plans — one for every area of your health.</p>
          <button onClick={onSetGoals}
            className="w-full py-3.5 rounded-[18px] bg-white text-[#1e5e5e] font-bold text-[14px] shadow-[0_4px_16px_rgba(0,0,0,0.15)] active:scale-[0.98] transition-transform flex items-center justify-center gap-2">
            <Sparkles size={15} />Set My Goals &amp; Build Plans
          </button>
        </div>
      </div>
    );
  }

  const planCards = [
    { id: "sleep" as CategoryId,    icon: "🌙", label: "Sleep",           color: "#1c1f4a", accent: "#8b8ff8", progress: 68, streak: 3,  action: "Dim lights by 9pm tonight" },
    { id: "mental" as CategoryId,   icon: "🧠", label: "Mental Health",   color: "#2a1f4e", accent: "#a78bfa", progress: 55, streak: 5,  action: "5-min box breathing after lunch" },
    { id: "nutrition" as CategoryId,icon: "🥗", label: "Nutrition",        color: "#0d3d2a", accent: "#34d399", progress: 80, streak: 7,  action: "Iron + vitamin C lunch" },
    { id: "physical" as CategoryId, icon: "❤️", label: "Physical Health", color: "#3d1224", accent: "#fb7185", progress: 74, streak: 4,  action: "10-min walk after dinner" },
    { id: "exercise" as CategoryId, icon: "🏋️", label: "Exercise",        color: "#1e3a1e", accent: "#86efac", progress: 60, streak: 2,  action: "Strength A session — 55 min" },
    { id: "skin" as CategoryId,     icon: "✨", label: "Hair & Skin",      color: "#3a1a00", accent: "#fbbf24", progress: 45, streak: 6,  action: "15-min morning sunlight" },
  ];

  const avgProgress = Math.round(planCards.reduce((a, c) => a + c.progress, 0) / planCards.length);

  return (
    <div className="flex flex-col pb-6">
      <div className="px-5 pt-14 pb-4 flex items-center justify-between">
        <div>
          <p className="text-[11px] font-bold text-[#aaa] uppercase tracking-[0.14em] mb-0.5">AI Generated</p>
          <h1 className="text-[24px] font-bold text-[#1a1a1a]">My Plans</h1>
        </div>
        <button onClick={onReport}
          className="px-3 py-2 rounded-full bg-white shadow-[0_2px_10px_rgba(0,0,0,0.08)] flex items-center gap-1.5">
          <TrendingUp size={13} className="text-[#1e5e5e]" />
          <span className="text-[11px] font-bold text-[#1e5e5e]">Report</span>
        </button>
      </div>

      <div className="mx-5 mb-4 bg-gradient-to-br from-[#061e1e] to-[#1e5e5e] rounded-[24px] p-4 flex items-center gap-4">
        <div className="flex-shrink-0 relative">
          <svg width="64" height="64" viewBox="0 0 64 64">
            <circle cx="32" cy="32" r="26" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="6" />
            <circle cx="32" cy="32" r="26" fill="none" stroke="#4db8b8" strokeWidth="6"
              strokeDasharray={`${2 * Math.PI * 26 * avgProgress / 100} ${2 * Math.PI * 26}`}
              strokeLinecap="round" transform="rotate(-90 32 32)" />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-[15px] font-bold text-white">{avgProgress}%</span>
          </div>
        </div>
        <div className="flex-1">
          <p className="text-[10px] font-bold text-[#4db8b8] uppercase tracking-[0.12em] mb-0.5">{hasCoach ? "Coach Reviewed" : "AI Plans"}</p>
          <p className="text-[15px] font-bold text-white leading-snug">Overall Progress</p>
          <p className="text-[11px] text-white/60 mt-0.5">{userGoals.length} goal{userGoals.length !== 1 ? "s" : ""} · 6 active plans · 12 weeks</p>
        </div>
      </div>

      <div className="px-5 flex flex-col gap-3">
        {planCards.map((plan) => (
          <button key={plan.id} onClick={() => onCategory(plan.id)}
            className="w-full rounded-[22px] overflow-hidden shadow-[0_3px_16px_rgba(0,0,0,0.10)] active:scale-[0.98] transition-transform text-left"
            style={{ backgroundColor: plan.color }}>
            <div className="px-4 py-4 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-[100px] h-[100px] rounded-full pointer-events-none"
                style={{ backgroundColor: plan.accent, filter: "blur(35px)", opacity: 0.18, transform: "translate(25%, -25%)" }} />
              <div className="flex items-center gap-3 mb-3 relative z-10">
                <span className="text-[26px]">{plan.icon}</span>
                <div className="flex-1">
                  <p className="text-[14px] font-bold text-white leading-tight">{plan.label}</p>
                  <p className="text-[11px] mt-0.5 leading-snug" style={{ color: "rgba(255,255,255,0.55)" }}>{plan.action}</p>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className="text-[12px] font-bold text-white">{plan.progress}%</span>
                  {plan.streak > 0 && (
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full" style={{ backgroundColor: `${plan.accent}30`, color: plan.accent }}>🔥 {plan.streak}d</span>
                  )}
                  {hasCoach && <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-white/15 text-white/80">👨‍⚕️ ✓</span>}
                </div>
              </div>
              <div className="h-1.5 rounded-full relative z-10" style={{ backgroundColor: `${plan.accent}20` }}>
                <div className="h-full rounded-full" style={{ width: `${plan.progress}%`, backgroundColor: plan.accent }} />
              </div>
            </div>
            <div className="flex items-center justify-between px-4 py-2.5 border-t" style={{ borderColor: "rgba(255,255,255,0.06)", backgroundColor: "rgba(0,0,0,0.15)" }}>
              <span className="text-[10px] font-semibold" style={{ color: "rgba(255,255,255,0.4)" }}>Weekly Plan · Habits · Insights</span>
              <span className="text-[10px] font-bold" style={{ color: plan.accent }}>Open →</span>
            </div>
          </button>
        ))}
      </div>

      <div className="mx-5 mt-4">
        <button onClick={onSetGoals}
          className="w-full py-3.5 rounded-[18px] bg-white shadow-[0_2px_12px_rgba(0,0,0,0.06)] flex items-center justify-center gap-2 active:scale-[0.98] transition-transform">
          <Sparkles size={14} className="text-[#1e5e5e]" />
          <span className="text-[13px] font-bold text-[#1e5e5e]">Edit Goals &amp; Rebuild Plans</span>
        </button>
      </div>
    </div>
  );
}
