import React, { useState } from 'react'
import { Button, Image, RichText, Text, Textarea, View } from '@tarojs/components'
import { useGetGuideCommentDataQuery } from '@/api'

function Comments({ id }) {
  const { data, error, isLoading } = useGetGuideCommentDataQuery(id)
  const [comment, setComment] = useState('')

  const handleCommentChange = (e) => {
    setComment(e.detail.value)
  }

  const handleSubmit = () => {
    console.log(comment)
  }

  const renderReplies = (replies) => {
    return replies.map(reply => (
      <View key={reply.id} className="ml-6 mt-2">
        <View className="flex gap-3">
          <Image src={reply.avatar} alt={reply.name} className="size-8 rounded-full" />
          <View className="flex flex-col">
            <View className="text-sm font-semibold">{reply.family_name || reply.name}</View>
            <RichText nodes={reply.comment} className="text-sm" />
            <View className="text-xs text-300">{new Date(reply.created_at).toLocaleDateString()}</View>
          </View>
        </View>
      </View>
    ))
  }

  const renderComments = (comments) => {
    return comments.map(comment => (
      <View key={comment.id} className="mt-4">
        <View className="flex gap-3">
          <Image src={comment.avatar} alt={comment.name} className="size-8 rounded-full" />
          <View className="flex flex-col">
            <View className="flex items-center gap-2">
              <Text className="text-sm font-semibold">{comment.family_name || comment.name}</Text>
              <Text className="text-xs text-300">{new Date(comment.created_at).toLocaleDateString()}</Text>
            </View>
            <RichText nodes={comment.comment} className="text-sm" />
            {comment.replies && renderReplies(comment.replies)}
          </View>
        </View>
      </View>
    ))
  }

  return (
    <View id="guide-comments" className="pb-3">
      <View className="flex flex-col gap-3 rounded-md bg-700 px-1 pb-3 pt-2 text-sm">
        <View className="flex items-center justify-between px-2">
          <Text className="text-xl font-semibold" id="comments">5. Comments</Text>
        </View>
        <View>
          <View className="relative mb-4 lg:px-6">
            <View className="p-1 flex flex-col gap-1 w-full border-2 border-500 rounded-md">
              <View className="relative text-sm p-2 bg-600 rounded-md overflow-y-auto">
                <Textarea
                  value={comment}
                  onInput={handleCommentChange}
                  className="w-full h-20 p-2 bg-600 rounded-md text-white"
                  placeholder="Add a comment..."
                />
              </View>
              <View className="flex justify-between">
                <View className="flex flex-wrap gap-1">
                </View>
                <Button className="px-2 py-1 h-8 text-white bg-600 rounded-md" onClick={handleSubmit}>
                  Submit
                </Button>
              </View>
            </View>
          </View>
          <View className="flex flex-col gap-3 px-2" id="comments-list">
            {isLoading && <Text>Loading comments...</Text>}
            {error && <Text>Error loading comments</Text>}
            {data && renderComments(data.data)}
          </View>
        </View>
      </View>
    </View>
  )
}

export default Comments
