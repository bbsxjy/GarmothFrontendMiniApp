
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { TradeCategory, NavItem, PostItem } from '@/types';
import { API_BASE_URL } from '@/constants';

export const HomeSlice = createApi({
  reducerPath: 'api', 
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL, 
  }),
  endpoints: (builder) => ({
    fetchTradeItems: builder.query<TradeCategory[], void>({
      query: () => '/tradeItems',
    }),
    fetchNavItems: builder.query<NavItem[], void>({
      query: () => '/topMenu',
    }),
    fetchPosts: builder.query<PostItem[], void>({
      query: () => '/posts',
      
    }),
    fetchHomeNews: builder.query({
      query: () => '/homeNews',
    }),
  }),
});

export const {
  useFetchTradeItemsQuery,
  useFetchNavItemsQuery,
  useFetchPostsQuery,
  useFetchHomeNewsQuery,
} = HomeSlice;
