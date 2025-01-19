import type { NextAuthConfig } from "next-auth"

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  debug: true,
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.username = user.username
        token.role = user.role
      }
      return token
    },
    async session({ session, token }) {
      session.user.id = token.id
      session.user.role = token.role
      session.user.username = token.username
      return session
    },
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user
      const isOnDashboard = nextUrl.pathname.startsWith("/")
      const isLoggedInPage = ["/login"].some((path) => nextUrl.pathname.startsWith(path))
      if (isLoggedInPage) {
        if (isLoggedIn) {
          return false
          // return Response.redirect(new URL("/", nextUrl)) // 認証成功後に / にリダイレクト
        }
        return true
      }
      if (isOnDashboard) {
        if (isLoggedIn) return true
        return Response.redirect(new URL("/login", nextUrl)) // 未認証ユーザーをログインページにリダイレクト
      }
      // return true
    },
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig
