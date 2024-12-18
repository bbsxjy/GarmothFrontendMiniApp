import { createApi } from '@reduxjs/toolkit/query/react'
import customBaseQuery from '@/api/customBaseQuery'
import type { UserInfo } from '@/types/user-info'
import { API_BASE_URL } from '@/constants'

const withBaseUrl = url => `${API_BASE_URL}${url}`
export const usersApi = createApi({
  reducerPath: 'usersApi',
  baseQuery: customBaseQuery,
  endpoints: builder => ({
    getCurrentUser: builder.query<UserInfo, string>({
      query: token => ({
        url: withBaseUrl('/users/me'),
        method: 'POST',
        body: token,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    changePassword: builder.mutation({
      query: ({ token, currentPassword, newPassword }) => ({
        url: withBaseUrl('/users/change-password'),
        method: 'POST',
        body: { token, currentPassword, newPassword },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    getUserById: builder.query({
      query: id => ({
        url: withBaseUrl(`/users/${id}`),
        method: 'GET',
      }),
    }),
    getUserByPhoneNumber: builder.query({
      query: phoneNumber => ({
        url: withBaseUrl(`/users/phone/${phoneNumber}`),
        method: 'GET',
      }),
    }),
    getUserByWeChatOpenId: builder.query({
      query: openId => ({
        url: withBaseUrl(`/users/wechat/${openId}`),
        method: 'GET',
      }),
    }),
    getUserByQQOpenId: builder.query({
      query: openId => ({
        url: withBaseUrl(`/users/qq/${openId}`),
        method: 'GET',
      }),
    }),
    updateUser: builder.mutation({
      query: ({ id, userDetails }) => ({
        url: withBaseUrl(`/users/${id}`),
        method: 'PUT',
        body: userDetails,
      }),
    }),
    // 发送短信验证码
    sendSmsCode: builder.mutation({
      query: phoneNumber => ({
        url: withBaseUrl('/auth/send-sms-code'),
        method: 'POST',
        body: { phoneNumber },
      }),
    }),
    // 验证短信验证码
    verifySmsCode: builder.mutation({
      query: ({ phoneNumber, code }) => ({
        url: withBaseUrl('/auth/verify-sms-code'),
        method: 'POST',
        body: { phoneNumber, code },
      }),
    }),
    // 发送Email验证码
    sendDmCode: builder.mutation({
      query: ({ userName, email }) => ({
        url: withBaseUrl('/auth/send-dm-code'),
        method: 'POST',
        body: { userName, email },
      }),
    }),
    // 验证Email验证码
    verifyDmCode: builder.mutation({
      query: ({ userName, email, code }) => ({
        url: withBaseUrl('/auth/verify-dm-code'),
        method: 'POST',
        body: { userName, email, code },
      }),
    }),
    // 用户注册
    registerUser: builder.mutation({
      query: userDetails => ({
        url: withBaseUrl('/users/register'),
        method: 'POST',
        body: userDetails,
      }),
    }),
    // 用户登录
    login: builder.mutation({
      query: loginDetails => ({
        url: `${API_BASE_URL}/users/login`,
        method: 'POST',
        body: loginDetails,
      }),
    }),
    // 检查用户名是否可用
    checkUsernameAvailability: builder.mutation({
      query: username => ({
        url: withBaseUrl('/users/check-username'),
        method: 'POST',
        body: { username },
      }),
    }),
    // 检查手机号是否已注册
    checkPhoneNumberRegistered: builder.mutation({
      query: phoneNumber => ({
        url: withBaseUrl('/users/check-phone-number'),
        method: 'POST',
        body: { phoneNumber },
      }),
    }),
  }),
})

export const {
  useGetCurrentUserQuery,
  useChangePasswordMutation,
  useGetUserByIdQuery,
  useGetUserByPhoneNumberQuery,
  useGetUserByWeChatOpenIdQuery,
  useGetUserByQQOpenIdQuery,
  useUpdateUserMutation,
  useSendSmsCodeMutation,
  useVerifySmsCodeMutation,
  useSendDmCodeMutation,
  useVerifyDmCodeMutation,
  useRegisterUserMutation,
  useLoginMutation,
  useCheckUsernameAvailabilityMutation,
  useCheckPhoneNumberRegisteredMutation,
} = usersApi
