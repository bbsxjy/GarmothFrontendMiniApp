import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import customBaseQuery from '../customBaseQuery'
import { API_BASE_URL } from '@/constants'

export const GuidesApi = createApi({
  reducerPath: 'GuidesApi',
  baseQuery: customBaseQuery,
  endpoints: builder => ({
    getGuides: builder.query({
      query: () => ({ url: `${API_BASE_URL}/guides` }),

    }),
    getGuideCommentData: builder.query({
      query: (id: number) => ({ url: `${API_BASE_URL}/comments/${id}` }),
    }),
    getGuidesByTitle: builder.query({
      query: (title: string) => ({ url: `${API_BASE_URL}/guides/title/${title}` }),
    }),
    updateGuideViewCount: builder.mutation({
      query: ({ id }) => ({
        url: `${API_BASE_URL}/guides/${id}`,
        method: 'PATCH',
        body: { incViews: true },
      }),
    }),
    updateGuideLikeCount: builder.mutation({
      query: ({ id }) => ({
        url: `${API_BASE_URL}/guides/${id}`,
        method: 'PATCH',
        body: { incLikes: true },
      }),
    }),
  }),
})

export const {
  useGetGuidesQuery,
  useGetGuideCommentDataQuery,
  useGetGuidesByTitleQuery,
  useUpdateGuideViewCountMutation,
  useUpdateGuideLikeCountMutation,
} = GuidesApi
