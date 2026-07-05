export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  DASHBOARD: {
    PATIENT: '/patient',
    DOCTOR: '/doctor',
    ADMIN: '/admin',
  },
  API: {
    CHAT: '/api/v1/ai/chat',
  },
} as const;

export const PUBLIC_ROUTES = [ROUTES.HOME, ROUTES.LOGIN, ROUTES.REGISTER];
