import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { MarketSideMenu } from '@/types/market'
import { API_BASE_URL } from '@/constants'

export const marketSideMenuApi = createApi({
  reducerPath: 'marketSideMenuApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_BASE_URL }),
  endpoints: builder => ({
    getMarketSideMenu: builder.query<MarketSideMenu[], void>({
      query: () => '/marketSideMenus',
    }),
  }),
})

export const { useGetMarketSideMenuQuery } = marketSideMenuApi
