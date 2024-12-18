import { createApi } from '@reduxjs/toolkit/query/react'
import customBaseQuery from '@/api/customBaseQuery'

export const api = createApi({
  reducerPath: 'api',
  baseQuery: customBaseQuery,
  endpoints: builder => ({
    fetchGreatWorldBosses: builder.query<any, void>({
      query: () => ({
        url: '/greatWorldBosses',
        method: 'GET',
      }),
    }),
  }),
})

export const { useFetchGreatWorldBossesQuery } = api
