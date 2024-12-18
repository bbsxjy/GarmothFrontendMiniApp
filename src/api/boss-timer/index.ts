import { createApi } from '@reduxjs/toolkit/query/react'
import customBaseQuery from '@/api/customBaseQuery'
import { API_BASE_URL } from '@/constants'
import type { BossTimerData } from '@/types'

export const bossTimerApi = createApi({
  reducerPath: 'bossTimerApi',
  baseQuery: customBaseQuery,
  endpoints: builder => ({
    fetchBossTimer: builder.query<BossTimerData, void>({
      query: () => ({ url: `${API_BASE_URL}/bossTimer` }),
    }),
    fetchBossTimerData: builder.query<any, void>({
      query: () => ({ url: `${API_BASE_URL}/bossTimerTable` }),
    }),
    fetchBossImage: builder.query<any, void>({
      query: () => ({ url: `${API_BASE_URL}/bossImage` }),
    }),
  }),
})

export const {
  useFetchBossTimerQuery,
  useFetchBossTimerDataQuery,
  useFetchBossImageQuery,
} = bossTimerApi
