
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { CronStonesCostGear,CronStoneCostItem } from '@/types';
import { API_BASE_URL } from '@/constants';
export const CronStonesCostApi = createApi({
  reducerPath: 'CronStonesCostGearApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_BASE_URL }),
  endpoints: (builder) => ({
    getCronStonesCostGear: builder.query<CronStonesCostGear[], void>({
      query: () => '/cronStonesCostGear',
    }),
    getCronStonesCostItem: builder.query<CronStoneCostItem[], void>({
      query: () => '/cronStonesCostItem',
    }),
  }),
});

export const { useGetCronStonesCostGearQuery, useGetCronStonesCostItemQuery } = CronStonesCostApi;