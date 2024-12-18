import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { TradeCategory } from '@/types';
import { API_BASE_URL } from '@/constants';
export const tradeApi = createApi({
  reducerPath: 'tradeApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_BASE_URL }),
  endpoints: (builder) => ({
    fetchTradeItems: builder.query<TradeCategory[], void>({
      query: () => '/tradeItems'
    })
  })
});

export const { useFetchTradeItemsQuery } = tradeApi;
