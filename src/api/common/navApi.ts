import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { NavItem } from '@/types';
import { API_BASE_URL } from '@/constants';
export const navApi = createApi({
  reducerPath: 'navApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_BASE_URL }),
  endpoints: (builder) => ({
    getNavItems: builder.query<NavItem[], void>({
      query: () => '/topMenu',
    }),
  }),
});

export const { useGetNavItemsQuery } = navApi;
