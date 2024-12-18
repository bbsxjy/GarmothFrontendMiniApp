import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {RootState} from "@/store/store";

interface Boss {
  name: string;
  color: string | null;
  opacity: number;
}

interface BossTimerDataEntry {
  time: string;
  Monday: Boss[];
  Tuesday: Boss[];
  Wednesday: Boss[];
  Thursday: Boss[];
  Friday: Boss[];
  Saturday: Boss[];
  Sunday: Boss[];
}

interface BossInfo {
  time: string | null;
  bosses: Boss[];
}

interface BossTimerState {
  bossData: BossTimerDataEntry[];
  lastBoss: BossInfo;
  nextBoss: BossInfo;
  upcomingBoss: BossInfo;
}

const initialState: BossTimerState = {
  bossData: [],
  lastBoss: { time: null, bosses: [] },
  nextBoss: { time: null, bosses: [] },
  upcomingBoss: { time: null, bosses: [] },
};

const bossTimerSlice = createSlice({
  name: 'bossTimer',
  initialState,
  reducers: {
    setBossData(state, action: PayloadAction<BossTimerDataEntry[]>) {
      state.bossData = action.payload;
      const now = new Date();
      const currentDay = now.toLocaleString('en-US', { weekday: 'long' }) as keyof BossTimerDataEntry;
      const currentTime = now.getHours() * 60 + now.getMinutes();

      const parseTime = (timeStr: string): number => {
        const [hour, minute] = timeStr.split(':').map(Number);
        return hour * 60 + minute;
      };

      const daysOfWeek: Array<keyof BossTimerDataEntry> = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

      const todayBossData = state.bossData
          .map(entry => ({
            time: parseTime(entry.time),
            originalTime: entry.time,
            bosses: entry[currentDay] || [],
          }))
          .sort((a, b) => a.time - b.time);

      let lastBoss: BossInfo = { time: null, bosses: [] };
      let nextBoss: BossInfo = { time: null, bosses: [] };
      let upcomingBoss: BossInfo = { time: null, bosses: [] };

      for (let i = 0; i < todayBossData.length; i++) {
        const entry = todayBossData[i];
        if (entry.time <= currentTime && entry.bosses.length > 0) {
          lastBoss = { time: entry.originalTime, bosses: entry.bosses as Boss[] };
        } else if (entry.time > currentTime && nextBoss.bosses.length === 0 && entry.bosses.length > 0) {
          nextBoss = { time: entry.originalTime, bosses: entry.bosses as Boss[] };
        } else if (entry.time > currentTime && nextBoss.bosses.length > 0 && upcomingBoss.bosses.length === 0 && entry.bosses.length > 0) {
          upcomingBoss = { time: entry.originalTime, bosses: entry.bosses as Boss[] };
          break;
        }
      }

      // Handle case where there are no bosses left for today, check the previous day for the lastBoss
      if (lastBoss.bosses.length === 0 && state.bossData.length > 0) {
        const prevDayIndex = (now.getDay() + 6) % 7;
        const prevDay = daysOfWeek[prevDayIndex];
        const prevDayData = state.bossData
            .map(entry => ({
              time: parseTime(entry.time),
              originalTime: entry.time,
              bosses: entry[prevDay] || [],
            }))
            .sort((a, b) => a.time - b.time);

        const lastEntry = prevDayData[prevDayData.length - 1];
        lastBoss = { time: lastEntry.originalTime, bosses: lastEntry.bosses as Boss[] };
      }

      // Handle case where there are no bosses left for today, check the next day for the nextBoss
      if (nextBoss.bosses.length === 0 && state.bossData.length > 0) {
        const nextDayIndex = (now.getDay() + 1) % 7;
        const nextDay = daysOfWeek[nextDayIndex];

        const nextDayData = state.bossData
            .map(entry => ({
              time: parseTime(entry.time),
              originalTime: entry.time,
              bosses: entry[nextDay] || [],
            }))
            .sort((a, b) => a.time - b.time);

        const nextAvailableSlot = nextDayData.find(slot => slot.bosses.length > 0);

        if (nextAvailableSlot) {
          nextBoss = { time: nextAvailableSlot.originalTime, bosses: nextAvailableSlot.bosses as Boss[] };
          const upcomingSlot = nextDayData.find((slot, idx) => idx > nextDayData.indexOf(nextAvailableSlot) && slot.bosses.length > 0);
          if (upcomingSlot) {
            upcomingBoss = { time: upcomingSlot.originalTime, bosses: upcomingSlot.bosses as Boss[] };
          }
        }
      }

      state.lastBoss = lastBoss;
      state.nextBoss = nextBoss;
      state.upcomingBoss = upcomingBoss;
    },
  },
});

export const selectLastBoss = (state: RootState) => state.bossTimer.lastBoss;
export const selectNextBoss = (state: RootState) => state.bossTimer.nextBoss;
export const selectUpcomingBoss = (state: RootState) => state.bossTimer.upcomingBoss;

export const { setBossData } = bossTimerSlice.actions;
export default bossTimerSlice.reducer;
