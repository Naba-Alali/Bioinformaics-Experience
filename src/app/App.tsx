import React, { useState, useRef, useEffect } from "react";
import { motion } from "motion/react";
import {
  ArrowLeft, Download, ChevronRight, Trophy, Target,
  TrendingUp, Star, CheckCircle2, XCircle, Settings, Globe, Sparkles,
  Home, Bell, Activity, Brain, Apple, LayoutGrid, Moon,
  Droplets, Dumbbell, Wind, Flame, Leaf, User, LogOut, Shield,
  HelpCircle, CreditCard, Dna, BellRing, Lock, MessageCircle, Send, Plus,
} from "lucide-react";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import mascotTabletImg from "@/imports/____________2026-07-28_155021-1.png";
import mascotCharImg from "@/imports/____________2026-07-28_155021-2.png";
import mascotFrontImg from "@/imports/1.png";
import mascotBackImg from "@/imports/2.png";
import mascotSmileImg from "@/imports/3-3.png";
import mascotSideImg from "@/imports/4.png";
import mascotCelebImg from "@/imports/11-1.png";
import mascotThumbsImg from "@/imports/12.png";
import mascotClipboardImg from "@/imports/16.png";
import mascotWaterImg from "@/imports/24-1.png";
import mascotFoodImg from "@/imports/25.png";
import mascotPillowImg from "@/imports/32__1_-1.png";
import mascotBowImg from "@/imports/38-2.png";
import mascotConfusedImg from "@/imports/40-1.png";
import mascotMiniImg from "@/imports/3-1.png";
import mascotExerciseImg from "@/imports/60.png";
import mascotMeditateImg from "@/imports/44.png";
import mascotLiftImg from "@/imports/50.png";
import mascotWalkImg from "@/imports/42.png";

// ─── Types ────────────────────────────────────────────────────────────────────

type Screen =
  | "home" | "goal-setup" | "category"
  | "report" | "welcome" | "learning" | "biomarker"
  | "ai-recommendation" | "quiz" | "congratulations"
  | "progress" | "achievement" | "goal-builder" | "journey-hub"
  | "maintenance" | "take-a-break" | "genetic-plan"
  | "recovery-hub" | "mental-hub" | "nutrition-hub" | "plans-hub" | "exercise-hub" | "hair-skin-hub"
  | "profile" | "chat";

type CategoryId = "sleep" | "mental" | "nutrition" | "physical" | "exercise" | "skin";

type Locale = "en" | "ar";

interface Biomarker {
  name: string; value: number; unit: string; min: number; max: number;
  optimal: [number, number]; status: "good" | "warning" | "high";
  explanation: string; whyMatters: string; howToImprove: string;
  aiExplanation: string; aiRecommendation: string; icon: string;
}

// ─── Shared helpers ───────────────────────────────────────────────────────────

const T = {
  coachLabel: (hasCoach: boolean) => hasCoach ? "Coach Approved" : "AI Verified",
  recLabel: (hasCoach: boolean) => hasCoach ? "Coach Recommendation" : "AI Recommendation",
  recBadge: (hasCoach: boolean) => hasCoach ? "✓ Coach" : "✓ AI",
};

// ─── Data ─────────────────────────────────────────────────────────────────────

const biomarkers: Biomarker[] = [
  {
    name: "Vitamin D", value: 22, unit: "ng/mL", min: 0, max: 100, optimal: [30, 100], status: "warning",
    explanation: "Your Vitamin D is slightly below the optimal range. This is very common and straightforward to address with sunlight and supplementation.",
    whyMatters: "Vitamin D supports your immune system, bone density, mood regulation, and energy levels. Low levels are linked to fatigue, low mood, and impaired immunity.",
    howToImprove: "Get 15–20 minutes of morning sunlight daily, eat fatty fish and eggs, and consider a Vitamin D3 + K2 supplement.",
    aiExplanation: "Based on your indoor work schedule and location data, limited sun exposure is the most likely cause. This is one of the most impactful and easiest markers to improve.",
    aiRecommendation: "Start 2000 IU Vitamin D3 with K2 daily. Add a 15-minute morning walk before 10am. Retest in 3 months to track progress.",
    icon: "☀️",
  },
  {
    name: "Hemoglobin", value: 14.2, unit: "g/dL", min: 10, max: 18, optimal: [13.5, 17.5], status: "good",
    explanation: "Your hemoglobin is comfortably within the healthy range. Your blood is efficiently carrying oxygen to every cell in your body.",
    whyMatters: "Hemoglobin is the protein in red blood cells that carries oxygen. Healthy levels mean good energy, endurance, and cognitive performance.",
    howToImprove: "Maintain your current iron-rich diet with lean meats, leafy greens, and legumes. Stay well hydrated and monitor annually.",
    aiExplanation: "Your hemoglobin has been stable across your last three tests — a clear sign of consistent nutrition and lifestyle habits. Keep it up.",
    aiRecommendation: "No changes needed. Annual monitoring is sufficient. Continue your balanced nutrition to sustain these levels.",
    icon: "🩸",
  },
  {
    name: "Blood Glucose", value: 102, unit: "mg/dL", min: 70, max: 200, optimal: [70, 99], status: "warning",
    explanation: "Your fasting glucose is slightly above the optimal range. It is completely manageable with targeted lifestyle changes.",
    whyMatters: "Blood glucose affects your energy, mood, focus, and long-term metabolic health. Stable glucose prevents energy crashes and reduces chronic disease risk.",
    howToImprove: "Reduce refined carbohydrates and sugary drinks. Add a 10-minute walk after meals. Prioritize 7–8 hours of sleep nightly.",
    aiExplanation: "Your recent sleep data shows 5.8 hours average — chronic short sleep directly elevates fasting glucose. Fixing sleep alone may move this marker into range.",
    aiRecommendation: "Implement post-meal walks (10 min after lunch and dinner). Swap one refined carb meal with protein + fiber daily. Recheck in 6 weeks.",
    icon: "📊",
  },
  {
    name: "Ferritin", value: 15, unit: "ng/mL", min: 0, max: 200, optimal: [30, 150], status: "warning",
    explanation: "Your ferritin reflects low iron stores. Even when other markers look normal, low ferritin causes fatigue, reduced workout recovery, and brain fog.",
    whyMatters: "Ferritin is your body's iron reservoir. Low stores deplete your energy, impair thyroid function, reduce physical endurance, and slow cognitive processing.",
    howToImprove: "Eat red meat, lentils, and dark leafy greens at 2 meals daily. Pair iron foods with vitamin C for better absorption. Avoid tea or coffee within 1 hour of iron-rich meals.",
    aiExplanation: "Your fatigue reports in the app correlate strongly with your low ferritin. Addressing this is likely to produce the most noticeable improvement in daily energy.",
    aiRecommendation: "Add iron-rich foods to 2 meals per day. Consult your doctor about an iron supplement if diet alone is insufficient. Retest in 8 weeks.",
    icon: "⚡",
  },
  {
    name: "TSH", value: 2.1, unit: "mIU/L", min: 0, max: 6, optimal: [0.4, 4.0], status: "good",
    explanation: "Your thyroid stimulating hormone is perfectly balanced, sitting near the optimal midpoint. Your thyroid is functioning at full capacity.",
    whyMatters: "TSH regulates your metabolism, energy production, weight, body temperature, and mood. A well-functioning thyroid is the engine of whole-body vitality.",
    howToImprove: "Maintain your stress management practices and balanced diet. Selenium-rich foods like Brazil nuts (1–2 daily) actively support thyroid health.",
    aiExplanation: "Your TSH has been consistently in range across all three of your tests — excellent thyroid stability that reflects good overall lifestyle consistency.",
    aiRecommendation: "No intervention needed. Continue annual monitoring. Manage stress proactively to protect this stability long-term.",
    icon: "🦋",
  },
];

const learningTopics = [
  { id: "biomarkers", title: "What Are Biomarkers?", emoji: "🔬", bg: "#e4f4f4",
    mascotMsg: "Biomarkers are measurable signals in your blood and body that reveal how well your organs and systems are functioning. Think of them as your body's report card!",
    detail: "Your lab results contain dozens of biomarkers. Together, they paint a complete picture of your health that no single number can show alone." },
  { id: "sleep", title: "Sleep & Your Biomarkers", emoji: "🌙", bg: "#eef0ff",
    mascotMsg: "Sleep is when your body repairs cells, resets hormones, and consolidates memories. Poor sleep can raise blood glucose, elevate cortisol, and suppress immunity — often more powerfully than diet does.",
    detail: "Even one week of short sleep can push your fasting glucose into the pre-diabetic range. Quality sleep is the highest-leverage health habit available to you." },
  { id: "stress", title: "Stress & Your Health", emoji: "🧘", bg: "#fff5e8",
    mascotMsg: "Chronic stress floods your body with cortisol, which raises blood sugar, suppresses immune function, disrupts hormones, and even impairs gut health.",
    detail: "Managing stress is one of the highest-ROI interventions in health. Small daily practices — breathing, movement, nature — compound powerfully over months." },
  { id: "nutrition", title: "Nutrition's Impact", emoji: "🥗", bg: "#efffef",
    mascotMsg: "What you eat directly shapes your biomarkers — sometimes within days. Nutrient deficiencies, iron levels, glucose, and inflammation markers all respond rapidly to dietary shifts.",
    detail: "Vitamin D, ferritin, and blood glucose are among the fastest-responding markers to nutritional changes." },
  { id: "lifestyle", title: "Lifestyle Factors", emoji: "🏃", bg: "#ffeef5",
    mascotMsg: "Exercise, sunlight, hydration, and social connection all show up in your lab results. Small daily habits create measurable biological change over months.",
    detail: "Your Mulhim app data connects your daily habits directly to your biomarker trends, so you can see exactly which behaviors move the needle for you." },
  { id: "ai", title: "Your AI Insights", emoji: "✨", bg: "#f5f0ff",
    mascotMsg: "I've analyzed your biomarkers, sleep data, nutrition logs, stress patterns, and activity together to build recommendations that are uniquely tailored to your biology.",
    detail: "Every insight in your Health Report is grounded in your specific data and cross-referenced with the latest clinical research." },
];

const aiRecommendations = [
  { id: 1, action: "15-Minute Morning Sunlight Walk",
    whyAI: "Your Vitamin D is at 22 ng/mL and your sleep tracker shows you rarely leave indoors before noon. Morning sunlight is the most effective and zero-cost intervention.",
    biomarker: "Vitamin D · 22 ng/mL", biomarkerIcon: "☀️",
    benefit: "Vitamin D levels could reach the optimal range within 6–8 weeks. Circadian alignment also improves sleep quality.",
    science: "UVB radiation triggers Vitamin D synthesis in the skin. Morning light also suppresses melatonin and anchors the circadian clock.",
    effort: "Easy", impact: "High", timeline: "6–8 weeks", icon: "🌅" },
  { id: 2, action: "10-Minute Post-Meal Walk",
    whyAI: "Your fasting glucose of 102 mg/dL is just above the optimal range. Post-meal walks are clinically shown to blunt glucose spikes by up to 30%.",
    biomarker: "Blood Glucose · 102 mg/dL", biomarkerIcon: "📊",
    benefit: "Fasting glucose could normalize within 4–6 weeks. Sustained walking also increases insulin sensitivity.",
    science: "Skeletal muscle contractions during walking uptake glucose independently of insulin via GLUT4 transporters.",
    effort: "Easy", impact: "High", timeline: "4–6 weeks", icon: "🚶" },
  { id: 3, action: "Iron-Rich Meals with Vitamin C Pairing",
    whyAI: "Your ferritin at 15 ng/mL is well below optimal. Your food logs show infrequent iron-rich meals and regular tea with meals — which blocks iron absorption by up to 60%.",
    biomarker: "Ferritin · 15 ng/mL", biomarkerIcon: "⚡",
    benefit: "Ferritin levels should recover to the 30+ optimal range within 8–12 weeks. Energy and exercise recovery will improve noticeably.",
    science: "Non-heme iron absorption from plants is enhanced 3x by co-ingesting vitamin C, which converts Fe³⁺ to more absorbable Fe²⁺.",
    effort: "Moderate", impact: "High", timeline: "8–12 weeks", icon: "🥩" },
];

const quizQuestions = [
  { question: "What does a low Ferritin level most commonly cause?", options: ["High blood pressure", "Fatigue and low energy", "Joint pain", "Skin rashes"], correct: 1,
    explanation: "Ferritin stores iron in your body. Low ferritin depletes energy reserves, causing persistent fatigue — even before anemia develops.", emoji: "⚡" },
  { question: "How long does morning sunlight need to be to boost Vitamin D?", options: ["5 minutes", "15–20 minutes", "1 hour", "2+ hours"], correct: 1,
    explanation: "Just 15–20 minutes of morning UVB sunlight on exposed skin is enough for your body to synthesize a meaningful Vitamin D dose.", emoji: "☀️" },
  { question: "Which habit most directly lowers post-meal blood glucose?", options: ["Drinking green tea", "Taking a 10-min walk", "Deep breathing", "Eating slowly"], correct: 1,
    explanation: "A 10-minute post-meal walk triggers muscle glucose uptake via GLUT4 transporters — reducing blood glucose spikes by up to 30%.", emoji: "📊" },
  { question: "What does TSH measure?", options: ["Blood sugar levels", "Iron stores", "Thyroid activity", "Vitamin D production"], correct: 2,
    explanation: "TSH (Thyroid Stimulating Hormone) tells your thyroid how much hormone to produce. It's the key indicator of thyroid health.", emoji: "🦋" },
];

const achievements = [
  { id: 1, icon: "🌱", name: "First Step", desc: "Set your first health goal", earned: true },
  { id: 2, icon: "🔥", name: "7-Day Streak", desc: "Followed your plan 7 days in a row", earned: true },
  { id: 3, icon: "🎯", name: "Goal Crusher", desc: "Completed your first health goal", earned: false },
  { id: 4, icon: "⚡", name: "30-Day Streak", desc: "Followed your plan 30 days in a row", earned: false },
  { id: 5, icon: "📈", name: "On the Rise", desc: "Improved progress in 3 health areas", earned: false },
  { id: 6, icon: "💎", name: "All Green", desc: "All 6 plans completed in the same week", earned: false },
];

// Exercise plan adapts rest day by locale
function buildExercisePlan(locale: Locale) {
  const restDay = locale === "ar" ? "Sat" : "Sun";
  const restDayLabel = locale === "ar" ? "السبت · Rest" : "Sunday · Rest";
  return [
    { day: "Mon", label: "Strength A", icon: "🏋️", focus: "Lower body power", type: "Strength", color: "#e8f5f5",
      exercises: [
        { name: "Barbell Squat", sets: "4×6", note: "Explosive concentric — fast-twitch activation" },
        { name: "Romanian Deadlift", sets: "3×8", note: "Hip hinge + posterior chain" },
        { name: "Box Jumps", sets: "4×5", note: "Power output — leverage your fast-twitch fibers" },
      ], duration: "55 min", intensity: "High" },
    { day: "Tue", label: "Zone 2 Cardio", icon: "🚴", focus: "Metabolic conditioning", type: "Cardio", color: "#eef0ff",
      exercises: [
        { name: "Bike or brisk walk", sets: "40 min", note: "Heart rate 120–140 bpm — fat oxidation zone" },
        { name: "Post-session stretch", sets: "10 min", note: "Hip flexors, hamstrings, calves" },
      ], duration: "50 min", intensity: "Low–Moderate" },
    { day: "Wed", label: "Strength B", icon: "💪", focus: "Upper body push + pull", type: "Strength", color: "#ffeef5",
      exercises: [
        { name: "Incline Dumbbell Press", sets: "4×8", note: "Chest with shoulder safety" },
        { name: "Barbell Row", sets: "4×6", note: "Heavy pulls for back thickness" },
        { name: "Weighted Pull-Ups", sets: "3×6", note: "Lat width and grip strength" },
      ], duration: "55 min", intensity: "High" },
    { day: "Thu", label: "Recovery", icon: "🧘", focus: "Active recovery + mobility", type: "Recovery", color: "#fff5e8",
      exercises: [
        { name: "15 min morning sunlight walk", sets: "—", note: "Boosts Vitamin D + circadian reset" },
        { name: "Yoga flow or stretching", sets: "20 min", note: "Parasympathetic activation" },
      ], duration: "35 min", intensity: "Very Low" },
    { day: "Fri", label: "Sprint Day", icon: "🏃", focus: "Power + metabolic boost", type: "HIIT", color: "#e8f5f5",
      exercises: [
        { name: "Sprint intervals", sets: "8×30s on / 90s off", note: "Maximizes power output" },
        { name: "Core circuit", sets: "3 rounds", note: "Plank, dead bug, pallof press" },
      ], duration: "45 min", intensity: "Very High" },
    { day: restDay, label: "Long Walk", icon: "🌿", focus: "NEAT + sunlight", type: "Cardio", color: "#efffef",
      exercises: [
        { name: "Outdoor walk", sets: "60 min", note: "Maximum sunlight exposure" },
        { name: "Bodyweight mobility", sets: "15 min", note: "Hip 90/90, thoracic rotation" },
      ], duration: "75 min", intensity: "Low" },
    { day: locale === "ar" ? "Fri" : "Sat", label: restDayLabel, icon: "😴", focus: "Full recovery", type: "Rest", color: "#f5f5f5", exercises: [], duration: "—", intensity: "—" },
  ];
}

const suggestedGoals = [
  { id: "vitd", icon: "☀️", title: "Optimize Vitamin D", subtitle: "Based on your 22 ng/mL result",
    why: "Raising it to 30+ ng/mL can improve energy, immunity, and mood.", difficulty: "Easy", duration: "8 weeks",
    biomarker: "Vitamin D", color: "#fff8e8", accentColor: "#f59e0b",
    steps: ["15 min morning sunlight daily", "2000 IU Vitamin D3 + K2 supplement", "Retest after 8 weeks"], xp: 150 },
  { id: "glucose", icon: "📊", title: "Stabilize Blood Glucose", subtitle: "Based on your 102 mg/dL result",
    why: "Small daily habits can move it into the optimal range.", difficulty: "Easy", duration: "6 weeks",
    biomarker: "Blood Glucose", color: "#efffef", accentColor: "#22c55e",
    steps: ["10 min post-meal walk after lunch & dinner", "Swap one refined carb meal daily", "Sleep 7+ hours nightly"], xp: 200 },
  { id: "ferritin", icon: "⚡", title: "Rebuild Iron Stores", subtitle: "Based on your 15 ng/mL ferritin",
    why: "Low ferritin is the most likely cause of your reported fatigue.", difficulty: "Moderate", duration: "10 weeks",
    biomarker: "Ferritin", color: "#f0f0ff", accentColor: "#8b5cf6",
    steps: ["Iron-rich meals at 2 meals daily", "Pair with vitamin C for absorption", "Avoid tea/coffee 1hr after meals"], xp: 250 },
  { id: "holistic", icon: "🌿", title: "Complete Wellness Reset", subtitle: "Addresses all 3 low biomarkers",
    why: "A combined plan that tackles Vitamin D, glucose, and ferritin together.", difficulty: "Challenging", duration: "12 weeks",
    biomarker: "All markers", color: "#e8f5f5", accentColor: "#1e5e5e",
    steps: ["Daily sunlight + supplements", "Post-meal walks + sleep routine", "Iron-focused nutrition protocol"], xp: 500 },
];

const geneticMarkers = [
  { gene: "VDR", variant: "Taq1 TT", impact: "Reduced Vitamin D receptor efficiency", category: "Nutrition", icon: "☀️", color: "#fff8e8", accentColor: "#f59e0b",
    implication: "Your body absorbs Vitamin D less efficiently. You need higher intake through sunlight and supplementation to reach the same blood levels as others." },
  { gene: "MTHFR", variant: "C677T Heterozygous", impact: "Reduced folate metabolism", category: "Nutrition", icon: "🥬", color: "#efffef", accentColor: "#22c55e",
    implication: "Your body converts folate to its active form more slowly. Prioritize methylated B vitamins (methylfolate, methylcobalamin) over synthetic folic acid." },
  { gene: "APOE", variant: "E3/E3", impact: "Standard lipid metabolism", category: "Metabolism", icon: "💛", color: "#f0f0ff", accentColor: "#8b5cf6",
    implication: "You have the most common APOE variant, meaning average cardiovascular risk. A balanced diet with moderate healthy fats is well-suited to your profile." },
  { gene: "ACTN3", variant: "RR (Power)", impact: "Fast-twitch muscle dominance", category: "Exercise", icon: "💪", color: "#ffeef5", accentColor: "#ec4899",
    implication: "Your muscle fiber type leans toward power and speed. You respond well to strength training and sprint intervals." },
  { gene: "COMT", variant: "Val/Val (Fast)", impact: "Rapid dopamine clearance", category: "Recovery", icon: "🧠", color: "#eef0ff", accentColor: "#6366f1",
    implication: "You clear stress hormones quickly, making you resilient under pressure. High-intensity training suits you well, but recovery protocols are still critical." },
];

const nutritionPlan = {
  macros: { protein: 32, carbs: 40, fat: 28 },
  meals: [
    { time: "7:00 AM", label: "Breakfast", icon: "🌅", calories: 420,
      items: ["2 eggs + spinach omelette", "1 slice sourdough + avocado", "B-complex supplement"],
      note: "B vitamins at breakfast keep energy and mood steady all morning" },
    { time: "12:30 PM", label: "Lunch", icon: "☀️", calories: 560,
      items: ["Grilled chicken breast 150g", "Lentils + brown rice", "Lemon-dressed rocket salad"],
      note: "Iron + vitamin C pairing targets your low ferritin" },
    { time: "3:30 PM", label: "Snack", icon: "🍎", calories: 280,
      items: ["Brazil nuts (2) + almonds", "Protein shake (25g whey)", "1 kiwi"],
      note: "Selenium from Brazil nuts supports thyroid and VDR function" },
    { time: "7:00 PM", label: "Dinner", icon: "🌙", calories: 580,
      items: ["Salmon fillet 200g (Vitamin D + omega-3)", "Roasted sweet potato + broccoli", "Extra-virgin olive oil drizzle"],
      note: "Fatty fish is the most bioavailable Vitamin D food source" },
  ],
  supplements: [
    { name: "Vitamin D3 + K2", dose: "2000 IU / 100 mcg", timing: "With breakfast", icon: "☀️", reason: "Your body absorbs Vitamin D less efficiently — supplement fills the gap" },
    { name: "Active B9 (folate)", dose: "400 mcg", timing: "Morning", icon: "🥬", reason: "The most readily absorbed form of B9 for mood and energy support" },
    { name: "Vitamin B12", dose: "1000 mcg", timing: "Morning", icon: "💊", reason: "Supports energy production, focus, and red blood cell health" },
    { name: "Iron bisglycinate", dose: "18 mg", timing: "With vitamin C, away from coffee", icon: "⚡", reason: "Gentle form for low ferritin" },
  ],
};

const goals = [
  { id: "energy", icon: "⚡", label: "More Energy", desc: "Combat fatigue and boost daily vitality" },
  { id: "fat-loss", icon: "🔥", label: "Fat Loss", desc: "Reduce body fat while preserving muscle" },
  { id: "muscle", icon: "💪", label: "Build Muscle", desc: "Increase strength and lean mass" },
  { id: "longevity", icon: "🌿", label: "Longevity", desc: "Optimize for long-term health and aging" },
  { id: "performance", icon: "🏃", label: "Athletic Performance", desc: "Improve endurance and power output" },
  { id: "mental", icon: "🧠", label: "Mental Clarity", desc: "Sharpen focus, memory, and mood" },
];

const breakReasons = [
  { id: "vacation", icon: "✈️", label: "Vacation" },
  { id: "busy", icon: "📅", label: "Busy Schedule" },
  { id: "health", icon: "🏥", label: "Health Reasons" },
  { id: "personal", icon: "💛", label: "Personal Reasons" },
  { id: "other", icon: "💬", label: "Other" },
];

const breakDurations = ["1 week", "2 weeks", "1 month", "3 months", "Custom"];

// ─── Root ─────────────────────────────────────────────────────────────────────

export default function App() {
  const [screen, setScreen] = useState<Screen>("home");
  const [learningStep, setLearningStep] = useState(0);
  const [selectedBiomarker, setSelectedBiomarker] = useState<Biomarker>(biomarkers[0]);
  const [selectedRec, setSelectedRec] = useState(aiRecommendations[0]);
  const [quizScore, setQuizScore] = useState(0);
  const [prevScreen, setPrevScreen] = useState<Screen>("home");
  const [hasCoach, setHasCoach] = useState(false);
  const [locale, setLocale] = useState<Locale>("en");
  const [selectedRegion, setSelectedRegion] = useState("international");
  const [showSettings, setShowSettings] = useState(false);
  const [showQuickActions, setShowQuickActions] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<CategoryId>("sleep");

  // Goal plan state — lives at root so it persists across screen navigations
  const [planGenerated, setPlanGenerated] = useState(false);
  const [userGoals, setUserGoals] = useState<string[]>([]);
  const [customGoal, setCustomGoal] = useState("");

  const navigate = (to: Screen) => { setPrevScreen(screen); setScreen(to); };
  const goBack = () => setScreen(prevScreen);

  // Which tab is active based on current screen
  const activeTab: "home" | "nutrition" | "exercise" | "chat" | "none" =
    screen === "home" || screen === "goal-setup"
    || screen === "recovery-hub" || screen === "mental-hub" || screen === "hair-skin-hub"
    || screen === "achievement" || screen === "progress" ? "home"
    : screen === "nutrition-hub" || (screen === "category" && selectedCategory === "nutrition") ? "nutrition"
    : screen === "exercise-hub" || (screen === "category" && selectedCategory === "exercise") ? "exercise"
    : screen === "chat" ? "chat"
    : "none";

  return (
    <div className="min-h-screen bg-[#e0e0e0] flex items-start justify-center">
      <div className="w-full max-w-[390px] min-h-screen bg-[#f0f0f0] relative flex flex-col overflow-x-hidden"
        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>

        {/* ── Scrollable screen area ── */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden">

        {/* Settings overlay */}
        {showSettings && (
          <div className="fixed inset-0 z-50 flex items-end justify-center" onClick={() => setShowSettings(false)}>
            <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />
            <div className="relative w-full max-w-[390px] bg-white rounded-t-[32px] p-6 pb-10 shadow-2xl" onClick={(e) => e.stopPropagation()}>
              <div className="w-10 h-1 bg-[#e0e0e0] rounded-full mx-auto mb-5" />
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-full bg-[#e8f5f5] flex items-center justify-center">
                  <ImageWithFallback src={mascotCharImg} alt="Mulhim" className="w-8 h-8 object-contain" />
                </div>
                <div>
                  <p className="text-[15px] font-bold text-[#1a1a1a]">Demo Settings</p>
                  <p className="text-[11px] text-[#aaa]">Switch user type and region</p>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-[11px] font-bold text-[#aaa] uppercase tracking-[0.1em] mb-3">User Type</p>
                <div className="flex gap-2">
                  {([false, true] as const).map((v) => (
                    <button key={String(v)} onClick={() => setHasCoach(v)}
                      className={`flex-1 py-3 rounded-[16px] text-[13px] font-bold transition-all ${hasCoach === v ? "bg-[#1e5e5e] text-white shadow-sm" : "bg-[#f5f5f5] text-[#666]"}`}>
                      {v ? "👨‍⚕️ Has Coach" : "🤖 Individual"}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-5">
                <p className="text-[11px] font-bold text-[#aaa] uppercase tracking-[0.1em] mb-3">Choose Your Region</p>
                <div className="flex flex-col gap-3 max-h-[260px] overflow-y-auto pr-1">
                  {worldRegions.map((group) => (
                    <div key={group.group}>
                      <p className="text-[10px] font-bold text-[#ccc] uppercase tracking-[0.1em] mb-1.5">{group.group}</p>
                      <div className="grid grid-cols-2 gap-1.5">
                        {group.items.map((r) => (
                          <button key={r.id}
                            onClick={() => { setSelectedRegion(r.id); setLocale(r.locale); }}
                            className={`flex items-center gap-2 px-2.5 py-2 rounded-[12px] text-left transition-all ${selectedRegion === r.id ? "bg-[#1e5e5e] text-white shadow-sm" : "bg-[#f5f5f5] text-[#555]"}`}>
                            <span className="text-[16px] flex-shrink-0">{r.flag}</span>
                            <span className="text-[11px] font-semibold leading-tight">{r.name}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <button onClick={() => setShowSettings(false)}
                className="w-full py-4 rounded-[18px] bg-[#1e5e5e] text-white font-bold text-[15px]">
                Done
              </button>
            </div>
          </div>
        )}

        {screen === "home" && (
          <HomeScreen
            hasCoach={hasCoach}
            onCategory={(id) => { setSelectedCategory(id); navigate("category"); }}
            onReport={() => navigate("report")}
            onSettings={() => setShowSettings(true)}
            onRecovery={() => navigate("recovery-hub")}
            onMentalHub={() => navigate("mental-hub")}
            onHairSkin={() => navigate("hair-skin-hub")}
            onAchievement={() => navigate("achievement")}
            onProfile={() => navigate("profile")} />
        )}
        {screen === "goal-setup" && (
          <GoalSetupScreen
            initialGoals={userGoals}
            initialCustom={customGoal}
            hasCoach={hasCoach}
            onBack={goBack}
            onComplete={(goals, custom) => {
              setUserGoals(goals);
              setCustomGoal(custom);
              setPlanGenerated(true);
              setScreen("home");
            }} />
        )}
        {screen === "category" && (
          <CategoryDetail
            categoryId={selectedCategory}
            hasCoach={hasCoach}
            onBack={goBack} />
        )}
        {screen === "report" && (
          <HealthReport biomarkers={biomarkers} hasCoach={hasCoach}
            onSettings={() => setShowSettings(true)} />
        )}
        {screen === "welcome" && (
          <LearnWelcome onBack={() => navigate("home")}
            onStart={() => { setLearningStep(0); navigate("learning"); }} />
        )}
        {screen === "learning" && (
          <InteractiveLearning step={learningStep} topics={learningTopics}
            onPrev={() => setLearningStep((s) => Math.max(0, s - 1))}
            onNext={() => { if (learningStep < learningTopics.length - 1) setLearningStep((s) => s + 1); else navigate("quiz"); }}
            onBack={() => navigate("welcome")} />
        )}
        {screen === "biomarker" && (
          <BiomarkerDetails biomarker={selectedBiomarker} hasCoach={hasCoach}
            onBack={() => navigate("report")}
            onAIRec={(r) => { setSelectedRec(r); navigate("ai-recommendation"); }} />
        )}
        {screen === "ai-recommendation" && (
          <AIRecommendation rec={selectedRec} allRecs={aiRecommendations} hasCoach={hasCoach}
            onBack={goBack} onSelectRec={(r) => setSelectedRec(r)} />
        )}
        {screen === "quiz" && (
          <MiniQuiz questions={quizQuestions} onBack={() => navigate("learning")}
            onFinish={(score) => { setQuizScore(score); navigate("congratulations"); }} />
        )}
        {screen === "congratulations" && (
          <Congratulations score={quizScore} total={quizQuestions.length}
            onReturn={() => navigate("home")} onAchievement={() => navigate("achievement")} />
        )}
        {screen === "progress" && (
          <ProgressScreen onBack={() => navigate("home")}
            onAchievement={() => navigate("achievement")}
            onGoalBuilder={() => navigate("goal-builder")} />
        )}
        {screen === "achievement" && (
          <AchievementScreen
            onBack={goBack}
            onSetGoal={() => navigate("goal-setup")} />
        )}
        {screen === "journey-hub" && (
          <JourneyHubScreen
            onBack={goBack}
            onMaintenance={() => navigate("maintenance")}
            onBreak={() => navigate("take-a-break")}
            onSetGoal={() => navigate("goal-setup")} />
        )}
        {screen === "goal-builder" && (
          <AIGoalBuilder hasCoach={hasCoach} onBack={goBack}
            onMaintenance={() => navigate("maintenance")} onBreak={() => navigate("take-a-break")} />
        )}
        {screen === "maintenance" && (
          <MaintenancePlan hasCoach={hasCoach} onBack={() => navigate("goal-builder")} onBreak={() => navigate("take-a-break")} />
        )}
        {screen === "take-a-break" && (
          <TakeABreak onBack={goBack} onResume={() => navigate("home")} />
        )}
        {screen === "genetic-plan" && (
          <GeneticPlanBuilder hasCoach={hasCoach} locale={locale} onBack={() => navigate("home")} />
        )}
        {screen === "recovery-hub" && (
          <RecoveryHubScreen hasCoach={hasCoach}
            onBack={goBack}
            onCategory={(id) => { setSelectedCategory(id); navigate("category"); }}
            onProfile={() => navigate("profile")} />
        )}
        {screen === "mental-hub" && (
          <MentalHubScreen hasCoach={hasCoach}
            onBack={goBack}
            onCategory={() => { setSelectedCategory("mental"); navigate("category"); }}
            onProfile={() => navigate("profile")} />
        )}
        {screen === "nutrition-hub" && (
          <NutritionHubScreen hasCoach={hasCoach} onProfile={() => navigate("profile")} />
        )}
        {screen === "plans-hub" && (
          <PlansHubScreen
            hasCoach={hasCoach}
            planGenerated={planGenerated}
            userGoals={userGoals}
            onCategory={(id) => { setSelectedCategory(id); navigate("category"); }}
            onSetGoals={() => navigate("goal-setup")}
            onReport={() => navigate("report")} />
        )}
        {screen === "exercise-hub" && (
          <ExerciseHubScreen
            hasCoach={hasCoach}
            locale={locale}
            onFullPlan={() => { setSelectedCategory("exercise"); navigate("category"); }}
            onHairSkin={() => navigate("hair-skin-hub")}
            onProfile={() => navigate("profile")} />
        )}
        {screen === "hair-skin-hub" && (
          <HairSkinHubScreen hasCoach={hasCoach} onBack={goBack} onProfile={() => navigate("profile")} />
        )}
        {screen === "profile" && (
          <ProfileScreen
            hasCoach={hasCoach}
            locale={locale}
            onReport={() => navigate("report")}
            onGeneticPlan={() => navigate("genetic-plan")}
            onGoalSetup={() => navigate("goal-setup")}
            onProgress={() => navigate("progress")}
            onSettings={() => setShowSettings(true)}
            onLocaleToggle={() => setLocale(l => l === "en" ? "ar" : "en")}
            onUpgrade={() => { setHasCoach(true); setScreen("home"); }}
          />
        )}
        {screen === "chat" && (
          <MulhimChatScreen hasCoach={hasCoach} />
        )}

        </div>{/* end scrollable area */}

        {/* ── Quick Actions Bottom Sheet ── */}
        {showQuickActions && (
          <div className="fixed inset-0 z-40 flex items-end justify-center" onClick={() => setShowQuickActions(false)}>
            <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
            <div className="relative w-full max-w-[390px] bg-white rounded-t-[32px] px-5 pt-5 pb-10 shadow-2xl"
              onClick={(e) => e.stopPropagation()}>
              <div className="w-10 h-1 bg-[#e0e0e0] rounded-full mx-auto mb-6" />
              <p className="text-[11px] font-bold text-[#aaa] uppercase tracking-[0.14em] mb-4">Quick Actions</p>
              <div className="flex flex-col gap-3">
                {([
                  { icon: Droplets,  label: "Track Water",        sub: "Log your hydration",              color: "#0ea5e9", bg: "#e0f2fe" },
                  { icon: Sparkles,  label: "Suggest Meal with AI", sub: "AI-powered meal recommendation", color: "#8b5cf6", bg: "#ede9fe" },
                  { icon: Dna,       label: "Scan Barcode",        sub: "Add food by barcode",             color: "#1e5e5e", bg: "#e8f5f5" },
                  { icon: Apple,     label: "Snap Your Meal",      sub: "Log food with a photo",           color: "#f59e0b", bg: "#fef3c7" },
                ] as { icon: React.ElementType; label: string; sub: string; color: string; bg: string }[]).map(({ icon: Icon, label, sub, color, bg }) => (
                  <button key={label} onClick={() => setShowQuickActions(false)}
                    className="flex items-center gap-4 p-4 rounded-[20px] bg-[#f9f9f9] active:scale-[0.98] transition-transform text-left">
                    <div className="w-11 h-11 rounded-[14px] flex items-center justify-center flex-shrink-0" style={{ backgroundColor: bg }}>
                      <Icon size={20} style={{ color }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[14px] font-bold text-[#1a1a1a]">{label}</p>
                      <p className="text-[11px] text-[#999] mt-0.5">{sub}</p>
                    </div>
                    <ChevronRight size={16} className="text-[#ccc] flex-shrink-0" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── Bottom Navigation Bar ── */}
        <div className="flex-shrink-0 bg-white border-t border-[#ebebeb] shadow-[0_-4px_20px_rgba(0,0,0,0.06)] relative"
          style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}>
          <div className="flex items-stretch h-[64px]">
            {/* Home */}
            {([
              { id: "home",      icon: Home,          label: "Home",      action: () => setScreen("home") },
              { id: "nutrition", icon: Apple,          label: "Nutrition", action: () => navigate("nutrition-hub") },
            ] as { id: string; icon: React.ElementType; label: string; action: () => void }[]).map(({ id, icon: Icon, label, action }) => (
              <button key={id} onClick={action}
                className={`flex-1 flex flex-col items-center justify-center gap-1 transition-all ${activeTab === id ? "text-[#1e5e5e]" : "text-[#bbb]"}`}>
                <div className={`w-9 h-9 rounded-[14px] flex items-center justify-center transition-all ${activeTab === id ? "bg-[#e8f5f5]" : ""}`}>
                  <Icon size={17} strokeWidth={activeTab === id ? 2.5 : 1.8} />
                </div>
                <span className={`text-[9px] font-bold leading-none ${activeTab === id ? "text-[#1e5e5e]" : "text-[#ccc]"}`}>{label}</span>
              </button>
            ))}

            {/* Centre "+" FAB */}
            <div className="flex-1 flex flex-col items-center justify-center">
              <button onClick={() => setShowQuickActions(true)}
                className="w-12 h-12 rounded-full bg-gradient-to-br from-[#1e5e5e] to-[#4db8b8] flex items-center justify-center shadow-[0_4px_16px_rgba(30,94,94,0.40)] active:scale-95 transition-transform -mt-4">
                <Plus size={26} strokeWidth={2.5} className="text-white" />
              </button>
            </div>

            {/* Chat + Exercise */}
            {([
              { id: "chat",      icon: MessageCircle, label: "Chat",     action: () => navigate("chat"),         highlight: true },
              { id: "exercise",  icon: Dumbbell,      label: "Exercise", action: () => navigate("exercise-hub") },
            ] as { id: string; icon: React.ElementType; label: string; action: () => void; highlight?: boolean }[]).map(({ id, icon: Icon, label, action, highlight }) => (
              <button key={id} onClick={action}
                className={`flex-1 flex flex-col items-center justify-center gap-1 transition-all ${activeTab === id ? "text-[#1e5e5e]" : "text-[#bbb]"}`}>
                {highlight && activeTab !== id ? (
                  <div className="w-11 h-9 rounded-[16px] bg-gradient-to-br from-[#1e5e5e] to-[#4db8b8] flex items-center justify-center shadow-[0_4px_12px_rgba(30,94,94,0.35)]">
                    <Icon size={18} strokeWidth={2.2} className="text-white" />
                  </div>
                ) : (
                  <div className={`w-9 h-9 rounded-[14px] flex items-center justify-center transition-all ${activeTab === id ? "bg-[#e8f5f5]" : ""}`}>
                    <Icon size={17} strokeWidth={activeTab === id ? 2.5 : 1.8} />
                  </div>
                )}
                <span className={`text-[9px] font-bold leading-none ${activeTab === id ? "text-[#1e5e5e]" : highlight && activeTab !== id ? "text-[#1e5e5e]" : "text-[#ccc]"}`}>{label}</span>
              </button>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

// ─── Shared: Editable Habit List ─────────────────────────────────────────────

interface Habit { id: string; icon: string; label: string; sublabel?: string; }

function EditableHabitList({ habits, onChange }: {
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

interface RoutineStep { id: string; time: string; icon: string; action: string; }

function EditableRoutineList({ steps, onStepsChange, onToggle, checkedItems, title }: {
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

// ─── Recovery Hub ─────────────────────────────────────────────────────────────

function RecoveryHubScreen({ hasCoach, onBack, onCategory, onProfile }: {
  hasCoach: boolean;
  onBack: () => void;
  onCategory: (id: CategoryId) => void;
  onProfile: () => void;
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
      {/* Header */}
      <div className="px-5 pt-12 pb-4 flex items-center gap-3">
        <button onClick={onBack} className="w-10 h-10 rounded-full bg-white shadow-[0_2px_12px_rgba(0,0,0,0.08)] flex items-center justify-center flex-shrink-0">
          <ArrowLeft size={17} className="text-[#555]" />
        </button>
        <div className="flex-1">
          <p className="text-[10px] font-bold text-[#aaa] uppercase tracking-[0.14em]">Daily Protocol</p>
          <h1 className="text-[22px] font-bold text-[#1a1a1a] leading-tight">Recovery</h1>
        </div>
        <button onClick={onProfile} className="w-10 h-10 rounded-full overflow-hidden bg-[#e8f5f5] border-2 border-[#4db8b8]/40 flex-shrink-0">
          <ImageWithFallback src={mascotSmileImg} alt="Profile" className="w-full h-full object-contain" />
        </button>
      </div>

      {/* Recovery Score */}
      <div className="mx-5 mb-4 bg-gradient-to-br from-[#061e1e] to-[#1e5e5e] rounded-[28px] p-5 flex items-center gap-4 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-[120px] h-[120px] rounded-full bg-[#4db8b8]/15 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-4 h-[90px] flex items-end pointer-events-none">
          <ImageWithFallback src={mascotPillowImg} alt="Recovery" className="h-[86px] w-auto object-contain drop-shadow-lg" />
        </div>
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
        <div className="flex-1 pr-20">
          <div className="flex items-center gap-1.5 mb-1">
            <span className="w-2 h-2 rounded-full bg-[#4db8b8]" />
            <p className="text-[10px] font-bold text-[#4db8b8] uppercase tracking-[0.12em]">{hasCoach ? "Coach Reviewed" : "AI Score"}</p>
          </div>
          <p className="text-[17px] font-bold text-white leading-snug mb-1">Good Recovery</p>
          <p className="text-[11px] text-white/60 leading-relaxed">Sleep quality improved. Keep your evening protocol consistent.</p>
        </div>
      </div>

      {/* Tab selector */}
      <div className="mx-5 mb-4 bg-white rounded-[18px] p-1.5 flex gap-1.5 shadow-[0_2px_10px_rgba(0,0,0,0.05)]">
        {([["sleep","🌙","Sleep"],["physical","❤️","Physical"],["habits","✅","Habits"]] as const).map(([t, emoji, label]) => (
          <button key={t} onClick={() => setTab(t as typeof tab)}
            className={`flex-1 py-2 rounded-[12px] text-[11px] font-bold flex items-center justify-center gap-1 transition-all ${tab === t ? "bg-[#1e5e5e] text-white shadow-sm" : "text-[#888]"}`}>
            <span>{emoji}</span>{label}
          </button>
        ))}
      </div>

      {/* Sleep mascot banner */}
      {tab === "sleep" && (
        <div className="mx-5 mb-4 bg-gradient-to-br from-[#1c1f4a] to-[#2a2f6e] rounded-[24px] p-4 flex items-center gap-3 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-[100px] h-[100px] rounded-full bg-[#8b8ff8]/20 blur-2xl pointer-events-none" />
          <ImageWithFallback src={mascotSideImg} alt="Sleep" className="h-[72px] w-auto object-contain drop-shadow-lg flex-shrink-0 relative z-10" />
          <div className="flex-1">
            <p className="text-[14px] font-bold text-white leading-snug">Tonight's Sleep Goal</p>
            <p className="text-[11px] text-white/60 mt-0.5 leading-relaxed">8 hours · Target 10:30 PM bedtime</p>
            <div className="flex items-center gap-1.5 mt-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#8b8ff8]" />
              <p className="text-[10px] font-semibold text-[#8b8ff8]">3-day streak 🔥</p>
            </div>
          </div>
        </div>
      )}

      {/* Protocol checklist (Sleep / Physical tabs) */}
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

      {/* Habits tab */}
      {tab === "habits" && (
        <div className="mx-5">
          <EditableHabitList habits={habits} onChange={setHabits} />
        </div>
      )}

      {/* Mascot tip */}
      <div className="mx-5 mt-4">
        <MascotBubble text={tab === "sleep" ? "Consistent sleep times matter more than total hours. Pick one bedtime and stick to it this week." : tab === "physical" ? "Two post-meal walks a day is the single highest-impact habit for your blood sugar and energy levels." : "Build one recovery habit at a time. Start with the morning sunlight walk — it sets off a chain reaction."} size="sm" />
      </div>
    </div>
  );
}

// ─── Mental Health Hub ─────────────────────────────────────────────────────────

function MentalHubScreen({ hasCoach, onBack, onCategory, onProfile }: {
  hasCoach: boolean;
  onBack: () => void;
  onCategory: () => void;
  onProfile: () => void;
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
  // Box: 24,24 → 176,176 on 200×200 SVG, side length = 152
  const sidePositions = [
    { x1: 24, y1: 176, x2: 176, y2: 176 }, // bottom: in
    { x1: 176, y1: 176, x2: 176, y2: 24 }, // right: hold1
    { x1: 176, y1: 24, x2: 24, y2: 24 },   // top: out
    { x1: 24, y1: 24, x2: 24, y2: 176 },   // left: hold2
  ];

  const moods = ["😔","😕","😐","🙂","😊"];

  return (
    <div className="flex flex-col pb-6">
      {/* Header */}
      <div className="px-5 pt-12 pb-4 flex items-center gap-3">
        <button onClick={onBack} className="w-10 h-10 rounded-full bg-white shadow-[0_2px_12px_rgba(0,0,0,0.08)] flex items-center justify-center flex-shrink-0">
          <ArrowLeft size={17} className="text-[#555]" />
        </button>
        <div className="flex-1">
          <p className="text-[10px] font-bold text-[#aaa] uppercase tracking-[0.14em]">Daily Protocol</p>
          <h1 className="text-[22px] font-bold text-[#1a1a1a] leading-tight">Mental Health</h1>
        </div>
        <button onClick={onProfile} className="w-10 h-10 rounded-full overflow-hidden bg-[#e8f5f5] border-2 border-[#4db8b8]/40 flex-shrink-0">
          <ImageWithFallback src={mascotSmileImg} alt="Profile" className="w-full h-full object-contain" />
        </button>
      </div>

      {/* Mental health score card */}
      <div className="mx-5 mb-4 bg-gradient-to-br from-[#1a0a3a] to-[#2d1f6e] rounded-[28px] p-5 flex items-center gap-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[120px] h-[120px] rounded-full bg-[#a78bfa]/20 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-3 h-[90px] flex items-end pointer-events-none">
          <ImageWithFallback src={mascotConfusedImg} alt="Mental Health" className="h-[86px] w-auto object-contain drop-shadow-lg" />
        </div>
        <div className="flex-shrink-0 relative">
          <svg width="80" height="80" viewBox="0 0 80 80">
            <circle cx="40" cy="40" r="32" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="8" />
            <circle cx="40" cy="40" r="32" fill="none" stroke="#a78bfa" strokeWidth="8"
              strokeDasharray={`${2 * Math.PI * 32 * 55 / 100} ${2 * Math.PI * 32}`}
              strokeLinecap="round" transform="rotate(-90 40 40)" />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-[20px] font-bold text-white leading-none">55</span>
            <span className="text-[8px] text-white/50 font-semibold">/ 100</span>
          </div>
        </div>
        <div className="flex-1 pr-20">
          <div className="flex items-center gap-1.5 mb-1">
            <span className="w-2 h-2 rounded-full bg-[#a78bfa]" />
            <p className="text-[10px] font-bold text-[#a78bfa] uppercase tracking-[0.12em]">{hasCoach ? "Coach Score" : "AI Score"}</p>
          </div>
          <p className="text-[17px] font-bold text-white leading-snug mb-1">Needs Attention</p>
          <p className="text-[11px] text-white/60 leading-relaxed">Breathing practice and screen breaks will shift this quickly.</p>
        </div>
      </div>

      {/* Mood check-in */}
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

      {/* Daily Protocol */}
      <div className="mx-5 mb-4">
        <EditableRoutineList
          steps={dailyProtocol}
          onStepsChange={setDailyProtocol}
          onToggle={toggle}
          checkedItems={checkedItems}
          title="Today's Mental Protocol"
        />
      </div>

      {/* Box Breathing */}
      <div className="mx-5 mb-4">
        <p className="text-[14px] font-bold text-[#1a1a1a] mb-3">Box Breathing</p>
        <div className="bg-gradient-to-br from-[#0f0c2e] to-[#2d1f6e] rounded-[28px] overflow-hidden">
          {/* Phase color accent bar */}
          <div className="h-1 transition-all duration-700" style={{ backgroundColor: phaseColor }} />
          <div className="p-6 flex flex-col items-center">
            {/* SVG box animation */}
            <div className="relative mb-3">
              <svg width="200" height="200" viewBox="0 0 200 200">
                <defs>
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                    <feMerge><feMergeNode in="coloredBlur" /><feMergeNode in="SourceGraphic" /></feMerge>
                  </filter>
                </defs>
                {/* Background box — dim lines */}
                {sidePositions.map((s, i) => (
                  <line key={i} x1={s.x1} y1={s.y1} x2={s.x2} y2={s.y2}
                    stroke="rgba(255,255,255,0.08)" strokeWidth="2.5" strokeLinecap="round" />
                ))}
                {/* Completed sides — stay lit */}
                {sidePositions.map((s, i) => {
                  const completed = sideActive > i || (sideActive === -1 && breathCount > 0);
                  return completed ? (
                    <line key={`done-${i}`} x1={s.x1} y1={s.y1} x2={s.x2} y2={s.y2}
                      stroke="rgba(255,255,255,0.22)" strokeWidth="2.5" strokeLinecap="round" />
                  ) : null;
                })}
                {/* Active side — bright with glow */}
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
                {/* Corner dots */}
                {[[24,24],[176,24],[176,176],[24,176]].map(([cx,cy], i) => (
                  <circle key={i} cx={cx} cy={cy} r="5"
                    fill={sideActive >= 0 && (i === sideActive || i === (sideActive + 1) % 4) ? phaseColor : "rgba(255,255,255,0.18)"}
                    style={{ transition: "fill 0.4s" }}
                  />
                ))}
                {/* Tracing dot */}
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
              {/* Center label + timer */}
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

            {/* Phase indicators */}
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

      {/* Habits */}
      <div className="mx-5 mb-4">
        <EditableHabitList habits={mentalHabits} onChange={setMentalHabits} />
      </div>

      {/* Navigate to full plan */}
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

function NutritionHubScreen({ hasCoach, onProfile }: { hasCoach: boolean; onProfile: () => void }) {
  const [planView, setPlanView] = useState<"today" | "weekly">("today");
  const [activeSection, setActiveSection] = useState<"meals" | "supplements" | "hydration" | "habits">("meals");
  const [hydration, setHydration] = useState(3);
  const [checkedSupps, setCheckedSupps] = useState<Record<string, boolean>>({});
  const [expandedDay, setExpandedDay] = useState<string | null>("Mon");
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

  const weeklyMeals: { day: string; short: string; kcal: number; meals: { icon: string; label: string; time: string; items: string[]; kcal: number }[] }[] = [
    { day: "Monday",    short: "Mon", kcal: 2150, meals: [
      { icon: "🥣", label: "Breakfast", time: "7:30 AM", kcal: 480, items: ["Greek yogurt with granola & berries", "2 boiled eggs", "Black coffee or green tea"] },
      { icon: "🥗", label: "Lunch",     time: "12:30 PM", kcal: 620, items: ["Grilled chicken salad with quinoa", "Olive oil + lemon dressing", "Sparkling water"] },
      { icon: "🍎", label: "Snack",     time: "3:30 PM", kcal: 220, items: ["Apple with almond butter", "Handful of walnuts"] },
      { icon: "🥩", label: "Dinner",    time: "7:00 PM", kcal: 680, items: ["Baked salmon with sweet potato", "Steamed broccoli & asparagus", "Herbal tea"] },
      { icon: "🌙", label: "Evening",   time: "9:00 PM", kcal: 150, items: ["Casein protein shake or cottage cheese"] },
    ]},
    { day: "Tuesday",   short: "Tue", kcal: 2080, meals: [
      { icon: "🥣", label: "Breakfast", time: "7:30 AM", kcal: 460, items: ["Oat porridge with banana & chia seeds", "Protein shake (30g)", "Green tea"] },
      { icon: "🌯", label: "Lunch",     time: "12:30 PM", kcal: 590, items: ["Turkey & avocado whole-grain wrap", "Side of cherry tomatoes", "Water with lemon"] },
      { icon: "🧀", label: "Snack",     time: "3:30 PM", kcal: 200, items: ["Cottage cheese with cucumber slices"] },
      { icon: "🍗", label: "Dinner",    time: "7:00 PM", kcal: 680, items: ["Grilled chicken thighs", "Brown rice with roasted vegetables", "Mixed greens salad"] },
      { icon: "🌙", label: "Evening",   time: "9:00 PM", kcal: 150, items: ["Handful of almonds or casein protein"] },
    ]},
    { day: "Wednesday", short: "Wed", kcal: 2200, meals: [
      { icon: "🍳", label: "Breakfast", time: "7:30 AM", kcal: 510, items: ["3-egg veggie omelette with feta", "Whole-grain toast", "Orange juice (small)"] },
      { icon: "🥘", label: "Lunch",     time: "12:30 PM", kcal: 640, items: ["Lentil & vegetable soup", "Grilled halloumi on the side", "Whole-grain pita"] },
      { icon: "🍌", label: "Snack",     time: "3:30 PM", kcal: 210, items: ["Banana + peanut butter", "Protein bar (optional)"] },
      { icon: "🐟", label: "Dinner",    time: "7:00 PM", kcal: 690, items: ["Pan-seared sea bass", "Cauliflower mash", "Sautéed spinach with garlic"] },
      { icon: "🌙", label: "Evening",   time: "9:00 PM", kcal: 150, items: ["Greek yogurt with a drizzle of honey"] },
    ]},
    { day: "Thursday",  short: "Thu", kcal: 2050, meals: [
      { icon: "🥣", label: "Breakfast", time: "7:30 AM", kcal: 450, items: ["Overnight oats with protein powder", "Fresh berries & flaxseed", "Espresso"] },
      { icon: "🍱", label: "Lunch",     time: "12:30 PM", kcal: 580, items: ["Meal-prep beef stir-fry with noodles", "Edamame on the side", "Water"] },
      { icon: "🥜", label: "Snack",     time: "3:30 PM", kcal: 190, items: ["Mixed nuts (30g)", "1 square dark chocolate"] },
      { icon: "🥦", label: "Dinner",    time: "7:00 PM", kcal: 680, items: ["Ground turkey stuffed peppers", "Quinoa", "Steamed green beans"] },
      { icon: "🌙", label: "Evening",   time: "9:00 PM", kcal: 150, items: ["Casein shake or 100g cottage cheese"] },
    ]},
    { day: "Friday",    short: "Fri", kcal: 2180, meals: [
      { icon: "🥞", label: "Breakfast", time: "8:00 AM", kcal: 500, items: ["Protein pancakes (3) with maple syrup", "Fresh fruit bowl", "Coffee"] },
      { icon: "🥗", label: "Lunch",     time: "1:00 PM", kcal: 620, items: ["Caesar salad with grilled shrimp", "Whole-grain croutons", "Sparkling water"] },
      { icon: "🍇", label: "Snack",     time: "4:00 PM", kcal: 180, items: ["Grapes & cheese (30g)", "Green tea"] },
      { icon: "🥩", label: "Dinner",    time: "7:30 PM", kcal: 730, items: ["Lean beef burger (no bun)", "Sweet potato fries (baked)", "Side salad"] },
      { icon: "🌙", label: "Evening",   time: "9:30 PM", kcal: 150, items: ["Protein ice cream or Greek yogurt"] },
    ]},
    { day: "Saturday",  short: "Sat", kcal: 2300, meals: [
      { icon: "🍳", label: "Brunch",    time: "9:30 AM", kcal: 680, items: ["Eggs Benedict (2) on English muffin", "Smoked salmon", "Fresh-squeezed OJ", "Americano"] },
      { icon: "🥙", label: "Lunch",     time: "1:30 PM", kcal: 620, items: ["Chicken shawarma bowl", "Hummus, tabbouleh, pickled veg", "Sparkling water"] },
      { icon: "🧃", label: "Snack",     time: "4:30 PM", kcal: 200, items: ["Smoothie: banana, spinach, almond milk, protein"] },
      { icon: "🍕", label: "Dinner",    time: "7:30 PM", kcal: 800, items: ["Homemade thin-crust pizza (2 slices)", "Large salad with olive oil", "Glass of red wine (optional)"] },
    ]},
    { day: "Sunday",    short: "Sun", kcal: 1980, meals: [
      { icon: "🥣", label: "Breakfast", time: "8:30 AM", kcal: 420, items: ["Açaí bowl with granola & seeds", "Green tea or coffee"] },
      { icon: "🍲", label: "Lunch",     time: "1:00 PM", kcal: 680, items: ["Slow-cooked chicken stew", "Crusty bread (1 slice)", "Roasted root vegetables"] },
      { icon: "🍊", label: "Snack",     time: "4:00 PM", kcal: 160, items: ["Orange + a handful of cashews"] },
      { icon: "🥗", label: "Dinner",    time: "7:00 PM", kcal: 570, items: ["Light grain bowl: farro, roasted veg, tahini", "Poached egg on top"] },
      { icon: "🌙", label: "Evening",   time: "9:00 PM", kcal: 150, items: ["Warm milk with turmeric (golden milk)"] },
    ]},
  ];

  const todayDow = new Date().getDay();
  const dayNames = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
  const todayShort = dayNames[todayDow];

  return (
    <div className="flex flex-col pb-6">
      {/* Header */}
      <div className="px-5 pt-14 pb-4 flex items-center justify-between">
        <div>
          <p className="text-[11px] font-bold text-[#aaa] uppercase tracking-[0.14em] mb-0.5">Nutrition</p>
          <h1 className="text-[24px] font-bold text-[#1a1a1a]">{planView === "today" ? "Today's Plan" : "Weekly Plan"}</h1>
        </div>
        <button onClick={onProfile} className="w-10 h-10 rounded-full overflow-hidden bg-[#e8f5f5] border-2 border-[#4db8b8]/40 flex-shrink-0">
          <ImageWithFallback src={mascotSmileImg} alt="Profile" className="w-full h-full object-contain" />
        </button>
      </div>

      {/* Plan view toggle */}
      <div className="mx-5 mb-4 bg-white rounded-[18px] p-1.5 flex gap-1.5 shadow-[0_2px_10px_rgba(0,0,0,0.05)]">
        {([["today","📅","Today's Plan"],["weekly","📆","Weekly Plan"]] as const).map(([v, emoji, label]) => (
          <button key={v} onClick={() => setPlanView(v)}
            className={`flex-1 py-2.5 rounded-[12px] text-[11px] font-bold flex items-center justify-center gap-1.5 transition-all ${planView === v ? "bg-[#1e5e5e] text-white shadow-sm" : "text-[#888]"}`}>
            <span>{emoji}</span>{label}
          </button>
        ))}
      </div>

      {/* ── WEEKLY PLAN VIEW ── */}
      {planView === "weekly" && (
        <div className="mx-5 flex flex-col gap-3">
          {weeklyMeals.map(({ day, short, kcal, meals }) => {
            const isToday = short === todayShort;
            const isOpen = expandedDay === short;
            return (
              <div key={short} className={`rounded-[22px] overflow-hidden shadow-[0_2px_12px_rgba(0,0,0,0.06)] ${isToday ? "ring-2 ring-[#4db8b8]" : ""}`}>
                <button className={`w-full flex items-center gap-3 px-4 py-3.5 text-left transition-colors ${isOpen ? "bg-[#1e5e5e]" : "bg-white"}`}
                  onClick={() => setExpandedDay(isOpen ? null : short)}>
                  <div className={`w-10 h-10 rounded-[13px] flex flex-col items-center justify-center flex-shrink-0 ${isOpen ? "bg-white/20" : isToday ? "bg-[#1e5e5e]" : "bg-[#f0f9f9]"}`}>
                    <span className={`text-[9px] font-bold uppercase ${isOpen ? "text-white/70" : isToday ? "text-white/70" : "text-[#aaa]"}`}>{short}</span>
                    <span className={`text-[15px] font-bold leading-none ${isOpen || isToday ? "text-white" : "text-[#1a1a1a]"}`}>{meals.length}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className={`text-[14px] font-bold ${isOpen ? "text-white" : "text-[#1a1a1a]"}`}>{day}</p>
                      {isToday && <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-[#4db8b8] text-white">Today</span>}
                    </div>
                    <p className={`text-[11px] mt-0.5 ${isOpen ? "text-white/60" : "text-[#999]"}`}>{meals.length} meals · {kcal.toLocaleString()} kcal</p>
                  </div>
                  <ChevronRight size={16} className={`flex-shrink-0 transition-transform ${isOpen ? "rotate-90 text-white/60" : "text-[#ccc]"}`} />
                </button>
                {isOpen && (
                  <div className="bg-[#f9f9f9] flex flex-col divide-y divide-[#f0f0f0]">
                    {meals.map((meal, i) => (
                      <div key={i} className="flex items-start gap-3 px-4 py-3">
                        <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center text-[17px] flex-shrink-0 shadow-[0_1px_4px_rgba(0,0,0,0.07)] mt-0.5">{meal.icon}</div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-0.5">
                            <p className="text-[12px] font-bold text-[#1a1a1a]">{meal.label}</p>
                            <span className="text-[10px] font-semibold text-[#1e5e5e] bg-[#e8f5f5] px-2 py-0.5 rounded-full">{meal.kcal} kcal</span>
                          </div>
                          <p className="text-[10px] text-[#bbb] font-semibold mb-1.5">{meal.time}</p>
                          <div className="flex flex-col gap-0.5">
                            {meal.items.map((item, j) => (
                              <div key={j} className="flex items-center gap-1.5">
                                <div className="w-1 h-1 rounded-full bg-[#4db8b8] flex-shrink-0" />
                                <p className="text-[11px] text-[#555]">{item}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                    <div className="px-4 py-3 flex items-center justify-between">
                      <p className="text-[11px] font-semibold text-[#999]">Total</p>
                      <p className="text-[12px] font-bold text-[#1e5e5e]">{kcal.toLocaleString()} kcal</p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* ── TODAY'S PLAN VIEW ── */}
      {planView === "today" && (<>

      {/* Macros overview */}
      <div className="mx-5 mb-4 bg-white rounded-[24px] p-4 shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
        <div className="flex items-center justify-between mb-3">
          <p className="text-[13px] font-bold text-[#1a1a1a]">Today's Macros</p>
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

      {/* Section tabs */}
      <div className="mx-5 mb-4 bg-white rounded-[18px] p-1.5 flex gap-1.5 shadow-[0_2px_10px_rgba(0,0,0,0.05)]">
        {([["meals","🥗","Meals"],["supplements","💊","Supps"],["hydration","💧","Hydration"],["habits","✅","Habits"]] as const).map(([t, emoji, label]) => (
          <button key={t} onClick={() => setActiveSection(t as typeof activeSection)}
            className={`flex-1 py-2 rounded-[12px] text-[10px] font-bold flex items-center justify-center gap-1 transition-all ${activeSection === t ? "bg-[#1e5e5e] text-white shadow-sm" : "text-[#888]"}`}>
            <span>{emoji}</span>{label}
          </button>
        ))}
      </div>

      {/* Meals */}
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

      {/* Supplements — all supplements centralized here */}
      {activeSection === "supplements" && (
        <div className="mx-5">
          <div className="flex items-center gap-2 mb-3">
            <div className="relative flex-shrink-0">
              <div className="absolute inset-0 rounded-full bg-[#4db8b8]/20 blur-lg scale-[2]" />
              <ImageWithFallback src={mascotSmileImg} alt="Mulhim" className="w-10 h-10 object-contain relative z-10" />
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
          {/* Additional vitamins & minerals note */}
          <div className="mt-3 bg-[#f0f9f9] rounded-[18px] p-4 border border-[#d0eeee]">
            <p className="text-[11px] font-bold text-[#1e5e5e] mb-1">📍 All supplements are centralized here</p>
            <p className="text-[11px] text-[#666] leading-relaxed">Vitamins, minerals, and supplements for all your health areas — Sleep, Physical, Mental, and Skin — are managed from this single Nutrition page to avoid confusion.</p>
          </div>
        </div>
      )}

      {/* Hydration */}
      {activeSection === "hydration" && (
        <div className="mx-5">
          <div className="bg-white rounded-[24px] p-5 shadow-[0_2px_12px_rgba(0,0,0,0.06)] mb-4">
            <div className="flex items-center justify-between mb-4">
              <p className="text-[14px] font-bold text-[#1a1a1a]">Hydration Today</p>
              <p className="text-[13px] font-bold text-[#1e5e5e]">{hydrationMl}ml / {goalMl}ml</p>
            </div>
            {/* Water cups grid */}
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

      {/* Habits */}
      {activeSection === "habits" && (
        <div className="mx-5 mb-4">
          <EditableHabitList habits={nutritionHabits} onChange={setNutritionHabits} />
        </div>
      )}
      </>)}
    </div>
  );
}

// ─── Exercise Hub ──────────────────────────────────────────────────────────────

function ExerciseHubScreen({ hasCoach, locale, onFullPlan, onHairSkin, onProfile }: {
  hasCoach: boolean; locale: Locale; onFullPlan: () => void; onHairSkin: () => void; onProfile: () => void;
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
        <button onClick={onProfile} className="w-10 h-10 rounded-full overflow-hidden bg-[#e8f5f5] border-2 border-[#4db8b8]/40 flex-shrink-0">
          <ImageWithFallback src={mascotSmileImg} alt="Profile" className="w-full h-full object-contain" />
        </button>
      </div>

      {/* Exercise score card */}
      <div className="mx-5 mb-4 rounded-[24px] overflow-hidden" style={{ background: "linear-gradient(135deg, #1e5e5e 0%, #0f3a3a 100%)", minHeight: 120, position: "relative" }}>
        <div className="p-5 pr-20 relative z-10">
          <p className="text-[11px] font-bold text-white/60 uppercase tracking-[0.12em] mb-1">Weekly Progress</p>
          <div className="flex items-center gap-3 mb-2">
            <svg width="52" height="52" viewBox="0 0 52 52">
              <circle cx="26" cy="26" r="22" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="4" />
              <circle cx="26" cy="26" r="22" fill="none" stroke="#4db8b8" strokeWidth="4"
                strokeDasharray={`${Math.round(2 * Math.PI * 22 * weekDoneCnt / 7)} ${Math.round(2 * Math.PI * 22)}`}
                strokeLinecap="round" strokeDashoffset={Math.round(2 * Math.PI * 22 * 0.25)} />
              <text x="26" y="30" textAnchor="middle" fill="white" fontSize="13" fontWeight="bold">{weekDoneCnt}/7</text>
            </svg>
            <div>
              <p className="text-white text-[20px] font-bold leading-none">{weekDoneCnt} days</p>
              <p className="text-white/60 text-[12px] mt-0.5">this week completed</p>
            </div>
          </div>
          <div className="flex gap-1.5 flex-wrap">
            {weeklyGoals.map((g, i) => (
              <span key={i} className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${g.done ? "bg-[#4db8b8]/30 text-[#4db8b8]" : "bg-white/10 text-white/50"}`}>{g.done ? "✓" : "○"} {g.label}</span>
            ))}
          </div>
        </div>
        <ImageWithFallback src={mascotExerciseImg} alt="Exercise mascot"
          className="absolute bottom-0 right-3 h-[110px] object-contain z-10 drop-shadow-xl" />
      </div>

      {/* Day selector */}
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

      {/* Workout card */}
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

      {/* Exercises or rest */}
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

      {/* Weekly progress */}
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

      {/* Exercise habits */}
      <div className="mx-5 mb-4">
        <EditableHabitList habits={exerciseHabits} onChange={setExerciseHabits} />
      </div>

      {/* AI tip */}
      <div className="mx-5 mb-4">
        <MascotBubble
          text={isRest ? "Rest is not laziness — it's where the adaptation happens. Your body builds muscle, repairs tissue, and strengthens during recovery, not during the workout." : hasCoach ? `Coach says: ${day.label} today. ${day.exercises[0]?.note ?? "Focus on form over weight."}` : `${day.label}: ${day.focus}. ${day.exercises[0]?.note ?? "Quality over quantity every rep."}`}
          size="sm" />
      </div>

      {/* Links */}
      <div className="mx-5 flex flex-col gap-3">
        <button onClick={onFullPlan} className="w-full py-3.5 rounded-[18px] border-2 border-[#1e5e5e] text-[#1e5e5e] font-bold text-[13px] flex items-center justify-center gap-2 active:bg-[#e8f5f5] transition-colors">
          View Full Exercise Plan
        </button>
      </div>
    </div>
  );
}

// ─── Hair & Skin Hub ───────────────────────────────────────────────────────────

function HairSkinHubScreen({ hasCoach, onBack, onProfile }: { hasCoach: boolean; onBack: () => void; onProfile: () => void; }) {
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
        <button onClick={onProfile} className="w-10 h-10 rounded-full overflow-hidden bg-[#e8f5f5] border-2 border-[#4db8b8]/40 flex-shrink-0">
          <ImageWithFallback src={mascotSmileImg} alt="Profile" className="w-full h-full object-contain" />
        </button>
      </div>

      {/* Score card */}
      <div className="mx-5 mb-4 bg-gradient-to-br from-[#3a1a00] to-[#7c4500] rounded-[28px] p-5 flex items-center gap-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[120px] h-[120px] rounded-full bg-[#fbbf24]/20 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-4 h-[90px] flex items-end pointer-events-none">
          <ImageWithFallback src={mascotBowImg} alt="Hair & Skin" className="h-[86px] w-auto object-contain drop-shadow-lg" />
        </div>
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
        <div className="flex-1 pr-20">
          <div className="flex items-center gap-1.5 mb-1">
            <span className="w-2 h-2 rounded-full bg-[#fbbf24]" />
            <p className="text-[10px] font-bold text-[#fbbf24] uppercase tracking-[0.12em]">{hasCoach ? "Coach Score" : "AI Score"}</p>
          </div>
          <p className="text-[17px] font-bold text-white mb-1">Good Routine</p>
          <p className="text-[11px] text-white/60 leading-relaxed">SPF consistency is your biggest win. Add evening retinol to level up.</p>
        </div>
      </div>

      {/* Weekly goals */}
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

      {/* Tabs */}
      <div className="mx-5 mb-4 bg-white rounded-[18px] p-1.5 grid grid-cols-4 gap-1 shadow-[0_2px_10px_rgba(0,0,0,0.05)]">
        {([["morning","🌅","Morning"],["evening","🌙","Evening"],["hair","💇","Hair"],["habits","✅","Habits"]] as const).map(([t, emoji, label]) => (
          <button key={t} onClick={() => setTab(t)}
            className={`py-2 rounded-[12px] text-[10px] font-bold flex flex-col items-center gap-0.5 transition-all ${tab === t ? "bg-[#1e5e5e] text-white shadow-sm" : "text-[#888]"}`}>
            <span className="text-[13px]">{emoji}</span>{label}
          </button>
        ))}
      </div>

      {/* Checklist */}
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

function PlansHubScreen({ hasCoach, planGenerated, userGoals, onCategory, onSetGoals, onReport }: {
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
            <Sparkles size={15} />Set My Goals & Build Plans
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
      {/* Header */}
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

      {/* Overall stats */}
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

      {/* Plan cards — single column, clean */}
      <div className="px-5 flex flex-col gap-3">
        {planCards.map((plan) => (
          <button key={plan.id} onClick={() => onCategory(plan.id)}
            className="w-full rounded-[22px] overflow-hidden shadow-[0_3px_16px_rgba(0,0,0,0.10)] active:scale-[0.98] transition-transform text-left"
            style={{ backgroundColor: plan.color }}>
            <div className="px-4 py-4 relative overflow-hidden">
              {/* Glow */}
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
              {/* Progress bar */}
              <div className="h-1.5 rounded-full relative z-10" style={{ backgroundColor: `${plan.accent}20` }}>
                <div className="h-full rounded-full" style={{ width: `${plan.progress}%`, backgroundColor: plan.accent }} />
              </div>
            </div>
            {/* Bottom action strip */}
            <div className="flex items-center justify-between px-4 py-2.5 border-t" style={{ borderColor: "rgba(255,255,255,0.06)", backgroundColor: "rgba(0,0,0,0.15)" }}>
              <span className="text-[10px] font-semibold" style={{ color: "rgba(255,255,255,0.4)" }}>Weekly Plan · Habits · Insights</span>
              <span className="text-[10px] font-bold" style={{ color: plan.accent }}>Open →</span>
            </div>
          </button>
        ))}
      </div>

      {/* Edit goals */}
      <div className="mx-5 mt-4">
        <button onClick={onSetGoals}
          className="w-full py-3.5 rounded-[18px] bg-white shadow-[0_2px_12px_rgba(0,0,0,0.06)] flex items-center justify-center gap-2 active:scale-[0.98] transition-transform">
          <Sparkles size={14} className="text-[#1e5e5e]" />
          <span className="text-[13px] font-bold text-[#1e5e5e]">Edit Goals & Rebuild Plans</span>
        </button>
      </div>
    </div>
  );
}

// ─── Home Page data ───────────────────────────────────────────────────────────

const homeGoalOptions = [
  { id: "sleep", icon: "🌙", label: "Better Sleep" },
  { id: "energy", icon: "⚡", label: "More Energy" },
  { id: "weight", icon: "🔥", label: "Lose Weight" },
  { id: "muscle", icon: "💪", label: "Build Muscle" },
  { id: "stress", icon: "🧘", label: "Reduce Stress" },
  { id: "focus", icon: "🧠", label: "Mental Clarity" },
  { id: "skin", icon: "✨", label: "Better Skin" },
  { id: "gut", icon: "🌿", label: "Gut Health" },
  { id: "immune", icon: "🛡️", label: "Immunity" },
  { id: "longevity", icon: "♾️", label: "Longevity" },
];

interface HealthCategory {
  id: CategoryId;
  icon: string;
  label: string;
  tagline: string;
  color: string;
  accentColor: string;
  textColor: string;
  progress: number;
  todayAction: string;
  streak: number;
}

const healthCategories: HealthCategory[] = [
  {
    id: "sleep", icon: "🌙", label: "Sleep",
    tagline: "Optimise your recovery",
    color: "#1c1f4a", accentColor: "#8b8ff8", textColor: "#ffffff",
    progress: 68, todayAction: "Dim lights by 9pm tonight", streak: 3,
  },
  {
    id: "mental", icon: "🧠", label: "Mental Health",
    tagline: "Protect your focus",
    color: "#2a1f4e", accentColor: "#a78bfa", textColor: "#ffffff",
    progress: 55, todayAction: "5-min box breathing after lunch", streak: 5,
  },
  {
    id: "nutrition", icon: "🥗", label: "Nutrition",
    tagline: "Fuel your biology",
    color: "#0d3d2a", accentColor: "#34d399", textColor: "#ffffff",
    progress: 80, todayAction: "Add lemon to your iron-rich lunch", streak: 7,
  },
  {
    id: "physical", icon: "❤️", label: "Physical Health",
    tagline: "Track your vitals",
    color: "#3d1224", accentColor: "#fb7185", textColor: "#ffffff",
    progress: 74, todayAction: "10-min walk after dinner", streak: 4,
  },
  {
    id: "exercise", icon: "🏋️", label: "Exercise",
    tagline: "Built for your genes",
    color: "#1e3a1e", accentColor: "#86efac", textColor: "#ffffff",
    progress: 60, todayAction: "Strength A session — 55 min", streak: 2,
  },
  {
    id: "skin", icon: "✨", label: "Hair & Skin",
    tagline: "Glow from within",
    color: "#3a1a00", accentColor: "#fbbf24", textColor: "#ffffff",
    progress: 45, todayAction: "15-min morning sunlight · VDR support", streak: 6,
  },
];

// AI-generated recommendations per category — plain language, no gene names
const categoryRecommendations: Record<CategoryId, {
  aiNote: string;
  steps: Array<{ time: string; icon: string; action: string; why: string; done?: boolean }>;
  habits: Array<{ icon: string; label: string; freq: string; benefit: string }>;
  healthInsight: { meaning: string; matters: string; today: string };
  priorities: Array<{ icon: string; title: string; impact: string; time: string }>;
}> = {
  sleep: {
    aiNote: "Your energy and blood sugar levels are making it harder for your body to fall into deep sleep. A few targeted evening habits can transform your sleep quality within 2 weeks.",
    steps: [
      { time: "8:00 AM", icon: "🌅", action: "15-min morning sunlight walk", why: "Morning light sets your body clock — makes falling asleep at night 2× easier", done: true },
      { time: "9:00 PM", icon: "💡", action: "Dim all lights and screens", why: "Your body starts making sleep hormones 2 hours before bed — bright light blocks this" },
      { time: "9:30 PM", icon: "📵", action: "Phone to aeroplane mode", why: "Screen light delays when you feel sleepy by up to 45 minutes" },
      { time: "10:00 PM", icon: "🌡️", action: "Cool bedroom to 18–20°C", why: "Your body temperature needs to drop slightly to trigger deep sleep" },
      { time: "10:30 PM", icon: "🛌", action: "Target sleep onset", why: "7.5 hours gives you 5 complete rest cycles — waking up refreshed, not groggy" },
    ],
    habits: [
      { icon: "☀️", label: "Morning sunlight", freq: "Daily", benefit: "Sets your sleep-wake cycle — fall asleep faster at night" },
      { icon: "🍫", label: "No caffeine after 1pm", freq: "Daily", benefit: "Your body stays sensitive to caffeine for up to 8 hours" },
      { icon: "🥗", label: "Light dinner before 7pm", freq: "Daily", benefit: "Digestion at night raises body temperature and disrupts deep sleep" },
    ],
    healthInsight: {
      meaning: "Your sleep quality is being disrupted by mildly elevated blood sugar and low Vitamin D — two things that are very easy to fix with the right daily habits.",
      matters: "Poor sleep affects every system in your body: mood, metabolism, immunity, and focus. Even one extra hour of quality sleep can dramatically improve how you feel.",
      today: "Take a 15-min walk this morning (your most powerful sleep fix), cut caffeine at 1pm, and dim your lights after 9pm.",
    },
    priorities: [
      { icon: "🌅", title: "Morning sunlight walk", impact: "High impact", time: "15 min" },
      { icon: "☕", title: "Stop caffeine at 1pm", impact: "Sleep quality", time: "Daily habit" },
      { icon: "💡", title: "Screen-free after 9:30pm", impact: "Fall asleep faster", time: "Evening" },
    ],
  },
  mental: {
    aiNote: "Your body bounces back from stress quickly — but that also means you can push too hard without noticing. Protecting your mental recovery time is just as important as protecting your physical energy.",
    steps: [
      { time: "Morning", icon: "🧘", action: "5-min box breathing", why: "Calms your nervous system and lowers stress hormones within minutes", done: true },
      { time: "Midday", icon: "🚶", action: "10-min outdoor walk without phone", why: "Nature exposure measurably reduces anxiety and mental fatigue" },
      { time: "Afternoon", icon: "📝", action: "Brain dump — write 3 priorities", why: "Writing thoughts down frees mental bandwidth and reduces overwhelm" },
      { time: "Evening", icon: "📵", action: "No news or social media after 8pm", why: "Negative content raises stress hormones and makes sleep harder" },
      { time: "Anytime", icon: "💊", action: "Take your B-complex supplement", why: "B vitamins directly support the brain chemicals that regulate mood and focus" },
    ],
    habits: [
      { icon: "🧘", label: "Daily breathing practice", freq: "5 min/day", benefit: "Activates your body's natural calm response" },
      { icon: "💊", label: "B-complex supplement", freq: "Daily", benefit: "Supports mood, focus, and stress recovery" },
      { icon: "📵", label: "Digital sunset at 8pm", freq: "Daily", benefit: "Reduces evening stress and improves sleep quality" },
    ],
    healthInsight: {
      meaning: "Your stress recovery is naturally strong — but your body needs extra B vitamin support to keep mood and focus steady throughout the day.",
      matters: "Mental resilience isn't just about willpower. Your brain's ability to handle stress depends on nutrition, sleep, and recovery habits that compound over time.",
      today: "Do a 5-minute breathing exercise now, take your B-complex with breakfast, and block social media after 8pm tonight.",
    },
    priorities: [
      { icon: "🧘", title: "5-min breathing exercise", impact: "Reduces stress now", time: "5 min" },
      { icon: "💊", title: "Take B-complex supplement", impact: "Mood support", time: "With breakfast" },
      { icon: "📵", title: "No screens after 8pm", impact: "Better recovery", time: "Tonight" },
    ],
  },
  nutrition: {
    aiNote: "Your biggest nutritional priority is rebuilding your iron levels — low iron is most likely behind your fatigue. Every meal today is an opportunity to move this forward.",
    steps: [
      { time: "7:00 AM", icon: "🌅", action: "Eggs + spinach + B-complex", why: "B vitamins at breakfast keep energy and mood steady all morning", done: true },
      { time: "12:30 PM", icon: "🥗", action: "Chicken + lentils + lemon dressing", why: "Pairing iron with lemon juice helps your body absorb up to 3× more iron" },
      { time: "3:30 PM", icon: "🍎", action: "Brazil nuts + protein shake + kiwi", why: "Brazil nuts provide selenium which supports thyroid and immune function" },
      { time: "7:00 PM", icon: "🐟", action: "Salmon + sweet potato + broccoli", why: "Salmon is the most effective food source of Vitamin D — directly lifts your levels" },
    ],
    habits: [
      { icon: "☀️", label: "Vitamin D3 + K2 supplement", freq: "Daily with breakfast", benefit: "Raises Vitamin D levels even on cloudy or indoor days" },
      { icon: "🥬", label: "B12 supplement", freq: "Daily morning", benefit: "Supports energy, brain function, and red blood cell production" },
      { icon: "⚡", label: "Iron + Vitamin C pairing", freq: "2 meals/day", benefit: "Vitamin C triples the amount of iron your body actually absorbs" },
    ],
    healthInsight: {
      meaning: "Your body absorbs certain nutrients — particularly Vitamin D and iron — less efficiently than average. This means you need to be more intentional about these specific nutrients.",
      matters: "Vitamin D and iron deficiencies are among the most common causes of fatigue, low mood, and poor immunity. Fixing them often produces dramatic improvements in how you feel.",
      today: "Pair your iron-rich lunch with lemon juice or a vitamin C source. Take your Vitamin D supplement with breakfast. Get 15 minutes of morning sun.",
    },
    priorities: [
      { icon: "⚡", title: "Iron + Vitamin C at lunch", impact: "Rebuilds energy stores", time: "Lunchtime" },
      { icon: "☀️", title: "Vitamin D supplement", impact: "Lifts mood & immunity", time: "With breakfast" },
      { icon: "🐟", title: "Salmon or fatty fish dinner", impact: "Natural Vitamin D boost", time: "Dinner" },
    ],
  },
  physical: {
    aiNote: "Your core vitals are stable — that's great news. The two areas to address are low iron (causing fatigue) and slightly elevated blood sugar. Both respond quickly to the right habits.",
    steps: [
      { time: "Morning", icon: "🌅", action: "15-min sunlight walk", why: "Boosts Vitamin D levels and prepares your body to handle blood sugar better all day", done: true },
      { time: "After lunch", icon: "🚶", action: "10-min walk", why: "Walking after meals lowers blood sugar spikes by up to 30%" },
      { time: "After dinner", icon: "🚶", action: "10-min walk", why: "Two post-meal walks daily is the most evidence-backed blood sugar habit" },
      { time: "Weekly", icon: "💊", action: "Iron supplement with vitamin C", why: "Rebuilds iron stores — expect noticeable energy improvement within 6–8 weeks" },
    ],
    habits: [
      { icon: "🚶", label: "Post-meal walks (2×/day)", freq: "Daily", benefit: "Lowers blood sugar and improves energy without medication" },
      { icon: "⚡", label: "Iron-rich meal daily", freq: "Daily", benefit: "Rebuilds energy reserves — directly tackles your fatigue" },
      { icon: "💧", label: "8 glasses water", freq: "Daily", benefit: "Supports kidney function, energy, and blood circulation" },
    ],
    healthInsight: {
      meaning: "Your heart and thyroid markers look healthy. The main areas to focus on are your iron (low) and blood sugar (slightly high) — both very manageable with daily habits.",
      matters: "Low iron causes persistent fatigue even when you sleep well. Mildly elevated blood sugar, left unchecked, can slowly affect energy, weight, and mood over time.",
      today: "Walk 10 minutes after both lunch and dinner. Make sure dinner includes an iron-rich food paired with something containing vitamin C.",
    },
    priorities: [
      { icon: "🚶", title: "Post-lunch 10-min walk", impact: "Lowers blood sugar", time: "After lunch" },
      { icon: "🚶", title: "Post-dinner 10-min walk", impact: "Stabilises energy", time: "After dinner" },
      { icon: "⚡", title: "Iron-rich dinner + vitamin C", impact: "Rebuilds energy", time: "Tonight" },
    ],
  },
  exercise: {
    aiNote: "Your body is built for power and strength training. You get stronger faster than most people from lifting and sprints — lean into it. Recovery between sessions is just as important as the sessions themselves.",
    steps: [
      { time: "Today", icon: "🏋️", action: "Strength A — Lower body power", why: "Your body responds exceptionally well to explosive strength movements", done: false },
      { time: "Tomorrow", icon: "🚴", action: "Zone 2 cardio — 40 min", why: "Builds the metabolic foundation that makes every workout more effective" },
      { time: "Wed", icon: "💪", action: "Strength B — Upper body", why: "Push/pull balance — incline press, rows, and pull-ups for complete upper body" },
      { time: "Thu", icon: "🧘", action: "Recovery + 15-min sunlight walk", why: "Active recovery between hard sessions accelerates muscle repair" },
      { time: "Fri", icon: "🏃", action: "Sprint intervals — 8×30s", why: "Short sprints trigger significantly more power adaptation than steady cardio" },
    ],
    habits: [
      { icon: "🏋️", label: "3× strength sessions/week", freq: "Mon/Wed/Fri pattern", benefit: "Builds lean muscle and boosts metabolism all week" },
      { icon: "🏃", label: "Weekly sprint session", freq: "Friday", benefit: "Maximum power development in minimum time" },
      { icon: "🧘", label: "Recovery session", freq: "Thursday", benefit: "Prevents overtraining and speeds up muscle repair" },
    ],
    healthInsight: {
      meaning: "Your body has a natural advantage for power-based training — you build strength and muscle faster than average from lifting and sprint work.",
      matters: "Matching your training style to your body type means you get better results with less effort. Ignoring recovery is the most common way power athletes plateau.",
      today: "Complete today's strength session (lower body). Prioritise 7+ hours of sleep tonight — that's when strength gains actually happen.",
    },
    priorities: [
      { icon: "🏋️", title: "Strength A session today", impact: "Maximum gains", time: "55 min" },
      { icon: "😴", title: "Sleep 7+ hours tonight", impact: "Where gains are made", time: "Tonight" },
      { icon: "🥩", title: "Protein-rich dinner", impact: "Muscle recovery", time: "Tonight" },
    ],
  },
  skin: {
    aiNote: "Your low Vitamin D and low iron are directly affecting how your skin and hair look and feel. The good news: these are two of the most responsive markers to lifestyle changes.",
    steps: [
      { time: "Morning", icon: "☀️", action: "15-min sunlight (before 10am)", why: "Morning sunlight triggers your body to make Vitamin D — the most important skin nutrient", done: true },
      { time: "Breakfast", icon: "💊", action: "Vitamin D3 + K2 supplement", why: "Vitamin D supports collagen production and skin cell renewal from the inside out" },
      { time: "Lunch", icon: "🥩", action: "Iron-rich meal + Vitamin C", why: "Low iron is one of the most common causes of hair thinning — iron feeds your follicles" },
      { time: "Evening", icon: "🫐", action: "Antioxidant-rich dinner", why: "Berries, leafy greens, and salmon protect skin from damage while you sleep" },
    ],
    habits: [
      { icon: "☀️", label: "Daily morning sunlight", freq: "15 min/day", benefit: "Supports collagen, skin repair, and natural glow" },
      { icon: "⚡", label: "Iron-rich meals", freq: "2× daily", benefit: "Feeds hair follicles — addresses thinning and dull hair" },
      { icon: "💧", label: "2.5L water daily", freq: "Daily", benefit: "Hydration is the foundation of skin elasticity and texture" },
    ],
    healthInsight: {
      meaning: "Your skin and hair health are closely linked to two things your recent results showed as low: Vitamin D and iron. Improving these will show on the outside within weeks.",
      matters: "Skin and hair are among the first places where nutritional deficiencies become visible. They're also among the fastest to recover when you address the root cause.",
      today: "Get 15 minutes of morning sunlight, take your Vitamin D supplement, and make sure today's lunch includes an iron-rich food with a vitamin C source.",
    },
    priorities: [
      { icon: "☀️", title: "15-min morning sunlight", impact: "Skin & hair repair", time: "Before 10am" },
      { icon: "💊", title: "Vitamin D supplement", impact: "Collagen support", time: "With breakfast" },
      { icon: "🥩", title: "Iron-rich lunch", impact: "Hair follicle health", time: "Lunchtime" },
    ],
  },
};

// ─── Weekly Plan Data ─────────────────────────────────────────────────────────

interface WeeklyDay {
  day: string;
  type: string;
  typeColor: string;
  duration: string;
  icon: string;
  title: string;
  description: string;
  exercises?: Array<{ name: string; detail: string; note: string }>;
  activities?: Array<{ icon: string; action: string; time: string }>;
}

const categoryWeeklyPlans: Record<CategoryId, WeeklyDay[]> = {
  sleep: [
    { day: "Mon", type: "Routine", typeColor: "#6366f1", duration: "30 min", icon: "🌙", title: "Wind-Down Routine",
      description: "Set a consistent 10:30pm bedtime. Your body clock thrives on routine — even one week builds momentum.",
      activities: [{ icon: "🌅", action: "15-min morning sunlight walk", time: "8:00 AM" }, { icon: "💡", action: "Dim all lights & screens", time: "9:00 PM" }, { icon: "📵", action: "Phone to aeroplane mode", time: "9:30 PM" }, { icon: "🛌", action: "Sleep onset target", time: "10:30 PM" }] },
    { day: "Tue", type: "Routine", typeColor: "#6366f1", duration: "30 min", icon: "🌙", title: "Consistency Night",
      description: "Same time, same ritual. Consistency is more powerful than any sleep supplement.",
      activities: [{ icon: "☕", action: "Last caffeine cutoff", time: "1:00 PM" }, { icon: "🥗", action: "Light dinner", time: "7:00 PM" }, { icon: "💡", action: "Lights dim", time: "9:00 PM" }, { icon: "🛌", action: "Sleep by 10:30pm", time: "10:30 PM" }] },
    { day: "Wed", type: "Deep Rest", typeColor: "#4f46e5", duration: "45 min", icon: "😴", title: "Midweek Recovery",
      description: "Target 8 hours tonight. Midweek sleep debt accumulates — tonight is the time to reset.",
      activities: [{ icon: "🧘", action: "10-min body scan meditation", time: "9:15 PM" }, { icon: "🌡️", action: "Cool bedroom to 18°C", time: "10:00 PM" }, { icon: "🛌", action: "8-hour sleep target", time: "10:00 PM" }] },
    { day: "Thu", type: "Easy", typeColor: "#22c55e", duration: "20 min", icon: "🌿", title: "Light Evening",
      description: "Short prep tonight. Keep it simple — phone off, lights low, room cool.",
      activities: [{ icon: "📵", action: "Digital sunset", time: "9:00 PM" }, { icon: "🛌", action: "Early sleep — 10:00 PM", time: "10:00 PM" }] },
    { day: "Fri", type: "Routine", typeColor: "#6366f1", duration: "30 min", icon: "🌙", title: "Hold the Schedule",
      description: "Resist the late-night Friday urge. Keeping your bedtime consistent on weekends is the #1 sleep upgrade.",
      activities: [{ icon: "💡", action: "Lights dim by 9:30pm", time: "9:30 PM" }, { icon: "🛌", action: "In bed by 11:00pm", time: "11:00 PM" }] },
    { day: "Sat", type: "Recovery", typeColor: "#8b5cf6", duration: "—", icon: "☁️", title: "Rest & Recover",
      description: "Allow yourself 8–9 hours. Sleep on weekends isn't laziness — it's biological repair.",
      activities: [{ icon: "☀️", action: "Morning sunlight (even on weekends)", time: "9:00 AM" }, { icon: "😴", action: "Target 8.5h sleep", time: "All night" }] },
    { day: "Sun", type: "Routine", typeColor: "#6366f1", duration: "40 min", icon: "🌙", title: "Sunday Reset",
      description: "Wind down early to set the tone for the whole week. Your best Monday starts on Sunday night.",
      activities: [{ icon: "📝", action: "Prep tomorrow — reduce morning stress", time: "8:00 PM" }, { icon: "🧘", action: "Gratitude journaling", time: "9:00 PM" }, { icon: "🛌", action: "8h sleep — ready for Monday", time: "10:00 PM" }] },
  ],
  mental: [
    { day: "Mon", type: "Active", typeColor: "#6366f1", duration: "15 min", icon: "🧠", title: "Morning Intention",
      description: "Set the mental tone for the week. Clarity on Monday compounds into the whole week.",
      activities: [{ icon: "🧘", action: "5-min box breathing", time: "Morning" }, { icon: "📝", action: "Write 3 priorities for the week", time: "Morning" }, { icon: "💊", action: "B-complex supplement", time: "Breakfast" }] },
    { day: "Tue", type: "Active", typeColor: "#22c55e", duration: "20 min", icon: "🚶", title: "Midday Walk",
      description: "A phone-free outdoor walk is one of the most effective mental reset tools available to you.",
      activities: [{ icon: "🚶", action: "10-min outdoor walk", time: "Midday" }, { icon: "📝", action: "5-min brain dump journal", time: "Afternoon" }, { icon: "📵", action: "No social media after 8pm", time: "Evening" }] },
    { day: "Wed", type: "Reset", typeColor: "#f59e0b", duration: "15 min", icon: "🔄", title: "Midweek Check-in",
      description: "Halfway through the week — check in with your stress levels and reset if needed.",
      activities: [{ icon: "🧘", action: "Breathing exercise", time: "Morning" }, { icon: "🚶", action: "Nature walk without phone", time: "Lunch" }, { icon: "📝", action: "Revise weekly priorities", time: "Afternoon" }] },
    { day: "Thu", type: "Easy", typeColor: "#22c55e", duration: "10 min", icon: "🙏", title: "Gratitude Practice",
      description: "Research shows a 5-minute gratitude practice reduces cortisol and improves sleep.",
      activities: [{ icon: "📓", action: "3 things you're grateful for", time: "Morning" }, { icon: "🧘", action: "5-min mindfulness", time: "Anytime" }] },
    { day: "Fri", type: "Active", typeColor: "#6366f1", duration: "20 min", icon: "📊", title: "Week Review",
      description: "Reflect on wins and what to improve. Finishing the week with intention builds momentum.",
      activities: [{ icon: "📝", action: "Write 3 wins from this week", time: "Afternoon" }, { icon: "📅", action: "Plan next week loosely", time: "Evening" }, { icon: "📵", action: "Digital sunset — no news after 7pm", time: "Evening" }] },
    { day: "Sat", type: "Active", typeColor: "#22c55e", duration: "30 min", icon: "🌿", title: "Nature Walk",
      description: "30 minutes in nature measurably reduces the stress hormone cortisol.",
      activities: [{ icon: "🌿", action: "30-min outdoor walk", time: "Morning" }, { icon: "🧘", action: "Stretch or light yoga", time: "Anytime" }] },
    { day: "Sun", type: "Prep", typeColor: "#8b5cf6", duration: "20 min", icon: "🗓️", title: "Week Prep",
      description: "A calm Sunday sets the mental baseline for the week. Plan, don't ruminate.",
      activities: [{ icon: "📓", action: "Journal reflection — this week / next week", time: "Afternoon" }, { icon: "🧘", action: "Relaxing breathing before bed", time: "Evening" }] },
  ],
  nutrition: [
    { day: "Mon", type: "Iron Focus", typeColor: "#ef4444", duration: "All day", icon: "⚡", title: "Iron-Boost Monday",
      description: "Start the week with an iron focus. Lentils, spinach, lean meat — always paired with a vitamin C source.",
      activities: [{ icon: "🌅", action: "Eggs + spinach omelette", time: "7:00 AM" }, { icon: "🥗", action: "Chicken + lentils + lemon dressing", time: "12:30 PM" }, { icon: "🐟", action: "Salmon + broccoli", time: "7:00 PM" }] },
    { day: "Tue", type: "Vitamin D", typeColor: "#f59e0b", duration: "All day", icon: "☀️", title: "Vitamin D Day",
      description: "Load up on D-rich foods. Fatty fish, eggs, and fortified foods — plus morning sunlight.",
      activities: [{ icon: "💊", action: "D3 + K2 supplement with breakfast", time: "7:00 AM" }, { icon: "🐟", action: "Tuna or sardine lunch", time: "12:30 PM" }, { icon: "🥚", action: "2-egg dinner or omelette", time: "7:00 PM" }] },
    { day: "Wed", type: "B-Vitamins", typeColor: "#22c55e", duration: "All day", icon: "🥬", title: "B-Vitamin Wednesday",
      description: "Focus on B-rich foods: leafy greens, eggs, chicken, legumes. B vitamins drive energy and mood.",
      activities: [{ icon: "🥬", action: "Spinach + eggs breakfast", time: "7:00 AM" }, { icon: "🥗", action: "Lentil soup + whole grain bread", time: "12:30 PM" }, { icon: "🍗", action: "Chicken + leafy green salad", time: "7:00 PM" }] },
    { day: "Thu", type: "Antioxidant", typeColor: "#8b5cf6", duration: "All day", icon: "🫐", title: "Antioxidant Day",
      description: "Berries, dark vegetables, and olive oil protect your cells and reduce inflammation.",
      activities: [{ icon: "🫐", action: "Berries + yoghurt breakfast", time: "7:00 AM" }, { icon: "🥗", action: "Dark leafy salad + olive oil", time: "12:30 PM" }, { icon: "🐟", action: "Salmon + roasted veg", time: "7:00 PM" }] },
    { day: "Fri", type: "Protein", typeColor: "#ec4899", duration: "All day", icon: "🥩", title: "Protein Friday",
      description: "High protein today to support muscle repair and keep energy steady into the weekend.",
      activities: [{ icon: "🥚", action: "3-egg breakfast + cottage cheese", time: "7:00 AM" }, { icon: "🍗", action: "Grilled chicken + quinoa", time: "12:30 PM" }, { icon: "🥩", action: "Lean red meat + sweet potato", time: "7:00 PM" }] },
    { day: "Sat", type: "Mediterranean", typeColor: "#0ea5e9", duration: "All day", icon: "🫒", title: "Mediterranean Day",
      description: "The Mediterranean diet is the most evidence-backed eating pattern for long-term health.",
      activities: [{ icon: "🥚", action: "Eggs + avocado + sourdough", time: "9:00 AM" }, { icon: "🐟", action: "Grilled fish + salad + olive oil", time: "1:00 PM" }, { icon: "🍅", action: "Tomato-based stew + whole grains", time: "7:00 PM" }] },
    { day: "Sun", type: "Prep", typeColor: "#6366f1", duration: "1 hour", icon: "🫙", title: "Batch Cook Day",
      description: "Prep your week in 60 minutes. Cooked lentils, grilled chicken, and washed greens make healthy eating effortless.",
      activities: [{ icon: "🫙", action: "Cook lentils in bulk", time: "Morning" }, { icon: "🍗", action: "Grill chicken for the week", time: "Morning" }, { icon: "🥗", action: "Wash and prep greens", time: "Morning" }] },
  ],
  physical: [
    { day: "Mon", type: "Active", typeColor: "#22c55e", duration: "35 min", icon: "🚶", title: "Full Movement Day",
      description: "Two post-meal walks today. This is the single most effective habit for your blood sugar levels.",
      activities: [{ icon: "🌅", action: "15-min morning sunlight walk", time: "8:00 AM" }, { icon: "🚶", action: "10-min walk after lunch", time: "1:00 PM" }, { icon: "🚶", action: "10-min walk after dinner", time: "7:30 PM" }] },
    { day: "Tue", type: "Active", typeColor: "#22c55e", duration: "35 min", icon: "🚶", title: "Walks + Hydration",
      description: "Same movement routine, plus focus on hitting 2.5L water today. Hydration supports iron transport.",
      activities: [{ icon: "💧", action: "1 glass water on waking", time: "7:00 AM" }, { icon: "🚶", action: "Post-lunch walk", time: "1:00 PM" }, { icon: "💧", action: "2.5L water target", time: "All day" }, { icon: "🚶", action: "Post-dinner walk", time: "7:30 PM" }] },
    { day: "Wed", type: "Active", typeColor: "#22c55e", duration: "35 min", icon: "❤️", title: "Vitals Check",
      description: "Midweek — notice how your energy, mood, and digestion are feeling. These are your body's signals.",
      activities: [{ icon: "🌅", action: "Morning sunlight + deep breath", time: "8:00 AM" }, { icon: "🚶", action: "Post-meal walks ×2", time: "Lunch & Dinner" }, { icon: "📝", action: "Note your energy level (1–10)", time: "Evening" }] },
    { day: "Thu", type: "Active", typeColor: "#22c55e", duration: "40 min", icon: "🚶", title: "Extra Steps Day",
      description: "Add one extra 10-minute walk today. Small additions compound into real results over weeks.",
      activities: [{ icon: "🌅", action: "Morning walk", time: "8:00 AM" }, { icon: "🚶", action: "Lunch walk", time: "1:00 PM" }, { icon: "🚶", action: "Afternoon stroll", time: "4:00 PM" }, { icon: "🚶", action: "Post-dinner walk", time: "7:30 PM" }] },
    { day: "Fri", type: "Active", typeColor: "#22c55e", duration: "35 min", icon: "🏃", title: "Active Friday",
      description: "Finish the week strong. Two walks, iron-rich dinner, and set yourself up for a good weekend.",
      activities: [{ icon: "🚶", action: "Post-meal walks ×2", time: "Lunch & Dinner" }, { icon: "⚡", action: "Iron-rich dinner + vitamin C", time: "Dinner" }, { icon: "💧", action: "Hydrate well", time: "All day" }] },
    { day: "Sat", type: "High Activity", typeColor: "#f59e0b", duration: "45 min", icon: "🌿", title: "Outdoor Saturday",
      description: "Longer outdoor time today. Nature + movement + sunlight is a triple win for all your markers.",
      activities: [{ icon: "🌿", action: "30-45 min outdoor walk or hike", time: "Morning" }, { icon: "☀️", action: "Maximum sunlight exposure", time: "All day" }, { icon: "🧘", action: "Light stretching", time: "Evening" }] },
    { day: "Sun", type: "Recovery", typeColor: "#8b5cf6", duration: "20 min", icon: "😴", title: "Gentle Recovery",
      description: "Easy day. Focus on preparation: iron-rich meal, good sleep setup, and a short walk.",
      activities: [{ icon: "🚶", action: "Gentle 20-min walk", time: "Morning" }, { icon: "⚡", action: "Iron-focused lunch", time: "Lunch" }, { icon: "🛌", action: "Early bedtime — 10:30 PM", time: "Evening" }] },
  ],
  exercise: [
    { day: "Mon", type: "Strength", typeColor: "#1e5e5e", duration: "55 min", icon: "🏋️", title: "Strength A",
      description: "Lower body power session. Explosive movements — squats, deadlifts, jumps. Your body thrives on this.",
      exercises: [
        { name: "Barbell Squat", detail: "4×6", note: "Explosive concentric — drive through the floor" },
        { name: "Romanian Deadlift", detail: "3×8", note: "Hip hinge + posterior chain — control the descent" },
        { name: "Box Jumps", detail: "4×5", note: "Full reset between reps — maximum power output" },
        { name: "Bulgarian Split Squat", detail: "3×10 each", note: "Single-leg strength + hip mobility" },
        { name: "Calf Raises", detail: "4×15", note: "Slow and controlled — full range of motion" },
      ] },
    { day: "Tue", type: "Cardio", typeColor: "#0ea5e9", duration: "50 min", icon: "🚴", title: "Zone 2 Cardio",
      description: "Metabolic conditioning at a conversational pace. Builds the aerobic base that powers all your workouts.",
      exercises: [
        { name: "Bike or brisk walk", detail: "40 min", note: "Heart rate 120–140 bpm — you can still hold a conversation" },
        { name: "Post-session stretch", detail: "10 min", note: "Hip flexors, hamstrings, calves — hold each 30 seconds" },
      ] },
    { day: "Wed", type: "Strength", typeColor: "#1e5e5e", duration: "55 min", icon: "💪", title: "Strength B",
      description: "Upper body push + pull. Complete muscular balance — chest, back, shoulders, and arms.",
      exercises: [
        { name: "Incline Dumbbell Press", detail: "4×8", note: "Chest-dominant — control the descent, explosive press" },
        { name: "Barbell Row", detail: "4×6", note: "Pull to your lower chest — back thickness and posture" },
        { name: "Weighted Pull-Ups", detail: "3×6", note: "Full hang at bottom — lat width and grip strength" },
        { name: "Overhead Press", detail: "3×8", note: "Strict form — core tight, no back arch" },
        { name: "Face Pulls", detail: "3×15", note: "Shoulder health — essential for long-term pressing ability" },
      ] },
    { day: "Thu", type: "Recovery", typeColor: "#22c55e", duration: "35 min", icon: "🧘", title: "Active Recovery",
      description: "Recovery is where strength is actually built. Light movement, stretching, and sunlight today.",
      exercises: [
        { name: "15-min morning sunlight walk", detail: "15 min", note: "Boosts Vitamin D + circadian rhythm reset" },
        { name: "Yoga flow or stretching", detail: "20 min", note: "Full-body: hip 90/90, thoracic rotation, pigeon pose" },
      ] },
    { day: "Fri", type: "HIIT", typeColor: "#ef4444", duration: "45 min", icon: "🏃", title: "Sprint Day",
      description: "Maximum power output. Short, intense bursts — this is where your power advantage really shines.",
      exercises: [
        { name: "Sprint intervals", detail: "8×30s on / 90s off", note: "All-out effort each sprint — walk recovery" },
        { name: "Plank holds", detail: "3×45 sec", note: "Core stability — don't let hips sag" },
        { name: "Dead bug", detail: "3×12 each side", note: "Anti-rotation core control" },
        { name: "Pallof press", detail: "3×10 each side", note: "Resisted rotation — transfers to all movements" },
      ] },
    { day: "Sat", type: "Cardio", typeColor: "#22c55e", duration: "75 min", icon: "🌿", title: "Long Walk",
      description: "NEAT activity and maximum sunlight. Longer, easier movement that enhances recovery without taxing the body.",
      exercises: [
        { name: "Outdoor walk", detail: "60 min", note: "Maximum sunlight exposure — Vitamin D synthesis" },
        { name: "Bodyweight mobility", detail: "15 min", note: "Hip 90/90, thoracic rotation, world's greatest stretch" },
      ] },
    { day: "Sun", type: "Rest", typeColor: "#888", duration: "—", icon: "😴", title: "Rest Day",
      description: "Full recovery. Eat protein, sleep 8 hours, and let your body do what it does between sessions — grow stronger.",
      exercises: [] },
  ],
  skin: [
    { day: "Mon", type: "Morning Ritual", typeColor: "#f59e0b", duration: "20 min", icon: "☀️", title: "Morning Glow Ritual",
      description: "15 minutes of pre-10am sunlight plus your Vitamin D supplement. This is your most powerful skin habit.",
      activities: [{ icon: "☀️", action: "15-min sunlight before 10am", time: "Morning" }, { icon: "💊", action: "Vitamin D3 + K2 supplement", time: "Breakfast" }, { icon: "💧", action: "Start with 2 glasses of water", time: "7:00 AM" }] },
    { day: "Tue", type: "Hydration", typeColor: "#0ea5e9", duration: "All day", icon: "💧", title: "Deep Hydration Day",
      description: "Skin elasticity, texture, and radiance are directly tied to hydration. Hit 2.5L today.",
      activities: [{ icon: "💧", action: "Glass of water every 2 hours", time: "All day" }, { icon: "🫐", action: "Antioxidant-rich snack (berries)", time: "Afternoon" }, { icon: "💧", action: "2.5L water target", time: "All day" }] },
    { day: "Wed", type: "Iron Focus", typeColor: "#ef4444", duration: "All day", icon: "⚡", title: "Iron + Vitamin C Day",
      description: "Low iron is directly linked to hair thinning. Two iron-rich meals with vitamin C today is non-negotiable.",
      activities: [{ icon: "🥗", action: "Spinach + chicken + lemon lunch", time: "12:30 PM" }, { icon: "🥩", action: "Red meat or lentils at dinner", time: "7:00 PM" }, { icon: "🍊", action: "Vitamin C with every iron meal", time: "Lunch & Dinner" }] },
    { day: "Thu", type: "Antioxidant", typeColor: "#8b5cf6", duration: "All day", icon: "🫐", title: "Antioxidant Thursday",
      description: "Berries, dark greens, and salmon protect skin cells from damage and support collagen production.",
      activities: [{ icon: "🫐", action: "Berries at breakfast", time: "Morning" }, { icon: "🥗", action: "Dark leafy greens at lunch", time: "Lunch" }, { icon: "🐟", action: "Salmon or omega-3 rich dinner", time: "Dinner" }] },
    { day: "Fri", type: "Supplement", typeColor: "#22c55e", duration: "10 min", icon: "💊", title: "Supplement Check-in",
      description: "Review your supplement routine. Consistency is everything — skin and hair improvements take 8–12 weeks.",
      activities: [{ icon: "☀️", action: "Vitamin D3 + K2", time: "Breakfast" }, { icon: "⚡", action: "Iron supplement (if prescribed)", time: "With Vitamin C" }, { icon: "💧", action: "Collagen-supporting hydration", time: "All day" }] },
    { day: "Sat", type: "Sunlight", typeColor: "#f59e0b", duration: "20 min", icon: "🌞", title: "Sunlight Therapy",
      description: "Weekend sunlight session — longer exposure, earlier timing. Your skin and mood will both thank you.",
      activities: [{ icon: "🌞", action: "20-min morning sunlight", time: "Before 10am" }, { icon: "🧴", action: "Skincare routine — cleanse + moisturise", time: "Morning" }, { icon: "🫐", action: "Antioxidant-rich breakfast", time: "Breakfast" }] },
    { day: "Sun", type: "Reset", typeColor: "#6366f1", duration: "30 min", icon: "✨", title: "Weekly Reset",
      description: "Deep-care Sunday. Hydrate, nourish, and prepare your skin for the week ahead.",
      activities: [{ icon: "💧", action: "Extra hydration day", time: "All day" }, { icon: "🧴", action: "Extended skincare ritual", time: "Evening" }, { icon: "🥗", action: "Nutrient-dense dinner", time: "Dinner" }, { icon: "😴", action: "Early sleep — skin repairs overnight", time: "10:00 PM" }] },
  ],
};

// ─── World Regions ────────────────────────────────────────────────────────────

const worldRegions = [
  { group: "Middle East", items: [
    { id: "saudi",   flag: "🇸🇦", name: "Saudi Arabia", locale: "ar" as Locale },
    { id: "uae",     flag: "🇦🇪", name: "UAE",           locale: "ar" as Locale },
    { id: "kuwait",  flag: "🇰🇼", name: "Kuwait",        locale: "ar" as Locale },
    { id: "qatar",   flag: "🇶🇦", name: "Qatar",         locale: "ar" as Locale },
    { id: "bahrain", flag: "🇧🇭", name: "Bahrain",       locale: "ar" as Locale },
    { id: "oman",    flag: "🇴🇲", name: "Oman",          locale: "ar" as Locale },
    { id: "jordan",  flag: "🇯🇴", name: "Jordan",        locale: "ar" as Locale },
  ]},
  { group: "North Africa", items: [
    { id: "egypt",   flag: "🇪🇬", name: "Egypt",         locale: "ar" as Locale },
    { id: "morocco", flag: "🇲🇦", name: "Morocco",       locale: "ar" as Locale },
    { id: "tunisia", flag: "🇹🇳", name: "Tunisia",       locale: "ar" as Locale },
    { id: "algeria", flag: "🇩🇿", name: "Algeria",       locale: "ar" as Locale },
  ]},
  { group: "South & Southeast Asia", items: [
    { id: "pakistan",   flag: "🇵🇰", name: "Pakistan",   locale: "ar" as Locale },
    { id: "india",      flag: "🇮🇳", name: "India",      locale: "en" as Locale },
    { id: "malaysia",   flag: "🇲🇾", name: "Malaysia",   locale: "ar" as Locale },
    { id: "indonesia",  flag: "🇮🇩", name: "Indonesia",  locale: "ar" as Locale },
    { id: "bangladesh", flag: "🇧🇩", name: "Bangladesh", locale: "ar" as Locale },
  ]},
  { group: "Europe", items: [
    { id: "uk",      flag: "🇬🇧", name: "United Kingdom", locale: "en" as Locale },
    { id: "germany", flag: "🇩🇪", name: "Germany",        locale: "en" as Locale },
    { id: "france",  flag: "🇫🇷", name: "France",         locale: "en" as Locale },
    { id: "turkey",  flag: "🇹🇷", name: "Turkey",         locale: "en" as Locale },
    { id: "spain",   flag: "🇪🇸", name: "Spain",          locale: "en" as Locale },
  ]},
  { group: "Americas", items: [
    { id: "usa",    flag: "🇺🇸", name: "United States", locale: "en" as Locale },
    { id: "canada", flag: "🇨🇦", name: "Canada",        locale: "en" as Locale },
    { id: "brazil", flag: "🇧🇷", name: "Brazil",        locale: "en" as Locale },
  ]},
  { group: "Other", items: [
    { id: "australia",    flag: "🇦🇺", name: "Australia",     locale: "en" as Locale },
    { id: "nigeria",      flag: "🇳🇬", name: "Nigeria",       locale: "en" as Locale },
    { id: "south-africa", flag: "🇿🇦", name: "South Africa",  locale: "en" as Locale },
    { id: "international",flag: "🌍", name: "International",   locale: "en" as Locale },
  ]},
];

// ─── Exercise Demo Animations ─────────────────────────────────────────────────

interface ExerciseDemoConfig {
  equipment: string;
  tip: string;
  charY: number[];
  charRotate: number[];
  charScaleY: number[];
  charScaleX: number[];
  charX: number[];
  equipY: number[];
  equipX: number[];
  duration: number;
}

const exerciseDemoConfigs: Record<string, ExerciseDemoConfig> = {
  "Barbell Squat": {
    equipment: "🏋️", tip: "Drive through your heels — chest up the whole way",
    charY: [0, 30, 0], charScaleY: [1, 0.78, 1], charScaleX: [1, 1.12, 1],
    charRotate: [0, 0, 0], charX: [0, 0, 0],
    equipY: [0, 30, 0], equipX: [0, 0, 0], duration: 2.2,
  },
  "Romanian Deadlift": {
    equipment: "🏋️", tip: "Push hips back — feel the stretch in your hamstrings",
    charY: [0, 18, 0], charRotate: [0, 32, 0], charScaleY: [1, 0.9, 1], charScaleX: [1, 1, 1],
    charX: [0, 8, 0], equipY: [0, 18, 0], equipX: [0, 8, 0], duration: 2.4,
  },
  "Box Jumps": {
    equipment: "📦", tip: "Full reset each rep — maximum power every jump",
    charY: [0, -56, 10, 0], charRotate: [0, 0, 0, 0], charScaleY: [1, 1.05, 0.9, 1], charScaleX: [1, 0.95, 1.1, 1],
    charX: [0, 0, 0, 0], equipY: [0, 0, 0, 0], equipX: [0, 0, 0, 0], duration: 1.4,
  },
  "Bulgarian Split Squat": {
    equipment: "🪑", tip: "Front knee tracks your toes — control the drop",
    charY: [0, 26, 0], charRotate: [0, 4, 0], charScaleY: [1, 0.82, 1], charScaleX: [1, 1.08, 1],
    charX: [0, -6, 0], equipY: [0, 0, 0], equipX: [0, 0, 0], duration: 2.0,
  },
  "Calf Raises": {
    equipment: "⬆️", tip: "Pause at the top — full squeeze every rep",
    charY: [0, -16, 0], charRotate: [0, 0, 0], charScaleY: [1, 1.06, 1], charScaleX: [1, 0.96, 1],
    charX: [0, 0, 0], equipY: [0, -16, 0], equipX: [0, 0, 0], duration: 1.2,
  },
  "Incline Dumbbell Press": {
    equipment: "🏋️", tip: "Control the descent — explosive press up",
    charY: [0, -12, 0], charRotate: [-12, -12, -12], charScaleY: [1, 0.95, 1], charScaleX: [1, 1.04, 1],
    charX: [0, 0, 0], equipY: [0, -16, 0], equipX: [-6, 6, -6], duration: 2.0,
  },
  "Barbell Row": {
    equipment: "🏋️", tip: "Pull to your lower chest — squeeze your back at the top",
    charY: [0, 10, 0], charRotate: [28, 28, 28], charScaleY: [1, 1, 1], charScaleX: [1, 1, 1],
    charX: [0, 0, 0], equipY: [0, -18, 0], equipX: [0, 0, 0], duration: 2.0,
  },
  "Weighted Pull-Ups": {
    equipment: "🔗", tip: "Full hang at the bottom — chin clear of the bar",
    charY: [0, -44, 0], charRotate: [0, 0, 0], charScaleY: [1, 1.06, 1], charScaleX: [1, 0.94, 1],
    charX: [0, 0, 0], equipY: [0, 0, 0], equipX: [0, 0, 0], duration: 2.4,
  },
  "Overhead Press": {
    equipment: "🏋️", tip: "Core tight — no lower back arch",
    charY: [0, -10, 0], charRotate: [0, 0, 0], charScaleY: [1, 1.08, 1], charScaleX: [1, 0.94, 1],
    charX: [0, 0, 0], equipY: [0, -28, 0], equipX: [0, 0, 0], duration: 1.8,
  },
  "Face Pulls": {
    equipment: "🔁", tip: "Pull to your forehead — external rotate at the end",
    charY: [0, 0, 0], charRotate: [0, 0, 0], charScaleY: [1, 1, 1], charScaleX: [1, 0.92, 1],
    charX: [0, -14, 0], equipY: [0, 0, 0], equipX: [12, -12, 12], duration: 1.8,
  },
  "Sprint intervals": {
    equipment: "🏃", tip: "All-out effort every rep — walk the recovery",
    charY: [0, -10, 0, -8, 0], charRotate: [-8, 8, -8, 8, -8], charScaleY: [1, 1, 1, 1, 1], charScaleX: [1, 1, 1, 1, 1],
    charX: [-16, 16, -16, 16, -16], equipY: [0, 0, 0, 0, 0], equipX: [0, 0, 0, 0, 0], duration: 0.7,
  },
  "Plank holds": {
    equipment: "⏱️", tip: "Hips level — breathe steadily through the hold",
    charY: [0, 0, 0], charRotate: [80, 80, 80], charScaleY: [1, 1, 1], charScaleX: [1.1, 1.0, 1.1],
    charX: [0, 0, 0], equipY: [0, -4, 0], equipX: [0, 0, 0], duration: 2.0,
  },
  "Dead bug": {
    equipment: "🦵", tip: "Lower back pressed to the floor the entire time",
    charY: [0, 0, 0], charRotate: [60, 60, 60], charScaleY: [1, 1, 1], charScaleX: [1, 1, 1],
    charX: [-8, 8, -8], equipY: [-12, 12, -12], equipX: [0, 0, 0], duration: 1.6,
  },
  "Pallof press": {
    equipment: "🔁", tip: "Resist the rotation — squeeze your core throughout",
    charY: [0, 0, 0], charRotate: [0, 0, 0], charScaleY: [1, 1, 1], charScaleX: [1, 1, 1],
    charX: [-6, 6, -6], equipY: [0, 0, 0], equipX: [0, 24, 0], duration: 1.8,
  },
  "Outdoor walk": {
    equipment: "🌿", tip: "Steady comfortable pace — enjoy the sunlight",
    charY: [0, -5, 0], charRotate: [-3, 3, -3], charScaleY: [1, 1, 1], charScaleX: [1, 1, 1],
    charX: [-8, 8, -8], equipY: [0, 0, 0], equipX: [0, 0, 0], duration: 1.0,
  },
  "Bodyweight mobility": {
    equipment: "🧘", tip: "Hold each position — breathe into the stretch",
    charY: [0, 0, 0], charRotate: [0, 20, 0], charScaleY: [1, 0.92, 1], charScaleX: [1, 1.05, 1],
    charX: [0, 0, 0], equipY: [0, 0, 0], equipX: [0, 0, 0], duration: 3.0,
  },
};

function ExerciseDemo({ name, detail }: { name: string; detail: string }) {
  const cfg = exerciseDemoConfigs[name];
  if (!cfg) return null;

  const transition = { duration: cfg.duration, repeat: Infinity, ease: "easeInOut" as const };

  return (
    <div className="mt-3 rounded-[20px] overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.12)]">
      {/* Demo stage */}
      <div className="bg-gradient-to-br from-[#061e1e] to-[#0f3535] px-4 pt-6 pb-5 flex flex-col items-center relative overflow-hidden">
        {/* Ambient glow */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[180px] h-[180px] rounded-full bg-[#4db8b8]/10 blur-3xl" />
        </div>

        {/* Ground line */}
        <div className="absolute bottom-[60px] left-8 right-8 h-[1px] bg-[#4db8b8]/20 rounded-full" />

        {/* Equipment emoji */}
        <motion.div
          className="absolute top-5 right-6 text-[28px]"
          animate={{ y: cfg.equipY, x: cfg.equipX }}
          transition={transition}>
          {cfg.equipment}
        </motion.div>

        {/* Sets/reps badge */}
        <div className="absolute top-5 left-5 px-2.5 py-1 rounded-full bg-[#4db8b8]/20 border border-[#4db8b8]/30">
          <span className="text-[11px] font-bold text-[#4db8b8]">{detail}</span>
        </div>

        {/* Animated character */}
        <motion.div
          className="relative z-10"
          animate={{
            y: cfg.charY,
            rotate: cfg.charRotate,
            scaleY: cfg.charScaleY,
            scaleX: cfg.charScaleX,
            x: cfg.charX,
          }}
          transition={transition}>
          <ImageWithFallback
            src={cfg.equipment === "🧘" || cfg.equipment === "🌿" ? mascotMeditateImg : mascotLiftImg}
            alt={`Mulhim demonstrating ${name}`}
            className="object-contain drop-shadow-2xl"
            style={{ width: 100, height: 100 }} />
        </motion.div>

        {/* Shadow under character */}
        <motion.div
          className="w-14 h-2 rounded-full bg-black/30 blur-sm mt-1"
          animate={{ scaleX: cfg.charScaleX.map(s => 1 / s) }}
          transition={transition} />

        {/* Coaching tip */}
        <div className="mt-4 px-3 py-2 rounded-[12px] bg-white/8 border border-white/10 w-full text-center">
          <p className="text-[11px] text-white/65 leading-snug">{cfg.tip}</p>
        </div>
      </div>

      {/* Footer bar */}
      <div className="bg-[#0a2828] px-4 py-2.5 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <span className="text-[10px]">🤸</span>
          <span className="text-[10px] font-bold text-[#4db8b8] uppercase tracking-wide">Mulhim Demo</span>
        </div>
        <span className="text-[10px] text-white/30">{name}</span>
      </div>
    </div>
  );
}

// ─── Home Screen ──────────────────────────────────────────────────────────────

function HomeScreen({
  hasCoach, onCategory, onReport, onSettings, onRecovery, onMentalHub, onHairSkin, onAchievement, onProfile,
}: {
  hasCoach: boolean;
  onCategory: (id: CategoryId) => void;
  onReport: () => void;
  onSettings: () => void;
  onRecovery: () => void;
  onMentalHub: () => void;
  onHairSkin: () => void;
  onProfile: () => void;
  onAchievement: () => void;
}) {
  const today = new Date();
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const weekDates = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() - today.getDay() + i);
    return { day: days[i], date: d.getDate(), isToday: d.toDateString() === today.toDateString() };
  });

  return (
    <div className="flex flex-col pb-10">
      {/* ── Top Bar ── */}
      <div className="px-5 pt-12 pb-4 flex items-center justify-between">
        <button className="flex items-center gap-2 bg-white rounded-full px-3.5 py-2 shadow-[0_2px_10px_rgba(0,0,0,0.09)]">
          <span className="text-[15px]">🔥</span>
          <span className="text-[13px] font-bold text-[#1a1a1a]">0 days</span>
        </button>
        <div className="flex items-center gap-2.5">
          <div className="text-right">
            <p className="text-[11px] text-[#888]">Hello</p>
            <p className="text-[15px] font-bold text-[#1a1a1a]">Mulhim</p>
          </div>
          <button onClick={onProfile} className="w-10 h-10 rounded-full overflow-hidden bg-[#e8f5f5] border-2 border-[#4db8b8]/40">
            <ImageWithFallback src={mascotSmileImg} alt="Profile" className="w-full h-full object-contain" />
          </button>
          <button onClick={onSettings} className="w-9 h-9 rounded-full bg-white shadow-[0_2px_8px_rgba(0,0,0,0.08)] flex items-center justify-center">
            <Settings size={15} className="text-[#888]" />
          </button>
        </div>
      </div>

      {/* ── Hero Dark Card ── */}
      <div className="mx-5 mb-5 rounded-[28px] overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.22)]"
        style={{ background: "linear-gradient(160deg, #0d3535 0%, #1a5555 50%, #1e6060 100%)" }}>

        {/* Week strip */}
        <div className="px-4 pt-5 pb-3">
          <div className="flex justify-between">
            {weekDates.map(({ day, date, isToday }) => (
              <div key={day} className="flex flex-col items-center gap-1.5">
                <span className="text-[10px] font-semibold text-white/50">{day}</span>
                <div className={`w-[34px] h-[34px] rounded-full flex items-center justify-center text-[13px] font-bold transition-all ${isToday ? "bg-white text-[#1e5e5e] shadow-[0_2px_8px_rgba(0,0,0,0.25)]" : "text-white/70 border border-white/20"}`}>
                  {date}
                </div>
                {isToday && <div className="w-1 h-1 rounded-full bg-[#4db8b8]" />}
              </div>
            ))}
          </div>
        </div>

        {/* Speak to Mulhim */}
        <div className="px-5 pt-3 pb-4 flex items-center justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-1.5 mb-1">
              <Sparkles size={12} className="text-[#4db8b8]" />
              <p className="text-[11px] font-bold text-[#4db8b8] uppercase tracking-[0.1em]">Speak to Mulhim</p>
            </div>
            <p className="text-[20px] font-bold text-white leading-snug mb-1">Your smart coach,<br />here to help you.</p>
            <p className="text-[11px] text-white/55 mb-3">{hasCoach ? "Coach-backed insights" : "AI-powered guidance"}</p>
            <button className="flex items-center gap-2 bg-white/20 border border-white/25 backdrop-blur-sm rounded-full px-4 py-2 active:bg-white/30 transition-all">
              <span className="text-[13px] font-bold text-white">Start a chat</span>
              <span className="text-[13px]">💬</span>
            </button>
          </div>
          <div className="relative flex-shrink-0 ml-3">
            <div className="absolute inset-0 rounded-full bg-[#4db8b8]/25 blur-2xl scale-[2]" />
            <div className="w-[90px] h-[90px] rounded-full bg-[#1a5555]/60 border border-white/15 flex items-center justify-center overflow-hidden relative z-10">
              <ImageWithFallback src={mascotSmileImg} alt="Mulhim coach" className="w-[86px] h-[86px] object-contain" />
            </div>
          </div>
        </div>

        {/* Today's Plan inner card */}
        <div className="mx-3 mb-3 rounded-[20px] overflow-hidden bg-[#0d3535]/70 border border-white/10">
          <div className="px-4 pt-3.5 pb-2 flex items-center justify-between">
            <div>
              <p className="text-[10px] text-white/50 mb-0.5">Today&apos;s Plan · {days[today.getDay()]} {today.getDate()} {today.toLocaleString("default", { month: "long" })}</p>
              <p className="text-[14px] font-bold text-white">Top Priorities</p>
            </div>
          </div>
          <div className="flex flex-col divide-y divide-white/8 pb-2">
            {[
              { icon: "🌅", name: "Morning sunlight walk", time: "15 min", tag: "High Impact", color: "#4db8b8" },
              { icon: "🚶", name: "Post-meal walk", time: "10 min", tag: "Glucose", color: "#86efac" },
              { icon: "🥩", name: "Iron-rich lunch", time: "Midday", tag: "Ferritin", color: "#f59e0b" },
            ].map((item) => (
              <div key={item.name} className="px-4 py-2.5 flex items-center gap-3">
                <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0 text-[13px]">
                  {item.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[12px] font-semibold text-white leading-tight">{item.name}</p>
                  <p className="text-[10px] text-white/45">{item.time}</p>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ color: item.color, backgroundColor: `${item.color}20` }}>{item.tag}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── My Achievements entry ── */}
      <div className="mx-5 mb-4">
        <button onClick={onAchievement}
          className="w-full bg-white rounded-[22px] px-4 py-3.5 shadow-[0_2px_14px_rgba(0,0,0,0.07)] flex items-center gap-3 active:scale-[0.98] transition-transform text-left">
          <div className="w-11 h-11 rounded-full bg-amber-50 flex items-center justify-center flex-shrink-0 overflow-hidden">
            <ImageWithFallback src={mascotCelebImg} alt="Achievements" className="w-10 h-10 object-contain" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[14px] font-bold text-[#1a1a1a]">My Achievements</p>
            <p className="text-[11px] text-[#888] mt-0.5 truncate">Unlocked &quot;7-Day Streak&quot; 🔥</p>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <span className="px-2 py-0.5 rounded-full bg-amber-50 text-amber-600 text-[10px] font-bold">3 new 🎉</span>
            <ChevronRight size={14} className="text-[#ddd]" />
          </div>
        </button>
      </div>

      {/* ── Health Plans ── */}
      <div className="mb-4">
        <div className="px-5 flex items-center justify-between mb-3">
          <h2 className="text-[17px] font-bold text-[#1a1a1a]">Health Plans</h2>
          <span className="text-[10px] font-semibold text-[#aaa] uppercase tracking-wide">Tap to explore</span>
        </div>
        <div className="px-5 flex gap-2.5">

          {/* Recovery — mascotBackImg (peaceful) */}
          <button onClick={onRecovery}
            className="flex-1 rounded-[20px] overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.14)] active:scale-[0.96] transition-transform"
            style={{ background: "linear-gradient(150deg, #071c2c 0%, #0a2d44 55%, #1e5e5e 100%)" }}>
            <div className="relative h-[100px] flex items-end justify-center overflow-hidden">
              <div className="absolute w-20 h-20 rounded-full top-1 left-1/2 -translate-x-1/2 opacity-20" style={{ backgroundColor: "#4db8b8", filter: "blur(22px)" }} />
              <svg className="absolute top-3 right-3 opacity-55" width="18" height="18" viewBox="0 0 20 20">
                <path d="M10 3a7 7 0 100 14A5.4 5.4 0 0110 3z" fill="#8b8ff8" />
              </svg>
              <div className="absolute top-3 left-3 flex flex-col items-start leading-none">
                <span className="text-[8px] font-bold text-white/25">z</span>
                <span className="text-[10px] font-bold text-white/40 ml-1">z</span>
                <span className="text-[12px] font-bold text-white/55 ml-2.5">z</span>
              </div>
              <ImageWithFallback src={mascotPillowImg} alt="Recovery" className="h-[80px] w-auto object-contain relative z-10 drop-shadow-lg" />
            </div>
            <div className="px-3 pt-2 pb-3 border-t border-white/8">
              <p className="text-[12px] font-bold text-white">Recovery</p>
              <p className="text-[9px] text-white/40 mt-0.5">Sleep · Rest · Restore</p>
            </div>
          </button>

          {/* Mental Health — mascotSideImg (contemplative) */}
          <button onClick={onMentalHub}
            className="flex-1 rounded-[20px] overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.14)] active:scale-[0.96] transition-transform"
            style={{ background: "linear-gradient(150deg, #0e0720 0%, #1a1040 55%, #2d1f6e 100%)" }}>
            <div className="relative h-[100px] flex items-end justify-center overflow-hidden">
              <div className="absolute w-20 h-20 rounded-full top-0 left-1/2 -translate-x-1/2 opacity-25" style={{ backgroundColor: "#a78bfa", filter: "blur(24px)" }} />
              <svg className="absolute top-2 right-3 opacity-60" width="14" height="14" viewBox="0 0 16 16">
                <circle cx="8" cy="8" r="2" fill="#c4b5fd"/>
                <circle cx="8" cy="2" r="1.2" fill="#a78bfa"/>
                <circle cx="14" cy="8" r="1" fill="#a78bfa"/>
                <circle cx="2" cy="8" r="1" fill="#a78bfa"/>
              </svg>
              <ImageWithFallback src={mascotConfusedImg} alt="Mental Health" className="h-[80px] w-auto object-contain relative z-10 drop-shadow-lg" />
            </div>
            <div className="px-3 pt-2 pb-3 border-t border-white/8">
              <p className="text-[12px] font-bold text-white">Mental Health</p>
              <p className="text-[9px] text-white/40 mt-0.5">Mind · Calm · Focus</p>
            </div>
          </button>

          {/* Hair & Skin — mascotFoodImg (glowing) */}
          <button onClick={onHairSkin}
            className="flex-1 rounded-[20px] overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.14)] active:scale-[0.96] transition-transform"
            style={{ background: "linear-gradient(150deg, #1a0e00 0%, #3a2000 55%, #5c3300 100%)" }}>
            <div className="relative h-[100px] flex items-end justify-center overflow-hidden">
              <div className="absolute w-20 h-20 rounded-full top-0 left-1/2 -translate-x-1/2 opacity-30" style={{ backgroundColor: "#fbbf24", filter: "blur(22px)" }} />
              <svg className="absolute top-2 left-2 opacity-55" width="20" height="20" viewBox="0 0 20 20">
                <circle cx="5" cy="5" r="1.5" fill="#fde68a"/>
                <circle cx="14" cy="3" r="1" fill="#fbbf24"/>
                <circle cx="16" cy="12" r="1.2" fill="#fde68a"/>
              </svg>
              <ImageWithFallback src={mascotBowImg} alt="Hair & Skin" className="h-[80px] w-auto object-contain relative z-10 drop-shadow-lg" />
            </div>
            <div className="px-3 pt-2 pb-3 border-t border-white/8">
              <p className="text-[12px] font-bold text-white">Hair &amp; Skin</p>
              <p className="text-[9px] text-white/40 mt-0.5">Glow · Hydrate · Care</p>
            </div>
          </button>
        </div>
      </div>

      {/* ── Health Report ── */}
      <button onClick={onReport}
        className="mx-5 mb-5 flex items-center gap-3 bg-white rounded-[22px] p-4 shadow-[0_2px_12px_rgba(0,0,0,0.06)] active:scale-[0.98] transition-transform">
        <div className="w-11 h-11 rounded-full bg-[#e8f5f5] flex items-center justify-center flex-shrink-0 text-[20px]">🔬</div>
        <div className="flex-1 text-left">
          <p className="text-[14px] font-bold text-[#1a1a1a]">Health Report</p>
          <p className="text-[11px] text-[#888]">Lab results · Biomarkers · AI insights</p>
        </div>
        <ChevronRight size={16} className="text-[#ccc] flex-shrink-0" />
      </button>
    </div>
  );
}

// ─── Profile Screen ───────────────────────────────────────────────────────────

function ProfileScreen({ hasCoach, locale, onReport, onGeneticPlan, onGoalSetup, onProgress, onSettings, onLocaleToggle, onUpgrade }: {
  hasCoach: boolean;
  locale: Locale;
  onReport: () => void;
  onGeneticPlan: () => void;
  onGoalSetup: () => void;
  onProgress: () => void;
  onSettings: () => void;
  onLocaleToggle: () => void;
  onUpgrade: () => void;
}) {
  const menuItem = (icon: JSX.Element | string, label: string, sublabel: string, action: () => void, badge?: JSX.Element | null) => (
    <button onClick={action} className="w-full flex items-center gap-3.5 px-4 py-3.5 text-left active:bg-[#f9f9f9] transition-colors">
      <div className="w-10 h-10 rounded-full bg-[#f5f5f5] flex items-center justify-center flex-shrink-0">{icon}</div>
      <div className="flex-1 min-w-0">
        <p className="text-[13px] font-semibold text-[#1a1a1a]">{label}</p>
        <p className="text-[11px] text-[#aaa] mt-0.5 leading-tight">{sublabel}</p>
      </div>
      {badge ?? <ChevronRight size={14} className="text-[#ddd] flex-shrink-0" />}
    </button>
  );

  return (
    <div className="flex flex-col pb-10">
      {/* Header */}
      <div className="px-5 pt-14 pb-6">
        <div className="flex items-center gap-4">
          <div className="relative flex-shrink-0">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#1e5e5e] to-[#4db8b8] flex items-center justify-center shadow-[0_4px_16px_rgba(30,94,94,0.35)]">
              <User size={28} className="text-white" strokeWidth={1.8} />
            </div>
            {hasCoach && (
              <span className="absolute -bottom-0.5 -right-0.5 w-5 h-5 rounded-full bg-[#1e5e5e] border-2 border-white flex items-center justify-center text-[10px]">👨‍⚕️</span>
            )}
          </div>
          <div className="flex-1">
            <h1 className="text-[20px] font-bold text-[#1a1a1a] leading-tight">My Profile</h1>
            <p className="text-[12px] text-[#888] mt-0.5">{hasCoach ? "Coach-supported plan" : "AI-generated plan"}</p>
            {hasCoach && (
              <span className="inline-flex items-center gap-1 mt-1.5 px-2.5 py-0.5 rounded-full bg-[#e8f5f5] text-[#1e5e5e] text-[10px] font-bold">
                ✓ Premium Member
              </span>
            )}
          </div>
          <button onClick={onSettings}
            className="w-10 h-10 rounded-full bg-white shadow-[0_2px_10px_rgba(0,0,0,0.08)] flex items-center justify-center">
            <Settings size={16} className="text-[#888]" />
          </button>
        </div>
      </div>

      {/* Health section */}
      <div className="mx-5 mb-4">
        <p className="text-[10px] font-bold text-[#aaa] uppercase tracking-[0.14em] mb-2 px-1">Your Health</p>
        <div className="bg-white rounded-[22px] shadow-[0_2px_12px_rgba(0,0,0,0.06)] overflow-hidden divide-y divide-[#f5f5f5]">
          <button onClick={onReport}
            className="w-full flex items-center gap-3.5 px-4 py-4 text-left active:bg-[#f9f9f9] transition-colors">
            <div className="w-10 h-10 rounded-full bg-[#e8f5f5] flex items-center justify-center flex-shrink-0 text-[18px]">🔬</div>
            <div className="flex-1">
              <p className="text-[13px] font-semibold text-[#1a1a1a]">Health Report</p>
              <p className="text-[11px] text-[#aaa] mt-0.5">Lab results · Biomarkers · AI insights</p>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-[#e8f5f5] text-[#1e5e5e] text-[10px] font-bold mr-1">New</span>
            <ChevronRight size={14} className="text-[#ddd] flex-shrink-0" />
          </button>
          {menuItem(<span className="text-[18px]">📈</span>, "Progress & Journey", "Goals · History · Timeline", onProgress)}
          {menuItem(<TrendingUp size={18} className="text-[#1e5e5e]" />, "Edit Goals & Plans", "Rebuild your health plan", onGoalSetup)}
        </div>
      </div>

      {/* Account section */}
      <div className="mx-5 mb-4">
        <p className="text-[10px] font-bold text-[#aaa] uppercase tracking-[0.14em] mb-2 px-1">Account</p>
        <div className="bg-white rounded-[22px] shadow-[0_2px_12px_rgba(0,0,0,0.06)] overflow-hidden divide-y divide-[#f5f5f5]">
          {!hasCoach && (
            <button onClick={onUpgrade}
              className="w-full flex items-center gap-3.5 px-4 py-4 text-left active:bg-amber-50 transition-colors">
              <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center flex-shrink-0">
                <CreditCard size={18} className="text-amber-600" />
              </div>
              <div className="flex-1">
                <p className="text-[13px] font-semibold text-[#1a1a1a]">Upgrade to Premium</p>
                <p className="text-[11px] text-[#aaa] mt-0.5">Get a real coach + advanced insights</p>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-amber-400 text-white text-[10px] font-bold mr-1">PRO</span>
              <ChevronRight size={14} className="text-[#ddd] flex-shrink-0" />
            </button>
          )}
          {menuItem(<Dna size={18} className="text-[#6366f1]" />, "Customize via Genes", "Genetic-based plan personalisation", onGeneticPlan)}
          {menuItem(<User size={18} className="text-[#555]" />, "Edit Profile", "Name · Age · Health details", () => {})}
        </div>
      </div>

      {/* Preferences section */}
      <div className="mx-5 mb-4">
        <p className="text-[10px] font-bold text-[#aaa] uppercase tracking-[0.14em] mb-2 px-1">Preferences</p>
        <div className="bg-white rounded-[22px] shadow-[0_2px_12px_rgba(0,0,0,0.06)] overflow-hidden divide-y divide-[#f5f5f5]">
          {menuItem(
            <BellRing size={18} className="text-[#555]" />, "Notifications", "Reminders · Habit alerts · Coach messages", () => {},
            <span className="w-2 h-2 rounded-full bg-[#ef4444] mr-2 flex-shrink-0" />
          )}
          {menuItem(
            <Globe size={18} className="text-[#555]" />, "Language",
            locale === "en" ? "English (current)" : "Arabic (current)",
            onLocaleToggle,
            <span className="text-[11px] font-bold text-[#1e5e5e] mr-2">{locale === "en" ? "EN" : "AR"}</span>
          )}
          {menuItem(<Settings size={18} className="text-[#555]" />, "App Settings", "Units · Display · Integrations", onSettings)}
        </div>
      </div>

      {/* Support section */}
      <div className="mx-5 mb-4">
        <p className="text-[10px] font-bold text-[#aaa] uppercase tracking-[0.14em] mb-2 px-1">Support</p>
        <div className="bg-white rounded-[22px] shadow-[0_2px_12px_rgba(0,0,0,0.06)] overflow-hidden divide-y divide-[#f5f5f5]">
          {menuItem(<HelpCircle size={18} className="text-[#555]" />, "Help & Support", "FAQs · Contact · Tutorials", () => {})}
          {menuItem(<Lock size={18} className="text-[#555]" />, "Privacy Policy", "Data use · Security", () => {})}
          {menuItem(<Shield size={18} className="text-[#555]" />, "Terms of Service", "Usage terms", () => {})}
        </div>
      </div>

      {/* Danger zone */}
      <div className="mx-5 mb-4">
        <div className="bg-white rounded-[22px] shadow-[0_2px_12px_rgba(0,0,0,0.06)] overflow-hidden divide-y divide-[#f5f5f5]">
          {menuItem(
            <LogOut size={18} className="text-[#ef4444]" />, "Log Out", "Sign out of your account", () => {},
            <span className="w-5" />
          )}
          {hasCoach && menuItem(
            <XCircle size={18} className="text-[#ef4444]" />, "Cancel Subscription", "Downgrade to free plan", () => {},
            <span className="w-5" />
          )}
        </div>
      </div>

      {/* Version */}
      <p className="text-center text-[10px] text-[#ccc] font-semibold mt-2">Mulhim v2.0 · Made with ❤️ for your health</p>
    </div>
  );
}

// ─── Goal Setup Screen ────────────────────────────────────────────────────────

function GoalSetupScreen({
  initialGoals, initialCustom, hasCoach, onBack, onComplete,
}: {
  initialGoals: string[];
  initialCustom: string;
  hasCoach: boolean;
  onBack: () => void;
  onComplete: (goals: string[], custom: string) => void;
}) {
  const [selectedGoals, setSelectedGoals] = useState<string[]>(initialGoals.length > 0 ? initialGoals : []);
  const [customText, setCustomText] = useState(initialCustom);
  const [phase, setPhase] = useState<"setup" | "generating" | "done">("setup");
  const [genStep, setGenStep] = useState(0);

  const genSteps = [
    { icon: "🌙", label: "Building Sleep Plan…" },
    { icon: "🧠", label: "Building Mental Health Plan…" },
    { icon: "🥗", label: "Building Nutrition Plan…" },
    { icon: "❤️", label: "Building Physical Health Plan…" },
    { icon: "🏋️", label: "Building Exercise Plan…" },
    { icon: "✨", label: "Building Hair & Skin Plan…" },
    { icon: "✅", label: "All plans ready!" },
  ];

  const toggleGoal = (id: string) =>
    setSelectedGoals((prev) =>
      prev.includes(id) ? prev.filter((g) => g !== id) : prev.length < 6 ? [...prev, id] : prev
    );

  const handleGenerate = () => {
    if (selectedGoals.length === 0 && !customText.trim()) return;
    setPhase("generating");
    setGenStep(0);
    let step = 0;
    const timer = setInterval(() => {
      step++;
      setGenStep(step);
      if (step >= genSteps.length - 1) {
        clearInterval(timer);
        setTimeout(() => setPhase("done"), 600);
      }
    }, 400);
  };

  if (phase === "generating" || phase === "done") {
    return (
      <div className="flex flex-col min-h-screen items-center justify-center px-5 pb-10">
        {/* Large mascot — tablet when done, regular when generating */}
        <div className="relative mb-6">
          <div className="absolute inset-0 rounded-full bg-[#4db8b8]/20 blur-3xl scale-[2.5]" />
          <ImageWithFallback
            src={phase === "done" ? mascotTabletImg : mascotCharImg}
            alt="Mulhim building your plan"
            className="relative z-10 object-contain drop-shadow-2xl"
            style={{ width: 150, height: 150 }} />
        </div>

        <p className="text-[22px] font-bold text-[#1a1a1a] text-center mb-1">
          {phase === "done" ? "Your Plans Are Ready!" : "Building Your Plans…"}
        </p>
        <p className="text-[13px] text-[#888] text-center mb-8 leading-relaxed max-w-[260px]">
          {phase === "done"
            ? "6 personalised plans built just for you, based on your health data and goals."
            : "I'm analysing your goals and health data to create plans for all 6 areas."}
        </p>

        {/* Steps list */}
        <div className="w-full bg-white rounded-[28px] p-4 shadow-[0_2px_20px_rgba(0,0,0,0.07)] mb-6 flex flex-col gap-0">
          {genSteps.map((step, i) => {
            const isActive = i === genStep;
            const isDone = i < genStep || phase === "done";
            return (
              <div key={i} className={`flex items-center gap-3 px-3 py-3 rounded-[16px] transition-all duration-300 ${isActive ? "bg-[#e8f5f5]" : ""}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-[16px] transition-all ${isDone ? "bg-[#1e5e5e]" : isActive ? "bg-[#4db8b8]/20" : "bg-[#f5f5f5]"}`}>
                  {isDone ? <CheckCircle2 size={16} className="text-white" /> : step.icon}
                </div>
                <p className={`text-[13px] font-semibold transition-all ${isDone ? "text-[#1e5e5e]" : isActive ? "text-[#1a1a1a]" : "text-[#ccc]"}`}>
                  {step.label}
                </p>
                {isActive && phase === "generating" && (
                  <div className="ml-auto w-4 h-4 border-2 border-[#1e5e5e] border-t-transparent rounded-full animate-spin flex-shrink-0" />
                )}
              </div>
            );
          })}
        </div>

        {phase === "done" && (
          <button onClick={() => onComplete(selectedGoals, customText)}
            className="w-full py-4 rounded-[20px] bg-[#1e5e5e] text-white font-bold text-[16px] shadow-[0_6px_24px_rgba(30,94,94,0.3)] active:scale-[0.98] transition-transform flex items-center justify-center gap-2">
            <Sparkles size={18} />
            See My Plans
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col pb-10">
      {/* Header */}
      <div className="px-5 pt-14 pb-2 flex items-center gap-3">
        <button onClick={onBack}
          className="w-10 h-10 rounded-full bg-white shadow-[0_2px_12px_rgba(0,0,0,0.08)] flex items-center justify-center flex-shrink-0">
          <ArrowLeft size={18} className="text-[#1a1a1a]" />
        </button>
        <div>
          <p className="text-[11px] font-semibold text-[#aaa] uppercase tracking-[0.12em]">Step 1 of 1</p>
          <h1 className="text-[20px] font-bold text-[#1a1a1a] leading-tight">Set Your Goals</h1>
        </div>
      </div>

      {/* Mascot intro */}
      <div className="mx-5 mt-4 mb-5 bg-gradient-to-br from-[#0a3030] to-[#1e5e5e] rounded-[28px] p-5 flex items-center gap-4">
        <div className="relative flex-shrink-0">
          <div className="absolute inset-0 rounded-full bg-[#4db8b8]/25 blur-2xl scale-[2.2]" />
          <ImageWithFallback src={mascotCharImg} alt="Mulhim"
            className="relative z-10 object-contain drop-shadow-2xl"
            style={{ width: 80, height: 80 }} />
        </div>
        <div className="flex-1">
          <p className="text-[15px] font-bold text-white leading-snug mb-1">
            What do you want to improve?
          </p>
          <p className="text-[12px] text-white/65 leading-relaxed">
            I&apos;ll use your goals and health data to build personalised plans for all 6 health areas.
          </p>
          {hasCoach && (
            <div className="mt-2 flex items-center gap-1.5">
              <span className="text-[11px]">👨‍⚕️</span>
              <p className="text-[10px] text-[#4db8b8] font-bold">Coach will review your plan</p>
            </div>
          )}
        </div>
      </div>

      {/* Quick-pick goal chips */}
      <div className="px-5 mb-5">
        <p className="text-[13px] font-bold text-[#1a1a1a] mb-1">Choose your goals</p>
        <p className="text-[11px] text-[#aaa] mb-3">Pick as many as you like — up to 6</p>
        <div className="flex flex-wrap gap-2">
          {homeGoalOptions.map((g) => {
            const active = selectedGoals.includes(g.id);
            return (
              <button key={g.id} onClick={() => toggleGoal(g.id)}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full text-[13px] font-bold transition-all active:scale-[0.95] ${
                  active
                    ? "bg-[#1e5e5e] text-white shadow-[0_2px_12px_rgba(30,94,94,0.25)]"
                    : "bg-white text-[#444] shadow-[0_2px_8px_rgba(0,0,0,0.07)] border border-[#eee]"
                }`}>
                <span>{g.icon}</span>
                {g.label}
                {active && <CheckCircle2 size={12} className="text-white/80" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Custom goal text area */}
      <div className="px-5 mb-6">
        <div className="bg-white rounded-[24px] p-4 shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
          <div className="flex items-center gap-2.5 mb-3">
            <div className="relative flex-shrink-0">
              <div className="absolute inset-0 rounded-full bg-[#4db8b8]/20 blur-lg scale-[2]" />
              <ImageWithFallback src={mascotCharImg} alt="Mulhim"
                className="relative z-10 object-contain"
                style={{ width: 36, height: 36 }} />
            </div>
            <div>
              <p className="text-[13px] font-bold text-[#1a1a1a]">Write your own goal</p>
              <p className="text-[11px] text-[#aaa]">Tell me anything — in your own words</p>
            </div>
          </div>
          <textarea
            value={customText}
            onChange={(e) => setCustomText(e.target.value)}
            placeholder={"e.g. I want to have more energy in the mornings, lose 5kg before summer, and sleep better on weekdays..."}
            rows={4}
            className="w-full text-[13px] text-[#333] placeholder-[#bbb] leading-relaxed resize-none outline-none bg-[#f8f8f8] rounded-[16px] px-4 py-3 border border-[#eee] focus:border-[#4db8b8] focus:bg-white transition-colors"
          />
          {customText.trim().length > 0 && (
            <p className="text-[11px] text-[#1e5e5e] font-semibold mt-2">✓ Mulhim will incorporate this into your plan</p>
          )}
        </div>
      </div>

      {/* What you'll get */}
      <div className="px-5 mb-6">
        <p className="text-[13px] font-bold text-[#1a1a1a] mb-3">What Mulhim will build for you</p>
        <div className="grid grid-cols-2 gap-2">
          {[
            { icon: "🌙", label: "Sleep Plan", color: "#1c1f4a", accent: "#8b8ff8" },
            { icon: "🧠", label: "Mental Health", color: "#2a1f4e", accent: "#a78bfa" },
            { icon: "🥗", label: "Nutrition Plan", color: "#0d3d2a", accent: "#34d399" },
            { icon: "❤️", label: "Physical Health", color: "#3d1224", accent: "#fb7185" },
            { icon: "🏋️", label: "Exercise Plan", color: "#1e3a1e", accent: "#86efac" },
            { icon: "✨", label: "Hair & Skin", color: "#3a1a00", accent: "#fbbf24" },
          ].map((item) => (
            <div key={item.label} className="rounded-[18px] px-4 py-3 flex items-center gap-2.5"
              style={{ backgroundColor: item.color }}>
              <span className="text-[18px]">{item.icon}</span>
              <p className="text-[12px] font-bold" style={{ color: item.accent }}>{item.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Generate CTA */}
      <div className="px-5">
        <button onClick={handleGenerate}
          disabled={selectedGoals.length === 0 && !customText.trim()}
          className="w-full py-4 rounded-[20px] bg-[#1e5e5e] text-white font-bold text-[16px] shadow-[0_6px_24px_rgba(30,94,94,0.3)] active:scale-[0.98] transition-transform disabled:opacity-40 flex items-center justify-center gap-2">
          <Sparkles size={18} />
          Generate My 6 Health Plans
        </button>
        <p className="text-[11px] text-[#aaa] text-center mt-3">
          Based on your health data · {selectedGoals.length > 0 ? `${selectedGoals.length} goals selected` : "Add goals above"}
          {customText.trim() ? " · Personal goal included" : ""}
        </p>
      </div>
    </div>
  );
}

// ─── Category Detail ──────────────────────────────────────────────────────────

function CategoryDetail({
  categoryId, hasCoach, onBack,
}: {
  categoryId: CategoryId;
  hasCoach: boolean;
  onBack: () => void;
}) {
  const cat = healthCategories.find((c) => c.id === categoryId)!;
  const recs = categoryRecommendations[categoryId];
  const [activeTab, setActiveTab] = useState<"plan" | "habits" | "insights">("plan");
  const [checkedSteps, setCheckedSteps] = useState<Record<number, boolean>>({});
  const [checkedPriorities, setCheckedPriorities] = useState<Record<number, boolean>>({});
  const [selectedDayIdx, setSelectedDayIdx] = useState(0);
  const [openVideoIdx, setOpenVideoIdx] = useState<number | null>(null);
  const weeklyPlan = categoryWeeklyPlans[categoryId];

  const toggleStep = (i: number) => setCheckedSteps((p) => ({ ...p, [i]: !p[i] }));
  const togglePriority = (i: number) => setCheckedPriorities((p) => ({ ...p, [i]: !p[i] }));
  const completedCount = Object.values(checkedSteps).filter(Boolean).length + recs.steps.filter((s) => s.done).length;
  const totalActions = recs.steps.length + recs.priorities.length;
  const completedActions = completedCount + Object.values(checkedPriorities).filter(Boolean).length;

  return (
    <div className="flex flex-col pb-10">
      {/* ── Hero ── */}
      <div className="relative overflow-hidden" style={{ backgroundColor: cat.color }}>
        {/* Ambient glow blobs */}
        <div className="absolute top-0 right-0 w-[220px] h-[220px] rounded-full opacity-25 pointer-events-none"
          style={{ backgroundColor: cat.accentColor, filter: "blur(70px)", transform: "translate(40%, -30%)" }} />
        <div className="absolute bottom-0 left-[-40px] w-[160px] h-[160px] rounded-full opacity-15 pointer-events-none"
          style={{ backgroundColor: cat.accentColor, filter: "blur(50px)" }} />

        <div className="px-5 pt-14 pb-7 relative z-10">
          {/* Nav row */}
          <div className="flex items-center gap-3 mb-6">
            <button onClick={onBack}
              className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: "rgba(255,255,255,0.14)" }}>
              <ArrowLeft size={18} className="text-white" />
            </button>
            <div className="flex-1">
              <p className="text-[11px] font-bold uppercase tracking-[0.14em] mb-0.5" style={{ color: `${cat.accentColor}cc` }}>
                {hasCoach ? "Coach-Reviewed Plan" : "AI Health Plan"}
              </p>
              <h1 className="text-[24px] font-bold text-white leading-tight">{cat.label}</h1>
            </div>
            <span className="text-[40px] leading-none">{cat.icon}</span>
          </div>

          {/* Mascot + message row */}
          <div className="flex items-end gap-4 mb-6">
            {/* Large mascot with glow */}
            <div className="relative flex-shrink-0">
              <div className="absolute inset-0 rounded-full pointer-events-none"
                style={{ backgroundColor: cat.accentColor, filter: "blur(28px)", opacity: 0.35, transform: "scale(1.8)" }} />
              <ImageWithFallback
                src={categoryId === "exercise" ? mascotLiftImg : categoryId === "physical" ? mascotWalkImg : mascotSmileImg}
                alt="Mulhim AI companion"
                className="relative z-10 object-contain drop-shadow-2xl"
                style={{ width: 80, height: 80 }} />
            </div>
            {/* Speech bubble */}
            <div className="flex-1 rounded-[20px] rounded-bl-[6px] px-4 py-3.5"
              style={{ backgroundColor: "rgba(255,255,255,0.13)", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.15)" }}>
              <p className="text-[12px] leading-relaxed text-white/90">{recs.aiNote}</p>
            </div>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-3 gap-2.5">
            {[
              { val: `${cat.progress}%`, label: "Progress" },
              { val: `${cat.streak}d`, label: "Streak 🔥" },
              { val: `${completedActions}/${totalActions}`, label: "Done today" },
            ].map((s) => (
              <div key={s.label} className="rounded-[16px] p-3 text-center"
                style={{ backgroundColor: "rgba(255,255,255,0.10)", border: "1px solid rgba(255,255,255,0.08)" }}>
                <p className="text-[17px] font-bold text-white leading-none mb-0.5">{s.val}</p>
                <p className="text-[9px] font-semibold uppercase tracking-wide" style={{ color: "rgba(255,255,255,0.55)" }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Tabs ── */}
      <div className="mx-5 mt-4 mb-4 bg-white rounded-[20px] p-1.5 shadow-[0_2px_10px_rgba(0,0,0,0.05)] flex gap-1.5">
        {(["plan", "habits", "insights"] as const).map((t) => (
          <button key={t} onClick={() => setActiveTab(t)}
            className={`flex-1 py-2.5 rounded-[14px] text-[12px] font-bold transition-all ${
              activeTab === t ? "bg-[#1e5e5e] text-white shadow-sm" : "text-[#888]"
            }`}>
            {t === "plan" ? "Weekly Plan" : t === "habits" ? "Habits" : "My Insights"}
          </button>
        ))}
      </div>

      {/* ── Tab: Weekly Plan ── */}
      {activeTab === "plan" && (
        <div className="px-5 flex flex-col gap-4 mb-5">
          {/* Mascot intro */}
          <div className="flex items-center gap-3">
            <div className="relative flex-shrink-0">
              <div className="absolute inset-0 rounded-full bg-[#4db8b8]/25 blur-xl scale-[2]" />
              <ImageWithFallback
                src={categoryId === "exercise" ? mascotWalkImg : categoryId === "physical" ? mascotWalkImg : mascotSmileImg}
                alt="Mulhim"
                className="relative z-10 object-contain drop-shadow-lg"
                style={{ width: 52, height: 52 }} />
            </div>
            <div className="flex-1 bg-white rounded-[18px] rounded-bl-[5px] px-4 py-3 shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
              <p className="text-[12px] text-[#555] leading-relaxed">Here is your 7-day plan, built around your goals. Tap any day to see exactly what to do.</p>
            </div>
          </div>

          {/* Day selector — horizontal scroll */}
          <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1 scrollbar-hide">
            {weeklyPlan.map((d, i) => (
              <button key={i} onClick={() => { setSelectedDayIdx(i); setOpenVideoIdx(null); }}
                className={`flex-shrink-0 flex flex-col items-center gap-1 px-3 py-2.5 rounded-[16px] border transition-all ${
                  i === selectedDayIdx
                    ? "bg-[#1e5e5e] border-[#1e5e5e] shadow-md"
                    : "bg-white border-[#ebebeb]"
                }`}>
                <span className="text-[11px] font-bold" style={{ color: i === selectedDayIdx ? "rgba(255,255,255,0.7)" : "#aaa" }}>{d.day}</span>
                <span className="text-[18px] leading-none">{d.icon}</span>
                <span className="text-[9px] font-semibold" style={{ color: i === selectedDayIdx ? "rgba(255,255,255,0.6)" : "#ccc" }}>
                  {d.type === "Rest" ? "Rest" : d.duration}
                </span>
              </button>
            ))}
          </div>

          {/* Selected day card */}
          {(() => {
            const day = weeklyPlan[selectedDayIdx];
            return (
              <div className="bg-white rounded-[24px] overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.07)]">
                {/* Day header */}
                <div className="px-5 pt-5 pb-4 border-b border-[#f3f3f3]">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div>
                      <p className="text-[11px] font-bold text-[#aaa] uppercase tracking-[0.12em] mb-1">{day.day} — {day.duration}</p>
                      <h3 className="text-[18px] font-bold text-[#1a1a1a] leading-tight">{day.title}</h3>
                    </div>
                    <span className="text-[32px] leading-none flex-shrink-0 mt-0.5">{day.icon}</span>
                  </div>
                  <span className="inline-block px-3 py-1 rounded-full text-[10px] font-bold text-white"
                    style={{ backgroundColor: day.typeColor }}>{day.type}</span>
                  <p className="text-[13px] text-[#666] leading-relaxed mt-3">{day.description}</p>
                </div>

                {/* Exercise demonstrations (exercise category only) */}
                {day.exercises && day.exercises.length > 0 && (
                  <div className="px-5 py-4 flex flex-col gap-0">
                    <p className="text-[10px] font-bold text-[#bbb] uppercase tracking-[0.12em] mb-3">Exercises</p>
                    {day.exercises.map((ex, ei) => {
                      const hasDemo = !!exerciseDemoConfigs[ex.name];
                      const isOpen = openVideoIdx === ei;
                      return (
                        <div key={ei} className={`py-3.5 ${ei < day.exercises!.length - 1 ? "border-b border-[#f5f5f5]" : ""}`}>
                          <div className="flex items-start gap-3">
                            <div className="w-8 h-8 rounded-full bg-[#f0f9f9] flex items-center justify-center flex-shrink-0 text-[13px] font-bold text-[#1e5e5e]">
                              {ei + 1}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between gap-2">
                                <p className="text-[14px] font-bold text-[#1a1a1a] leading-snug">{ex.name}</p>
                                <span className="text-[13px] font-bold text-[#1e5e5e] flex-shrink-0">{ex.detail}</span>
                              </div>
                              <p className="text-[11px] text-[#999] mt-0.5 leading-snug">{ex.note}</p>
                              {hasDemo && (
                                <button
                                  onClick={() => setOpenVideoIdx(isOpen ? null : ei)}
                                  className="mt-2 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#f0f9f9] border border-[#d0eeee] active:scale-[0.97] transition-transform">
                                  <span className="text-[13px]">{isOpen ? "✕" : "🤸"}</span>
                                  <span className="text-[11px] font-bold text-[#1e5e5e]">{isOpen ? "Hide demo" : "See Mulhim demo"}</span>
                                </button>
                              )}
                            </div>
                          </div>

                          {/* Mulhim animated demo */}
                          {hasDemo && isOpen && (
                            <ExerciseDemo name={ex.name} detail={ex.detail} />
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Activities (non-exercise categories) */}
                {day.activities && (
                  <div className="px-5 py-4 flex flex-col gap-0">
                    <p className="text-[10px] font-bold text-[#bbb] uppercase tracking-[0.12em] mb-3">Today&apos;s Schedule</p>
                    {day.activities.map((act, ai) => (
                      <div key={ai} className={`flex items-center gap-3 py-3 ${ai < day.activities!.length - 1 ? "border-b border-[#f5f5f5]" : ""}`}>
                        <div className="w-9 h-9 rounded-full bg-[#f0f9f9] flex items-center justify-center flex-shrink-0 text-[18px]">{act.icon}</div>
                        <div className="flex-1 min-w-0">
                          <p className="text-[13px] font-semibold text-[#1a1a1a] leading-snug">{act.action}</p>
                        </div>
                        <span className="text-[11px] font-bold text-[#aaa] flex-shrink-0">{act.time}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Rest day */}
                {day.exercises && day.exercises.length === 0 && (
                  <div className="px-5 py-8 flex flex-col items-center text-center gap-3">
                    <div className="relative">
                      <div className="absolute inset-0 rounded-full bg-[#4db8b8]/20 blur-2xl scale-[2]" />
                      <ImageWithFallback
                        src={categoryId === "exercise" || categoryId === "physical" ? mascotMeditateImg : mascotSmileImg}
                        alt="Mulhim resting"
                        className="relative z-10 object-contain"
                        style={{ width: 80, height: 80 }} />
                    </div>
                    <p className="text-[15px] font-bold text-[#1a1a1a]">Full Rest Day</p>
                    <p className="text-[13px] text-[#888] leading-relaxed max-w-[240px]">
                      Rest is where you actually get stronger. Eat protein, sleep well, and let your body recover.
                    </p>
                  </div>
                )}
              </div>
            );
          })()}
        </div>
      )}

      {/* ── Tab: Habits ── */}
      {activeTab === "habits" && (
        <div className="px-5 mb-5">
          {/* Mascot tip */}
          <div className="flex items-center gap-3 mb-4">
            <div className="relative flex-shrink-0">
              <div className="absolute inset-0 rounded-full bg-[#4db8b8]/20 blur-xl scale-[2]" />
              <ImageWithFallback
                src={categoryId === "exercise" ? mascotLiftImg : categoryId === "physical" ? mascotWalkImg : mascotSmileImg}
                alt="Mulhim"
                className="relative z-10 object-contain drop-shadow-lg"
                style={{ width: 48, height: 48 }} />
            </div>
            <div className="flex-1 bg-white rounded-[18px] rounded-bl-[5px] px-4 py-3 shadow-[0_2px_12px_rgba(0,0,0,0.07)]">
              <p className="text-[12px] text-[#555] leading-relaxed">These daily habits are the foundation of lasting improvement. Small, consistent actions add up fast.</p>
            </div>
          </div>

          <div className="bg-white rounded-[24px] overflow-hidden shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
            {recs.habits.map((h, i) => (
              <div key={i} className={`px-4 py-4 flex items-start gap-3 ${i < recs.habits.length - 1 ? "border-b border-[#f5f5f5]" : ""}`}>
                <div className="w-11 h-11 rounded-full bg-[#f0f9f9] flex items-center justify-center text-[20px] flex-shrink-0">{h.icon}</div>
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] font-bold text-[#1a1a1a]">{h.label}</p>
                  <p className="text-[11px] text-[#1e5e5e] font-semibold mt-0.5">{h.freq}</p>
                  <p className="text-[11px] text-[#888] mt-1 leading-snug">{h.benefit}</p>
                </div>
                <div className="w-6 h-6 rounded-full border-2 border-[#4db8b8] flex items-center justify-center flex-shrink-0 mt-1">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#4db8b8]" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Tab: My Insights (replaces Genetics) ── */}
      {activeTab === "insights" && (
        <div className="px-5 mb-5 flex flex-col gap-4">

          {/* Large mascot + hero message */}
          <div className="bg-gradient-to-br from-[#0a3030] to-[#1e5e5e] rounded-[28px] p-5 flex flex-col items-center text-center overflow-hidden relative">
            <div className="absolute top-[-30px] right-[-30px] w-[120px] h-[120px] rounded-full bg-[#4db8b8]/20 blur-3xl pointer-events-none" />
            <div className="relative mb-3">
              <div className="absolute inset-0 rounded-full bg-[#4db8b8]/25 blur-2xl scale-[2.2] pointer-events-none" />
              <ImageWithFallback
                src={categoryId === "exercise" ? mascotLiftImg : categoryId === "physical" ? mascotWalkImg : mascotSmileImg}
                alt="Mulhim AI companion"
                className="relative z-10 object-contain drop-shadow-2xl"
                style={{ width: 110, height: 110 }} />
            </div>
            <p className="text-[11px] font-bold text-[#4db8b8] uppercase tracking-[0.14em] mb-1">
              {hasCoach ? "Coach + AI Analysis" : "AI Health Analysis"}
            </p>
            <p className="text-[15px] font-bold text-white leading-snug">
              Here&apos;s what your health data means for you today
            </p>
          </div>

          {/* Health Insight card — 3 questions */}
          <div className="bg-white rounded-[24px] overflow-hidden shadow-[0_2px_16px_rgba(0,0,0,0.07)]">
            <div className="px-4 py-3.5 border-b border-[#f3f3f3] flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-[#e8f5f5] flex items-center justify-center flex-shrink-0 text-[18px]">💡</div>
              <p className="text-[14px] font-bold text-[#1a1a1a]">Health Insight</p>
              <span className="ml-auto px-2.5 py-1 rounded-full bg-[#e8f5f5] text-[#1e5e5e] text-[10px] font-bold">
                {hasCoach ? "✓ Coach" : "✓ AI"}
              </span>
            </div>
            {[
              { q: "What does this mean for me?", a: recs.healthInsight.meaning },
              { q: "Why does it matter?", a: recs.healthInsight.matters },
              { q: "What should I do today?", a: recs.healthInsight.today, highlight: true },
            ].map((row, i) => (
              <div key={i} className={`px-4 py-4 ${i < 2 ? "border-b border-[#f5f5f5]" : "bg-[#f5fff8]"}`}>
                <p className="text-[10px] font-bold text-[#bbb] uppercase tracking-[0.1em] mb-1.5">{row.q}</p>
                <p className={`text-[13px] leading-relaxed ${row.highlight ? "font-semibold text-[#1e5e5e]" : "text-[#555]"}`}>{row.a}</p>
              </div>
            ))}
          </div>

          {/* Today's Priorities */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="relative flex-shrink-0">
                <div className="absolute inset-0 rounded-full bg-[#4db8b8]/20 blur-lg scale-[2]" />
                <ImageWithFallback src={mascotCharImg} alt="Mulhim"
                  className="relative z-10 object-contain"
                  style={{ width: 36, height: 36 }} />
              </div>
              <h3 className="text-[15px] font-bold text-[#1a1a1a]">Today&apos;s Priorities</h3>
            </div>
            <div className="flex flex-col gap-2.5">
              {recs.priorities.map((p, i) => {
                const done = checkedPriorities[i];
                return (
                  <button key={i} onClick={() => togglePriority(i)}
                    className={`w-full bg-white rounded-[20px] px-4 py-3.5 shadow-[0_2px_10px_rgba(0,0,0,0.06)] flex items-center gap-3 text-left active:scale-[0.98] transition-all ${done ? "opacity-65" : ""}`}>
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 text-[18px] transition-all ${done ? "bg-[#1e5e5e]" : "bg-[#f0f9f9]"}`}>
                      {done ? <CheckCircle2 size={18} className="text-white" /> : p.icon}
                    </div>
                    <div className="flex-1">
                      <p className={`text-[13px] font-bold ${done ? "line-through text-[#bbb]" : "text-[#1a1a1a]"}`}>{p.title}</p>
                      <p className="text-[11px] text-[#888] mt-0.5">{p.impact}</p>
                    </div>
                    <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-[#f0f0f0] text-[#999] flex-shrink-0">{p.time}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* AI Recommendation card */}
          <div className="bg-white rounded-[24px] p-4 shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
            <div className="flex items-center gap-2.5 mb-3">
              <div className="relative flex-shrink-0">
                <div className="absolute inset-0 rounded-full bg-[#4db8b8]/20 blur-xl scale-[2]" />
                <ImageWithFallback src={mascotCharImg} alt="Mulhim"
                  className="relative z-10 object-contain"
                  style={{ width: 40, height: 40 }} />
              </div>
              <div>
                <p className="text-[10px] font-bold text-[#aaa] uppercase tracking-[0.1em]">
                  {hasCoach ? "Coach Recommendation" : "AI Recommendation"}
                </p>
                <p className="text-[13px] font-bold text-[#1a1a1a]">Your next step</p>
              </div>
            </div>
            <p className="text-[13px] text-[#555] leading-relaxed mb-3">{recs.aiNote}</p>
            <div className="flex gap-2 flex-wrap">
              <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-[11px] font-bold">High Impact</span>
              <span className="px-3 py-1 rounded-full bg-[#e8f5f5] text-[#1e5e5e] text-[11px] font-bold">Starts today</span>
              {hasCoach && (
                <span className="px-3 py-1 rounded-full bg-amber-50 text-amber-700 text-[11px] font-bold">✓ Coach Approved</span>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ── CTA ── */}
      <div className="px-5">
        <button onClick={() => setActiveTab("plan")}
          className="w-full py-4 rounded-[20px] font-bold text-[15px] text-white shadow-[0_6px_24px_rgba(30,94,94,0.3)] active:scale-[0.98] transition-transform flex items-center justify-center gap-2"
          style={{ backgroundColor: cat.color }}>
          <CheckCircle2 size={18} />
          Start Today&apos;s Actions
        </button>
      </div>
    </div>
  );
}

// ─── Mascot Speech Bubble ─────────────────────────────────────────────────────

function MascotBubble({ text, size = "md", dark = false }: { text: string; size?: "sm" | "md"; dark?: boolean }) {
  return (
    <div className="flex items-end gap-2.5">
      <div className="relative flex-shrink-0">
        {!dark && <div className="absolute inset-0 rounded-full bg-[#4db8b8]/20 blur-xl scale-150" />}
        <ImageWithFallback src={mascotSmileImg} alt="Mulhim AI mascot"
          className={`${size === "sm" ? "w-10 h-10" : "w-14 h-14"} object-contain relative z-10 drop-shadow-lg`} />
      </div>
      <div className={`flex-1 rounded-[18px] rounded-bl-[4px] px-4 py-3 ${dark ? "bg-[#1e5e5e]" : "bg-white shadow-[0_2px_12px_rgba(0,0,0,0.08)]"}`}>
        <p className={`${size === "sm" ? "text-[12px]" : "text-[13px]"} leading-relaxed ${dark ? "text-white" : "text-[#444]"}`}>{text}</p>
      </div>
    </div>
  );
}

// ─── Interactive AI Summary ───────────────────────────────────────────────────

function AISummaryCard({ biomarkers, onBiomarker }: { biomarkers: Biomarker[]; onBiomarker: (b: Biomarker) => void }) {
  const [activeIdx, setActiveIdx] = useState(0);
  const priorities = biomarkers.filter((b) => b.status !== "good");
  const good = biomarkers.filter((b) => b.status === "good");
  const active = priorities[activeIdx];

  const rangeW = ((active.value - active.min) / (active.max - active.min)) * 100;
  const optStart = ((active.optimal[0] - active.min) / (active.max - active.min)) * 100;
  const optW = ((active.optimal[1] - active.optimal[0]) / (active.max - active.min)) * 100;

  return (
    <div className="mx-5 mb-4">
      {/* Mascot greeting */}
      <MascotBubble
        text={`Hi! Your health is overall good — ${good.length} markers are optimal. I found ${priorities.length} priorities to work on. Let me walk you through them 👇`}
        dark
      />

      {/* Quick status strip */}
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

      {/* Priority insight card */}
      <div className="bg-white rounded-[24px] shadow-[0_2px_16px_rgba(0,0,0,0.08)] overflow-hidden">
        {/* Card header */}
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

        {/* Range visual */}
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

        {/* Quick fix */}
        <div className="px-4 py-3 flex items-start gap-2.5">
          <div className="w-7 h-7 rounded-full bg-[#e8f5f5] flex items-center justify-center flex-shrink-0 mt-0.5 text-[14px]">🎯</div>
          <div className="flex-1">
            <p className="text-[11px] font-bold text-[#aaa] uppercase tracking-wide mb-0.5">Quick Fix</p>
            <p className="text-[12px] text-[#444] leading-relaxed">{active.howToImprove.split(".")[0]}.</p>
          </div>
        </div>

        {/* Tap to details */}
        <button onClick={() => onBiomarker(active)}
          className="w-full flex items-center justify-center gap-1.5 py-2.5 bg-[#f8f8f8] text-[#1e5e5e] text-[12px] font-bold active:bg-[#e8f5f5] transition-colors">
          <span>See full details</span>
          <ChevronRight size={13} />
        </button>
      </div>

      {/* Dot navigation */}
      <div className="flex gap-2 justify-center mt-3">
        {priorities.map((_, i) => (
          <button key={i} onClick={() => setActiveIdx(i)}
            className={`h-1.5 rounded-full transition-all duration-300 ${i === activeIdx ? "w-6 bg-[#1e5e5e]" : "w-1.5 bg-[#d0d0d0]"}`} />
        ))}
      </div>
    </div>
  );
}

// ─── Screen 1: Health Report ──────────────────────────────────────────────────

function HealthReport({ biomarkers, hasCoach, onSettings }: {
  biomarkers: Biomarker[]; hasCoach: boolean; onSettings: () => void;
}) {
  const score = 74;
  const r = 52;
  const circumference = 2 * Math.PI * r;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="flex flex-col pb-10">
      {/* Header */}
      <div className="px-5 pt-14 pb-5 flex items-start justify-between">
        <div>
          <p className="text-[11px] font-semibold text-[#888] uppercase tracking-[0.12em] mb-1">Bioinformatics</p>
          <h1 className="text-[26px] font-bold text-[#1a1a1a] leading-tight">Health Report</h1>
          <p className="text-[13px] text-[#999] mt-0.5">October 2025 · Lab Analysis</p>
        </div>
        <button onClick={onSettings} className="w-10 h-10 mt-2 rounded-full bg-white shadow-[0_2px_12px_rgba(0,0,0,0.08)] flex items-center justify-center">
          <Settings size={16} className="text-[#888]" />
        </button>
      </div>

      {/* Score */}
      <div className="mx-5 mb-5 bg-white rounded-[28px] p-5 shadow-[0_2px_16px_rgba(0,0,0,0.06)]">
        <div className="flex items-center gap-4">
          <div className="relative flex-shrink-0 w-[120px] h-[120px]">
            <svg className="w-[120px] h-[120px] -rotate-90" viewBox="0 0 120 120">
              <circle cx="60" cy="60" r={r} fill="none" stroke="#f0f0f0" strokeWidth="10" />
              <circle cx="60" cy="60" r={r} fill="none" stroke="#1e5e5e" strokeWidth="10"
                strokeDasharray={circumference} strokeDashoffset={offset} strokeLinecap="round" />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-[28px] font-bold text-[#1e5e5e] leading-none">{score}</span>
              <span className="text-[11px] text-[#aaa] mt-0.5">/ 100</span>
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[11px] font-semibold text-[#aaa] uppercase tracking-[0.12em] mb-1">Overall Health</p>
            <p className="text-[20px] font-bold text-[#1a1a1a]">Good</p>
            <p className="text-[12px] text-[#888] mt-1 leading-relaxed">3 areas need attention. Your core foundations are strong.</p>
            <div className="flex gap-2 mt-3 flex-wrap">
              <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-[11px] font-semibold">✓ 2 Optimal</span>
              <span className="px-2.5 py-1 rounded-full bg-amber-50 text-amber-600 text-[11px] font-semibold">↓ 3 Attention</span>
            </div>
          </div>
        </div>
      </div>

      {/* Lab Results */}
      <div className="px-5 mb-5">
        <h2 className="text-[16px] font-bold text-[#1a1a1a] mb-3">Laboratory Results</h2>
        <div className="bg-white rounded-[28px] overflow-hidden shadow-[0_2px_16px_rgba(0,0,0,0.06)]">
          {biomarkers.map((b, i) => (
            <div key={b.name}
              className={`flex items-center gap-3 px-4 py-3.5 ${i < biomarkers.length - 1 ? "border-b border-[#f3f3f3]" : ""}`}>
              <span className="text-[20px] w-7 flex-shrink-0">{b.icon}</span>
              <div className="flex-1 text-left min-w-0">
                <p className="text-[13px] font-bold text-[#1a1a1a]">{b.name}</p>
                <p className="text-[11px] text-[#aaa]">Optimal: {b.optimal[0]}–{b.optimal[1]} {b.unit}</p>
              </div>
              <div className="text-right flex-shrink-0">
                <p className="text-[13px] font-bold text-[#1a1a1a]">{b.value} <span className="text-[11px] text-[#aaa] font-normal">{b.unit}</span></p>
                <p className={`text-[11px] font-semibold ${b.status === "good" ? "text-emerald-600" : b.status === "warning" ? "text-amber-500" : "text-red-500"}`}>
                  {b.status === "good" ? "✓ Optimal" : b.status === "warning" ? "↓ Low" : "↑ High"}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <button className="mx-5 mb-4 flex items-center justify-center gap-2 py-4 rounded-[18px] bg-[#1e5e5e] text-white font-bold text-[15px] shadow-[0_4px_20px_rgba(30,94,94,0.25)] active:scale-[0.98] transition-transform">
        <Download size={18} />
        Download PDF Report
      </button>
    </div>
  );
}

// ─── Screen 2: Learn Welcome ──────────────────────────────────────────────────

function LearnWelcome({ onBack, onStart }: { onBack: () => void; onStart: () => void }) {
  return (
    <div className="flex flex-col min-h-screen px-5">
      <div className="pt-14 pb-4 flex items-center">
        <button onClick={onBack} className="w-10 h-10 rounded-full bg-white shadow-[0_2px_12px_rgba(0,0,0,0.08)] flex items-center justify-center">
          <ArrowLeft size={18} className="text-[#1a1a1a]" />
        </button>
      </div>
      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="relative flex items-center justify-center mb-8">
          <div className="absolute w-[280px] h-[280px] rounded-full bg-[#4db8b8]/10 blur-3xl" />
          <div className="absolute w-[200px] h-[200px] rounded-full bg-[#4db8b8]/15 blur-2xl" />
          <div className="absolute top-6 right-12 text-[22px] animate-pulse">✨</div>
          <div className="absolute bottom-10 left-10 text-[18px] animate-pulse" style={{ animationDelay: "300ms" }}>⭐</div>
          <div className="absolute top-14 left-8 text-[14px] animate-pulse" style={{ animationDelay: "700ms" }}>✦</div>
          <ImageWithFallback src={mascotCharImg} alt="Mulhim AI mascot welcoming you" className="w-[200px] h-[200px] object-contain relative z-10 drop-shadow-2xl" />
        </div>
        <div className="w-full bg-white rounded-[28px] p-6 shadow-[0_2px_20px_rgba(0,0,0,0.07)] mb-5">
          <div className="flex items-center gap-2 justify-center mb-3">
            <span className="text-[14px]">✨</span>
            <p className="text-[11px] font-semibold text-[#aaa] uppercase tracking-[0.12em]">Your AI Guide</p>
          </div>
          <h1 className="text-[22px] font-bold text-[#1a1a1a] text-center leading-snug mb-2">
            Let&apos;s understand your<br />health together.
          </h1>
          <p className="text-[13px] text-[#888] text-center leading-relaxed">
            I&apos;ll walk you through your lab results step by step — explaining what each biomarker means, why it matters, and exactly how to improve it.
          </p>
        </div>
        <div className="flex gap-2 mb-2 flex-wrap justify-center">
          {["6 Topics", "~8 min", "100% Personalized"].map((tag) => (
            <span key={tag} className="px-3 py-1.5 rounded-full bg-white shadow-[0_2px_8px_rgba(0,0,0,0.06)] text-[11px] font-semibold text-[#666]">{tag}</span>
          ))}
        </div>
      </div>
      <div className="pb-10 pt-4">
        <button onClick={onStart} className="w-full py-4 rounded-[18px] bg-[#1e5e5e] text-white font-bold text-[16px] shadow-[0_4px_20px_rgba(30,94,94,0.3)] active:scale-[0.98] transition-transform">
          Start Learning
        </button>
      </div>
    </div>
  );
}

// ─── Screen 3: Interactive Learning ──────────────────────────────────────────

function InteractiveLearning({ step, topics, onPrev, onNext, onBack }: {
  step: number; topics: typeof learningTopics; onPrev: () => void; onNext: () => void; onBack: () => void;
}) {
  const topic = topics[step];
  const progress = ((step + 1) / topics.length) * 100;
  const isLast = step === topics.length - 1;

  return (
    <div className="flex flex-col min-h-screen">
      <div className="px-5 pt-14 pb-4">
        <div className="flex items-center gap-3 mb-4">
          <button onClick={onBack} className="w-10 h-10 rounded-full bg-white shadow-[0_2px_12px_rgba(0,0,0,0.08)] flex items-center justify-center flex-shrink-0">
            <ArrowLeft size={18} className="text-[#1a1a1a]" />
          </button>
          <div className="flex-1">
            <div className="flex justify-between items-center mb-1.5">
              <span className="text-[11px] font-semibold text-[#aaa]">{step + 1} of {topics.length}</span>
              <span className="text-[11px] font-semibold text-[#1e5e5e]">{Math.round(progress)}%</span>
            </div>
            <div className="h-1.5 bg-[#e4e4e4] rounded-full overflow-hidden">
              <div className="h-full bg-[#1e5e5e] rounded-full transition-all duration-500 ease-out" style={{ width: `${progress}%` }} />
            </div>
          </div>
        </div>
      </div>

      <div className="mx-5 mb-4">
        <div className="rounded-[28px] flex flex-col items-center justify-center pt-8 pb-6 px-4 relative overflow-hidden min-h-[240px]" style={{ backgroundColor: topic.bg }}>
          <div className="absolute bottom-4 right-5 text-[80px] opacity-10 select-none">{topic.emoji}</div>
          <div className="relative mb-4">
            <div className="absolute inset-0 rounded-full bg-[#4db8b8]/20 blur-2xl scale-[2]" />
            <ImageWithFallback src={mascotCharImg} alt="Mulhim AI mascot" className="w-[130px] h-[130px] object-contain relative z-10 drop-shadow-2xl" />
          </div>
          <div className="flex items-center gap-2 z-10">
            <span className="text-[28px]">{topic.emoji}</span>
            <h2 className="text-[18px] font-bold text-[#1a1a1a]">{topic.title}</h2>
          </div>
        </div>
      </div>

      <div className="mx-5 mb-3">
        <MascotBubble text={topic.mascotMsg} dark size="sm" />
      </div>

      <div className="mx-5 mb-5 bg-white rounded-[22px] p-4 shadow-[0_2px_12px_rgba(0,0,0,0.06)] flex items-start gap-3">
        <div className="w-8 h-8 rounded-full bg-[#e8f5f5] flex items-center justify-center flex-shrink-0 text-[14px]">💡</div>
        <p className="text-[13px] text-[#555] leading-relaxed flex-1">{topic.detail}</p>
      </div>

      <div className="flex-1" />
      <div className="px-5 pb-10 flex gap-3">
        <button onClick={onPrev} disabled={step === 0}
          className="flex-1 py-4 rounded-[18px] border-[2px] border-[#1e5e5e] text-[#1e5e5e] font-bold text-[14px] disabled:opacity-25 active:bg-[#e8f5f5] transition-colors">
          Previous
        </button>
        <button onClick={onNext}
          className="flex-1 py-4 rounded-[18px] bg-[#1e5e5e] text-white font-bold text-[14px] shadow-[0_4px_20px_rgba(30,94,94,0.25)] active:scale-[0.98] transition-transform">
          {isLast ? "Take Quiz →" : "Next"}
        </button>
      </div>
    </div>
  );
}

// ─── Screen 4: Biomarker Details ──────────────────────────────────────────────

function BiomarkerDetails({ biomarker: b, hasCoach, onBack, onAIRec }: {
  biomarker: Biomarker; hasCoach: boolean; onBack: () => void; onAIRec: (r: typeof aiRecommendations[0]) => void;
}) {
  const [expanded, setExpanded] = useState<string | null>(null);
  const rangePercent = Math.max(2, Math.min(98, ((b.value - b.min) / (b.max - b.min)) * 100));
  const optimalStart = ((b.optimal[0] - b.min) / (b.max - b.min)) * 100;
  const optimalWidth = ((b.optimal[1] - b.optimal[0]) / (b.max - b.min)) * 100;
  const status = {
    good: { bg: "bg-emerald-50", text: "text-emerald-700", label: "Optimal", dot: "bg-emerald-500" },
    warning: { bg: "bg-amber-50", text: "text-amber-600", label: "Needs Attention", dot: "bg-amber-400" },
    high: { bg: "bg-red-50", text: "text-red-600", label: "High", dot: "bg-red-500" },
  }[b.status];
  const linked = aiRecommendations.find((r) => r.biomarker.startsWith(b.name));

  const sections = [
    { id: "what", icon: "📖", label: "What This Means", content: b.explanation },
    { id: "why", icon: "❤️", label: "Why It Matters", content: b.whyMatters },
    { id: "how", icon: "🎯", label: "How to Improve", content: b.howToImprove },
  ];

  return (
    <div className="flex flex-col pb-10">
      <div className="px-5 pt-14 pb-4 flex items-center gap-3">
        <button onClick={onBack} className="w-10 h-10 rounded-full bg-white shadow-[0_2px_12px_rgba(0,0,0,0.08)] flex items-center justify-center flex-shrink-0">
          <ArrowLeft size={18} className="text-[#1a1a1a]" />
        </button>
        <div className="flex-1 min-w-0">
          <p className="text-[11px] font-semibold text-[#aaa] uppercase tracking-[0.12em]">Biomarker</p>
          <h1 className="text-[22px] font-bold text-[#1a1a1a]">{b.name}</h1>
        </div>
        <span className="text-[34px] flex-shrink-0">{b.icon}</span>
      </div>

      {/* Value + Range */}
      <div className="mx-5 mb-4 bg-white rounded-[28px] p-5 shadow-[0_2px_16px_rgba(0,0,0,0.06)]">
        <div className="flex items-end justify-between mb-5">
          <div>
            <p className="text-[11px] font-semibold text-[#aaa] uppercase tracking-[0.1em] mb-1">Current Value</p>
            <div className="flex items-baseline gap-1.5">
              <span className="text-[40px] font-bold text-[#1e5e5e] leading-none">{b.value}</span>
              <span className="text-[14px] text-[#aaa] font-medium">{b.unit}</span>
            </div>
          </div>
          <div className="text-right">
            <p className="text-[11px] font-semibold text-[#aaa] uppercase tracking-[0.1em] mb-1">Healthy Range</p>
            <p className="text-[14px] font-bold text-[#1a1a1a]">{b.optimal[0]}–{b.optimal[1]}</p>
            <p className="text-[11px] text-[#aaa]">{b.unit}</p>
          </div>
        </div>
        <div className="relative h-3 bg-[#f0f0f0] rounded-full overflow-visible mb-2">
          <div className="absolute top-0 h-full bg-emerald-100 rounded-full" style={{ left: `${optimalStart}%`, width: `${optimalWidth}%` }} />
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-[#1e5e5e] border-[3px] border-white shadow-[0_2px_8px_rgba(30,94,94,0.4)] z-10" style={{ left: `${rangePercent}%` }} />
        </div>
        <div className="flex justify-between items-center mt-2 mb-3">
          <span className="text-[10px] text-[#bbb]">{b.min} {b.unit}</span>
          <span className="text-[10px] text-emerald-600 font-semibold">✓ {b.optimal[0]}–{b.optimal[1]} optimal</span>
          <span className="text-[10px] text-[#bbb]">{b.max} {b.unit}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${status.dot}`} />
          <span className={`px-3 py-1 rounded-full text-[12px] font-bold ${status.bg} ${status.text}`}>{status.label}</span>
        </div>
      </div>

      {/* Expandable sections */}
      <div className="mx-5 mb-3 bg-white rounded-[24px] overflow-hidden shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
        {sections.map((s, i) => (
          <div key={s.id} className={i < sections.length - 1 ? "border-b border-[#f3f3f3]" : ""}>
            <button onClick={() => setExpanded(expanded === s.id ? null : s.id)}
              className="w-full flex items-center gap-3 px-4 py-3.5 active:bg-[#f8f8f8] transition-colors">
              <div className="w-8 h-8 rounded-full bg-[#f5f5f5] flex items-center justify-center text-[16px] flex-shrink-0">{s.icon}</div>
              <p className="text-[13px] font-bold text-[#1a1a1a] flex-1 text-left">{s.label}</p>
              <ChevronRight size={14} className={`text-[#ccc] transition-transform duration-200 ${expanded === s.id ? "rotate-90" : ""}`} />
            </button>
            {expanded === s.id && (
              <div className="px-4 pb-4">
                <p className="text-[13px] text-[#555] leading-relaxed pl-[44px]">{s.content}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* AI Insight */}
      <div className="mx-5 mb-3">
        <MascotBubble text={b.aiExplanation} dark />
      </div>

      {/* AI / Coach Recommendation */}
      <div className="mx-5 mb-3 bg-white rounded-[24px] p-4 shadow-[0_2px_12px_rgba(0,0,0,0.06)] border border-[#e8f5f5]">
        <div className="flex items-center gap-2.5 mb-2">
          <div className={`w-9 h-9 rounded-full flex items-center justify-center text-[18px] flex-shrink-0 ${hasCoach ? "bg-[#1e5e5e]" : "bg-[#e8f5f5]"}`}>
            {hasCoach ? "👨‍⚕️" : "🤖"}
          </div>
          <p className="text-[14px] font-bold text-[#1a1a1a] flex-1">{T.recLabel(hasCoach)}</p>
          <span className="px-2.5 py-1 rounded-full bg-[#e8f5f5] text-[#1e5e5e] text-[10px] font-bold flex-shrink-0">{T.recBadge(hasCoach)}</span>
        </div>
        <p className="text-[13px] text-[#555] leading-relaxed pl-[46px] -mt-1">{b.aiRecommendation}</p>
      </div>

      {linked && (
        <button onClick={() => onAIRec(linked)}
          className="mx-5 py-3.5 rounded-[18px] bg-[#1e5e5e] text-white font-bold text-[14px] shadow-[0_4px_20px_rgba(30,94,94,0.3)] active:scale-[0.98] transition-transform">
          View AI Recommendation →
        </button>
      )}
    </div>
  );
}

// ─── Screen 5: AI Recommendation ─────────────────────────────────────────────

function AIRecommendation({ rec, allRecs, hasCoach, onBack, onSelectRec }: {
  rec: typeof aiRecommendations[0]; allRecs: typeof aiRecommendations; hasCoach: boolean;
  onBack: () => void; onSelectRec: (r: typeof aiRecommendations[0]) => void;
}) {
  return (
    <div className="flex flex-col pb-10">
      <div className="px-5 pt-14 pb-4 flex items-center gap-3">
        <button onClick={onBack} className="w-10 h-10 rounded-full bg-white shadow-[0_2px_12px_rgba(0,0,0,0.08)] flex items-center justify-center flex-shrink-0">
          <ArrowLeft size={18} className="text-[#1a1a1a]" />
        </button>
        <div className="flex-1 min-w-0">
          <p className="text-[11px] font-semibold text-[#aaa] uppercase tracking-[0.12em]">AI Recommendation</p>
          <h1 className="text-[18px] font-bold text-[#1a1a1a] leading-tight">{rec.action}</h1>
        </div>
        <span className="text-[30px] flex-shrink-0">{rec.icon}</span>
      </div>

      {/* Hero card */}
      <div className="mx-5 mb-4 bg-[#1e5e5e] rounded-[28px] p-5 shadow-[0_4px_24px_rgba(30,94,94,0.3)]">
        <div className="flex items-start gap-3 mb-4">
          <div className="relative w-14 h-14 flex-shrink-0">
            <div className="absolute inset-0 rounded-full bg-white/15 blur-md" />
            <ImageWithFallback src={mascotCharImg} alt="Mulhim AI" className="w-14 h-14 object-contain relative z-10 drop-shadow-xl" />
          </div>
          <div className="flex-1">
            <p className="text-[11px] text-white/50 font-semibold uppercase tracking-[0.12em] mb-1">Why I Suggested This</p>
            <div className="flex gap-2 flex-wrap">
              <span className="px-2 py-0.5 rounded-full bg-white/15 text-white text-[10px] font-bold">{rec.effort} Effort</span>
              <span className="px-2 py-0.5 rounded-full bg-white/15 text-white text-[10px] font-bold">{rec.impact} Impact</span>
              {hasCoach
                ? <span className="px-2 py-0.5 rounded-full bg-emerald-400/30 text-emerald-200 text-[10px] font-bold">✓ Coach Approved</span>
                : <span className="px-2 py-0.5 rounded-full bg-[#4db8b8]/30 text-[#a8e8e8] text-[10px] font-bold">✓ AI Verified</span>}
            </div>
          </div>
        </div>
        <p className="text-[13px] text-white leading-relaxed">{rec.whyAI}</p>
      </div>

      {/* Supporting Biomarker */}
      <div className="mx-5 mb-3 bg-white rounded-[24px] p-4 shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
        <div className="flex items-center gap-2.5 mb-3">
          <div className="w-8 h-8 rounded-full bg-[#f0f9f9] flex items-center justify-center text-[16px]">{rec.biomarkerIcon}</div>
          <p className="text-[14px] font-bold text-[#1a1a1a]">Supporting Biomarker</p>
        </div>
        <div className="flex items-center justify-between pl-[42px]">
          <div>
            <p className="text-[13px] font-semibold text-[#1a1a1a]">{rec.biomarker}</p>
            <p className="text-[11px] text-amber-500 font-semibold mt-0.5">↓ Below optimal range</p>
          </div>
          <div className="text-right">
            <p className="text-[11px] text-[#aaa]">Expected in</p>
            <p className="text-[13px] font-bold text-[#1e5e5e]">{rec.timeline}</p>
          </div>
        </div>
      </div>

      {[
        { icon: "🎯", label: "Expected Health Benefit", content: rec.benefit },
        { icon: "🔬", label: "The Science", content: rec.science },
      ].map((s) => (
        <div key={s.label} className="mx-5 mb-3 bg-white rounded-[24px] p-4 shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
          <div className="flex items-center gap-2.5 mb-2">
            <div className="w-8 h-8 rounded-full bg-[#f5f5f5] flex items-center justify-center text-[16px]">{s.icon}</div>
            <p className="text-[14px] font-bold text-[#1a1a1a]">{s.label}</p>
          </div>
          <p className="text-[13px] text-[#555] leading-relaxed pl-[42px]">{s.content}</p>
        </div>
      ))}

      {allRecs.filter((r) => r.id !== rec.id).length > 0 && (
        <div className="px-5 mb-4">
          <p className="text-[14px] font-bold text-[#1a1a1a] mb-3">Other Recommendations</p>
          <div className="flex flex-col gap-2">
            {allRecs.filter((r) => r.id !== rec.id).map((r) => (
              <button key={r.id} onClick={() => onSelectRec(r)}
                className="bg-white rounded-[20px] p-3.5 shadow-[0_2px_10px_rgba(0,0,0,0.05)] flex items-center gap-3 active:scale-[0.98] transition-transform">
                <span className="text-[20px]">{r.icon}</span>
                <div className="flex-1 text-left min-w-0">
                  <p className="text-[13px] font-bold text-[#1a1a1a] truncate">{r.action}</p>
                  <p className="text-[11px] text-[#999]">{r.biomarkerIcon} {r.biomarker}</p>
                </div>
                <ChevronRight size={14} className="text-[#d0d0d0] flex-shrink-0" />
              </button>
            ))}
          </div>
        </div>
      )}
      <button className="mx-5 py-4 rounded-[18px] bg-[#1e5e5e] text-white font-bold text-[16px] shadow-[0_4px_20px_rgba(30,94,94,0.3)] active:scale-[0.98] transition-transform">
        Add to My Goals ✓
      </button>
    </div>
  );
}

// ─── Screen 6: Mini Quiz ──────────────────────────────────────────────────────

function MiniQuiz({ questions, onBack, onFinish }: { questions: typeof quizQuestions; onBack: () => void; onFinish: (score: number) => void }) {
  const [qIndex, setQIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const q = questions[qIndex];
  const isCorrect = selected === q.correct;
  const isLast = qIndex === questions.length - 1;
  const progress = ((qIndex + 1) / questions.length) * 100;

  const handleSelect = (i: number) => {
    if (answered) return;
    setSelected(i);
    setAnswered(true);
    if (i === q.correct) setScore((s) => s + 1);
  };
  const handleNext = () => {
    if (isLast) onFinish(score);
    else { setQIndex((q) => q + 1); setSelected(null); setAnswered(false); }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="px-5 pt-14 pb-4">
        <div className="flex items-center gap-3 mb-4">
          <button onClick={onBack} className="w-10 h-10 rounded-full bg-white shadow-[0_2px_12px_rgba(0,0,0,0.08)] flex items-center justify-center flex-shrink-0">
            <ArrowLeft size={18} className="text-[#1a1a1a]" />
          </button>
          <div className="flex-1">
            <div className="flex justify-between items-center mb-1.5">
              <span className="text-[11px] font-semibold text-[#aaa]">Question {qIndex + 1} of {questions.length}</span>
              <span className="text-[11px] font-semibold text-[#1e5e5e]">Score: {score}</span>
            </div>
            <div className="h-1.5 bg-[#e4e4e4] rounded-full overflow-hidden">
              <div className="h-full bg-[#1e5e5e] rounded-full transition-all duration-500 ease-out" style={{ width: `${progress}%` }} />
            </div>
          </div>
        </div>
      </div>

      <div className="mx-5 mb-5">
        <div className={`rounded-[28px] flex flex-col items-center justify-center py-8 px-4 relative overflow-hidden transition-colors duration-300 ${answered ? (isCorrect ? "bg-emerald-50" : "bg-red-50") : "bg-[#e8f5f5]"}`}>
          <div className="absolute bottom-4 right-5 text-[70px] opacity-10 select-none">{q.emoji}</div>
          <div className="relative mb-3">
            <div className={`absolute inset-0 rounded-full blur-2xl scale-[2] transition-colors duration-300 ${answered && isCorrect ? "bg-emerald-300/30" : "bg-[#4db8b8]/20"}`} />
            <ImageWithFallback src={mascotCharImg} alt="Mulhim AI mascot" className="w-[110px] h-[110px] object-contain relative z-10 drop-shadow-xl" />
          </div>
          {!answered && <p className="text-[13px] font-semibold text-[#1e5e5e] z-10">Choose the best answer!</p>}
          {answered && isCorrect && <div className="flex items-center gap-2 z-10"><span className="text-[20px]">🎉</span><p className="text-[14px] font-bold text-emerald-700">That&apos;s correct!</p></div>}
          {answered && !isCorrect && <div className="flex items-center gap-2 z-10"><span className="text-[20px]">💪</span><p className="text-[14px] font-bold text-red-600">Not quite — let&apos;s learn!</p></div>}
        </div>
      </div>

      <div className="mx-5 mb-4">
        <h2 className="text-[17px] font-bold text-[#1a1a1a] leading-snug mb-4">{q.question}</h2>
        <div className="flex flex-col gap-2.5">
          {q.options.map((opt, i) => {
            let style = "bg-white border-2 border-[#f0f0f0] text-[#1a1a1a]";
            if (answered) {
              if (i === q.correct) style = "bg-emerald-50 border-2 border-emerald-400 text-emerald-800";
              else if (i === selected && !isCorrect) style = "bg-red-50 border-2 border-red-400 text-red-700";
              else style = "bg-white border-2 border-[#f0f0f0] text-[#aaa]";
            } else if (selected === i) style = "bg-[#e8f5f5] border-2 border-[#1e5e5e] text-[#1e5e5e]";
            return (
              <button key={i} onClick={() => handleSelect(i)}
                className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-[18px] shadow-[0_2px_8px_rgba(0,0,0,0.04)] text-left transition-all ${style}`}>
                <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-[12px] font-bold ${answered && i === q.correct ? "bg-emerald-500 text-white" : answered && i === selected && !isCorrect ? "bg-red-400 text-white" : "bg-[#f0f0f0] text-[#999]"}`}>
                  {answered && i === q.correct ? <CheckCircle2 size={14} /> : answered && i === selected && !isCorrect ? <XCircle size={14} /> : String.fromCharCode(65 + i)}
                </div>
                <span className="text-[13px] font-semibold">{opt}</span>
              </button>
            );
          })}
        </div>
      </div>

      {answered && (
        <div className="mx-5 mb-4 bg-white rounded-[22px] p-4 shadow-[0_2px_10px_rgba(0,0,0,0.06)] flex items-start gap-3">
          <div className="w-8 h-8 rounded-full bg-[#e8f5f5] flex items-center justify-center flex-shrink-0 text-[14px]">💡</div>
          <p className="text-[13px] text-[#555] leading-relaxed flex-1">{q.explanation}</p>
        </div>
      )}

      <div className="flex-1" />
      {answered && (
        <div className="px-5 pb-10">
          <button onClick={handleNext} className="w-full py-4 rounded-[18px] bg-[#1e5e5e] text-white font-bold text-[16px] shadow-[0_4px_20px_rgba(30,94,94,0.3)] active:scale-[0.98] transition-transform">
            {isLast ? "See My Results →" : "Next Question →"}
          </button>
        </div>
      )}
    </div>
  );
}

// ─── Screen 7: Congratulations ────────────────────────────────────────────────

function ConfettiLayer() {
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

function Congratulations({ score, total, onReturn, onAchievement }: { score: number; total: number; onReturn: () => void; onAchievement: () => void }) {
  const pct = Math.round((score / total) * 100);
  const perfect = score === total;
  return (
    <div className="flex flex-col min-h-screen px-5 overflow-hidden relative">
      <ConfettiLayer />
      <div className="flex-1 flex flex-col items-center justify-center pt-16">
        <div className="relative flex items-center justify-center mb-6">
          <div className="absolute w-[260px] h-[260px] rounded-full bg-[#4db8b8]/15 blur-3xl" />
          <div className="absolute -top-2 -right-4 text-[28px] animate-bounce">🎉</div>
          <div className="absolute -bottom-2 -left-6 text-[24px] animate-bounce" style={{ animationDelay: "200ms" }}>⭐</div>
          <div className="absolute top-4 -left-8 text-[20px] animate-bounce" style={{ animationDelay: "400ms" }}>✨</div>
          <ImageWithFallback src={mascotCharImg} alt="Happy Mulhim mascot celebrating" className="w-[180px] h-[180px] object-contain relative z-10 drop-shadow-2xl" />
        </div>
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#1e5e5e] to-[#4db8b8] flex items-center justify-center shadow-[0_8px_32px_rgba(30,94,94,0.35)] mb-5">
          <Trophy size={36} className="text-white" />
        </div>
        <h1 className="text-[30px] font-bold text-[#1a1a1a] text-center leading-tight mb-2">Congratulations!</h1>
        <p className="text-[15px] text-[#555] text-center leading-relaxed mb-6 max-w-[280px]">
          You now understand your health report.<br />
          {perfect ? "You scored perfectly — amazing!" : `You answered ${score} of ${total} correctly.`}
        </p>
        <div className="w-full bg-white rounded-[28px] p-5 shadow-[0_2px_16px_rgba(0,0,0,0.07)] mb-5">
          <div className="flex items-center justify-between mb-3">
            <div className="text-center flex-1"><p className="text-[11px] font-semibold text-[#aaa] uppercase tracking-[0.1em]">Quiz Score</p><p className="text-[28px] font-bold text-[#1e5e5e]">{pct}%</p></div>
            <div className="w-px h-12 bg-[#f0f0f0]" />
            <div className="text-center flex-1"><p className="text-[11px] font-semibold text-[#aaa] uppercase tracking-[0.1em]">Correct</p><p className="text-[28px] font-bold text-[#1a1a1a]">{score}/{total}</p></div>
            <div className="w-px h-12 bg-[#f0f0f0]" />
            <div className="text-center flex-1"><p className="text-[11px] font-semibold text-[#aaa] uppercase tracking-[0.1em]">Badge</p><p className="text-[28px]">🏆</p></div>
          </div>
          <div className="bg-[#e8f5f5] rounded-[16px] p-3 text-center">
            <p className="text-[12px] font-semibold text-[#1e5e5e]">
              {perfect ? "🎯 Perfect score! You're a Health Scholar." : pct >= 75 ? "💪 Great work! Keep exploring your health." : "📚 Good start! Review the topics to improve."}
            </p>
          </div>
        </div>
        <button onClick={onAchievement} className="w-full bg-white rounded-[22px] p-4 shadow-[0_2px_12px_rgba(0,0,0,0.06)] flex items-center gap-3 mb-3 active:scale-[0.98] transition-transform">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-400 to-amber-500 flex items-center justify-center flex-shrink-0"><span className="text-[22px]">🧠</span></div>
          <div className="flex-1 text-left"><p className="text-[13px] font-bold text-[#1a1a1a]">Achievement Unlocked!</p><p className="text-[11px] text-[#888]">Health Scholar · View your badge →</p></div>
          <ChevronRight size={16} className="text-[#ccc]" />
        </button>
      </div>
      <div className="pb-10 pt-2">
        <button onClick={onReturn} className="w-full py-4 rounded-[18px] bg-[#1e5e5e] text-white font-bold text-[16px] shadow-[0_4px_20px_rgba(30,94,94,0.3)] active:scale-[0.98] transition-transform">
          Return to Health Report
        </button>
      </div>
    </div>
  );
}

// ─── Screen 8: Progress ───────────────────────────────────────────────────────

function ProgressScreen({ onBack, onAchievement, onGoalBuilder }: { onBack: () => void; onAchievement: () => void; onGoalBuilder: () => void }) {
  const [activeTab, setActiveTab] = useState<"trends" | "timeline" | "compare">("trends");
  const trendData = [
    { name: "Vitamin D", current: 22, prev: 18, unit: "ng/mL", icon: "☀️", delta: "+4", up: true },
    { name: "Hemoglobin", current: 14.2, prev: 13.9, unit: "g/dL", icon: "🩸", delta: "+0.3", up: true },
    { name: "Glucose", current: 102, prev: 108, unit: "mg/dL", icon: "📊", delta: "-6", up: false, goodDown: true },
    { name: "Ferritin", current: 15, prev: 12, unit: "ng/mL", icon: "⚡", delta: "+3", up: true },
    { name: "TSH", current: 2.1, prev: 2.3, unit: "mIU/L", icon: "🦋", delta: "-0.2", up: false },
  ];
  const timeline = [
    { date: "Oct 2025", event: "Lab Report Completed", icon: "🔬", type: "lab" },
    { date: "Oct 2025", event: "Health Scholar Badge Earned", icon: "🧠", type: "achievement" },
    { date: "Sep 2025", event: "7-Day Walk Streak", icon: "🚶", type: "goal" },
    { date: "Sep 2025", event: "Previous Lab Report", icon: "📋", type: "lab" },
    { date: "Aug 2025", event: "Started Iron Protocol", icon: "⚡", type: "goal" },
  ];
  const weeklyGoals = [
    { name: "Morning sunlight walks", done: 5, total: 7, icon: "🌅" },
    { name: "Post-meal walks", done: 9, total: 14, icon: "🚶" },
    { name: "Iron-rich meals", done: 11, total: 14, icon: "🥩" },
    { name: "Sleep 7+ hours", done: 4, total: 7, icon: "🌙" },
  ];
  return (
    <div className="flex flex-col pb-10">
      <div className="px-5 pt-14 pb-4 flex items-center gap-3">
        <button onClick={onBack} className="w-10 h-10 rounded-full bg-white shadow-[0_2px_12px_rgba(0,0,0,0.08)] flex items-center justify-center flex-shrink-0">
          <ArrowLeft size={18} className="text-[#1a1a1a]" />
        </button>
        <div className="flex-1"><p className="text-[11px] font-semibold text-[#aaa] uppercase tracking-[0.12em]">Your Journey</p><h1 className="text-[22px] font-bold text-[#1a1a1a]">Progress</h1></div>
        <button onClick={onAchievement} className="w-10 h-10 rounded-full bg-white shadow-[0_2px_12px_rgba(0,0,0,0.08)] flex items-center justify-center">
          <Trophy size={18} className="text-[#1e5e5e]" />
        </button>
      </div>

      {/* Mascot encouragement */}
      <div className="px-5 mb-4">
        <MascotBubble text="You're making great progress! Your Glucose dropped 6 points and Ferritin is trending up. Keep going 💪" size="sm" />
      </div>

      <div className="mx-5 mb-4 bg-white rounded-[28px] p-5 shadow-[0_2px_16px_rgba(0,0,0,0.06)]">
        <div className="flex items-center justify-between mb-4"><p className="text-[15px] font-bold text-[#1a1a1a]">This Week</p><span className="text-[11px] font-semibold text-[#1e5e5e]">Oct 14–20</span></div>
        <div className="flex flex-col gap-3">
          {weeklyGoals.map((g) => {
            const pct = (g.done / g.total) * 100;
            return (
              <div key={g.name}>
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2"><span className="text-[14px]">{g.icon}</span><p className="text-[12px] font-semibold text-[#1a1a1a]">{g.name}</p></div>
                  <p className="text-[12px] font-bold text-[#1e5e5e]">{g.done}/{g.total}</p>
                </div>
                <div className="h-2 bg-[#f0f0f0] rounded-full overflow-hidden">
                  <div className={`h-full rounded-full transition-all duration-700 ${pct >= 70 ? "bg-[#1e5e5e]" : pct >= 40 ? "bg-amber-400" : "bg-[#4db8b8]/50"}`} style={{ width: `${pct}%` }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mx-5 mb-4">
        <div className="flex gap-1.5 mb-4 bg-white rounded-[18px] p-1.5 shadow-[0_2px_10px_rgba(0,0,0,0.05)]">
          {(["trends", "timeline", "compare"] as const).map((t) => (
            <button key={t} onClick={() => setActiveTab(t)}
              className={`flex-1 py-2 rounded-[14px] text-[12px] font-bold capitalize transition-all ${activeTab === t ? "bg-[#1e5e5e] text-white shadow-sm" : "text-[#888]"}`}>
              {t === "trends" ? "Trends" : t === "timeline" ? "Timeline" : "Compare"}
            </button>
          ))}
        </div>
        {activeTab === "trends" && (
          <div className="bg-white rounded-[24px] overflow-hidden shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
            {trendData.map((d, i) => (
              <div key={d.name} className={`flex items-center gap-3 px-4 py-3.5 ${i < trendData.length - 1 ? "border-b border-[#f3f3f3]" : ""}`}>
                <span className="text-[18px] w-7">{d.icon}</span>
                <div className="flex-1 min-w-0"><p className="text-[13px] font-bold text-[#1a1a1a]">{d.name}</p><p className="text-[11px] text-[#aaa]">{d.prev} → <span className="font-semibold text-[#1a1a1a]">{d.current}</span> {d.unit}</p></div>
                <div className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold ${(d.up || d.goodDown) ? "bg-emerald-50 text-emerald-700" : "bg-[#f5f5f5] text-[#666]"}`}>
                  {d.up ? "↑" : "↓"} {d.delta}
                </div>
              </div>
            ))}
          </div>
        )}
        {activeTab === "timeline" && (
          <div className="flex flex-col gap-0">
            {timeline.map((item, i) => (
              <div key={i} className="flex gap-4 items-start">
                <div className="flex flex-col items-center">
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center text-[16px] flex-shrink-0 ${item.type === "lab" ? "bg-[#e8f5f5]" : item.type === "achievement" ? "bg-amber-50" : "bg-[#f5f5f5]"}`}>{item.icon}</div>
                  {i < timeline.length - 1 && <div className="w-0.5 h-6 bg-[#e8e8e8] my-1" />}
                </div>
                <div className="flex-1 pb-4"><p className="text-[13px] font-bold text-[#1a1a1a]">{item.event}</p><p className="text-[11px] text-[#aaa]">{item.date}</p></div>
              </div>
            ))}
          </div>
        )}
        {activeTab === "compare" && (
          <div className="bg-white rounded-[24px] p-4 shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex-1 text-center py-2 rounded-[14px] bg-[#1e5e5e]"><p className="text-[10px] font-bold text-white/70 uppercase tracking-wide">Current</p><p className="text-[12px] font-bold text-white">Oct 2025</p></div>
              <span className="text-[#aaa] font-bold text-[18px]">vs</span>
              <div className="flex-1 text-center py-2 rounded-[14px] bg-[#f5f5f5]"><p className="text-[10px] font-bold text-[#aaa] uppercase tracking-wide">Previous</p><p className="text-[12px] font-bold text-[#666]">Sep 2025</p></div>
            </div>
            {trendData.map((d, i) => (
              <div key={d.name} className={`flex items-center gap-3 py-3 ${i < trendData.length - 1 ? "border-b border-[#f5f5f5]" : ""}`}>
                <span className="text-[16px]">{d.icon}</span>
                <p className="text-[12px] font-semibold text-[#1a1a1a] flex-1">{d.name}</p>
                <p className="text-[12px] font-bold text-[#1e5e5e] w-16 text-right">{d.current} <span className="text-[10px] text-[#aaa] font-normal">{d.unit}</span></p>
                <p className="text-[12px] text-[#aaa] w-16 text-right">{d.prev} <span className="text-[10px] font-normal">{d.unit}</span></p>
              </div>
            ))}
          </div>
        )}
      </div>

      <button onClick={onAchievement} className="mx-5 bg-white rounded-[22px] p-4 shadow-[0_2px_12px_rgba(0,0,0,0.06)] flex items-center gap-3 active:scale-[0.98] transition-transform">
        <div className="w-11 h-11 rounded-full bg-gradient-to-br from-amber-400 to-amber-500 flex items-center justify-center flex-shrink-0"><Star size={20} className="text-white" /></div>
        <div className="flex-1 text-left"><p className="text-[14px] font-bold text-[#1a1a1a]">Achievements</p><p className="text-[11px] text-[#888]">2 earned · 4 in progress · View all →</p></div>
        <ChevronRight size={16} className="text-[#ccc]" />
      </button>
    </div>
  );
}

// ─── Screen 9: Achievement ────────────────────────────────────────────────────

function AchievementScreen({ onBack, onSetGoal }: { onBack: () => void; onSetGoal: () => void }) {
  const [activeTab, setActiveTab] = useState<"progress" | "week" | "timeline" | "insights">("progress");
  const tabs: { id: "progress" | "week" | "timeline" | "insights"; label: string }[] = [
    { id: "progress", label: "Progress" },
    { id: "week", label: "This Week" },
    { id: "timeline", label: "Timeline" },
    { id: "insights", label: "AI Insights" },
  ];

  const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const completedDays = [true, true, true, false, true, true, false];
  const weekStats = { streak: 7, done: 5, missed: 2, rate: 71 };

  const timelineEvents = [
    { date: "Aug 10", type: "Achievement", icon: "🏆", label: "7-Day Streak", desc: "Logged habits 7 days in a row", color: "#f59e0b" },
    { date: "Aug 8", type: "Milestone", icon: "🎯", label: "Iron Levels Normal", desc: "Ferritin improved from 8 → 23 ng/mL", color: "#4db8b8" },
    { date: "Aug 5", type: "Lab", icon: "🔬", label: "Blood Panel Uploaded", desc: "12 markers tracked, 4 flagged", color: "#a78bfa" },
    { date: "Aug 1", type: "Goal", icon: "🌟", label: "Started Energy Goal", desc: "AI plan generated across 6 categories", color: "#86efac" },
    { date: "Jul 25", type: "Achievement", icon: "🥇", label: "First Step", desc: "Completed your first health check-in", color: "#f59e0b" },
  ];

  const biomarkers = [
    { name: "Ferritin", unit: "ng/mL", before: 8, after: 23, good: true },
    { name: "Vitamin D", unit: "ng/mL", before: 14, after: 31, good: true },
    { name: "HbA1c", unit: "%", before: 6.2, after: 5.8, good: true },
    { name: "TSH", unit: "mIU/L", before: 3.1, after: 2.4, good: true },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#f7f9f9] pb-10">
      {/* Header */}
      <div className="px-5 pt-12 pb-4 flex items-center gap-3 bg-white border-b border-[#f0f0f0]">
        <button onClick={onBack} className="w-10 h-10 rounded-full bg-[#f5f5f5] flex items-center justify-center flex-shrink-0">
          <ArrowLeft size={18} className="text-[#1a1a1a]" />
        </button>
        <div className="flex-1">
          <p className="text-[11px] text-[#aaa] font-semibold uppercase tracking-wide">My Progress</p>
          <h1 className="text-[20px] font-bold text-[#1a1a1a] leading-tight">Achievements</h1>
        </div>
        <button onClick={onSetGoal} className="px-3.5 py-2 rounded-full bg-[#1e5e5e] text-white text-[12px] font-bold">+ Goal</button>
      </div>

      {/* Tabs */}
      <div className="bg-white px-4 pb-0 border-b border-[#f0f0f0] sticky top-0 z-10">
        <div className="flex gap-0">
          {tabs.map((t) => (
            <button key={t.id} onClick={() => setActiveTab(t.id)}
              className={`flex-1 py-3.5 text-[12px] font-bold border-b-2 transition-colors ${activeTab === t.id ? "text-[#1e5e5e] border-[#1e5e5e]" : "text-[#aaa] border-transparent"}`}>
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab: Progress */}
      {activeTab === "progress" && (
        <div className="flex flex-col gap-4 px-5 pt-5">
          {/* Health Ring */}
          <div className="bg-white rounded-[24px] p-5 shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
            <p className="text-[14px] font-bold text-[#1a1a1a] mb-4">Overall Health Score</p>
            <div className="flex items-center gap-5">
              <div className="relative flex-shrink-0">
                <svg width="120" height="120" viewBox="0 0 120 120">
                  <circle cx="60" cy="60" r="50" fill="none" stroke="#f0f0f0" strokeWidth="12"/>
                  <circle cx="60" cy="60" r="50" fill="none" stroke="#4db8b8" strokeWidth="12"
                    strokeDasharray={`${2 * Math.PI * 50 * 0.74} ${2 * Math.PI * 50}`}
                    strokeLinecap="round" transform="rotate(-90 60 60)" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-[26px] font-bold text-[#1a1a1a]">74</span>
                  <span className="text-[10px] text-[#aaa] font-semibold">/100</span>
                </div>
              </div>
              <div className="flex-1 flex flex-col gap-2">
                {healthCategories.slice(0, 4).map((cat) => (
                  <div key={cat.id} className="flex items-center gap-2">
                    <span className="text-[13px] w-5">{cat.icon}</span>
                    <div className="flex-1 h-2 rounded-full bg-[#f0f0f0]">
                      <div className="h-full rounded-full" style={{ width: `${cat.progress}%`, backgroundColor: cat.accentColor }} />
                    </div>
                    <span className="text-[10px] font-bold text-[#888] w-7 text-right">{cat.progress}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* All categories */}
          <div className="bg-white rounded-[24px] p-5 shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
            <p className="text-[14px] font-bold text-[#1a1a1a] mb-4">Category Progress</p>
            <div className="flex flex-col gap-3.5">
              {healthCategories.map((cat) => (
                <div key={cat.id}>
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      <span className="text-[14px]">{cat.icon}</span>
                      <span className="text-[12px] font-bold text-[#1a1a1a]">{cat.label}</span>
                      {cat.streak > 0 && <span className="text-[10px] font-bold text-[#f59e0b]">🔥{cat.streak}d</span>}
                    </div>
                    <span className="text-[12px] font-bold" style={{ color: cat.accentColor }}>{cat.progress}%</span>
                  </div>
                  <div className="h-2.5 rounded-full bg-[#f0f0f0]">
                    <div className="h-full rounded-full transition-all" style={{ width: `${cat.progress}%`, backgroundColor: cat.accentColor }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Milestones */}
          <div className="bg-white rounded-[24px] p-5 shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
            <p className="text-[14px] font-bold text-[#1a1a1a] mb-4">Milestones</p>
            {[
              { label: "Iron levels normalised", done: true },
              { label: "7-day habit streak", done: true },
              { label: "Vitamin D optimal", done: false },
              { label: "Sleep score above 80", done: false },
            ].map((m) => (
              <div key={m.label} className="flex items-center gap-3 py-2.5 border-b border-[#f5f5f5] last:border-0">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-[12px] ${m.done ? "bg-[#4db8b8]/15 text-[#1e5e5e]" : "bg-[#f5f5f5] text-[#ccc]"}`}>
                  {m.done ? "✓" : "○"}
                </div>
                <span className={`text-[13px] ${m.done ? "text-[#1a1a1a] font-semibold" : "text-[#aaa]"}`}>{m.label}</span>
              </div>
            ))}
          </div>

          {/* Badge grid */}
          <div className="bg-white rounded-[24px] p-5 shadow-[0_2px_12px_rgba(0,0,0,0.06)] mb-2">
            <p className="text-[14px] font-bold text-[#1a1a1a] mb-4">Badges</p>
            <div className="grid grid-cols-3 gap-3">
              {achievements.map((a) => (
                <div key={a.id} className={`rounded-[18px] p-3 flex flex-col items-center text-center ${a.earned ? "bg-white shadow-[0_2px_10px_rgba(0,0,0,0.08)]" : "bg-[#f7f7f7] opacity-50"}`}>
                  <div className={`w-11 h-11 rounded-full flex items-center justify-center mb-2 text-[20px] ${a.earned ? "bg-gradient-to-br from-amber-400 to-amber-500 shadow-[0_4px_10px_rgba(251,191,36,0.3)]" : "bg-[#e8e8e8]"}`}>
                    {a.earned ? a.icon : "🔒"}
                  </div>
                  <p className="text-[10px] font-bold text-[#1a1a1a] leading-tight">{a.name}</p>
                  <p className="text-[9px] text-[#aaa] mt-0.5 leading-tight">{a.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab: This Week */}
      {activeTab === "week" && (
        <div className="flex flex-col gap-4 px-5 pt-5">
          {/* Mascot hero */}
          <div className="bg-gradient-to-br from-[#0a3030] to-[#1e5e5e] rounded-[24px] overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.15)]">
            <div className="flex items-end gap-0 px-5 pt-5">
              <div className="flex-1 pb-5">
                <p className="text-[11px] text-[#4db8b8] font-bold uppercase tracking-wide mb-1">Week Summary</p>
                <p className="text-[20px] font-bold text-white leading-snug">Keep going!<br />You&apos;re on track.</p>
                <p className="text-[12px] text-white/55 mt-1.5">5 of 7 days completed</p>
              </div>
              <div className="relative flex-shrink-0 w-[90px] h-[90px] mr-2">
                <div className="absolute inset-0 bg-[#4db8b8]/20 blur-xl rounded-full" />
                <ImageWithFallback src={mascotThumbsImg} alt="Thumbs up" className="w-full h-full object-contain relative z-10" />
              </div>
            </div>
          </div>

          {/* Day dots */}
          <div className="bg-white rounded-[24px] p-5 shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
            <p className="text-[13px] font-bold text-[#1a1a1a] mb-4">Days This Week</p>
            <div className="flex justify-between">
              {weekDays.map((d, i) => (
                <div key={d} className="flex flex-col items-center gap-2">
                  <span className="text-[10px] text-[#aaa] font-semibold">{d}</span>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[13px] ${completedDays[i] ? "bg-[#1e5e5e] text-white shadow-[0_2px_8px_rgba(30,94,94,0.3)]" : "bg-[#f5f5f5] text-[#ccc]"}`}>
                    {completedDays[i] ? "✓" : "·"}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-4 gap-2.5">
            {[
              { label: "Streak", val: `${weekStats.streak}d`, color: "#f59e0b", icon: "🔥" },
              { label: "Done", val: `${weekStats.done}`, color: "#4db8b8", icon: "✓" },
              { label: "Missed", val: `${weekStats.missed}`, color: "#f87171", icon: "✗" },
              { label: "Rate", val: `${weekStats.rate}%`, color: "#a78bfa", icon: "📈" },
            ].map((s) => (
              <div key={s.label} className="bg-white rounded-[18px] p-3 shadow-[0_2px_10px_rgba(0,0,0,0.06)] flex flex-col items-center text-center">
                <span className="text-[16px] mb-1">{s.icon}</span>
                <p className="text-[16px] font-bold" style={{ color: s.color }}>{s.val}</p>
                <p className="text-[9px] text-[#aaa] font-semibold uppercase tracking-wide mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>

          {/* Completed habits */}
          <div className="bg-white rounded-[24px] p-5 shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
            <p className="text-[13px] font-bold text-[#1a1a1a] mb-3">Completed Habits</p>
            {[
              { name: "Morning sunlight walk", days: 5, total: 7, color: "#4db8b8" },
              { name: "Iron-rich meal", days: 6, total: 7, color: "#86efac" },
              { name: "8h sleep", days: 4, total: 7, color: "#a78bfa" },
            ].map((h) => (
              <div key={h.name} className="flex items-center gap-3 mb-3 last:mb-0">
                <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: h.color }} />
                <div className="flex-1 min-w-0">
                  <p className="text-[12px] font-semibold text-[#1a1a1a] truncate">{h.name}</p>
                  <div className="h-1.5 rounded-full bg-[#f0f0f0] mt-1">
                    <div className="h-full rounded-full" style={{ width: `${(h.days / h.total) * 100}%`, backgroundColor: h.color }} />
                  </div>
                </div>
                <span className="text-[11px] font-bold text-[#888] flex-shrink-0">{h.days}/{h.total}</span>
              </div>
            ))}
          </div>

          {/* Missed habits */}
          <div className="bg-white rounded-[24px] p-5 shadow-[0_2px_12px_rgba(0,0,0,0.06)] mb-2">
            <p className="text-[13px] font-bold text-[#1a1a1a] mb-3">Missed Habits</p>
            {[
              { name: "Post-meal walk", missed: 3, total: 7 },
              { name: "Evening journaling", missed: 5, total: 7 },
            ].map((h) => (
              <div key={h.name} className="flex items-center gap-3 mb-3 last:mb-0">
                <div className="w-2 h-2 rounded-full bg-[#f87171] flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-[12px] font-semibold text-[#1a1a1a] truncate">{h.name}</p>
                  <div className="h-1.5 rounded-full bg-[#f0f0f0] mt-1">
                    <div className="h-full rounded-full bg-[#fecaca]" style={{ width: `${(h.missed / h.total) * 100}%` }} />
                  </div>
                </div>
                <span className="text-[11px] font-bold text-[#f87171] flex-shrink-0">{h.missed}/{h.total}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab: Timeline */}
      {activeTab === "timeline" && (
        <div className="flex flex-col gap-0 px-5 pt-5">
          <div className="bg-white rounded-[24px] p-5 shadow-[0_2px_12px_rgba(0,0,0,0.06)] mb-4">
            <p className="text-[14px] font-bold text-[#1a1a1a] mb-4">Your Journey</p>
            <div className="relative">
              <div className="absolute left-[15px] top-0 bottom-0 w-px bg-[#f0f0f0]" />
              {timelineEvents.map((ev, i) => (
                <div key={i} className="flex gap-4 mb-5 last:mb-0 relative">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-[15px] relative z-10" style={{ backgroundColor: `${ev.color}20` }}>
                    {ev.icon}
                  </div>
                  <div className="flex-1 pb-1">
                    <div className="flex items-start justify-between gap-2 mb-0.5">
                      <p className="text-[13px] font-bold text-[#1a1a1a] leading-snug">{ev.label}</p>
                      <span className="text-[9px] font-bold px-2 py-0.5 rounded-full flex-shrink-0" style={{ color: ev.color, backgroundColor: `${ev.color}18` }}>{ev.type}</span>
                    </div>
                    <p className="text-[11px] text-[#888] mb-1">{ev.desc}</p>
                    <p className="text-[10px] text-[#bbb] font-semibold">{ev.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab: AI Insights */}
      {activeTab === "insights" && (
        <div className="flex flex-col gap-4 px-5 pt-5">
          {/* Mascot + AI summary */}
          <div className="bg-gradient-to-br from-[#0a3030] to-[#1e5e5e] rounded-[24px] p-5 shadow-[0_4px_20px_rgba(0,0,0,0.15)]">
            <div className="flex items-start gap-4">
              <div className="relative flex-shrink-0 w-[72px] h-[72px]">
                <div className="absolute inset-0 bg-[#4db8b8]/25 blur-lg rounded-full" />
                <ImageWithFallback src={mascotClipboardImg} alt="AI Analysis" className="w-full h-full object-contain relative z-10" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-1.5 mb-1">
                  <Sparkles size={11} className="text-[#4db8b8]" />
                  <p className="text-[10px] font-bold text-[#4db8b8] uppercase tracking-wide">AI Analysis</p>
                </div>
                <p className="text-[14px] font-bold text-white leading-snug">Great progress this month! Your iron recovery and sleep patterns show strong improvement.</p>
              </div>
            </div>
          </div>

          {/* Positive trends */}
          <div className="bg-white rounded-[24px] p-5 shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
            <p className="text-[13px] font-bold text-[#1a1a1a] mb-3">Positive Trends</p>
            {[
              { label: "Ferritin rising", detail: "8 → 23 ng/mL in 6 weeks" },
              { label: "Sleep consistency", detail: "Avg 7.4h, up from 5.9h" },
              { label: "Morning habit adherence", detail: "85% completion rate" },
            ].map((t) => (
              <div key={t.label} className="flex items-center gap-3 py-2.5 border-b border-[#f5f5f5] last:border-0">
                <div className="w-6 h-6 rounded-full bg-[#4db8b8]/15 flex items-center justify-center flex-shrink-0 text-[11px] text-[#1e5e5e]">↑</div>
                <div>
                  <p className="text-[12px] font-semibold text-[#1a1a1a]">{t.label}</p>
                  <p className="text-[10px] text-[#aaa]">{t.detail}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Attention areas */}
          <div className="bg-white rounded-[24px] p-5 shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
            <p className="text-[13px] font-bold text-[#1a1a1a] mb-3">Areas Needing Attention</p>
            {[
              { label: "Evening walks skipped", detail: "Only 2/7 days this week" },
              { label: "Vitamin D still low", detail: "31 ng/mL — target >40" },
            ].map((t) => (
              <div key={t.label} className="flex items-center gap-3 py-2.5 border-b border-[#f5f5f5] last:border-0">
                <div className="w-6 h-6 rounded-full bg-amber-50 flex items-center justify-center flex-shrink-0 text-[11px] text-amber-600">!</div>
                <div>
                  <p className="text-[12px] font-semibold text-[#1a1a1a]">{t.label}</p>
                  <p className="text-[10px] text-[#aaa]">{t.detail}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Biomarker comparison */}
          <div className="bg-white rounded-[24px] p-5 shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
            <p className="text-[13px] font-bold text-[#1a1a1a] mb-4">Biomarker Before / After</p>
            <div className="flex flex-col gap-0">
              <div className="grid grid-cols-4 gap-2 mb-2 pb-2 border-b border-[#f5f5f5]">
                {["Marker", "Unit", "Before", "After"].map((h) => (
                  <span key={h} className="text-[9px] font-bold text-[#aaa] uppercase tracking-wide">{h}</span>
                ))}
              </div>
              {biomarkers.map((b) => (
                <div key={b.name} className="grid grid-cols-4 gap-2 py-2.5 border-b border-[#f5f5f5] last:border-0 items-center">
                  <span className="text-[11px] font-semibold text-[#1a1a1a]">{b.name}</span>
                  <span className="text-[10px] text-[#aaa]">{b.unit}</span>
                  <span className="text-[11px] text-[#f87171] font-bold">{b.before}</span>
                  <span className="text-[11px] font-bold" style={{ color: b.good ? "#4db8b8" : "#f87171" }}>
                    {b.after} {b.good ? "↑" : "↓"}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Recommendations */}
          <div className="bg-white rounded-[24px] p-5 shadow-[0_2px_12px_rgba(0,0,0,0.06)] mb-2">
            <p className="text-[13px] font-bold text-[#1a1a1a] mb-3">AI Recommendations</p>
            {[
              { icon: "☀️", text: "Add 10 min midday sun to boost Vitamin D absorption." },
              { icon: "🥩", text: "Continue iron-rich meals with Vitamin C for better uptake." },
              { icon: "🌙", text: "Sleep onset by 10:30 PM will push your score to 85+." },
            ].map((r, i) => (
              <div key={i} className="flex gap-3 py-2.5 border-b border-[#f5f5f5] last:border-0">
                <span className="text-[16px] flex-shrink-0">{r.icon}</span>
                <p className="text-[12px] text-[#444] leading-relaxed">{r.text}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Mulhim AI Chat ───────────────────────────────────────────────────────────

interface ChatMessage {
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

function getMulhimResponse(input: string): string {
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

function MulhimChatScreen({ hasCoach }: { hasCoach: boolean }) {
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

// ─── My Health Journey Hub ────────────────────────────────────────────────────

function JourneyHubScreen({ onBack, onMaintenance, onBreak, onSetGoal }: {
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
      {/* Header */}
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

      {/* Mascot hero */}
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

      {/* 4 option cards */}
      <div className="px-5 flex flex-col gap-3">
        {options.map((opt) => (
          <button key={opt.title} onClick={opt.action}
            className={`w-full bg-gradient-to-br ${opt.bg} rounded-[24px] p-5 text-left shadow-[0_4px_20px_rgba(0,0,0,0.15)] active:scale-[0.98] transition-transform overflow-hidden relative`}>
            {/* Glow blob */}
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

function AIGoalBuilder({ hasCoach, onBack, onMaintenance, onBreak }: { hasCoach: boolean; onBack: () => void; onMaintenance: () => void; onBreak: () => void }) {
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

function MaintenancePlan({ hasCoach, onBack, onBreak }: { hasCoach: boolean; onBack: () => void; onBreak: () => void }) {
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

function TakeABreak({ onBack, onResume }: { onBack: () => void; onResume: () => void }) {
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

function GeneticPlanBuilder({ hasCoach, locale, onBack }: { hasCoach: boolean; locale: Locale; onBack: () => void }) {
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

      {/* Step progress bar */}
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

      {/* ── INTRO ── */}
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

      {/* ── GOALS ── */}
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

      {/* ── HEALTH INSIGHTS ── */}
      {phase === "insights" && (
        <>
          <div className="mx-5 mb-4">
            <MascotBubble text="Here's what your health data tells us about your body. These insights will shape every part of your personalised plan." dark size="sm" />
          </div>

          {/* Profile chips */}
          <div className="flex gap-2 overflow-x-auto px-5 pb-1 mb-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {healthProfiles.map((p) => (
              <button key={p.id} onClick={() => setSelectedProfile(p)}
                className={`flex-shrink-0 flex items-center gap-1.5 px-3.5 py-2 rounded-full text-[12px] font-bold transition-all ${selectedProfile.id === p.id ? "bg-[#1e5e5e] text-white shadow-sm" : "bg-white text-[#666] shadow-[0_2px_8px_rgba(0,0,0,0.06)]"}`}>
                <span>{p.icon}</span>
                {p.label}
              </button>
            ))}
          </div>

          {/* Selected profile card */}
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

          {/* All profiles list */}
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

      {/* ── NUTRITION ── */}
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
                        <span className="px-2 py-0.5 rounded-full bg-[#e8f5f5] text-[#1e5e5e] text-[10px] font-bold">{T.recBadge(hasCoach)}</span>
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

      {/* ── EXERCISE ── */}
      {phase === "exercise" && (
        <>
          <div className="mx-5 mb-3">
            <MascotBubble text={`Your exercise plan is built for power and strength — your body responds best to heavy lifting and sprint work. Rest day: ${locale === "ar" ? "Saturday (السبت)" : "Sunday"}.`} dark size="sm" />
          </div>

          {/* Locale indicator */}
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

      {/* ── FULL PLAN ── */}
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