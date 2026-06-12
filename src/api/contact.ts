import { contactFetch } from './client'

// รูปร่างตามสัญญาของ lab-contact-service
export interface ContactMessage {
  id: number
  name: string
  email: string
  message: string
  readAt: string | null
  createdAt: string
}

export interface Inbox {
  items: ContactMessage[]
  total: number
  unread: number
}

export const submitContact = (name: string, email: string, message: string) =>
  contactFetch<void>('/contact', {
    method: 'POST',
    body: JSON.stringify({ name, email, message }),
  })

export const fetchInbox = (page = 0, size = 50) =>
  contactFetch<Inbox>(`/contact?page=${page}&size=${size}`)

export const markRead = (id: number) =>
  contactFetch<ContactMessage>(`/contact/${id}/read`, { method: 'PATCH' })

export const deleteMessage = (id: number) =>
  contactFetch<void>(`/contact/${id}`, { method: 'DELETE' })
