import type { Locale, CategoryId, Biomarker, HealthCategory, WeeklyDay, ExerciseDemoConfig } from "./types";

export const T = {
  coachLabel: (hasCoach: boolean) => hasCoach ? "Coach Approved" : "AI Verified",
  recLabel: (hasCoach: boolean) => hasCoach ? "Coach Recommendation" : "AI Recommendation",
  recBadge: (hasCoach: boolean) => hasCoach ? "✓ Coach" : "✓ AI",
};

export const biomarkers: Biomarker[] = [
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

export const learningTopics = [
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

export const aiRecommendations = [
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

export const quizQuestions = [
  { question: "What does a low Ferritin level most commonly cause?", options: ["High blood pressure", "Fatigue and low energy", "Joint pain", "Skin rashes"], correct: 1,
    explanation: "Ferritin stores iron in your body. Low ferritin depletes energy reserves, causing persistent fatigue — even before anemia develops.", emoji: "⚡" },
  { question: "How long does morning sunlight need to be to boost Vitamin D?", options: ["5 minutes", "15–20 minutes", "1 hour", "2+ hours"], correct: 1,
    explanation: "Just 15–20 minutes of morning UVB sunlight on exposed skin is enough for your body to synthesize a meaningful Vitamin D dose.", emoji: "☀️" },
  { question: "Which habit most directly lowers post-meal blood glucose?", options: ["Drinking green tea", "Taking a 10-min walk", "Deep breathing", "Eating slowly"], correct: 1,
    explanation: "A 10-minute post-meal walk triggers muscle glucose uptake via GLUT4 transporters — reducing blood glucose spikes by up to 30%.", emoji: "📊" },
  { question: "What does TSH measure?", options: ["Blood sugar levels", "Iron stores", "Thyroid activity", "Vitamin D production"], correct: 2,
    explanation: "TSH (Thyroid Stimulating Hormone) tells your thyroid how much hormone to produce. It's the key indicator of thyroid health.", emoji: "🦋" },
];

export const achievements = [
  { id: 1, icon: "🌱", name: "First Step", desc: "Set your first health goal", earned: true },
  { id: 2, icon: "🔥", name: "7-Day Streak", desc: "Followed your plan 7 days in a row", earned: true },
  { id: 3, icon: "🎯", name: "Goal Crusher", desc: "Completed your first health goal", earned: false },
  { id: 4, icon: "⚡", name: "30-Day Streak", desc: "Followed your plan 30 days in a row", earned: false },
  { id: 5, icon: "📈", name: "On the Rise", desc: "Improved progress in 3 health areas", earned: false },
  { id: 6, icon: "💎", name: "All Green", desc: "All 6 plans completed in the same week", earned: false },
];

export function buildExercisePlan(locale: Locale) {
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

export const suggestedGoals = [
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

export const geneticMarkers = [
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

export const nutritionPlan = {
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

export const goals = [
  { id: "energy", icon: "⚡", label: "More Energy", desc: "Combat fatigue and boost daily vitality" },
  { id: "fat-loss", icon: "🔥", label: "Fat Loss", desc: "Reduce body fat while preserving muscle" },
  { id: "muscle", icon: "💪", label: "Build Muscle", desc: "Increase strength and lean mass" },
  { id: "longevity", icon: "🌿", label: "Longevity", desc: "Optimize for long-term health and aging" },
  { id: "performance", icon: "🏃", label: "Athletic Performance", desc: "Improve endurance and power output" },
  { id: "mental", icon: "🧠", label: "Mental Clarity", desc: "Sharpen focus, memory, and mood" },
];

export const breakReasons = [
  { id: "vacation", icon: "✈️", label: "Vacation" },
  { id: "busy", icon: "📅", label: "Busy Schedule" },
  { id: "health", icon: "🏥", label: "Health Reasons" },
  { id: "personal", icon: "💛", label: "Personal Reasons" },
  { id: "other", icon: "💬", label: "Other" },
];

export const breakDurations = ["1 week", "2 weeks", "1 month", "3 months", "Custom"];

export const homeGoalOptions = [
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

export const healthCategories: HealthCategory[] = [
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
export const categoryRecommendations: Record<CategoryId, {
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

export const categoryWeeklyPlans: Record<CategoryId, WeeklyDay[]> = {
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

export const worldRegions = [
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

export const exerciseDemoConfigs: Record<string, ExerciseDemoConfig> = {
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

export const healthProfiles = [
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
