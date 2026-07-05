import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';
import { env } from '@/config/env';
import { ROUTES } from '@/config/routes';
import { ROLES } from '@/config/constants';

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    env.NEXT_PUBLIC_SUPABASE_URL,
    env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  let user = null;
  if (!env.NEXT_PUBLIC_SUPABASE_URL.includes('dummy')) {
    const { data } = await supabase.auth.getUser();
    user = data.user;
  }

  const pathname = request.nextUrl.pathname;
  const isAuthRoute = pathname.startsWith(ROUTES.LOGIN) || pathname.startsWith(ROUTES.REGISTER) || pathname.startsWith('/forgot-password') || pathname.startsWith('/reset-password') || pathname.startsWith('/verify-email');
  const isPatientRoute = pathname.startsWith(ROUTES.DASHBOARD.PATIENT);
  const isDoctorRoute = pathname.startsWith(ROUTES.DASHBOARD.DOCTOR);
  const isAdminRoute = pathname.startsWith(ROUTES.DASHBOARD.ADMIN);
  const isDashboardRoute = isPatientRoute || isDoctorRoute || isAdminRoute;

  // Unauthenticated user attempting to access protected route
  if (!user && isDashboardRoute) {
    const url = request.nextUrl.clone();
    url.pathname = ROUTES.LOGIN;
    return NextResponse.redirect(url);
  }

  // Authenticated user routing logic
  if (user) {
    // Determine user role
    const { data: roleData } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', user.id)
      .single();

    const userRole = roleData?.role || ROLES.PATIENT; // Default to PATIENT if not found

    // RBAC: Prevent unverified users from accessing dashboard
    if (isDashboardRoute && !user.email_confirmed_at) {
      return NextResponse.redirect(new URL('/verify-email', request.url));
    }

    // RBAC: Prevent cross-dashboard access
    if (isPatientRoute && userRole !== ROLES.PATIENT) {
      return NextResponse.redirect(new URL('/unauthorized', request.url));
    }
    if (isDoctorRoute && userRole !== ROLES.DOCTOR) {
      return NextResponse.redirect(new URL('/unauthorized', request.url));
    }
    if (isAdminRoute && userRole !== ROLES.ADMIN) {
      return NextResponse.redirect(new URL('/unauthorized', request.url));
    }

    // Redirect authenticated users away from auth pages to their respective dashboard
    if (isAuthRoute) {
      const url = request.nextUrl.clone();
      if (userRole === ROLES.PATIENT) url.pathname = ROUTES.DASHBOARD.PATIENT;
      else if (userRole === ROLES.DOCTOR) url.pathname = ROUTES.DASHBOARD.DOCTOR;
      else if (userRole === ROLES.ADMIN) url.pathname = ROUTES.DASHBOARD.ADMIN;
      else url.pathname = ROUTES.HOME;
      
      return NextResponse.redirect(url);
    }
  }

  return supabaseResponse;
}
