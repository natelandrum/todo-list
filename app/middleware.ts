import { auth } from "@/auth"; // Import from your NextAuth API route
import { NextResponse } from "next/server";

export default async function middleware(req: Request) {
  const session = await auth(); // Get session data

  // If the user is not authenticated and tries to access protected routes, redirect to login
  if (!session && req.url.includes("/")) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

// Define which routes should be protected
export const config = {
  matcher: ["/", "/api/*"], // Protect these routes
};
