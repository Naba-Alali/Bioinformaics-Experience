// ─── Types ────────────────────────────────────────────────────────────────────

export type Screen =
  | "home" | "goal-setup" | "category"
  | "report" | "welcome" | "learning" | "biomarker"
  | "ai-recommendation" | "quiz" | "congratulations"
  | "progress" | "achievement" | "goal-builder" | "journey-hub"
  | "maintenance" | "take-a-break" | "genetic-plan"
  | "recovery-hub" | "mental-hub" | "nutrition-hub" | "plans-hub" | "exercise-hub" | "hair-skin-hub"
  | "profile";

export type CategoryId = "sleep" | "mental" | "nutrition" | "physical" | "exercise" | "skin";

export type Locale = "en" | "ar";

export interface Biomarker {
  name: string; value: number; unit: string; min: number; max: number;
  optimal: [number, number]; status: "good" | "warning" | "high";
  explanation: string; whyMatters: string; howToImprove: string;
  aiExplanation: string; aiRecommendation: string; icon: string;
}

export interface HealthCategory {
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

export interface WeeklyDay {
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

export interface ExerciseDemoConfig {
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

export interface Habit { id: string; icon: string; label: string; sublabel?: string; }
export interface RoutineStep { id: string; time: string; icon: string; action: string; }
