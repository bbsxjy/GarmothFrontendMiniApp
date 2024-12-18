import { createSlice } from '@reduxjs/toolkit';

interface BossTimer {
  name: string;
  timeLeft: number;
  iconUrl: string;
}

interface TimerState {
  currentSunEvent: string;
  sunEventTimeLeft: number;
  sunriseTime: number;
  sunsetTime: number;
  dailyResetTime: number;
  bossTimer: BossTimer;
}

const REAL_SECONDS_IN_DAY = 24 * 60 * 60; // 86400秒 = 1天的现实时间
const GAME_SECONDS_IN_DAY = 4 * 60 * 60;  // 14400秒 = 1天的游戏时间
const TIME_MULTIPLIER = GAME_SECONDS_IN_DAY / REAL_SECONDS_IN_DAY; // 1秒现实时间 = 15秒游戏时间

// 获取游戏内当前的时间（单位为秒）
const getCurrentGameTime = (): number => {
  const now = new Date();
  const secondsSinceMidnight = now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds();
  // 游戏内时间 = 现实时间 * 加速倍率
  const gameSecondsSinceMidnight = secondsSinceMidnight * TIME_MULTIPLIER;
  return gameSecondsSinceMidnight % GAME_SECONDS_IN_DAY; // 模拟一天循环
};

// 假设日出发生在游戏的06:00，日落发生在游戏的18:00
const GAME_SUNRISE_TIME = 6 * 60 * 60; // 游戏内6点对应的秒数
const GAME_SUNSET_TIME = 18 * 60 * 60; // 游戏内18点对应的秒数

const initialState: TimerState = {
  currentSunEvent: "日出",
  sunEventTimeLeft: GAME_SUNRISE_TIME, // 初始为日出
  sunriseTime: GAME_SUNRISE_TIME,
  sunsetTime: GAME_SUNSET_TIME,
  dailyResetTime: 59160,
  bossTimer: {
    name: "卡岚达",
    timeLeft: 8160,
    iconUrl: "https://assets.garmoth.com/boss/large/karanda.png"
  }
};

const timerSlice = createSlice({
  name: 'timer',
  initialState,
  reducers: {
    updateDailyResetTime: (state) => {
      const now = new Date();
      const resetHour = 0; // Reset happens at midnight
      const resetMinute = 0;

      const currentMinutes = now.getHours() * 60 + now.getMinutes();
      const resetMinutes = resetHour * 60 + resetMinute;

      let timeLeftUntilReset = resetMinutes - currentMinutes;
      if (timeLeftUntilReset < 0) {
        timeLeftUntilReset += 24 * 60; // Add 24 hours in minutes if the reset time is in the next day
      }

      state.dailyResetTime = timeLeftUntilReset * 60; // Convert to seconds
    },
    updateTimes(state) {
      const gameTime = getCurrentGameTime(); // 使用游戏内时间

      if (gameTime < state.sunriseTime) {
        state.currentSunEvent = '日出';
        state.sunEventTimeLeft = state.sunriseTime - gameTime;
      } else if (gameTime < state.sunsetTime) {
        state.currentSunEvent = '日落';
        state.sunEventTimeLeft = state.sunsetTime - gameTime;
      } else {
        state.currentSunEvent = '日出';
        state.sunEventTimeLeft = GAME_SECONDS_IN_DAY - gameTime + state.sunriseTime;
      }

      // 更新其他时间相关的状态
      if (state.dailyResetTime > 0) state.dailyResetTime -= 1;
      if (state.bossTimer.timeLeft > 0) state.bossTimer.timeLeft -= 1;

      // 确保 sunEventTimeLeft 递减
      if (state.sunEventTimeLeft > 0) {
        state.sunEventTimeLeft -= 1; // 每次更新减少1秒
      }

    },
    determineSunEvent(state) {
      const gameTime = getCurrentGameTime();

      if (gameTime < GAME_SUNRISE_TIME) {
        state.currentSunEvent = '日出'; // 日出前
      } else if (gameTime < GAME_SUNSET_TIME) {
        state.currentSunEvent = '日落'; // 日出后，日落前
      } else {
        state.currentSunEvent = '日出'; // 日落后，再次回到日出
      }
    }
  }
});

export const { updateTimes, determineSunEvent, updateDailyResetTime } = timerSlice.actions;
export default timerSlice.reducer;
