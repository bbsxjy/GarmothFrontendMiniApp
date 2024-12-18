
import { navApi } from '@/api';
import { tradeApi } from '@/api';
import { marketSideMenuApi } from '@/api/market/sideMenuApi';
import { ImperialCratesLevelApi, ImperialCratesDataApi } from '@/api';
import { bossTimerApi } from '@/api';
import { caphrasEquipmentApi } from '@/api/caphras-calculator/equipmentApi';
import { BracketsAPDataApi, BracketsDPDataApi, BracketsDRDataApi } from '@/api/brackets';

export const apiList = [
  navApi,
  tradeApi,
  marketSideMenuApi,
  ImperialCratesLevelApi,
  ImperialCratesDataApi,
  bossTimerApi,
  caphrasEquipmentApi,
  BracketsAPDataApi,
  BracketsDPDataApi,
  BracketsDRDataApi
];
