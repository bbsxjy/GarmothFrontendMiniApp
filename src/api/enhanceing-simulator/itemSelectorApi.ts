
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_BASE_URL } from '@/constants';
export const itemSelectorApi = createApi({
  reducerPath: 'itemSelectorApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_BASE_URL }),
  endpoints: (builder) => ({
    getEnhancingSimulatorItems: builder.query({
      query: () => '/enhancingSimulator',  
    }),
  }),
});

export const { useGetEnhancingSimulatorItemsQuery } = itemSelectorApi;
