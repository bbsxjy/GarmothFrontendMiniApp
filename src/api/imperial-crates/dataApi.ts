import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import customBaseQuery from '@/api/customBaseQuery'
import type { ImperialCratesData } from '@/types'
import { API_BASE_URL } from '@/constants'

export const ImperialCratesDataApi = createApi({
  reducerPath: 'ImperialCratesDataApi',
  baseQuery: customBaseQuery,
  endpoints: builder => ({
    getImperialCratesData: builder.query<ImperialCratesData[], void>({
      query: () => ({ url: `${API_BASE_URL}/imperialcrates` }),
    }),
    searchImperialCratesData: builder.query<ImperialCratesData[], string>({
      query: keyword => ({ url: `${API_BASE_URL}/imperialcrates/${keyword}` }),
    }),

  }),
})

export const { useGetImperialCratesDataQuery } = ImperialCratesDataApi
