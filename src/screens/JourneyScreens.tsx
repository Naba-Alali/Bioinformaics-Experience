import { useState } from "react";
import {
  ArrowLeft, ChevronRight, CheckCircle2, Globe,
} from "lucide-react";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import mascotCharImg from "@/imports/____________2026-07-28_155021-2.png";
import type { Locale } from "../types";
import { suggestedGoals, goals, breakReasons, breakDurations, nutritionPlan, buildExercisePlan } from "../data";
import { MascotBubble, ConfettiLayer } from "../shared";

// ─── My Health Journey Hub ────────────────────────────────────────────────────

export function JourneyHubScreen({ onBack, onMaintenance, onBreak, onSetGoal }: {
  onBack: () => void;
  onMaintenance: () => void;
  onBreak: () => void;
  onSetGoal: () => void;
}) {
  const options = [
    {
      icon: "🏆",
      title: "Maintain My Results",
      desc: "You have achieved your goals. Let Mulhim build a personalised maintenance plan to protect your progress.",
      color: "#1e5e5e",
      accent: "#4db8b8",
      bg: "from-[#0a3030] to-[#1e5e5e]",
      action: onMaintenance,
      badge: "AI Maintenance Plan",
    },
    {
      icon: "🌴",
      title: "Take a Break",
      desc: "Life happens. Pause your journey, set a return date, and we will hold your progress until you are ready.",
      color: "#7c5c2e",
      accent: "#f59e0b",
      bg: "from-[#3a2800] to-[#7c5c2e]",
      action: onBreak,
      badge: "Pause & Resume",
    },
    {
      icon: "🧭",
      title: "Help Me Set My Goals",
      desc: "Not sure what to aim for next? Mulhim will guide you through choosing realistic goals based on your health profile.",
      color: "#3b3582",
      accent: "#a78bfa",
      bg: "from-[#1a1550] to-[#3b3582]",
      action: onSetGoal,
      badge: "AI Goal Guide",
    },
  ];

  return (
    <div className="flex flex-col pb-10">
      <div className="px-5 pt-14 pb-2 flex items-center gap-3">
        <button onClick={onBack}
          className="w-10 h-10 rounded-full bg-white shadow-[0_2px_12px_rgba(0,0,0,0.08)] flex items-center justify-center flex-shrink-0">
          <ArrowLeft size={18} className="text-[#1a1a1a]" />
        </button>
        <div className="flex-1">
          <p className="text-[11px] font-bold text-[#aaa] uppercase tracking-[0.14em]">What&apos;s next?</p>
          <h1 className="text-[22px] font-bold text-[#1a1a1a] leading-tight">My Health Journey</h1>
        </div>
      </div>

      <div className="mx-5 mt-4 mb-5 bg-gradient-to-br from-[#061e1e] to-[#0f3535] rounded-[28px] p-5 flex items-center gap-4 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-[120px] h-[120px] rounded-full bg-[#4db8b8]/15 blur-3xl pointer-events-none" />
        <div className="relative flex-shrink-0">
          <div className="absolute inset-0 rounded-full bg-[#4db8b8]/25 blur-2xl scale-[2.5]" />
          <ImageWithFallback src={mascotCharImg} alt="Mulhim"
            className="relative z-10 object-contain drop-shadow-2xl"
            style={{ width: 80, height: 80 }} />
        </div>
        <div className="flex-1">
          <p className="text-[13px] font-bold text-[#4db8b8] mb-1">You did it! 🎉</p>
          <p className="text-[15px] font-bold text-white leading-snug">
            You have completed a health goal. What would you like to do next?
          </p>
        </div>
      </div>

      <div className="px-5 flex flex-col gap-3">
        {options.map((opt) => (
          <button key={opt.title} onClick={opt.action}
            className={`w-full bg-gradient-to-br ${opt.bg} rounded-[24px] p-5 text-left shadow-[0_4px_20px_rgba(0,0,0,0.15)] active:scale-[0.98] transition-transform overflow-hidden relative`}>
            <div className="absolute top-0 right-0 w-[100px] h-[100px] rounded-full pointer-events-none"
              style={{ backgroundColor: opt.accent, filter: "blur(40px)", opacity: 0.2, transform: "translate(20%, -30%)" }} />
            <div className="flex items-start gap-4 relative z-10">
              <div className="w-14 h-14 rounded-[18px] flex items-center justify-center flex-shrink-0 text-[28px]"
                style={{ backgroundColor: `${opt.accent}25`, border: `1.5px solid ${opt.accent}40` }}>
                {opt.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <p className="text-[15px] font-bold text-white leading-snug">{opt.title}</p>
                </div>
                <p className="text-[12px] leading-relaxed mb-2.5" style={{ color: "rgba(255,255,255,0.6)" }}>
                  {opt.desc}
                </p>
                <span className="inline-block px-2.5 py-1 rounded-full text-[10px] font-bold"
                  style={{ backgroundColor: `${opt.accent}30`, color: opt.accent }}>
                  {opt.badge}
                </span>
              </div>
              <ChevronRight size={18} className="flex-shrink-0 mt-1" style={{ color: `${opt.accent}80` }} />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── Screen 10: AI Goal Builder ───────────────────────────────────────────────

export function AIGoalBuilder({ hasCoach, onBack, onMaintenance, onBreak }: { hasCoach: boolean; onBack: () => void; onMaintenance: () => void; onBreak: () => void }) {
  const [phase, setPhase] = useState<"suggest" | "customize" | "plan">("suggest");
  const [selectedGoal, setSelectedGoal] = useState(suggestedGoals[0]);
  const [generating, setGenerating] = useState(false);
  const [activeWeek, setActiveWeek] = useState(0);

  const handleGenerate = () => { setGenerating(true); setTimeout(() => { setGenerating(false); setPhase("plan"); }, 1800); };

  const weekPlan = [
    { week: 1, title: "Foundation Week", emoji: "🌱", tasks: ["Set morning sunlight reminder at 8am", "Buy Vitamin D3 + K2 supplement", "Take baseline energy selfie-rating"], done: [true, true, false] },
    { week: 2, title: "Build Momentum", emoji: "⚡", tasks: ["Complete 7/7 sunlight walks", "Track glucose readings daily", "Add iron-rich lunch 4× this week"], done: [false, false, false] },
    { week: 3, title: "Compound Effect", emoji: "📈", tasks: ["Introduce post-dinner walks", "Add Vitamin C pairing to iron meals", "Assess energy levels — rate 1–10"], done: [false, false, false] },
    { week: 4, title: "Retest & Reflect", emoji: "🔬", tasks: ["Schedule next lab appointment", "Review app habit completion rate", "Celebrate your wins!"], done: [false, false, false] },
  ];

  return (
    <div className="flex flex-col pb-10">
      <div className="px-5 pt-14 pb-4 flex items-center gap-3">
        <button onClick={phase === "suggest" ? onBack : () => setPhase("suggest")} className="w-10 h-10 rounded-full bg-white shadow-[0_2px_12px_rgba(0,0,0,0.08)] flex items-center justify-center flex-shrink-0">
          <ArrowLeft size={18} className="text-[#1a1a1a]" />
        </button>
        <div className="flex-1"><p className="text-[11px] font-semibold text-[#aaa] uppercase tracking-[0.12em]">Personalized Plan</p><h1 className="text-[22px] font-bold text-[#1a1a1a]">Goal Builder</h1></div>
      </div>

      {phase === "suggest" && (
        <>
          <div className="px-5 mb-4">
            <MascotBubble text="Based on your biomarkers, I recommend starting with one of these goals. Pick the one that motivates you most!" size="sm" />
          </div>
          <div className="px-5 mb-4">
            <p className="text-[14px] font-bold text-[#1a1a1a] mb-3">AI-Suggested Goals</p>
            <div className="flex flex-col gap-3">
              {suggestedGoals.map((g) => (
                <button key={g.id} onClick={() => { setSelectedGoal(g); setPhase("customize"); }}
                  className={`rounded-[22px] p-4 text-left shadow-[0_2px_12px_rgba(0,0,0,0.06)] active:scale-[0.98] transition-all border-2 ${selectedGoal.id === g.id ? "border-[#1e5e5e]" : "border-transparent"}`}
                  style={{ backgroundColor: g.color }}>
                  <div className="flex items-center gap-3">
                    <span className="text-[28px]">{g.icon}</span>
                    <div className="flex-1"><p className="text-[14px] font-bold text-[#1a1a1a]">{g.title}</p><p className="text-[11px] text-[#666]">{g.subtitle}</p></div>
                    <div className="text-right">
                      <p className="text-[11px] text-[#888]">{g.duration}</p>
                      <p className="text-[10px] font-bold text-[#1e5e5e]">+{g.xp} XP</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </>
      )}

      {phase === "customize" && (
        <>
          <div className="mx-5 mb-4 rounded-[24px] p-5" style={{ backgroundColor: selectedGoal.color }}>
            <div className="flex items-center gap-3 mb-3">
              <span className="text-[32px]">{selectedGoal.icon}</span>
              <div><p className="text-[17px] font-bold text-[#1a1a1a]">{selectedGoal.title}</p><p className="text-[12px] text-[#666]">{selectedGoal.subtitle}</p></div>
            </div>
            <p className="text-[13px] text-[#555] leading-relaxed mb-3">{selectedGoal.why}</p>
            <div className="flex flex-col gap-2">
              {selectedGoal.steps.map((step, i) => (
                <div key={i} className="flex items-center gap-2.5 bg-white/60 rounded-[12px] px-3 py-2.5">
                  <div className="w-6 h-6 rounded-full bg-[#1e5e5e] flex items-center justify-center flex-shrink-0"><span className="text-[10px] font-bold text-white">{i + 1}</span></div>
                  <p className="text-[12px] font-semibold text-[#1a1a1a]">{step}</p>
                </div>
              ))}
            </div>
          </div>
          <button onClick={handleGenerate} disabled={generating}
            className="mx-5 py-4 rounded-[18px] bg-[#1e5e5e] text-white font-bold text-[16px] shadow-[0_4px_20px_rgba(30,94,94,0.3)] active:scale-[0.98] transition-transform disabled:opacity-70">
            {generating ? "Building your plan…" : "Generate My Plan 🚀"}
          </button>
        </>
      )}

      {phase === "plan" && (
        <>
          <div className="mx-5 mb-4 bg-[#1e5e5e] rounded-[28px] p-5 shadow-[0_4px_20px_rgba(30,94,94,0.25)]">
            <div className="flex items-center gap-3 mb-3">
              <div className="relative flex-shrink-0">
                <div className="absolute inset-0 rounded-full bg-white/20 blur-md scale-150" />
                <ImageWithFallback src={mascotCharImg} alt="Mulhim mascot" className="w-[60px] h-[60px] object-contain relative z-10" />
              </div>
              <div className="flex-1">
                <p className="text-[11px] text-white/60 uppercase tracking-[0.1em] font-semibold mb-0.5">
                  {hasCoach ? "Coach-Reviewed Plan" : "AI-Generated Plan"}
                </p>
                <p className="text-[17px] font-bold text-white">{selectedGoal.title}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <div className="flex-1 bg-white/10 rounded-[14px] p-2.5 text-center"><p className="text-[18px] font-bold text-white">{selectedGoal.duration}</p><p className="text-[10px] text-white/60">Duration</p></div>
              <div className="flex-1 bg-white/10 rounded-[14px] p-2.5 text-center"><p className="text-[18px] font-bold text-white">+{selectedGoal.xp}</p><p className="text-[10px] text-white/60">XP Reward</p></div>
              <div className="flex-1 bg-white/10 rounded-[14px] p-2.5 text-center"><p className="text-[18px] font-bold text-white">28</p><p className="text-[10px] text-white/60">Daily tasks</p></div>
            </div>
          </div>

          <div className="mx-5 mb-3">
            <div className="flex gap-1.5 bg-white rounded-[18px] p-1.5 shadow-[0_2px_10px_rgba(0,0,0,0.05)] mb-4">
              {weekPlan.map((w, i) => (
                <button key={i} onClick={() => setActiveWeek(i)}
                  className={`flex-1 py-2 rounded-[14px] text-[11px] font-bold transition-all ${activeWeek === i ? "bg-[#1e5e5e] text-white shadow-sm" : "text-[#888]"}`}>
                  Wk {w.week}
                </button>
              ))}
            </div>
            <div className="bg-white rounded-[24px] p-4 shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-[22px]">{weekPlan[activeWeek].emoji}</span>
                <div><p className="text-[14px] font-bold text-[#1a1a1a]">Week {weekPlan[activeWeek].week}: {weekPlan[activeWeek].title}</p><p className="text-[11px] text-[#aaa]">{weekPlan[activeWeek].tasks.length} tasks this week</p></div>
              </div>
              <div className="flex flex-col gap-3">
                {weekPlan[activeWeek].tasks.map((task, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${weekPlan[activeWeek].done[i] ? "bg-[#1e5e5e]" : "border-2 border-[#ddd]"}`}>
                      {weekPlan[activeWeek].done[i] && <CheckCircle2 size={14} className="text-white" />}
                    </div>
                    <p className={`text-[13px] leading-relaxed flex-1 ${weekPlan[activeWeek].done[i] ? "line-through text-[#bbb]" : "text-[#444]"}`}>{task}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="px-5 flex flex-col gap-3">
            <button className="w-full py-4 rounded-[18px] bg-[#1e5e5e] text-white font-bold text-[16px] shadow-[0_4px_20px_rgba(30,94,94,0.3)] active:scale-[0.98] transition-transform">Start My Plan 🚀</button>
            <div className="flex gap-3">
              <button onClick={onMaintenance} className="flex-1 py-3.5 rounded-[18px] border-2 border-[#1e5e5e] text-[#1e5e5e] font-bold text-[13px] active:bg-[#e8f5f5] transition-colors">Maintenance</button>
              <button onClick={onBreak} className="flex-1 py-3.5 rounded-[18px] border-2 border-[#ddd] text-[#888] font-bold text-[13px] active:bg-[#f5f5f5] transition-colors">Take a Break</button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

// ─── Screen 11: Maintenance ───────────────────────────────────────────────────

export function MaintenancePlan({ hasCoach, onBack, onBreak }: { hasCoach: boolean; onBack: () => void; onBreak: () => void }) {
  const [checkedIn, setCheckedIn] = useState<Record<string, boolean>>({});
  const toggle = (key: string) => setCheckedIn((p) => ({ ...p, [key]: !p[key] }));
  const habits = [
    { id: "sunlight", icon: "☀️", name: "Morning sunlight", freq: "Daily" },
    { id: "walk", icon: "🚶", name: "Post-meal walk", freq: "2× daily" },
    { id: "iron", icon: "🥩", name: "Iron-rich meal", freq: "Daily" },
    { id: "sleep", icon: "🌙", name: "7+ hours sleep", freq: "Daily" },
    { id: "supplement", icon: "💊", name: "Vitamin D3 supplement", freq: "Daily" },
    { id: "hydration", icon: "💧", name: "8 glasses of water", freq: "Daily" },
  ];
  const monthlyReview = [
    { icon: "☀️", name: "Vitamin D", prev: "22", current: "31", unit: "ng/mL", improved: true },
    { icon: "📊", name: "Blood Glucose", prev: "102", current: "96", unit: "mg/dL", improved: true },
    { icon: "⚡", name: "Ferritin", prev: "15", current: "28", unit: "ng/mL", improved: true },
  ];

  return (
    <div className="flex flex-col pb-10">
      <div className="px-5 pt-14 pb-4 flex items-center gap-3">
        <button onClick={onBack} className="w-10 h-10 rounded-full bg-white shadow-[0_2px_12px_rgba(0,0,0,0.08)] flex items-center justify-center flex-shrink-0">
          <ArrowLeft size={18} className="text-[#1a1a1a]" />
        </button>
        <div className="flex-1"><p className="text-[11px] font-semibold text-[#aaa] uppercase tracking-[0.12em]">You did it!</p><h1 className="text-[22px] font-bold text-[#1a1a1a]">Maintenance Mode</h1></div>
        <span className="text-[28px]">🏆</span>
      </div>

      <div className="mx-5 mb-4 bg-[#1e5e5e] rounded-[28px] p-5 shadow-[0_4px_20px_rgba(30,94,94,0.25)]">
        <div className="flex items-center gap-4">
          <div className="relative flex-shrink-0">
            <div className="absolute inset-0 rounded-full bg-white/20 blur-lg scale-150" />
            <ImageWithFallback src={mascotCharImg} alt="Happy mascot" className="w-[70px] h-[70px] object-contain relative z-10" />
          </div>
          <div className="flex-1">
            <p className="text-[16px] font-bold text-white leading-snug mb-1">You&apos;ve reached your goals! 🎉</p>
            <p className="text-[12px] text-white/70 leading-relaxed">
              {hasCoach ? "Your coach is proud of your progress." : "Your AI plan worked — keep the momentum going."} Maintenance mode is lighter — just the habits that matter most.
            </p>
          </div>
        </div>
      </div>

      <div className="flex gap-3 mx-5 mb-4">
        {[{ label: "Day Streak", value: "42", icon: "🔥" }, { label: "XP Earned", value: "850", icon: "⭐" }, { label: "Goals Met", value: "3/3", icon: "✅" }].map((s) => (
          <div key={s.label} className="flex-1 bg-white rounded-[20px] p-3 shadow-[0_2px_10px_rgba(0,0,0,0.06)] text-center">
            <p className="text-[18px] mb-0.5">{s.icon}</p>
            <p className="text-[16px] font-bold text-[#1e5e5e]">{s.value}</p>
            <p className="text-[10px] text-[#aaa] font-semibold">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="px-5 mb-4">
        <div className="flex items-center justify-between mb-3"><h2 className="text-[15px] font-bold text-[#1a1a1a]">Weekly Check-in</h2><span className="text-[11px] font-semibold text-[#1e5e5e]">Oct 14–20</span></div>
        <div className="bg-white rounded-[24px] p-4 shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
          <div className="flex gap-1.5 mb-4">
            {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
              <div key={i} className={`flex-1 aspect-square rounded-[10px] flex items-center justify-center text-[11px] font-bold ${i < 5 ? "bg-[#1e5e5e] text-white" : "bg-[#f0f0f0] text-[#bbb]"}`}>{d}</div>
            ))}
          </div>
          <div className="flex flex-col gap-2.5">
            {habits.map((h) => (
              <button key={h.id} onClick={() => toggle(h.id)} className="flex items-center gap-3">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 transition-all ${checkedIn[h.id] ? "bg-[#1e5e5e]" : "border-2 border-[#ddd]"}`}>
                  {checkedIn[h.id] && <CheckCircle2 size={14} className="text-white" />}
                </div>
                <span className="text-[16px]">{h.icon}</span>
                <p className={`text-[13px] font-semibold flex-1 text-left ${checkedIn[h.id] ? "line-through text-[#bbb]" : "text-[#1a1a1a]"}`}>{h.name}</p>
                <span className="text-[10px] text-[#aaa] font-medium">{h.freq}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="px-5 mb-4">
        <h2 className="text-[15px] font-bold text-[#1a1a1a] mb-3">Monthly Progress</h2>
        <div className="bg-white rounded-[24px] p-4 shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
          {monthlyReview.map((m, i) => (
            <div key={m.name} className={`flex items-center gap-3 py-3 ${i < monthlyReview.length - 1 ? "border-b border-[#f3f3f3]" : ""}`}>
              <span className="text-[18px]">{m.icon}</span>
              <p className="text-[13px] font-bold text-[#1a1a1a] flex-1">{m.name}</p>
              <p className="text-[12px] text-[#aaa]">{m.prev} →</p>
              <p className="text-[13px] font-bold text-emerald-600">{m.current} <span className="text-[10px] font-normal">{m.unit}</span></p>
              <span className="text-[14px]">✅</span>
            </div>
          ))}
        </div>
      </div>

      <div className="px-5 flex flex-col gap-3">
        <button className="w-full py-4 rounded-[18px] bg-[#1e5e5e] text-white font-bold text-[16px] shadow-[0_4px_20px_rgba(30,94,94,0.3)] active:scale-[0.98] transition-transform">Continue Maintenance Mode</button>
        <button onClick={onBreak} className="w-full py-3.5 rounded-[18px] border-2 border-[#ddd] text-[#888] font-bold text-[14px] active:bg-[#f5f5f5] transition-colors">Take a Break</button>
      </div>
    </div>
  );
}

// ─── Screen 12: Take a Break ──────────────────────────────────────────────────

export function TakeABreak({ onBack, onResume }: { onBack: () => void; onResume: () => void }) {
  const [selectedReason, setSelectedReason] = useState<string | null>(null);
  const [selectedDuration, setSelectedDuration] = useState<string | null>(null);
  const [pauseReminders, setPauseReminders] = useState(true);
  const [confirmed, setConfirmed] = useState(false);

  const resumeDate = () => {
    const base = new Date();
    if (selectedDuration === "1 week") base.setDate(base.getDate() + 7);
    else if (selectedDuration === "2 weeks") base.setDate(base.getDate() + 14);
    else if (selectedDuration === "1 month") base.setMonth(base.getMonth() + 1);
    else if (selectedDuration === "3 months") base.setMonth(base.getMonth() + 3);
    else base.setDate(base.getDate() + 7);
    return base.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
  };

  if (confirmed) return (
    <div className="flex flex-col min-h-screen px-5">
      <div className="pt-14 pb-4 flex items-center">
        <button onClick={onBack} className="w-10 h-10 rounded-full bg-white shadow-[0_2px_12px_rgba(0,0,0,0.08)] flex items-center justify-center">
          <ArrowLeft size={18} className="text-[#1a1a1a]" />
        </button>
      </div>
      <div className="flex-1 flex flex-col items-center justify-center text-center">
        <div className="relative mb-6">
          <div className="absolute inset-0 rounded-full bg-[#4db8b8]/15 blur-3xl scale-150" />
          <ImageWithFallback src={mascotCharImg} alt="Mulhim mascot waving" className="w-[160px] h-[160px] object-contain relative z-10 drop-shadow-xl" />
        </div>
        <h1 className="text-[24px] font-bold text-[#1a1a1a] mb-2">Enjoy your break! 🌴</h1>
        <p className="text-[14px] text-[#888] leading-relaxed max-w-[280px] mb-6">I&apos;ll be here when you&apos;re ready. Your progress is saved — nothing will be lost.</p>
        <div className="w-full bg-white rounded-[24px] p-5 shadow-[0_2px_16px_rgba(0,0,0,0.07)] mb-5 text-left">
          {[
            { label: "Reason", value: breakReasons.find(r => r.id === selectedReason)?.label ?? "—" },
            { label: "Duration", value: selectedDuration ?? "—" },
            { label: "Reminders", value: pauseReminders ? "Paused" : "Active" },
            { label: "Resume date", value: selectedDuration ? resumeDate() : "—", teal: true },
          ].map((row, i, arr) => (
            <div key={row.label} className={`flex justify-between items-center py-3 ${i < arr.length - 1 ? "border-b border-[#f3f3f3]" : ""}`}>
              <p className="text-[12px] text-[#aaa] font-semibold">{row.label}</p>
              <p className={`text-[13px] font-bold ${row.teal ? "text-[#1e5e5e]" : "text-[#1a1a1a]"}`}>{row.value}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="pb-10 pt-2">
        <button onClick={onResume} className="w-full py-4 rounded-[18px] bg-[#1e5e5e] text-white font-bold text-[16px] shadow-[0_4px_20px_rgba(30,94,94,0.3)] active:scale-[0.98] transition-transform">Back to Home</button>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col pb-10">
      <div className="px-5 pt-14 pb-4 flex items-center gap-3">
        <button onClick={onBack} className="w-10 h-10 rounded-full bg-white shadow-[0_2px_12px_rgba(0,0,0,0.08)] flex items-center justify-center flex-shrink-0">
          <ArrowLeft size={18} className="text-[#1a1a1a]" />
        </button>
        <div className="flex-1"><p className="text-[11px] font-semibold text-[#aaa] uppercase tracking-[0.12em]">It&apos;s okay to rest</p><h1 className="text-[22px] font-bold text-[#1a1a1a]">Take a Break</h1></div>
        <span className="text-[28px]">🌴</span>
      </div>

      <div className="mx-5 mb-4 rounded-[28px] bg-[#e8f5f5] p-5 flex items-center gap-4">
        <div className="relative flex-shrink-0">
          <div className="absolute inset-0 rounded-full bg-[#4db8b8]/20 blur-xl scale-150" />
          <ImageWithFallback src={mascotCharImg} alt="Mulhim mascot" className="w-[80px] h-[80px] object-contain relative z-10" />
        </div>
        <div className="flex-1"><p className="text-[14px] font-bold text-[#1a1a1a] mb-1">Rest is part of progress.</p><p className="text-[12px] text-[#888] leading-relaxed">Life happens. Take the time you need — your data and streaks will be here when you return.</p></div>
      </div>

      <div className="px-5 mb-4">
        <p className="text-[15px] font-bold text-[#1a1a1a] mb-3">Why are you taking a break?</p>
        <div className="flex flex-col gap-2">
          {breakReasons.map((r) => (
            <button key={r.id} onClick={() => setSelectedReason(r.id)}
              className={`flex items-center gap-3 px-4 py-3.5 rounded-[18px] border-2 transition-all ${selectedReason === r.id ? "border-[#1e5e5e] bg-[#e8f5f5]" : "border-transparent bg-white shadow-[0_2px_8px_rgba(0,0,0,0.05)]"}`}>
              <span className="text-[22px]">{r.icon}</span>
              <p className={`text-[14px] font-bold flex-1 text-left ${selectedReason === r.id ? "text-[#1e5e5e]" : "text-[#1a1a1a]"}`}>{r.label}</p>
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${selectedReason === r.id ? "border-[#1e5e5e] bg-[#1e5e5e]" : "border-[#ddd]"}`}>
                {selectedReason === r.id && <div className="w-2 h-2 rounded-full bg-white" />}
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="px-5 mb-4">
        <p className="text-[15px] font-bold text-[#1a1a1a] mb-3">How long?</p>
        <div className="flex flex-wrap gap-2">
          {breakDurations.map((d) => (
            <button key={d} onClick={() => setSelectedDuration(d)}
              className={`px-4 py-2.5 rounded-[14px] text-[13px] font-bold border-2 transition-all ${selectedDuration === d ? "bg-[#1e5e5e] border-[#1e5e5e] text-white" : "bg-white border-transparent text-[#666] shadow-[0_2px_8px_rgba(0,0,0,0.05)]"}`}>
              {d}
            </button>
          ))}
        </div>
      </div>

      {selectedDuration && selectedDuration !== "Custom" && (
        <div className="mx-5 mb-4 bg-white rounded-[22px] p-4 shadow-[0_2px_12px_rgba(0,0,0,0.06)] flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-[#e8f5f5] flex items-center justify-center text-[18px] flex-shrink-0">📅</div>
          <div><p className="text-[11px] text-[#aaa] font-semibold">Estimated resume date</p><p className="text-[14px] font-bold text-[#1e5e5e]">{resumeDate()}</p></div>
        </div>
      )}

      <div className="mx-5 mb-5 bg-white rounded-[22px] p-4 shadow-[0_2px_12px_rgba(0,0,0,0.06)] flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-[#f5f5f5] flex items-center justify-center text-[18px] flex-shrink-0">🔔</div>
        <div className="flex-1"><p className="text-[13px] font-bold text-[#1a1a1a]">Pause reminders</p><p className="text-[11px] text-[#aaa]">No notifications during your break</p></div>
        <button onClick={() => setPauseReminders((v) => !v)}
          className={`w-12 h-6 rounded-full flex items-center transition-all duration-200 px-0.5 ${pauseReminders ? "bg-[#1e5e5e] justify-end" : "bg-[#ddd] justify-start"}`}>
          <div className="w-5 h-5 rounded-full bg-white shadow-sm" />
        </button>
      </div>

      <div className="px-5 flex flex-col gap-3">
        <button onClick={() => { if (selectedReason && selectedDuration) setConfirmed(true); }} disabled={!selectedReason || !selectedDuration}
          className="w-full py-4 rounded-[18px] bg-[#1e5e5e] text-white font-bold text-[16px] shadow-[0_4px_20px_rgba(30,94,94,0.3)] active:scale-[0.98] transition-transform disabled:opacity-40">
          Confirm Break 🌴
        </button>
        <button onClick={onBack} className="w-full py-3.5 rounded-[18px] border-2 border-[#ddd] text-[#888] font-bold text-[14px] active:bg-[#f5f5f5] transition-colors">Never mind, keep going</button>
      </div>
    </div>
  );
}

// ─── Screen 13: AI Health Plan Builder ───────────────────────────────────────

const healthProfiles = [
  { id: "vitamin", icon: "☀️", label: "Vitamin Absorption", status: "Needs support", statusColor: "#f59e0b",
    color: "#fff8e8", accentColor: "#f59e0b",
    insight: "Your body absorbs Vitamin D less efficiently than average. This means you need more daily sun and a supplement to reach healthy levels.",
    action: "Daily Vitamin D supplement + 15 min morning sunlight" },
  { id: "energy", icon: "⚡", label: "Iron & Energy", status: "Needs support", statusColor: "#ef4444",
    color: "#fff0f0", accentColor: "#ef4444",
    insight: "Your iron stores are low, which is the most common cause of persistent fatigue. The good news: this responds quickly to targeted nutrition.",
    action: "Iron-rich meals twice daily + vitamin C pairing" },
  { id: "heart", icon: "❤️", label: "Heart Health Profile", status: "Looking good", statusColor: "#22c55e",
    color: "#f0fff4", accentColor: "#22c55e",
    insight: "Your cardiovascular health profile is well-suited to a balanced diet with healthy fats. Your heart markers are stable — great foundation to build on.",
    action: "Maintain balanced diet with olive oil, fish, and nuts" },
  { id: "muscle", icon: "💪", label: "Muscle & Strength", status: "Power advantage", statusColor: "#ec4899",
    color: "#fdf0f7", accentColor: "#ec4899",
    insight: "Your body is built for power-based training — you build strength and muscle faster than average from heavy lifting and sprint work.",
    action: "3× weekly strength training + weekly sprint session" },
  { id: "stress", icon: "🧠", label: "Stress Response", status: "Fast recovery", statusColor: "#6366f1",
    color: "#f0f0ff", accentColor: "#6366f1",
    insight: "Your body bounces back from stress quickly. However, this can also mean you push too hard without noticing. Protect your mental recovery time.",
    action: "Daily breathing practice + digital sunset at 8pm" },
];

export function GeneticPlanBuilder({ hasCoach, locale, onBack }: { hasCoach: boolean; locale: Locale; onBack: () => void }) {
  const [phase, setPhase] = useState<"intro" | "goals" | "insights" | "nutrition" | "exercise" | "plan">("intro");
  const [selectedGoals, setSelectedGoals] = useState<string[]>(["energy"]);
  const [selectedProfile, setSelectedProfile] = useState(healthProfiles[0]);
  const [activeDay, setActiveDay] = useState(0);
  const [generating, setGenerating] = useState(false);
  const [activeMealTab, setActiveMealTab] = useState<"meals" | "macros" | "supplements">("meals");
  const exercisePlan = buildExercisePlan(locale);

  const toggleGoal = (id: string) => setSelectedGoals((prev) =>
    prev.includes(id) ? prev.filter((g) => g !== id) : prev.length < 3 ? [...prev, id] : prev
  );
  const handleGenerate = () => { setGenerating(true); setTimeout(() => { setGenerating(false); setPhase("plan"); }, 2000); };

  const circumference = 2 * Math.PI * 20;

  const backPhase = () => {
    if (phase === "intro") onBack();
    else if (phase === "goals") setPhase("intro");
    else if (phase === "insights") setPhase("goals");
    else if (phase === "nutrition") setPhase("insights");
    else if (phase === "exercise") setPhase("nutrition");
    else setPhase("exercise");
  };

  return (
    <div className="flex flex-col pb-10">
      <div className="px-5 pt-14 pb-4 flex items-center gap-3">
        <button onClick={backPhase} className="w-10 h-10 rounded-full bg-white shadow-[0_2px_12px_rgba(0,0,0,0.08)] flex items-center justify-center flex-shrink-0">
          <ArrowLeft size={18} className="text-[#1a1a1a]" />
        </button>
        <div className="flex-1 min-w-0">
          <p className="text-[11px] font-semibold text-[#aaa] uppercase tracking-[0.12em]">AI · Personalised Plan</p>
          <h1 className="text-[20px] font-bold text-[#1a1a1a] leading-tight">Health Plan Builder</h1>
        </div>
        <span className="text-[28px]">✨</span>
      </div>

      {phase !== "intro" && phase !== "plan" && (
        <div className="px-5 mb-5">
          <div className="flex items-center gap-1.5">
            {(["goals", "insights", "nutrition", "exercise"] as const).map((p, i) => (
              <div key={p} className={`h-1.5 rounded-full flex-1 transition-all duration-300 ${["goals", "insights", "nutrition", "exercise"].indexOf(phase) >= i ? "bg-[#1e5e5e]" : "bg-[#e4e4e4]"}`} />
            ))}
          </div>
          <div className="flex justify-between mt-1.5">
            {["Goals", "Insights", "Nutrition", "Exercise"].map((label) => (
              <p key={label} className="text-[9px] font-semibold text-[#bbb] uppercase tracking-wide">{label}</p>
            ))}
          </div>
        </div>
      )}

      {phase === "intro" && (
        <>
          <div className="mx-5 mb-4 rounded-[28px] overflow-hidden">
            <div className="bg-gradient-to-br from-[#0d4040] to-[#1e7070] p-6 flex flex-col items-center text-center relative">
              <div className="absolute top-4 left-4 text-[40px] opacity-10 rotate-12 select-none">✨</div>
              <div className="absolute bottom-4 right-4 text-[40px] opacity-10 -rotate-12 select-none">🔬</div>
              <div className="relative mb-4">
                <div className="absolute inset-0 rounded-full bg-white/15 blur-2xl scale-[2]" />
                <ImageWithFallback src={mascotCharImg} alt="Mulhim AI mascot" className="w-[110px] h-[110px] object-contain relative z-10 drop-shadow-2xl" />
              </div>
              <p className="text-[11px] text-white/60 font-semibold uppercase tracking-[0.12em] mb-2">Powered by AI</p>
              <h2 className="text-[20px] font-bold text-white leading-snug mb-2">A plan built for your unique body</h2>
              <p className="text-[13px] text-white/70 leading-relaxed max-w-[280px]">
                I&apos;ll combine your lab results, health profiles, and goals to build a nutrition and exercise plan that works with your body — not against it.
              </p>
            </div>
          </div>
          <div className="px-5 mb-4">
            <p className="text-[15px] font-bold text-[#1a1a1a] mb-3">What I&apos;ll analyse</p>
            <div className="flex flex-col gap-2.5">
              {[
                { icon: "✨", label: "5 Health Profiles", desc: "Sleep, Nutrition, Energy, Stress, Fitness" },
                { icon: "🔬", label: "Your Lab Biomarkers", desc: "Vitamin D, Ferritin, Glucose, Hemoglobin, TSH" },
                { icon: "🎯", label: "Your Health Goals", desc: "You choose up to 3 priorities" },
                { icon: "📊", label: "Activity & Sleep Data", desc: "From Mulhim app history" },
              ].map((item) => (
                <div key={item.label} className="bg-white rounded-[20px] px-4 py-3.5 shadow-[0_2px_10px_rgba(0,0,0,0.05)] flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#e8f5f5] flex items-center justify-center text-[20px] flex-shrink-0">{item.icon}</div>
                  <div className="flex-1"><p className="text-[13px] font-bold text-[#1a1a1a]">{item.label}</p><p className="text-[11px] text-[#aaa]">{item.desc}</p></div>
                  <CheckCircle2 size={16} className="text-[#1e5e5e] ml-auto flex-shrink-0" />
                </div>
              ))}
            </div>
          </div>
          {hasCoach && (
            <div className="mx-5 bg-[#e8f5f5] rounded-[22px] p-4 flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-full bg-[#1e5e5e] flex items-center justify-center text-[18px] flex-shrink-0">👨‍⚕️</div>
              <p className="text-[12px] text-[#1e5e5e] font-semibold leading-relaxed flex-1">All plans are reviewed and approved by your personal health coach before delivery.</p>
            </div>
          )}
          <button onClick={() => setPhase("goals")} className="mx-5 py-4 rounded-[18px] bg-[#1e5e5e] text-white font-bold text-[16px] shadow-[0_4px_20px_rgba(30,94,94,0.3)] active:scale-[0.98] transition-transform">
            Build My Health Plan ✨
          </button>
        </>
      )}

      {phase === "goals" && (
        <>
          <div className="mx-5 mb-4">
            <MascotBubble text="What do you most want to improve? Choose up to 3 goals — I'll prioritize these in your plan." dark />
          </div>
          <div className="px-5 mb-5">
            <div className="grid grid-cols-2 gap-3">
              {goals.map((g) => {
                const active = selectedGoals.includes(g.id);
                return (
                  <button key={g.id} onClick={() => toggleGoal(g.id)}
                    className={`rounded-[22px] p-4 text-left transition-all active:scale-[0.97] ${active ? "bg-[#1e5e5e] shadow-[0_4px_16px_rgba(30,94,94,0.3)]" : "bg-white shadow-[0_2px_10px_rgba(0,0,0,0.06)]"}`}>
                    <span className="text-[28px] mb-2 block">{g.icon}</span>
                    <p className={`text-[13px] font-bold leading-tight mb-1 ${active ? "text-white" : "text-[#1a1a1a]"}`}>{g.label}</p>
                    <p className={`text-[10px] leading-snug ${active ? "text-white/70" : "text-[#aaa]"}`}>{g.desc}</p>
                    {active && <div className="mt-2 w-5 h-5 rounded-full bg-white/20 flex items-center justify-center"><CheckCircle2 size={12} className="text-white" /></div>}
                  </button>
                );
              })}
            </div>
          </div>
          <button onClick={() => setPhase("insights")} disabled={selectedGoals.length === 0}
            className="mx-5 py-4 rounded-[18px] bg-[#1e5e5e] text-white font-bold text-[16px] shadow-[0_4px_20px_rgba(30,94,94,0.3)] active:scale-[0.98] transition-transform disabled:opacity-40">
            Continue → Review My Health Insights
          </button>
        </>
      )}

      {phase === "insights" && (
        <>
          <div className="mx-5 mb-4">
            <MascotBubble text="Here's what your health data tells us about your body. These insights will shape every part of your personalised plan." dark size="sm" />
          </div>
          <div className="flex gap-2 overflow-x-auto px-5 pb-1 mb-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {healthProfiles.map((p) => (
              <button key={p.id} onClick={() => setSelectedProfile(p)}
                className={`flex-shrink-0 flex items-center gap-1.5 px-3.5 py-2 rounded-full text-[12px] font-bold transition-all ${selectedProfile.id === p.id ? "bg-[#1e5e5e] text-white shadow-sm" : "bg-white text-[#666] shadow-[0_2px_8px_rgba(0,0,0,0.06)]"}`}>
                <span>{p.icon}</span>{p.label}
              </button>
            ))}
          </div>
          <div className="mx-5 mb-3 rounded-[28px] overflow-hidden shadow-[0_2px_16px_rgba(0,0,0,0.07)]">
            <div className="p-5" style={{ backgroundColor: selectedProfile.color }}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-[30px] flex-shrink-0 bg-white/80 shadow-sm">{selectedProfile.icon}</div>
                <div className="flex-1">
                  <p className="text-[17px] font-bold text-[#1a1a1a]">{selectedProfile.label}</p>
                  <span className="inline-block mt-0.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold"
                    style={{ backgroundColor: `${selectedProfile.accentColor}22`, color: selectedProfile.accentColor }}>
                    {selectedProfile.status}
                  </span>
                </div>
              </div>
              <div className="bg-white/70 rounded-[16px] px-4 py-3.5 mb-3">
                <p className="text-[10px] font-bold text-[#bbb] uppercase tracking-[0.1em] mb-1.5">What this means for you</p>
                <p className="text-[13px] text-[#444] leading-relaxed">{selectedProfile.insight}</p>
              </div>
              <div className="bg-white/70 rounded-[16px] px-4 py-3.5">
                <p className="text-[10px] font-bold text-[#bbb] uppercase tracking-[0.1em] mb-1.5">What to do about it</p>
                <p className="text-[13px] font-semibold text-[#1a1a1a]">→ {selectedProfile.action}</p>
              </div>
            </div>
          </div>
          <div className="mx-5 mb-5 bg-white rounded-[24px] overflow-hidden shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
            {healthProfiles.map((p, i) => (
              <button key={p.id} onClick={() => setSelectedProfile(p)}
                className={`w-full flex items-center gap-3 px-4 py-3.5 active:bg-[#f8f8f8] transition-colors ${i < healthProfiles.length - 1 ? "border-b border-[#f3f3f3]" : ""}`}>
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-[20px] flex-shrink-0"
                  style={{ backgroundColor: `${p.accentColor}15` }}>{p.icon}</div>
                <div className="flex-1 text-left min-w-0">
                  <p className="text-[13px] font-bold text-[#1a1a1a]">{p.label}</p>
                  <p className="text-[11px] text-[#aaa] truncate">{p.action}</p>
                </div>
                <span className="text-[10px] font-bold px-2.5 py-1 rounded-full flex-shrink-0"
                  style={{ backgroundColor: `${p.accentColor}15`, color: p.accentColor }}>{p.status}</span>
                <ChevronRight size={14} className="text-[#d0d0d0] flex-shrink-0" />
              </button>
            ))}
          </div>
          <button onClick={() => setPhase("nutrition")} className="mx-5 py-4 rounded-[18px] bg-[#1e5e5e] text-white font-bold text-[16px] shadow-[0_4px_20px_rgba(30,94,94,0.3)] active:scale-[0.98] transition-transform">
            Continue → See Nutrition Plan
          </button>
        </>
      )}

      {phase === "nutrition" && (
        <>
          <div className="mx-5 mb-4">
            <MascotBubble text="Your nutrition plan is built around your lab results. Every meal targets your specific health gaps — especially iron and Vitamin D." dark size="sm" />
          </div>
          <div className="mx-5 mb-4 bg-white rounded-[18px] p-1.5 shadow-[0_2px_10px_rgba(0,0,0,0.05)] flex gap-1.5">
            {(["meals", "macros", "supplements"] as const).map((t) => (
              <button key={t} onClick={() => setActiveMealTab(t)}
                className={`flex-1 py-2 rounded-[14px] text-[11px] font-bold capitalize transition-all ${activeMealTab === t ? "bg-[#1e5e5e] text-white shadow-sm" : "text-[#888]"}`}>
                {t === "meals" ? "Meal Plan" : t === "macros" ? "Macros" : "Supplements"}
              </button>
            ))}
          </div>

          {activeMealTab === "meals" && (
            <div className="flex flex-col gap-3 px-5 mb-5">
              {nutritionPlan.meals.map((meal) => (
                <div key={meal.label} className="bg-white rounded-[24px] p-4 shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
                  <div className="flex items-center gap-2.5 mb-3">
                    <div className="w-10 h-10 rounded-full bg-[#e8f5f5] flex items-center justify-center text-[18px] flex-shrink-0">{meal.icon}</div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <p className="text-[14px] font-bold text-[#1a1a1a]">{meal.label}</p>
                        <span className="text-[11px] font-semibold text-[#1e5e5e]">{meal.calories} kcal</span>
                      </div>
                      <p className="text-[11px] text-[#aaa]">{meal.time}</p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1.5 mb-3">
                    {meal.items.map((item) => (
                      <div key={item} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#1e5e5e] flex-shrink-0" />
                        <p className="text-[12px] text-[#444]">{item}</p>
                      </div>
                    ))}
                  </div>
                  <div className="bg-[#e8f5f5] rounded-[12px] px-3 py-2">
                    <p className="text-[11px] text-[#1e5e5e] font-semibold">✨ {meal.note}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeMealTab === "macros" && (
            <div className="px-5 mb-5">
              <div className="bg-white rounded-[28px] p-5 shadow-[0_2px_12px_rgba(0,0,0,0.06)] mb-3">
                <p className="text-[14px] font-bold text-[#1a1a1a] mb-4">Daily Macronutrient Targets</p>
                {[
                  { label: "Protein", pct: nutritionPlan.macros.protein, color: "#1e5e5e", grams: "156g", why: "Supports muscle recovery and daily energy" },
                  { label: "Carbohydrates", pct: nutritionPlan.macros.carbs, color: "#4db8b8", grams: "195g", why: "Controlled to keep blood sugar stable" },
                  { label: "Healthy Fats", pct: nutritionPlan.macros.fat, color: "#f59e0b", grams: "60g", why: "Supports Vitamin D absorption and heart health" },
                ].map((m) => (
                  <div key={m.label} className="mb-4">
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full" style={{ backgroundColor: m.color }} /><p className="text-[13px] font-bold text-[#1a1a1a]">{m.label}</p></div>
                      <div className="text-right"><span className="text-[13px] font-bold text-[#1a1a1a]">{m.grams}</span><span className="text-[11px] text-[#aaa] ml-1">({m.pct}%)</span></div>
                    </div>
                    <div className="h-2.5 bg-[#f0f0f0] rounded-full overflow-hidden mb-1"><div className="h-full rounded-full" style={{ width: `${m.pct}%`, backgroundColor: m.color }} /></div>
                    <p className="text-[10px] text-[#aaa] pl-5">🧬 {m.why}</p>
                  </div>
                ))}
                <div className="flex items-center justify-center mt-2">
                  <div className="relative w-[120px] h-[120px]">
                    <svg viewBox="0 0 80 80" className="w-[120px] h-[120px] -rotate-90">
                      <circle cx="40" cy="40" r="20" fill="none" stroke="#f0f0f0" strokeWidth="12" />
                      <circle cx="40" cy="40" r="20" fill="none" stroke="#1e5e5e" strokeWidth="12" strokeDasharray={circumference} strokeDashoffset={circumference - (32 / 100) * circumference} />
                      <circle cx="40" cy="40" r="20" fill="none" stroke="#4db8b8" strokeWidth="12" strokeDasharray={circumference} strokeDashoffset={circumference - (40 / 100) * circumference} style={{ transform: "rotate(115deg)", transformOrigin: "40px 40px" }} />
                      <circle cx="40" cy="40" r="20" fill="none" stroke="#f59e0b" strokeWidth="12" strokeDasharray={circumference} strokeDashoffset={circumference - (28 / 100) * circumference} style={{ transform: "rotate(259deg)", transformOrigin: "40px 40px" }} />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center"><p className="text-[13px] font-bold text-[#1a1a1a]">1840</p><p className="text-[9px] text-[#aaa]">kcal/day</p></div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeMealTab === "supplements" && (
            <div className="px-5 mb-5 flex flex-col gap-3">
              {nutritionPlan.supplements.map((s) => (
                <div key={s.name} className="bg-white rounded-[24px] p-4 shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#e8f5f5] flex items-center justify-center text-[20px] flex-shrink-0">{s.icon}</div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-0.5">
                        <p className="text-[14px] font-bold text-[#1a1a1a]">{s.name}</p>
                        <span className="px-2 py-0.5 rounded-full bg-[#e8f5f5] text-[#1e5e5e] text-[10px] font-bold">{hasCoach ? "✓ Coach" : "✓ AI"}</span>
                      </div>
                      <p className="text-[12px] text-[#1e5e5e] font-semibold">{s.dose}</p>
                      <p className="text-[11px] text-[#aaa] mt-0.5">⏰ {s.timing}</p>
                      <div className="mt-2 bg-[#f5f5f5] rounded-[12px] px-3 py-1.5"><p className="text-[11px] text-[#666]">🧬 {s.reason}</p></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <button onClick={() => setPhase("exercise")} className="mx-5 py-4 rounded-[18px] bg-[#1e5e5e] text-white font-bold text-[16px] shadow-[0_4px_20px_rgba(30,94,94,0.3)] active:scale-[0.98] transition-transform">
            Continue → See Exercise Plan
          </button>
        </>
      )}

      {phase === "exercise" && (
        <>
          <div className="mx-5 mb-3">
            <MascotBubble text={`Your exercise plan is built for power and strength — your body responds best to heavy lifting and sprint work. Rest day: ${locale === "ar" ? "Saturday (السبت)" : "Sunday"}.`} dark size="sm" />
          </div>
          <div className="mx-5 mb-4 bg-white rounded-[20px] px-4 py-3 shadow-[0_2px_10px_rgba(0,0,0,0.05)] flex items-center gap-3">
            <Globe size={16} className="text-[#1e5e5e] flex-shrink-0" />
            <p className="text-[12px] font-semibold text-[#666] flex-1">
              {locale === "ar" ? "Arabic region · Rest day = Saturday" : "International · Rest day = Sunday"}
            </p>
            <span className="text-[14px]">{locale === "ar" ? "🇸🇦" : "🌍"}</span>
          </div>
          <div className="flex gap-2 overflow-x-auto px-5 pb-1 mb-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {exercisePlan.map((d, i) => (
              <button key={d.day} onClick={() => setActiveDay(i)}
                className={`flex-shrink-0 flex flex-col items-center px-3.5 py-2.5 rounded-[16px] transition-all ${activeDay === i ? "bg-[#1e5e5e] shadow-[0_4px_14px_rgba(30,94,94,0.3)]" : "bg-white shadow-[0_2px_8px_rgba(0,0,0,0.06)]"}`}>
                <span className="text-[14px] mb-0.5">{d.icon}</span>
                <p className={`text-[11px] font-bold ${activeDay === i ? "text-white" : "text-[#666]"}`}>{d.day}</p>
              </button>
            ))}
          </div>
          <div className="mx-5 mb-3 rounded-[28px] overflow-hidden shadow-[0_2px_16px_rgba(0,0,0,0.07)]">
            <div className="p-4" style={{ backgroundColor: exercisePlan[activeDay].color }}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2.5">
                  <span className="text-[28px]">{exercisePlan[activeDay].icon}</span>
                  <div>
                    <p className="text-[15px] font-bold text-[#1a1a1a]">{exercisePlan[activeDay].label}</p>
                    <p className="text-[12px] text-[#666]">{exercisePlan[activeDay].focus}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-[11px] text-[#aaa] font-semibold">Duration</p>
                  <p className="text-[13px] font-bold text-[#1a1a1a]">{exercisePlan[activeDay].duration}</p>
                </div>
              </div>
              <div className="flex gap-2 mb-4">
                <span className="px-2.5 py-1 rounded-full bg-white/70 text-[10px] font-bold text-[#444]">{exercisePlan[activeDay].type}</span>
                <span className="px-2.5 py-1 rounded-full bg-white/70 text-[10px] font-bold text-[#444]">Intensity: {exercisePlan[activeDay].intensity}</span>
              </div>
              {exercisePlan[activeDay].exercises.length > 0 ? (
                <div className="bg-white/80 rounded-[18px] p-3 flex flex-col gap-3">
                  {exercisePlan[activeDay].exercises.map((ex, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-7 h-7 rounded-full bg-[#1e5e5e] flex items-center justify-center flex-shrink-0 mt-0.5"><span className="text-[10px] font-bold text-white">{i + 1}</span></div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between"><p className="text-[13px] font-bold text-[#1a1a1a]">{ex.name}</p><span className="text-[11px] font-semibold text-[#1e5e5e]">{ex.sets}</span></div>
                        <p className="text-[11px] text-[#888] mt-0.5">🧬 {ex.note}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-white/80 rounded-[18px] p-4 text-center">
                  <div className="flex items-center justify-center gap-3 mb-2">
                    <ImageWithFallback src={mascotCharImg} alt="Mulhim resting" className="w-12 h-12 object-contain" />
                    <p className="text-[28px]">😴</p>
                  </div>
                  <p className="text-[13px] font-semibold text-[#666]">
                    {locale === "ar" ? "يوم الراحة — السبت" : "Full rest day"} — recovery is part of the plan
                  </p>
                </div>
              )}
            </div>
          </div>
          <button onClick={handleGenerate} disabled={generating}
            className="mx-5 mb-3 py-4 rounded-[18px] bg-[#1e5e5e] text-white font-bold text-[16px] shadow-[0_4px_20px_rgba(30,94,94,0.3)] active:scale-[0.98] transition-transform disabled:opacity-70">
            {generating ? "Building your full plan…" : "Generate Complete Plan 🚀"}
          </button>
          {generating && (
            <div className="mx-5 bg-white rounded-[22px] p-4 shadow-[0_2px_10px_rgba(0,0,0,0.06)] flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#e8f5f5] flex items-center justify-center flex-shrink-0">
                <div className="w-4 h-4 border-2 border-[#1e5e5e] border-t-transparent rounded-full animate-spin" />
              </div>
              <p className="text-[12px] text-[#888] leading-relaxed">Combining your genes, biomarkers, and goals…</p>
            </div>
          )}
        </>
      )}

      {phase === "plan" && (
        <>
          <ConfettiLayer />
          <div className="mx-5 mb-4 bg-gradient-to-br from-[#0d4040] to-[#1e7070] rounded-[28px] p-5 shadow-[0_4px_24px_rgba(30,94,94,0.35)] relative overflow-hidden">
            <div className="absolute top-3 right-3 text-[50px] opacity-10 select-none">🧬</div>
            <div className="flex items-center gap-3 mb-4">
              <div className="relative flex-shrink-0">
                <div className="absolute inset-0 rounded-full bg-white/20 blur-lg scale-150" />
                <ImageWithFallback src={mascotCharImg} alt="Mulhim AI" className="w-[60px] h-[60px] object-contain relative z-10 drop-shadow-xl" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-0.5">
                  <p className="text-[11px] text-white/60 font-semibold uppercase tracking-[0.12em]">{hasCoach ? "Coach Approved" : "AI Verified"}</p>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-400/30 text-emerald-200 text-[10px] font-bold">✓ Ready</span>
                </div>
                <p className="text-[17px] font-bold text-white leading-snug">Your Health Plan<br />is Ready! 🎉</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {[{ label: "Health Profiles", value: "5" }, { label: "Biomarkers", value: "5" }, { label: "Week Duration", value: "12" }].map((s) => (
                <div key={s.label} className="bg-white/10 rounded-[14px] p-2.5 text-center">
                  <p className="text-[18px] font-bold text-white">{s.value}</p>
                  <p className="text-[9px] text-white/60 font-semibold uppercase tracking-wide mt-0.5">{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mx-5 mb-3 bg-white rounded-[24px] p-4 shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
            <p className="text-[13px] font-bold text-[#1a1a1a] mb-3">Your Goals</p>
            <div className="flex gap-2 flex-wrap">
              {goals.filter((g) => selectedGoals.includes(g.id)).map((g) => (
                <span key={g.id} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#e8f5f5] text-[#1e5e5e] text-[12px] font-bold"><span>{g.icon}</span>{g.label}</span>
              ))}
            </div>
          </div>

          <div className="px-5 mb-4">
            <p className="text-[14px] font-bold text-[#1a1a1a] mb-3">Plan Highlights</p>
            <div className="flex flex-col gap-2.5">
              {[
                { icon: "✨", title: "AI Health Personalisation", desc: "Sleep · Nutrition · Energy · Fitness · Stress profiles" },
                { icon: "🥗", title: "Nutrition Plan", desc: "4 personalised meals · 1840 kcal" },
                { icon: "💊", title: "Supplement Stack", desc: "Vitamin D3+K2 · Methylfolate · B12 · Iron bisglycinate" },
                { icon: "🏋️", title: "Exercise Plan", desc: `3× Strength · 1× HIIT · 2× Low-intensity · Rest: ${locale === "ar" ? "Saturday" : "Sunday"}` },
                { icon: "🔬", title: "Biomarker Targets", desc: "Vitamin D 30+ · Ferritin 30+ · Glucose <99 in 12 weeks" },
                { icon: hasCoach ? "👨‍⚕️" : "🤖", title: hasCoach ? "Coach Approved" : "AI Verified", desc: hasCoach ? "Reviewed by your personal health coach" : "Cross-referenced with clinical research" },
              ].map((item) => (
                <div key={item.title} className="bg-white rounded-[20px] px-4 py-3.5 shadow-[0_2px_10px_rgba(0,0,0,0.05)] flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#e8f5f5] flex items-center justify-center text-[18px] flex-shrink-0">{item.icon}</div>
                  <div className="flex-1 min-w-0"><p className="text-[13px] font-bold text-[#1a1a1a]">{item.title}</p><p className="text-[11px] text-[#aaa] leading-snug">{item.desc}</p></div>
                  <CheckCircle2 size={16} className="text-[#1e5e5e] flex-shrink-0" />
                </div>
              ))}
            </div>
          </div>

          <button onClick={onBack} className="mx-5 mb-3 py-4 rounded-[18px] bg-[#1e5e5e] text-white font-bold text-[16px] shadow-[0_4px_20px_rgba(30,94,94,0.3)] active:scale-[0.98] transition-transform">
            Start My Health Plan 🚀
          </button>
          <button onClick={onBack} className="mx-5 py-3.5 rounded-[18px] border-[2px] border-[#1e5e5e] text-[#1e5e5e] font-bold text-[14px] active:bg-[#e8f5f5] transition-colors">
            Return to Health Report
          </button>
        </>
      )}
    </div>
  );
}
