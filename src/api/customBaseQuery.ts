import type { BaseQueryFn } from '@reduxjs/toolkit/query/react'
import Taro from '@tarojs/taro'

interface CustomBaseQueryArgs {
  url: string
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
  headers?: Record<string, string>
  body?: any
  params?: Record<string, any>
}

interface CustomBaseQueryError {
  status: number
  data: any
}

const customBaseQuery: BaseQueryFn<CustomBaseQueryArgs, unknown, CustomBaseQueryError> = async (
  args,
  api,
  extraOptions,
) => {
  const { url, method = 'GET', headers, body, params } = args

  try {
    const response = await Taro.request({
      url,
      method,
      header: headers,
      data: body,
    })

    const { data, statusCode } = response

    if (statusCode >= 200 && statusCode < 300) {
      return { data }
    }
    else {
      return {
        error: {
          status: statusCode,
          data,
        },
      }
    }
  }
  catch (error) {
    return {
      error: {
        status: 500,
        data: error,
      },
    }
  }
}

export default customBaseQuery
