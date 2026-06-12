// ภาษาอังกฤษคือ "แม่แบบ" — โครงของมันกลายเป็น type ที่ทุกภาษาต้องตามให้ครบ
export const en = {
  nav: {
    home: 'Home',
    system: 'System',
    login: 'Login',
    register: 'Register',
    account: 'Account',
    admin: 'Admin',
    feed: 'Feed',
  },
  feed: {
    title: 'Feed',
    placeholder: 'What is on your mind?',
    post: 'Post',
    posting: 'Posting…',
    loginPrompt: 'Login to post, comment, and like.',
    empty: 'Nothing here yet. Be the first to post.',
    loadMore: 'Load more',
    offline: 'The feed backend is not reachable right now.',
    comments: 'comments',
    commentPlaceholder: 'Write a comment…',
    send: 'Send',
    delete: 'Delete',
    deleteConfirm: 'Delete this post?',
  },
  admin: {
    title: 'Who is online',
    live: 'live',
    reconnecting: 'reconnecting…',
    empty: 'Nobody is online right now.',
    user: 'User',
    since: 'Online since',
    lastSeen: 'Last seen',
    sessions: 'Tabs',
  },
  home: {
    title: 'Feature Lab',
    tagline: 'A real system, built feature by feature — each one explained.',
    featuresTitle: 'Features',
    builtBy: 'Built in the open by',
  },
  system: {
    title: 'System',
    intro: 'This site is not a brochure — it is the system itself. Everything listed on the home page runs here, and this page explains how and why.',
    archTitle: 'Architecture',
    decisionsTitle: 'Design decisions',
    reposTitle: 'Source',
    decisions: {
      jwt: {
        title: 'Short-lived JWT + rotating refresh',
        why: 'Services verify access tokens without a network hop, while revocation stays possible through the refresh tokens stored server-side. Reuse of a rotated token is treated as theft and burns every session.',
      },
      env: {
        title: 'Everything through environment variables',
        why: 'No hardcoded URLs, secrets, or limits anywhere. The same build runs on a laptop and in production; forgetting a secret fails the boot instead of silently using a weak default.',
      },
      micro: {
        title: 'Microservices, one repo per service',
        why: 'Each service owns its schema, tests, and CI. Boundaries stay honest because crossing them requires an actual network call.',
      },
      memToken: {
        title: 'Access token in memory only',
        why: 'Nothing readable by JavaScript persists the session. The HttpOnly cookie does the surviving, the page does the forgetting.',
      },
    },
  },
  featureStatus: {
    live: 'live',
    building: 'building',
    planned: 'planned',
  },
  features: {
    auth: {
      name: 'Authentication',
      desc: 'Register and login with short-lived JWTs. Passwords are BCrypt-hashed; errors follow RFC 7807 with per-field details.',
    },
    sessions: {
      name: 'Rotating sessions',
      desc: 'Refresh tokens live in HttpOnly cookies, rotate on every use, and reusing a rotated token burns every session for that user.',
    },
    darkMode: {
      name: 'Dark mode',
      desc: 'Three states (system / light / dark), persisted, applied before first paint — no flash on dark devices.',
    },
    i18n: {
      name: 'Bilingual UI',
      desc: 'Hand-rolled EN/TH dictionaries. The compiler forces both languages to stay in sync — a missing key fails the build.',
    },
    apiStatus: {
      name: 'API status',
      desc: 'The footer pings the backend and says honestly when it is offline. The static site stands on its own.',
    },
    presence: {
      name: 'Realtime presence',
      desc: 'WebSocket-based online/offline tracking with an admin dashboard.',
    },
    feed: {
      name: 'Community feed',
      desc: 'Posts, comments, likes — by any signed-in user.',
    },
    contact: {
      name: 'Contact',
      desc: 'Messages stored, surfaced in the admin view, and forwarded by email.',
    },
    gateway: {
      name: 'Gateway',
      desc: 'A self-built gateway in front of the services: routing, rate limiting, TLS.',
    },
    twoFactor: {
      name: '2FA & social login',
      desc: 'TOTP two-factor and OAuth sign-in, plus email password reset.',
    },
  },
  auth: {
    loginTitle: 'Login',
    registerTitle: 'Create account',
    accountTitle: 'Account',
    email: 'Email',
    username: 'Username',
    password: 'Password',
    loginButton: 'Login',
    registerButton: 'Create account',
    logoutButton: 'Logout',
    submitting: 'Working…',
    noAccount: 'No account yet?',
    haveAccount: 'Already have an account?',
    role: 'Role',
  },
  status: {
    online: 'API online',
    offline: 'API offline — auth features need the backend running',
  },
} as const

// ขยาย literal type ("Home") ให้กลายเป็น string ทุกชั้น — โครงต้องครบ แต่ค่าเป็นภาษาอะไรก็ได้
type DeepString<T> = { [K in keyof T]: T[K] extends string ? string : DeepString<T[K]> }
export type Dict = DeepString<typeof en>
