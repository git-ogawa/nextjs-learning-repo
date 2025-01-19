import axios from "axios"
import { exampleUserList } from "@/app/mock/user"
import { User } from "@/app/type/user"
import { auth } from "@/auth"

export async function authUser(name: string, password: string): Promise<Array> {
  if (process.env.NEXT_PUBLIC_ENV == "development") {
    let user
    switch (name) {
      case "admin":
        user = exampleUserList[0]
        break
      case "developer":
        user = exampleUserList[1]
        break
      case "viewer":
        user = exampleUserList[2]
        break
      default:
        return {
          status: "error",
          message: "Invalid username or password",
          data: null,
        }
        break
    }
    return {
      status: "success",
      message: "authenticate successfully",
      data: user,
    }
  }
}

export async function getCurrentUser(): Promise<User> {
  const session = await auth()
  if (!session?.user) return null
  return session.user
}
