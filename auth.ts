import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { authConfig } from "@/auth.config"
import { z } from "zod"
import bcrypt from "bcrypt"
import { authUser } from "@/app/api/v1.0/users/route"
import { CredentialsSignin } from "@auth/core/errors"

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials): Promise<User | null> {
        const res = await authUser(credentials.username, credentials.password)
        return res.error ? null : res
      },
    }),
  ],
})
