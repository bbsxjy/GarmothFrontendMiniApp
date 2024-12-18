import React, { useEffect, useState } from 'react'
import { Button, Image, Text, View } from '@tarojs/components'
import Taro from '@tarojs/taro'

import { useDispatch, useSelector } from 'react-redux'
import {
  useGetBeautyAlbumsQuery,
  useIncrementLikeCountMutation,
  useLazyDownloadAlbumByIdQuery,
} from '@/api/beauty-albums/beautyAlbumApi'

import type { BeautyAlbumImageType } from '@/types'
import { BASE_IMAGE_BEAUTY_ALBUM_COVER_URL, JOB_CLASS_MAP } from '@/constants'
import type { RootState } from '@/store/store'
import { showModal } from '@/features/modals/modalSlice'

const Download: React.FC = () => {
  const id = Taro.getCurrentInstance().router?.params?.id
  const dispatch = useDispatch()

  const userName = useSelector((state: RootState) => state.user.userName)
  const isLoggedIn = !!userName

  const [isLiked, setIsLiked] = useState(false)

  const { data: beautyAlbumsData, isLoading, error } = useGetBeautyAlbumsQuery()
  const [triggerDownloadAlbumById] = useLazyDownloadAlbumByIdQuery()
  const [incrementLikeCount] = useIncrementLikeCountMutation()

  const handleBack = () => {
    Taro.navigateBack()
  }

  const albumData = beautyAlbumsData?.find(album => album.id === id)
  if (!albumData)
    return null

  const images = [1, 2].map(i => ({
    id: `${albumData.title}_${i}`,
    imageUrl: `${BASE_IMAGE_BEAUTY_ALBUM_COVER_URL}${albumData.className}/${albumData.title}_${i}.png`,
    title: `Image ${i}`,
  }))
  Taro.setNavigationBarTitle({
    title: albumData.title,
  })
  const handleDownload = async (albumId: string, className: string) => {
    if (!isLoggedIn) {
      Taro.showToast({ title: '请先登录再下载吧！', icon: 'none' })
      dispatch(showModal())
      return
    }

    try {
      // 获取下载链接
      await triggerDownloadAlbumById({ className, id: albumId }).unwrap()
    }
    catch (error: any) {
      if (!error.data) {
        Taro.showToast({ title: '获取下载链接失败！', icon: 'none' })
        return
      }

      const downloadUrl = error.data

      Taro.showLoading({ title: '下载中...' })

      // 下载文件
      const res = await Taro.downloadFile({
        url: downloadUrl,
      })

      Taro.hideLoading()

      if (res.statusCode !== 200) {
        Taro.showToast({ title: '下载失败！', icon: 'none' })
        return
      }

      // 保存文件
      const saveRes = await Taro.saveFile({
        tempFilePath: res.tempFilePath,
      })

      if (saveRes && 'savedFilePath' in saveRes) {
        Taro.showToast({ title: '下载成功！', icon: 'success' })
      }
      else {
        Taro.showToast({ title: '保存文件失败！', icon: 'none' })
      }
    }
  }

  const handleLinkClick = async (albumId: string) => {
    setIsLiked(!isLiked)
    await incrementLikeCount(albumId)
  }

  if (isLoading) {
    return (
      <View className="flex justify-center items-center h-screen">
        <Text>加载中...</Text>
      </View>
    )
  }

  if (error || !albumData) {
    return (
      <View className="flex justify-center items-center h-screen">
        <Text>加载时出错或找不到相册。</Text>
      </View>
    )
  }

  return (
    <View className="min-h-screen  text-white p-4">
      {/* 返回和喜欢按钮 */}
      <View className="flex justify-between items-center mb-6">
        <Button
          className="flex items-center px-4 py-2 border border-gray-500 rounded-md hover:border-gray-400"
          onClick={handleBack}
        >
          <Text className="text-lg">返回</Text>
        </Button>
        <Button
          className={`flex items-center px-4 py-2 border rounded-md transition-colors ${
            isLiked
              ? 'border-red-500 text-red-500 hover:bg-red-600 hover:text-white'
              : 'border-gray-500 hover:border-red-500 hover:text-red-500'
          }`}
          onClick={() => handleLinkClick(albumData.id)}
        >
          <Text className="text-lg">{isLiked ? '已喜欢' : '喜欢'}</Text>
        </Button>
      </View>

      {/* 相册信息 */}
      <View className="bg-gray-700 rounded-lg p-6 mb-6">
        <View className="flex items-center mb-4">
          <Image
            src="https://assets.garmoth.com/classes/200/27.webp"
            mode="aspectFill"
            alt={albumData.title}
            className="w-20 h-20 rounded-full mr-4"
          />
          <View>
            <Text className="text-2xl font-bold">
              精品
              {' '}
              {JOB_CLASS_MAP[albumData.className]}
              {' '}
              捏脸
            </Text>
            <View className="flex items-center text-sm text-gray-300 mt-1">
              <Text>{new Date(albumData.createdAt).toLocaleString()}</Text>
              <Text className="mx-2">|</Text>
              <Text>
                ID:
                {id}
              </Text>
            </View>
          </View>
        </View>
        <View className="flex justify-between text-gray-200">
          <Text>
            下载次数:
            {albumData.downloadCount || 0}
          </Text>
          <Text>
            浏览次数:
            {albumData.viewCount || 0}
          </Text>
          <Text>
            喜欢次数:
            {albumData.likeCount || 0}
          </Text>
        </View>
      </View>

      {/* 使用说明 */}
      <View className="bg-gray-700 rounded-lg p-6 mb-6">
        <Text className="text-gray-300">
          使用说明：下载文件后，将文件复制到我的文档下【\Black Desert\Customization】路径，在游戏捏脸界面最下方即可选择。
        </Text>
      </View>

      {/* 图片展示 */}
      <View className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {images && images.length > 0
          ? (
              images.map((image: BeautyAlbumImageType) => (
                <View
                  key={image.id}
                  className="overflow-hidden rounded-lg border border-gray-600"
                >
                  <Image
                    src={
                      image.imageUrl
                      || 'https://assets.garmoth.com/beauty-album/images/default.png'
                    }
                    mode="aspectFill"
                    alt={image.title}
                    className="w-full h-64 object-cover"
                  />
                </View>
              ))
            )
          : (
              <View className="flex justify-center items-center col-span-2">
                <Text>暂无图片。</Text>
              </View>
            )}
      </View>

      {/* 下载按钮 */}
      <View className="flex justify-center">
        <Button
          className="px-6 py-3 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
          onClick={() => handleDownload(albumData.id, albumData.className)}
        >
          下载
        </Button>
      </View>
    </View>
  )
}

export default Download
