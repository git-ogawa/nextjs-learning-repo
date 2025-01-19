// app/api/auth/signin.ts
import { NextApiRequest, NextApiResponse } from "next"
import { signIn } from "next-auth/react"
import { AuthError } from "next-auth"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).end()
  }

  const { username, password } = req.body

  const result = await signIn("credentials", {
    redirect: false,
    username,
    password,
  })

  if (result?.error) {
    return res.status(401).json({ error: result.error })
  }

  return res.status(200).json({ success: true })
}

export async function authenticate(prevState: string | undefined, formData: FormData) {
  try {
    const username = formData.get("username") as string
    const password = formData.get("password") as string
    const result = await signIn("credentials", {
      username,
      password,
      redirect: false, // リダイレクトを無効にする
    })

    if (result?.error) {
      throw new AuthError(result.error)
    }

    return result
  } catch (error) {
    if (error instanceof AuthError) {
      console.log("Error", error)
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials."
        default:
          return "Something went wrong."
      }
    }
    throw error
  }
}
