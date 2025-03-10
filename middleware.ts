import NextAuth from 'next-auth';
import authConfig from './app/auth.config';

const { auth } = NextAuth(authConfig);

const PUBLIC_ROUTES = ['/signin'];
const DEFAULT_REDIRECT = '/';
const ROOT = '/signin';


export default auth((req) => {
 const { nextUrl } = req;

 const isAuthenticated = !!req.auth;
 const isPublicRoute = PUBLIC_ROUTES.includes(nextUrl.pathname);

 if (isPublicRoute && isAuthenticated)
  return Response.redirect(new URL(DEFAULT_REDIRECT, nextUrl));

 if (!isAuthenticated && !isPublicRoute)
  return Response.redirect(new URL(ROOT, nextUrl));
});

export const config = {
 matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};