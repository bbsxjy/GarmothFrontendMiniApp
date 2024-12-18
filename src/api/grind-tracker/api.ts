import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import customBaseQuery from '@/api/customBaseQuery'
import { API_BASE_URL } from '@/constants'

export const grindTrackerApi = createApi({
  reducerPath: 'grindTrackerApi',
  baseQuery: customBaseQuery,
  endpoints: builder => ({
    getMenus: builder.query({
      query: () => ({ url: `${API_BASE_URL}/grindTrackerMenus` }),
    }),
    getSummary: builder.query({
      query: () => ({ url: `${API_BASE_URL}/grindTrackerSummary` }),
    }),
    getGlobalData: builder.query({
      query: () => ({ url: `${API_BASE_URL}/grind-spots` }),
    }),
    getBestSpotData: builder.query({
      query: () => ({ url: `${API_BASE_URL}/grindTrackBestSpot` }),
    }),
    getGlobalDataDetail: builder.query({
      query: (id: any) => ({ url: `${API_BASE_URL}/grind-spots/${id}` }),
    }),
    getGrindSpotsDetail: builder.query({
      query: () => ({ url: `${API_BASE_URL}/grind-spots-details` }),
    }),
    getAllLootDrops: builder.query({
      query: () => ({ url: `${API_BASE_URL}/loot/drops` }),
    }),
    getLootDropsById: builder.query({
      query: (id: number) => ({ url: `/loot/drops/${id}` }),
    }),
  }),
})

export const { useGetAllLootDropsQuery, useGetLootDropsByIdQuery, useGetMenusQuery, useGetSummaryQuery, useGetGrindSpotsDetailQuery, useGetGlobalDataQuery, useGetBestSpotDataQuery, useGetGlobalDataDetailQuery } = grindTrackerApi
