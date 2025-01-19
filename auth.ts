import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { authConfig } from "@/auth.config"
import { z } from "zod"
import bcrypt from "bcrypt"
import { authUser } from "@/app/api/user"

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const res = await authUser(credentials.username, credentials.password)

        if (res.status === "success") {
          return res.data
        }
        return null
      },
    }),
  ],
})
