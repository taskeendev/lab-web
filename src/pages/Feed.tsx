import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import { useAuth } from '@/auth'
import { useT } from '@/i18n'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import * as feed from '@/api/feed'
import type { Comment, Post } from '@/api/feed'

const PAGE_SIZE = 10
const MAX_LEN = 500

const when = (iso: string) => new Date(iso).toLocaleString()

export default function Feed() {
  const t = useT()
  const { user } = useAuth()
  const isAdmin = user?.role === 'ADMIN'

  const [posts, setPosts] = useState<Post[]>([])
  const [page, setPage] = useState(0)
  const [hasMore, setHasMore] = useState(false)
  const [offline, setOffline] = useState(false)
  const [draft, setDraft] = useState('')
  const [posting, setPosting] = useState(false)
  // comments โหลดเมื่อกางโพสต์นั้นครั้งแรก — เก็บแคชราย post id
  const [openComments, setOpenComments] = useState<Record<number, Comment[]>>({})
  const [commentDrafts, setCommentDrafts] = useState<Record<number, string>>({})

  const loadPage = async (p: number) => {
    try {
      const batch = await feed.listPosts(p, PAGE_SIZE)
      setPosts((prev) => (p === 0 ? batch : [...prev, ...batch]))
      setHasMore(batch.length === PAGE_SIZE)
      setPage(p)
      setOffline(false)
    } catch {
      setOffline(true)
    }
  }

  useEffect(() => {
    void loadPage(0)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const submitPost = async () => {
    const content = draft.trim()
    if (!content) return
    setPosting(true)
    try {
      const created = await feed.createPost(content)
      setPosts((prev) => [created, ...prev])
      setDraft('')
    } finally {
      setPosting(false)
    }
  }

  const toggleLike = async (post: Post) => {
    if (!user) return
    // อัปเดตหน้าจอก่อน ค่อยยิง API — ถ้าพังค่อยถอยกลับ
    const flip = (p: Post) =>
      p.id === post.id
        ? { ...p, likedByMe: !p.likedByMe, likeCount: p.likeCount + (p.likedByMe ? -1 : 1) }
        : p
    setPosts((prev) => prev.map(flip))
    try {
      await (post.likedByMe ? feed.unlike(post.id) : feed.like(post.id))
    } catch {
      setPosts((prev) => prev.map(flip))
    }
  }

  const removePost = async (id: number) => {
    if (!window.confirm(t.feed.deleteConfirm)) return
    await feed.deletePost(id)
    setPosts((prev) => prev.filter((p) => p.id !== id))
  }

  const toggleComments = async (id: number) => {
    if (openComments[id]) {
      setOpenComments(({ [id]: _closed, ...rest }) => rest)
      return
    }
    const comments = await feed.listComments(id)
    setOpenComments((prev) => ({ ...prev, [id]: comments }))
  }

  const submitComment = async (postId: number) => {
    const content = (commentDrafts[postId] ?? '').trim()
    if (!content) return
    const created = await feed.addComment(postId, content)
    setOpenComments((prev) => ({ ...prev, [postId]: [...(prev[postId] ?? []), created] }))
    setCommentDrafts((prev) => ({ ...prev, [postId]: '' }))
    setPosts((prev) =>
      prev.map((p) => (p.id === postId ? { ...p, commentCount: p.commentCount + 1 } : p)),
    )
  }

  const removeComment = async (postId: number, commentId: number) => {
    await feed.deleteComment(commentId)
    setOpenComments((prev) => ({
      ...prev,
      [postId]: (prev[postId] ?? []).filter((c) => c.id !== commentId),
    }))
    setPosts((prev) =>
      prev.map((p) => (p.id === postId ? { ...p, commentCount: p.commentCount - 1 } : p)),
    )
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">{t.feed.title}</h1>

      {user ? (
        <div className="space-y-2 rounded-lg border p-4">
          <textarea
            value={draft}
            onChange={(e) => setDraft(e.target.value.slice(0, MAX_LEN))}
            placeholder={t.feed.placeholder}
            rows={3}
            className="w-full resize-none rounded-md border bg-transparent px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs text-muted-foreground">
              {draft.length}/{MAX_LEN}
            </span>
            <Button size="sm" onClick={submitPost} disabled={posting || !draft.trim()}>
              {posting ? t.feed.posting : t.feed.post}
            </Button>
          </div>
        </div>
      ) : (
        <p className="text-sm text-muted-foreground">
          <Link to="/login" className="underline hover:text-foreground">
            {t.nav.login}
          </Link>{' '}
          — {t.feed.loginPrompt}
        </p>
      )}

      {offline && <p className="text-sm text-amber-600 dark:text-amber-400">{t.feed.offline}</p>}
      {!offline && posts.length === 0 && (
        <p className="text-muted-foreground">{t.feed.empty}</p>
      )}

      <ul className="space-y-4">
        {posts.map((post) => (
          <li key={post.id} className="space-y-3 rounded-lg border p-4">
            <div className="flex items-baseline gap-2">
              <span className="font-mono text-sm font-semibold">{post.author}</span>
              <span className="text-xs text-muted-foreground">{when(post.createdAt)}</span>
              {(user?.username === post.author || isAdmin) && (
                <button
                  onClick={() => void removePost(post.id)}
                  className="ml-auto text-xs text-muted-foreground hover:text-destructive"
                >
                  {t.feed.delete}
                </button>
              )}
            </div>
            <p className="whitespace-pre-wrap text-sm">{post.content}</p>
            <div className="flex items-center gap-4 text-sm">
              <button
                onClick={() => void toggleLike(post)}
                disabled={!user}
                className={cn(
                  'flex items-center gap-1 font-mono text-xs',
                  post.likedByMe ? 'text-rose-500' : 'text-muted-foreground',
                  user && 'hover:text-rose-500',
                )}
              >
                {post.likedByMe ? '♥' : '♡'} {post.likeCount}
              </button>
              <button
                onClick={() => void toggleComments(post.id)}
                className="font-mono text-xs text-muted-foreground hover:text-foreground"
              >
                💬 {post.commentCount} {t.feed.comments}
              </button>
            </div>

            {openComments[post.id] && (
              <div className="space-y-2 border-t pt-3">
                {openComments[post.id].map((c) => (
                  <div key={c.id} className="flex items-baseline gap-2 text-sm">
                    <span className="font-mono text-xs font-semibold">{c.author}</span>
                    <span className="flex-1">{c.content}</span>
                    {(user?.username === c.author || isAdmin) && (
                      <button
                        onClick={() => void removeComment(post.id, c.id)}
                        className="text-xs text-muted-foreground hover:text-destructive"
                      >
                        ✕
                      </button>
                    )}
                  </div>
                ))}
                {user && (
                  <form
                    className="flex gap-2 pt-1"
                    onSubmit={(e) => {
                      e.preventDefault()
                      void submitComment(post.id)
                    }}
                  >
                    <Input
                      value={commentDrafts[post.id] ?? ''}
                      onChange={(e) =>
                        setCommentDrafts((prev) => ({
                          ...prev,
                          [post.id]: e.target.value.slice(0, MAX_LEN),
                        }))
                      }
                      placeholder={t.feed.commentPlaceholder}
                      className="h-8 text-sm"
                    />
                    <Button
                      type="submit"
                      size="sm"
                      variant="outline"
                      disabled={!(commentDrafts[post.id] ?? '').trim()}
                    >
                      {t.feed.send}
                    </Button>
                  </form>
                )}
              </div>
            )}
          </li>
        ))}
      </ul>

      {hasMore && (
        <Button variant="outline" onClick={() => void loadPage(page + 1)}>
          {t.feed.loadMore}
        </Button>
      )}
    </div>
  )
}
