import React, { useState, useRef, useEffect } from "react";
import { Sparkles, Send } from "lucide-react";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import mascotSmileImg from "@/imports/3-3.png";

// ─── Mulhim AI Chat ───────────────────────────────────────────────────────────

export interface ChatMessage {
  id: string;
  role: "user" | "ai";
  text: string;
  ts: string;
}

const mulhimResponses: Record<string, string> = {
  progress: "Based on your latest data, your overall health score is 74/100 — that's a solid foundation. Your sleep consistency improved by 12% this week, and your Vitamin D is trending upward. Keep maintaining your morning sunlight walk; it's making a measurable difference. 🌅",
  report: "Your October health report shows 2 optimal biomarkers and 3 that need attention. Vitamin D is at 22 ng/mL (target: 30+), Blood Glucose is 102 mg/dL (target: below 99). The good news — both respond quickly to the habits already in your plan. Your Hemoglobin is perfectly healthy at 14.2 g/dL. 🩺",
  habits: "For today I'd recommend: ① 15-min morning sunlight walk before 10am — this is your single biggest sleep and Vitamin D booster. ② Pair your iron-rich lunch with a vitamin C source (lemon juice works great). ③ Cut caffeine by 1pm. ④ Dim lights and screens by 9pm. These four habits target all three of your priority biomarkers. ✅",
  meals: "Today's meal plan: Breakfast — 2 eggs + spinach omelette + sourdough with avocado (420 kcal). Lunch — grilled chicken with lentils, brown rice, and a lemon-dressed salad (560 kcal). Snack — 2 Brazil nuts, almonds, protein shake, 1 kiwi (280 kcal). Dinner — salmon fillet with roasted sweet potato and broccoli drizzled with olive oil (580 kcal). Total: ~1840 kcal. 🥗",
  workout: "Today is Strength Day A. Warm up 10 min, then: Barbell Squat 4×6, Romanian Deadlift 3×8, Bench Press 3×8, Bent-over Row 3×8, Overhead Press 3×10, Plank 3×45s. Rest 90–120s between sets. Your ACTN3 power profile means you respond exceptionally well to heavy compound lifts — push the weights. 💪",
  recover: "For recovery today: ① Post-workout: 20g whey protein within 30 min. ② Hydrate to 2.5L before 8pm. ③ Evening: 10-min light stretch focusing on hamstrings and shoulders. ④ Bedroom at 18°C by 10pm. ⑤ Phone off by 9:30pm. Your recovery score is 82 — you're doing great, just keep the sleep protocol consistent. 🌿",
  sleep: "Your sleep target is 8 hours with a 10:30pm bedtime. Tonight's protocol: 9pm — dim all lights and screens. 9:30pm — phone to aeroplane mode. 10pm — cool bedroom to 18°C. 10:15pm — 5-min body scan or breathing. 10:30pm — sleep onset. Your Blood Glucose elevation is affecting sleep depth — the evening walk after dinner helps significantly. 🌙",
  skin: "For your hair & skin today: Morning — cold water splash, gentle cleanser, hyaluronic acid serum, lightweight moisturiser, and SPF 50 (non-negotiable). Evening — double cleanse to remove SPF, niacinamide serum, rich night cream. Your Vitamin D deficiency affects collagen production — your supplement is the best thing for long-term skin health. ✨",
  mental: "For mental wellness today: ① 5-min box breathing after lunch (4-4-4-4). ② 10-min outdoor walk — natural light resets your cortisol rhythm. ③ Digital sunset at 9pm — screens off, journal or read. ④ Note 3 things you did well today before sleep. Your COMT profile means you bounce back from stress quickly — channelling that into structured recovery time makes it even more effective. 🧠",
};

export function getMulhimResponse(input: string): string {
  const lower = input.toLowerCase();
  if (lower.includes("progress") || lower.includes("week") || lower.includes("analyz")) return mulhimResponses.progress;
  if (lower.includes("report") || lower.includes("biomarker") || lower.includes("lab") || lower.includes("result")) return mulhimResponses.report;
  if (lower.includes("habit") || lower.includes("today") || lower.includes("routine")) return mulhimResponses.habits;
  if (lower.includes("meal") || lower.includes("food") || lower.includes("eat") || lower.includes("nutrition")) return mulhimResponses.meals;
  if (lower.includes("workout") || lower.includes("exercise") || lower.includes("gym") || lower.includes("train")) return mulhimResponses.workout;
  if (lower.includes("recover")) return mulhimResponses.recover;
  if (lower.includes("sleep") || lower.includes("rest") || lower.includes("night")) return mulhimResponses.sleep;
  if (lower.includes("skin") || lower.includes("hair") || lower.includes("glow") || lower.includes("beauty")) return mulhimResponses.skin;
  if (lower.includes("mental") || lower.includes("stress") || lower.includes("anxiety") || lower.includes("wellness") || lower.includes("mind")) return mulhimResponses.mental;
  return "Great question! I'm here to help with anything health-related — your biomarkers, meal plans, exercise routines, sleep protocol, recovery habits, or mental wellness. What would you like to explore? 😊";
}

export function MulhimChatScreen({ hasCoach }: { hasCoach: boolean }) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "0",
      role: "ai",
      text: `Hi! I'm Mulhim${hasCoach ? " — your personal AI health coach" : ", your AI health assistant"}. I can help you understand your health report, explain your biomarkers, suggest meals and workouts, and guide your daily habits. How can I help you today? 💚`,
      ts: "now",
    },
  ]);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  const prompts = [
    { label: "Analyze my progress", icon: "📊" },
    { label: "Explain my health report", icon: "🩺" },
    { label: "Recommend today's habits", icon: "✅" },
    { label: "Suggest today's meals", icon: "🥗" },
    { label: "Suggest today's workout", icon: "💪" },
    { label: "Help me recover", icon: "🌿" },
    { label: "Improve my sleep", icon: "🌙" },
    { label: "Skin & Hair advice", icon: "✨" },
    { label: "Mental wellness tips", icon: "🧠" },
  ];

  const send = (text: string) => {
    if (!text.trim() || thinking) return;
    const userMsg: ChatMessage = { id: Date.now().toString(), role: "user", text: text.trim(), ts: "now" };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setThinking(true);
    setTimeout(() => {
      const aiMsg: ChatMessage = { id: (Date.now() + 1).toString(), role: "ai", text: getMulhimResponse(text), ts: "now" };
      setMessages(prev => [...prev, aiMsg]);
      setThinking(false);
    }, 900 + Math.random() * 500);
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, thinking]);

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <div className="flex-shrink-0 bg-gradient-to-br from-[#0a3030] to-[#1e5e5e] px-5 pt-14 pb-4">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-[#4db8b8]/30 blur-lg scale-150" />
            <ImageWithFallback src={mascotSmileImg} alt="Mulhim" className="w-14 h-14 object-contain relative z-10 drop-shadow-lg" />
            <span className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-emerald-400 border-2 border-[#1e5e5e] z-20" />
          </div>
          <div className="flex-1">
            <h1 className="text-[20px] font-bold text-white leading-tight">Chat with Mulhim</h1>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <p className="text-[11px] text-white/60 font-medium">{hasCoach ? "Coach AI · Online" : "AI Health Coach · Online"}</p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10">
            <Sparkles size={11} className="text-[#4db8b8]" />
            <span className="text-[10px] font-bold text-white/80">AI</span>
          </div>
        </div>
      </div>

      {/* Suggested prompts */}
      <div className="flex-shrink-0 bg-[#f8f8f8] border-b border-[#f0f0f0] py-3">
        <div className="flex gap-2 overflow-x-auto px-5 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {prompts.map((p) => (
            <button key={p.label} onClick={() => send(p.label)}
              className="flex-shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-[20px] bg-white border border-[#e8e8e8] shadow-[0_1px_4px_rgba(0,0,0,0.06)] active:scale-[0.97] transition-transform">
              <span className="text-[13px]">{p.icon}</span>
              <span className="text-[11px] font-semibold text-[#444] whitespace-nowrap">{p.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-5 py-4 flex flex-col gap-4">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
            {msg.role === "ai" && (
              <div className="flex-shrink-0 relative self-end">
                <div className="absolute inset-0 rounded-full bg-[#4db8b8]/20 blur-md scale-125" />
                <ImageWithFallback src={mascotSmileImg} alt="Mulhim" className="w-8 h-8 object-contain relative z-10" />
              </div>
            )}
            <div className={`max-w-[78%] rounded-[20px] px-4 py-3 ${
              msg.role === "user"
                ? "bg-[#1e5e5e] text-white rounded-tr-[4px]"
                : "bg-white shadow-[0_2px_12px_rgba(0,0,0,0.07)] rounded-tl-[4px]"
            }`}>
              <p className={`text-[13px] leading-relaxed ${msg.role === "user" ? "text-white" : "text-[#333]"}`}>
                {msg.text}
              </p>
            </div>
          </div>
        ))}

        {/* Thinking indicator */}
        {thinking && (
          <div className="flex gap-3 flex-row">
            <div className="flex-shrink-0 relative self-end">
              <div className="absolute inset-0 rounded-full bg-[#4db8b8]/20 blur-md scale-125" />
              <ImageWithFallback src={mascotSmileImg} alt="Mulhim" className="w-8 h-8 object-contain relative z-10" />
            </div>
            <div className="bg-white shadow-[0_2px_12px_rgba(0,0,0,0.07)] rounded-[20px] rounded-tl-[4px] px-4 py-3.5 flex items-center gap-1.5">
              {[0, 1, 2].map((i) => (
                <div key={i} className="w-2 h-2 rounded-full bg-[#4db8b8]"
                  style={{ animation: `bounce 1.2s ease-in-out ${i * 0.2}s infinite` }} />
              ))}
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="flex-shrink-0 bg-white border-t border-[#f0f0f0] px-4 py-3" style={{ paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 12px)" }}>
        <div className="flex items-end gap-2 bg-[#f5f5f5] rounded-[24px] px-4 py-2.5">
          <textarea
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(input); } }}
            placeholder="Ask Mulhim anything…"
            rows={1}
            className="flex-1 bg-transparent text-[13px] text-[#1a1a1a] placeholder-[#bbb] outline-none resize-none leading-relaxed"
            style={{ maxHeight: 96, overflowY: "auto" }}
          />
          <button onClick={() => send(input)}
            disabled={!input.trim() || thinking}
            className="w-9 h-9 rounded-full bg-[#1e5e5e] flex items-center justify-center flex-shrink-0 transition-all active:scale-90 disabled:opacity-40 shadow-[0_2px_8px_rgba(30,94,94,0.3)]">
            <Send size={15} className="text-white ml-0.5" />
          </button>
        </div>
        <p className="text-[9px] text-[#ccc] text-center mt-2 font-medium">Mulhim AI · Not a substitute for medical advice</p>
      </div>

      <style>{`
        @keyframes bounce {
          0%, 60%, 100% { transform: translateY(0); }
          30% { transform: translateY(-6px); }
        }
      `}</style>
    </div>
  );
}
