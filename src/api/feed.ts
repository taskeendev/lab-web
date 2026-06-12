import { feedFetch } from './client'

// รูปร่างตามสัญญาของ lab-feed-service
export interface Post {
  id: number
  author: string
  content: string
  createdAt: string
  likeCount: number
  commentCount: number
  likedByMe: boolean
}

export interface Comment {
  id: number
  author: string
  content: string
  createdAt: string
}

export const listPosts = (page: number, size: number) =>
  feedFetch<Post[]>(`/posts?page=${page}&size=${size}`)

export const createPost = (content: string) =>
  feedFetch<Post>('/posts', { method: 'POST', body: JSON.stringify({ content }) })

export const deletePost = (id: number) =>
  feedFetch<void>(`/posts/${id}`, { method: 'DELETE' })

export const listComments = (postId: number) =>
  feedFetch<Comment[]>(`/posts/${postId}/comments`)

export const addComment = (postId: number, content: string) =>
  feedFetch<Comment>(`/posts/${postId}/comments`, {
    method: 'POST',
    body: JSON.stringify({ content }),
  })

export const deleteComment = (id: number) =>
  feedFetch<void>(`/comments/${id}`, { method: 'DELETE' })

// like เป็นสถานะ ไม่ใช่เหตุการณ์ — PUT/DELETE ยิงซ้ำได้ผลเดิม
export const like = (postId: number) =>
  feedFetch<void>(`/posts/${postId}/like`, { method: 'PUT' })

export const unlike = (postId: number) =>
  feedFetch<void>(`/posts/${postId}/like`, { method: 'DELETE' })
