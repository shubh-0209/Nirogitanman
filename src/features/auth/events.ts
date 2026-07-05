// Reusable Auth Event layer for future audit logging

export type AuthEventType = 
  | "LOGIN" 
  | "LOGOUT" 
  | "REGISTER" 
  | "PASSWORD_RESET_REQUEST"
  | "PASSWORD_RESET_SUCCESS"
  | "ROLE_CHANGE"
  | "EMAIL_VERIFICATION";

export interface AuthEventPayload {
  userId?: string;
  email?: string;
  metadata?: Record<string, unknown>;
  ipAddress?: string;
  userAgent?: string;
}

/**
 * Logs an authentication event for audit purposes.
 * Currently prints to console in development.
 * Later, this will write to an audit_logs table.
 */
export async function logAuthEvent(
  eventType: AuthEventType,
  payload: AuthEventPayload
) {
  const timestamp = new Date().toISOString();
  
  // Future implementation: Write to Supabase 'audit_logs' table
  if (process.env.NODE_ENV === "development") {
    console.log(`[AUTH EVENT: ${eventType}] - ${timestamp}`, payload);
  }
}
