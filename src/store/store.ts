import { configureStore } from '@reduxjs/toolkit'
import {
  GuidesApi,
  HomeSlice,
  ImperialCratesDataApi,
  ImperialCratesLevelApi,
  NewsApi,
  bossTimerApi,
  changeLogApi,
  navApi,
  tradeApi,
} from '@/api'
import { marketSideMenuApi } from '@/api/market/sideMenuApi'
import { BracketsAPDataApi, BracketsApi, BracketsDPDataApi, BracketsDRDataApi } from '@/api/brackets'
import { beautyAlbumApi } from '@/api/beauty-albums'
import { caphrasEquipmentApi } from '@/api/caphras-calculator/equipmentApi'
import { GreatWorldBossesApi } from '@/api/great-world-boss/greatWorldBossesApi'
import { CronStonesCostApi } from '@/api/cron-stones-cost/gearApi'
import { grindTrackerApi } from '@/api/grind-tracker/api'
import { characterDefaultApi } from '@/api/character/defaultApi'
import timerReducer from '@/features/timer/timerSlice'
import { itemSelectorApi } from '@/api/enhanceing-simulator/itemSelectorApi'
import timerSlice from '@/features/timer/timerSlice'
import userSlice from '@/features/users/userSlice'
import modalReducer from '@/features/modals/modalSlice'
import loadingSlice, { endRequest, startRequest } from '@/features/loading/loadingSlice'
import bossTimerReducer from '@/pages/boss-timer/features/BossTimerSlice'
import { SkillsAddonApi } from '@/api/skill-addon-planner'
import { usersApi } from '@/api/users'
// import userSlice from '@/features/users/userSlice'

function loadingMiddleware(storeAPI: any) {
  return (next: any) => (action: any) => {
    const result = next(action)

    if (action.type.endsWith('/pending')) {
      storeAPI.dispatch(startRequest())
    }
    if (action.type.endsWith('/fulfilled') || action.type.endsWith('/rejected')) {
      storeAPI.dispatch(endRequest())
    }

    return result
  }
}

export const store = configureStore({
  reducer: {
    timer: timerReducer,
    loading: loadingSlice,
    bossTimer: bossTimerReducer,
    Timer: timerSlice,
    modal: modalReducer,
    user: userSlice,
    [usersApi.reducerPath]: usersApi.reducer,
    [navApi.reducerPath]: navApi.reducer,
    [tradeApi.reducerPath]: tradeApi.reducer,
    [marketSideMenuApi.reducerPath]: marketSideMenuApi.reducer,
    [ImperialCratesLevelApi.reducerPath]: ImperialCratesLevelApi.reducer,
    [ImperialCratesDataApi.reducerPath]: ImperialCratesDataApi.reducer,
    [BracketsAPDataApi.reducerPath]: BracketsAPDataApi.reducer,
    [BracketsDPDataApi.reducerPath]: BracketsDPDataApi.reducer,
    [BracketsDRDataApi.reducerPath]: BracketsDRDataApi.reducer,
    [BracketsApi.reducerPath]: BracketsApi.reducer,
    [bossTimerApi.reducerPath]: bossTimerApi.reducer,
    [beautyAlbumApi.reducerPath]: beautyAlbumApi.reducer,
    [caphrasEquipmentApi.reducerPath]: caphrasEquipmentApi.reducer,
    [GreatWorldBossesApi.reducerPath]: GreatWorldBossesApi.reducer,
    [grindTrackerApi.reducerPath]: grindTrackerApi.reducer,
    [characterDefaultApi.reducerPath]: characterDefaultApi.reducer,
    [CronStonesCostApi.reducerPath]: CronStonesCostApi.reducer,
    [itemSelectorApi.reducerPath]: itemSelectorApi.reducer,
    [NewsApi.reducerPath]: NewsApi.reducer,
    [GuidesApi.reducerPath]: GuidesApi.reducer,
    [changeLogApi.reducerPath]: changeLogApi.reducer,
    [HomeSlice.reducerPath]: HomeSlice.reducer,
    [SkillsAddonApi.reducerPath]: SkillsAddonApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware()
      .concat(navApi.middleware)
      .concat(tradeApi.middleware)
      .concat(marketSideMenuApi.middleware)
      .concat(ImperialCratesLevelApi.middleware)
      .concat(ImperialCratesDataApi.middleware)
      .concat(BracketsAPDataApi.middleware)
      .concat(BracketsDPDataApi.middleware)
      .concat(BracketsDRDataApi.middleware)
      .concat(BracketsApi.middleware)
      .concat(bossTimerApi.middleware)
      .concat(beautyAlbumApi.middleware)
      .concat(caphrasEquipmentApi.middleware)
      .concat(GreatWorldBossesApi.middleware)
      .concat(CronStonesCostApi.middleware)
      .concat(grindTrackerApi.middleware)
      .concat(characterDefaultApi.middleware)
      .concat(itemSelectorApi.middleware)
      .concat(HomeSlice.middleware)
      .concat(GuidesApi.middleware)
      .concat(NewsApi.middleware)
      .concat(changeLogApi.middleware)
      .concat(SkillsAddonApi.middleware)
      .concat(usersApi.middleware)
      .concat(loadingMiddleware),
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
