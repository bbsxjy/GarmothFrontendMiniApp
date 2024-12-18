import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import customBaseQuery from '../customBaseQuery'
import type { BracketsAPData, BracketsDPData, BracketsDRData } from '@/types'
import { API_BASE_URL, MOCK_GET_GLOBAL } from '@/constants'

export const BracketsApi = createApi({
  reducerPath: 'BracketsDataApi',
  baseQuery: customBaseQuery,
  endpoints: builder => ({
    getBracketsData: builder.query<any, void>({
      query: () => ({ url: `${API_BASE_URL}/brackets` }),
    }),
  }),
})
export const BracketsAPDataApi = createApi({
  reducerPath: 'BracketsAPDataDataApi',
  baseQuery: customBaseQuery,
  endpoints: builder => ({
    getBracketsAPData: builder.query<BracketsAPData[], void>({
      query: () => ({ url: `${API_BASE_URL}/bracketsAPData` }),
    }),

  }),
})
export const BracketsDPDataApi = createApi({
  reducerPath: 'BracketsDPDataDataApi',
  baseQuery: customBaseQuery,
  endpoints: builder => ({
    getBracketsDPData: builder.query<BracketsDPData[], void>({
      query: () => ({ url: `${API_BASE_URL}/bracketsDPData` }),
    }),

  }),
})
export const BracketsDRDataApi = createApi({
  reducerPath: 'BracketsDRDataDataApi',
  baseQuery: customBaseQuery,
  endpoints: builder => ({
    getBracketsDRData: builder.query<BracketsDRData[], void>({
      query: () => ({ url: `${API_BASE_URL}/bracketsDRData` }),
    }),

  }),
})

export const { useGetBracketsAPDataQuery } = BracketsAPDataApi
export const { useGetBracketsDPDataQuery } = BracketsDPDataApi
export const { useGetBracketsDRDataQuery } = BracketsDRDataApi
export const { useGetBracketsDataQuery } = BracketsApi
