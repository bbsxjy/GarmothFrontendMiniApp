import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MobileNavbar from './mobile';
import Menu from './menu';
import { useFetchBossTimerDataQuery } from '@/api';

import type{ RootState, AppDispatch } from '@/store/store';

interface Boss {
  name: string;
  color: string | null;
  opacity: number;
}

interface BossTimerDataItem {
  time: string;
  Monday?: Boss[];
  Tuesday?: Boss[];
  Wednesday?: Boss[];
  Thursday?: Boss[];
  Friday?: Boss[];
  Saturday?: Boss[];
  Sunday?: Boss[];
}

interface NextBoss {
  name: string;
  timeLeft: number;
  iconUrl: string;
}

const Header: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const {
    currentSunEvent,
    sunEventTimeLeft,
    dailyResetTime,
  } = useSelector((state: RootState) => state.timer);

  const { data: bossTimerData, isLoading, error } = useFetchBossTimerDataQuery({});

  const [nextBoss, setNextBoss] = useState<NextBoss | null>(null);
  const [isNotificationOn, setIsNotificationOn] = useState<boolean>(true);

  useEffect(() => {
    if (!bossTimerData) return;
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const now = new Date();
    const currentDayIndex = now.getDay();
    const currentTimeInMinutes = now.getHours() * 60 + now.getMinutes();

    const findNextBoss = () => {
      for (let i = 0; i < 7; i++) {
        const dayIndex = (currentDayIndex + i) % 7;
        const dayName = daysOfWeek[dayIndex];
        const dayData = bossTimerData.find((item: any) => item.hasOwnProperty(dayName));
        if (dayData && dayData[dayName as keyof BossTimerDataItem]) {
          const sortedTimes = bossTimerData
            .filter((item: any) => item.hasOwnProperty(dayName))
            .sort((a: any, b: any) => {
              const [aH, aM] = a.time.split(':').map(Number);
              const [bH, bM] = b.time.split(':').map(Number);
              return aH * 60 + aM - (bH * 60 + bM);
            });
          for (const item of sortedTimes) {
            const [hour, minute] = item.time.split(':').map(Number);
            const eventTimeInMinutes = hour * 60 + minute;
            if (i === 0 && eventTimeInMinutes <= currentTimeInMinutes) continue;
            const timeLeft = (eventTimeInMinutes - currentTimeInMinutes) + (i === 0 ? 0 : i * 1440);
            const boss = item[dayName as keyof BossTimerDataItem]?.find((b: any) => b.opacity === 1);
            if (boss) {
              const iconUrl = `/icons/${boss.name.toLowerCase().replace(/\s/g, '-')}.png`;
              setNextBoss({
                name: boss.name,
                timeLeft: timeLeft * 60,
                iconUrl,
              });
              return;
            }
          }
        }
      }
    };

    findNextBoss();
  }, [bossTimerData]);

  const formatTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours}h ${minutes}m`;
  };

  const toggleNotification = () => {
    setIsNotificationOn(prev => !prev);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 shadow-md shadow-black/25">
      <nav className="relative z-40 bg-800">
        <div className="hidden h-7 lg:block">
          <div className="mx-auto h-7 max-w-[1700px] text-sm transition-all">
            <div className="grid-cols-4 grid h-7 items-center justify-center gap-3 transition">
              <div className="flex items-center justify-center gap-1 text-center text-100">
                <span id="nightReset">距{currentSunEvent}: <span className="font-semibold text-white">{formatTime(sunEventTimeLeft)}</span></span>
              </div>
              <div className="text-center text-100">
                <span>每日任务重置:
                  <span className="text-white">
                    <span className="font-semibold">{formatTime(dailyResetTime)}</span>
                  </span>
                </span>
              </div>
              <div className="flex justify-center gap-2 text-sm">
                {nextBoss && (
                  <div className="flex select-none items-center gap-1">
                    <a href="/boss-timer" className="flex items-center gap-1">
                      <img src={nextBoss.iconUrl} loading="lazy" alt={`${nextBoss.name} icon`} className="size-6 overflow-hidden rounded-full border border-400 bg-700" />
                      <span>{nextBoss.name}</span>
                      <span className="font-bold text-white">{formatTime(nextBoss.timeLeft)}</span>
                    </a>
                    <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" className="icon w-5 text-center text-red" width="1em" height="1em" viewBox="0 0 640 512"><path fill="currentColor" d="M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2s-6.3 25.5 4.1 33.7l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7l-90.2-70.7c.2-.4.4-.9.6-1.3c5.2-11.5 3.1-25-5.3-34.4l-7.4-8.3c-31.2-35.2-48.5-80.5-48.5-127.6V208c0-77.4-55-142-128-156.8V32c0-17.7-14.3-32-32-32s-32 14.3-32 32v19.2c-42.6 8.6-79 34.2-102 69.3zM406.2 416L160 222.1v4.8c0 47-17.3 92.4-48.5 127.6l-7.4 8.3c-8.4 9.4-10.4 22.9-5.3 34.4S115.4 416 128 416zm-40.9 77.3c12-12 18.7-28.3 18.7-45.3H256c0 17 6.7 33.3 18.7 45.3S303 512 320 512s33.3-6.7 45.3-18.7"></path></svg>
                  </div>
                )}
              </div>
              <div className="flex items-center justify-center">
                <button onClick={toggleNotification} className="focus:outline-none">
                  {isNotificationOn ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 003-3H7a3 3 0 003 3z" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 003-3H7a3 3 0 003 3z" />
                      <path d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
        <Menu />
        <MobileNavbar />
      </nav>
    </header>
  );
};

export default Header;
