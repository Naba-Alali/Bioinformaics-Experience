import { useState } from "react";
import { XCircle, CheckCircle2, ChevronRight } from "lucide-react";

// ─── Confetti ─────────────────────────────────────────────────────────────────

export function ConfettiLayer() {
  const pieces = Array.from({ length: 18 }, (_, i) => ({
    id: i, left: `${(i * 17 + 5) % 95}%`, top: `${(i * 23 + 2) % 60}%`,
    color: ["#1e5e5e", "#4db8b8", "#22c55e", "#f59e0b", "#a78bfa", "#f472b6"][i % 6],
    size: [8, 10, 12, 6][i % 4], rotate: i * 23, shape: i % 3,
  }));
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {pieces.map((p) => (
        <div key={p.id} className="absolute opacity-60" style={{ left: p.left, top: p.top, transform: `rotate(${p.rotate}deg)` }}>
          {p.shape === 0 && <div style={{ width: p.size, height: p.size, borderRadius: "2px", backgroundColor: p.color }} />}
          {p.shape === 1 && <div style={{ width: p.size, height: p.size / 2, borderRadius: "99px", backgroundColor: p.color }} />}
          {p.shape === 2 && <div style={{ width: 0, height: 0, borderLeft: `${p.size / 2}px solid transparent`, borderRight: `${p.size / 2}px solid transparent`, borderBottom: `${p.size}px solid ${p.color}` }} />}
        </div>
      ))}
    </div>
  );
}
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import mascotCharImg from "@/imports/____________2026-07-28_155021-2.png";
import type { Biomarker } from "./types";

// ─── Shared: Editable Habit List ─────────────────────────────────────────────

export interface Habit { id: string; icon: string; label: string; sublabel?: string; }

export function EditableHabitList({ habits, onChange }: {
  habits: Habit[];
  onChange: (h: Habit[]) => void;
}) {
  const [editing, setEditing] = useState(false);
  const [newLabel, setNewLabel] = useState("");
  const [newIcon, setNewIcon] = useState("✅");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState("");

  const iconOptions = ["✅","🌙","💧","☀️","🚶","🧘","💪","🥗","🧠","❄️","📝","🎯","🔥","⏰","🌿"];

  const add = () => {
    if (!newLabel.trim()) return;
    onChange([...habits, { id: Date.now().toString(), icon: newIcon, label: newLabel.trim() }]);
    setNewLabel("");
  };

  const remove = (id: string) => onChange(habits.filter(h => h.id !== id));

  const save = (id: string) => {
    onChange(habits.map(h => h.id === id ? { ...h, label: editText } : h));
    setEditingId(null);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <p className="text-[14px] font-bold text-[#1a1a1a]">Daily Habits</p>
        <button onClick={() => setEditing(e => !e)}
          className={`text-[11px] font-bold px-3 py-1.5 rounded-full transition-all ${editing ? "bg-[#1e5e5e] text-white" : "bg-[#f0f0f0] text-[#555]"}`}>
          {editing ? "Done" : "Edit"}
        </button>
      </div>
      <div className="bg-white rounded-[24px] overflow-hidden shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
        {habits.map((h, i) => (
          <div key={h.id} className={`flex items-center gap-3 px-4 py-3.5 ${i < habits.length - 1 ? "border-b border-[#f5f5f5]" : ""}`}>
            <div className="w-9 h-9 rounded-full bg-[#f0f9f9] flex items-center justify-center text-[18px] flex-shrink-0">{h.icon}</div>
            <div className="flex-1 min-w-0">
              {editingId === h.id ? (
                <div className="flex gap-2">
                  <input
                    value={editText}
                    onChange={e => setEditText(e.target.value)}
                    onBlur={() => save(h.id)}
                    onKeyDown={e => e.key === "Enter" && save(h.id)}
                    autoFocus
                    className="flex-1 text-[13px] font-semibold text-[#1a1a1a] bg-[#f5f5f5] rounded-[8px] px-2 py-1 outline-none border border-[#4db8b8]"
                  />
                </div>
              ) : (
                <button className="text-left w-full" onClick={() => editing ? (setEditingId(h.id), setEditText(h.label)) : undefined}>
                  <p className="text-[13px] font-semibold text-[#1a1a1a] leading-snug">{h.label}</p>
                  {h.sublabel && <p className="text-[11px] text-[#aaa] mt-0.5">{h.sublabel}</p>}
                </button>
              )}
            </div>
            {editing && (
              <button onClick={() => remove(h.id)}
                className="w-7 h-7 rounded-full bg-[#fee2e2] flex items-center justify-center flex-shrink-0 active:scale-90 transition-transform">
                <XCircle size={14} className="text-[#ef4444]" />
              </button>
            )}
          </div>
        ))}
        {editing && (
          <div className="px-4 py-3 border-t border-[#f5f5f5] flex flex-col gap-2">
            <p className="text-[11px] font-bold text-[#888]">Add new habit</p>
            <div className="flex gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
              {iconOptions.map(ic => (
                <button key={ic} onClick={() => setNewIcon(ic)}
                  className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-[16px] transition-all ${newIcon === ic ? "bg-[#1e5e5e] scale-110" : "bg-[#f5f5f5]"}`}>
                  {ic}
                </button>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                value={newLabel}
                onChange={e => setNewLabel(e.target.value)}
                onKeyDown={e => e.key === "Enter" && add()}
                placeholder="Habit description…"
                className="flex-1 text-[13px] bg-[#f5f5f5] rounded-[12px] px-3 py-2 outline-none border border-transparent focus:border-[#4db8b8] text-[#1a1a1a] placeholder-[#bbb]"
              />
              <button onClick={add}
                className="px-4 py-2 rounded-[12px] bg-[#1e5e5e] text-white text-[12px] font-bold active:scale-95 transition-transform flex-shrink-0">
                Add
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Shared: Editable Routine List ───────────────────────────────────────────

export interface RoutineStep { id: string; time: string; icon: string; action: string; }

export function EditableRoutineList({ steps, onStepsChange, onToggle, checkedItems, title }: {
  steps: RoutineStep[];
  onStepsChange: (s: RoutineStep[]) => void;
  onToggle: (id: string) => void;
  checkedItems: Record<string, boolean>;
  title: string;
}) {
  const [editing, setEditing] = useState(false);
  const [newAction, setNewAction] = useState("");
  const [newTime, setNewTime] = useState("");
  const [newIcon, setNewIcon] = useState("✅");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState("");

  const iconOptions = ["✅","🌙","💧","☀️","🚶","🧘","💪","🥗","🧠","📵","💡","🛌","⏰","🌡️","🔥","📝","🎯","❄️","🌿","🫁"];

  const add = () => {
    if (!newAction.trim()) return;
    onStepsChange([...steps, { id: Date.now().toString(), time: newTime.trim() || "—", icon: newIcon, action: newAction.trim() }]);
    setNewAction(""); setNewTime("");
  };
  const remove = (id: string) => onStepsChange(steps.filter(s => s.id !== id));
  const save = (id: string) => {
    onStepsChange(steps.map(s => s.id === id ? { ...s, action: editText } : s));
    setEditingId(null);
  };

  const doneCount = steps.filter(s => checkedItems[s.id]).length;

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <div>
          <p className="text-[14px] font-bold text-[#1a1a1a]">{title}</p>
          <span className="text-[11px] font-semibold text-[#1e5e5e]">{doneCount}/{steps.length} done</span>
        </div>
        <button onClick={() => setEditing(e => !e)}
          className={`text-[11px] font-bold px-3 py-1.5 rounded-full transition-all ${editing ? "bg-[#1e5e5e] text-white" : "bg-[#f0f0f0] text-[#555]"}`}>
          {editing ? "Done" : "Edit"}
        </button>
      </div>
      <div className="bg-white rounded-[24px] overflow-hidden shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
        {steps.map((item, i) => {
          const done = checkedItems[item.id];
          return (
            <div key={item.id} className={`flex items-center gap-3 px-4 py-3.5 ${i < steps.length - 1 ? "border-b border-[#f5f5f5]" : ""} ${done && !editing ? "opacity-60" : ""}`}>
              <button onClick={() => !editing && onToggle(item.id)}
                className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 transition-all ${done && !editing ? "bg-[#1e5e5e]" : "bg-[#f5f5f5]"}`}>
                {done && !editing ? <CheckCircle2 size={16} className="text-white" /> : <span className="text-[16px]">{item.icon}</span>}
              </button>
              <div className="flex-1 min-w-0">
                {editingId === item.id ? (
                  <input value={editText} onChange={e => setEditText(e.target.value)}
                    onBlur={() => save(item.id)} onKeyDown={e => e.key === "Enter" && save(item.id)}
                    autoFocus className="w-full text-[13px] font-semibold bg-[#f5f5f5] rounded-[8px] px-2 py-1 outline-none border border-[#4db8b8] text-[#1a1a1a]" />
                ) : (
                  <button className="text-left w-full" onClick={() => editing ? (setEditingId(item.id), setEditText(item.action)) : onToggle(item.id)}>
                    <p className={`text-[13px] font-semibold leading-snug ${done && !editing ? "line-through text-[#bbb]" : "text-[#1a1a1a]"}`}>{item.action}</p>
                  </button>
                )}
              </div>
              <span className="text-[10px] font-bold text-[#bbb] flex-shrink-0">{item.time}</span>
              {editing && (
                <button onClick={() => remove(item.id)}
                  className="w-7 h-7 rounded-full bg-[#fee2e2] flex items-center justify-center flex-shrink-0 ml-1 active:scale-90 transition-transform">
                  <XCircle size={14} className="text-[#ef4444]" />
                </button>
              )}
            </div>
          );
        })}
        {editing && (
          <div className="px-4 py-3 border-t border-[#f5f5f5] flex flex-col gap-2">
            <p className="text-[11px] font-bold text-[#888]">Add new step</p>
            <div className="flex gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
              {iconOptions.map(ic => (
                <button key={ic} onClick={() => setNewIcon(ic)}
                  className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-[15px] transition-all ${newIcon === ic ? "bg-[#1e5e5e] scale-110" : "bg-[#f5f5f5]"}`}>
                  {ic}
                </button>
              ))}
            </div>
            <div className="flex gap-2">
              <input value={newTime} onChange={e => setNewTime(e.target.value)}
                placeholder="Time" className="w-[68px] text-[12px] bg-[#f5f5f5] rounded-[10px] px-2.5 py-2 outline-none border border-transparent focus:border-[#4db8b8] text-[#1a1a1a] placeholder-[#bbb]" />
              <input value={newAction} onChange={e => setNewAction(e.target.value)}
                onKeyDown={e => e.key === "Enter" && add()}
                placeholder="Step description…"
                className="flex-1 text-[12px] bg-[#f5f5f5] rounded-[10px] px-2.5 py-2 outline-none border border-transparent focus:border-[#4db8b8] text-[#1a1a1a] placeholder-[#bbb]" />
              <button onClick={add}
                className="px-3 py-2 rounded-[10px] bg-[#1e5e5e] text-white text-[11px] font-bold active:scale-95 transition-transform flex-shrink-0">
                Add
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Mascot Speech Bubble ─────────────────────────────────────────────────────

export function MascotBubble({ text, size = "md", dark = false }: { text: string; size?: "sm" | "md"; dark?: boolean }) {
  return (
    <div className="flex items-end gap-2.5">
      <div className="relative flex-shrink-0">
        {!dark && <div className="absolute inset-0 rounded-full bg-[#4db8b8]/20 blur-xl scale-150" />}
        <ImageWithFallback src={mascotCharImg} alt="Mulhim AI mascot"
          className={`${size === "sm" ? "w-10 h-10" : "w-14 h-14"} object-contain relative z-10 drop-shadow-lg`} />
      </div>
      <div className={`flex-1 rounded-[18px] rounded-bl-[4px] px-4 py-3 ${dark ? "bg-[#1e5e5e]" : "bg-white shadow-[0_2px_12px_rgba(0,0,0,0.08)]"}`}>
        <p className={`${size === "sm" ? "text-[12px]" : "text-[13px]"} leading-relaxed ${dark ? "text-white" : "text-[#444]"}`}>{text}</p>
      </div>
    </div>
  );
}

// ─── Interactive AI Summary ───────────────────────────────────────────────────

export function AISummaryCard({ biomarkers, onBiomarker }: { biomarkers: Biomarker[]; onBiomarker: (b: Biomarker) => void }) {
  const [activeIdx, setActiveIdx] = useState(0);
  const priorities = biomarkers.filter((b) => b.status !== "good");
  const good = biomarkers.filter((b) => b.status === "good");
  const active = priorities[activeIdx];

  const rangeW = ((active.value - active.min) / (active.max - active.min)) * 100;
  const optStart = ((active.optimal[0] - active.min) / (active.max - active.min)) * 100;
  const optW = ((active.optimal[1] - active.optimal[0]) / (active.max - active.min)) * 100;

  return (
    <div className="mx-5 mb-4">
      <MascotBubble
        text={`Hi! Your health is overall good — ${good.length} markers are optimal. I found ${priorities.length} priorities to work on. Let me walk you through them 👇`}
        dark
      />

      <div className="flex gap-2 mt-3 mb-3 px-1">
        {biomarkers.map((b) => (
          <button key={b.name} onClick={() => { const i = priorities.indexOf(b); if (i >= 0) setActiveIdx(i); else onBiomarker(b); }}
            className="flex-1 flex flex-col items-center gap-1.5">
            <div className={`w-full h-2 rounded-full ${b.status === "good" ? "bg-emerald-400" : b.status === "warning" ? "bg-amber-400" : "bg-red-400"}`} />
            <span className="text-[14px]">{b.icon}</span>
            <p className="text-[8px] font-bold text-[#999] uppercase tracking-wide leading-none">{b.name.split(" ")[0]}</p>
          </button>
        ))}
      </div>

      <div className="bg-white rounded-[24px] shadow-[0_2px_16px_rgba(0,0,0,0.08)] overflow-hidden">
        <div className="px-4 pt-4 pb-3 border-b border-[#f3f3f3]">
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 rounded-full bg-amber-50 text-amber-600 text-[10px] font-bold">Priority {activeIdx + 1}</span>
            <span className="text-[11px] text-[#aaa] font-medium">{activeIdx + 1} of {priorities.length}</span>
          </div>
          <div className="flex items-center gap-2.5">
            <span className="text-[26px]">{active.icon}</span>
            <div>
              <p className="text-[15px] font-bold text-[#1a1a1a]">{active.name}</p>
              <p className="text-[12px] text-amber-500 font-semibold">
                {active.value} {active.unit} · Below optimal
              </p>
            </div>
          </div>
        </div>

        <div className="px-4 py-3 border-b border-[#f3f3f3]">
          <div className="relative h-3 bg-[#f0f0f0] rounded-full overflow-visible mb-2">
            <div className="absolute top-0 h-full bg-emerald-100 rounded-full" style={{ left: `${optStart}%`, width: `${optW}%` }} />
            <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-[#1e5e5e] border-2 border-white shadow z-10"
              style={{ left: `${Math.max(2, Math.min(98, rangeW))}%` }} />
          </div>
          <div className="flex justify-between text-[10px] text-[#bbb]">
            <span>{active.min}</span>
            <span className="text-emerald-600 font-semibold">{active.optimal[0]}–{active.optimal[1]} optimal</span>
            <span>{active.max} {active.unit}</span>
          </div>
        </div>

        <div className="px-4 py-3 flex items-start gap-2.5">
          <div className="w-7 h-7 rounded-full bg-[#e8f5f5] flex items-center justify-center flex-shrink-0 mt-0.5 text-[14px]">🎯</div>
          <div className="flex-1">
            <p className="text-[11px] font-bold text-[#aaa] uppercase tracking-wide mb-0.5">Quick Fix</p>
            <p className="text-[12px] text-[#444] leading-relaxed">{active.howToImprove.split(".")[0]}.</p>
          </div>
        </div>

        <button onClick={() => onBiomarker(active)}
          className="w-full flex items-center justify-center gap-1.5 py-2.5 bg-[#f8f8f8] text-[#1e5e5e] text-[12px] font-bold active:bg-[#e8f5f5] transition-colors">
          <span>See full details</span>
          <ChevronRight size={13} />
        </button>
      </div>

      <div className="flex gap-2 justify-center mt-3">
        {priorities.map((_, i) => (
          <button key={i} onClick={() => setActiveIdx(i)}
            className={`h-1.5 rounded-full transition-all duration-300 ${i === activeIdx ? "w-6 bg-[#1e5e5e]" : "w-1.5 bg-[#d0d0d0]"}`} />
        ))}
      </div>
    </div>
  );
}
