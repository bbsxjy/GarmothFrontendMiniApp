import { createApi } from '@reduxjs/toolkit/query/react'
import customBaseQuery from '@/api/customBaseQuery'
import type { MarketSideMenu } from '@/types'

export const api = createApi({
  reducerPath: 'api',
  baseQuery: customBaseQuery,
  endpoints: builder => ({
    fetchMarketSideMenus: builder.query<MarketSideMenu[], void>({
      query: () => ({
        url: '/marketSideMenus',
        method: 'GET',
      }),
    }),
  }),
})

export const { useFetchMarketSideMenusQuery } = api
