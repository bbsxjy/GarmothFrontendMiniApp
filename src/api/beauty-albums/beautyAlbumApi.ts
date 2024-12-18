import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { API_BASE_URL } from '@/constants'
import customBaseQuery from '@/api/customBaseQuery'
import type { BeautyAlbum } from '@/types'
import { BeautyAlbumCategory, BeautyAlbumSort, BeautyAlbumTimeRange } from '@/types'

interface BeautyAlbumsResponse extends Array<BeautyAlbum> {}

export const beautyAlbumApi = createApi({
  reducerPath: 'beautyAlbumApi',
  baseQuery: customBaseQuery,
  endpoints: builder => ({
    getBeautyAlbums: builder.query<BeautyAlbumsResponse, void>({
      query: () => ({ url: `${API_BASE_URL}/beauty-album` }),
    }),
    getBeautyAlbumsById: builder.query<BeautyAlbumsResponse, string>({
      query: id => ({ url: `${API_BASE_URL}/beauty-album/${id}` }),
    }),
    downloadAlbumById: builder.query<string, { className: string, id: string }>({
      query: ({ className, id }) => ({ url: `${API_BASE_URL}/beauty-album/download/${className}/${id}` }),
    }),
    incrementLikeCount: builder.mutation<void, string>({
      query: albumId => ({
        url: `${API_BASE_URL}/beauty-album/${albumId}/like`,
        method: 'POST',
      }),
    }),
    incrementViewCount: builder.mutation<void, string>({
      query: albumId => ({
        url: `${API_BASE_URL}/beauty-album/${albumId}/view`,
        method: 'POST',
      }),
    }),
  }),
})

export const {
  useGetBeautyAlbumsQuery,
  useGetBeautyAlbumsByIdQuery,
  useLazyDownloadAlbumByIdQuery,
  useIncrementViewCountMutation,
  useIncrementLikeCountMutation,
} = beautyAlbumApi
