// src/types/index.ts
export interface Boss {
  name: string;
  color: string | null;
  opacity: number;
}

export interface BossTimerDataEntry {
  time: string;
  Monday: Boss[];
  Tuesday: Boss[];
  Wednesday: Boss[];
  Thursday: Boss[];
  Friday: Boss[];
  Saturday: Boss[];
  Sunday: Boss[];
}

export interface BossTimerData {
  currentSunEvent: string;
  sunEventTimeLeft: number;
  dailyResetTime: number;
  bossTimer: {
    name: string;
    iconUrl: string;
    timeLeft: number;
  };
}

export interface BossImage {
  name: string;
  src: string;
  alt?: string;
}
