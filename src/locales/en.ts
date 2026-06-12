// ภาษาอังกฤษคือ "แม่แบบ" — โครงของมันกลายเป็น type ที่ทุกภาษาต้องตามให้ครบ
export const en = {
  nav: {
    home: 'Home',
    system: 'System',
    login: 'Login',
    register: 'Register',
    account: 'Account',
  },
  home: {
    title: 'Feature Lab',
    tagline: 'A real system, built feature by feature — each one explained.',
  },
  system: {
    title: 'System',
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
