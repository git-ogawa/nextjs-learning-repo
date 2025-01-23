import { User, UserList } from "@/app/types/user"
import axios from "axios"
import { exampleUserList } from "@/app/mock/user"
import { auth } from "@/auth"
import { APISuccessResponse, APIErrorResponse } from "@/app/types/api"
import type { NextRequest } from "next/server"
import { Pagination } from "@/utils/api"

export async function GET(request: NextRequest): Promise<APISuccessResponse | APIErrorResponse> {
  const { searchParams } = new URL(request.url)
  const perPage = Number(searchParams.get("per_page")) || 100
  const currentPage = Number(searchParams.get("page")) || 1

  const list = await listUser()
  const { pagination, currentPageItem } = Pagination(list, perPage, currentPage)

  const res: APISuccessResponse = { pagination: pagination, results: currentPageItem }

  return Response.json(res)
}

export async function authUser(name: string, password: string): Promise<Map | User> {
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
          error: {
            code: "INVALID_CREDENTIALS",
            message: "Invalid username or password",
          },
        }
        break
    }
    return user
  }
}

export async function getCurrentUser(): Promise<User | null> {
  const session = await auth()
  if (!session?.user) return null
  return session.user
}

export async function listUser(): Promise<UserList> {
  if (process.env.NEXT_PUBLIC_ENV == "development") {
    return exampleUserList
  }
}

export async function getUser(id: number): Promise<User | null> {
  if (process.env.NEXT_PUBLIC_ENV == "development") {
    const user = exampleUserList.find((user) => user.id === id) || null
    return user
  }
}

export async function deleteUser(id: number): Promise<User | null> {
  if (process.env.NEXT_PUBLIC_ENV == "development") {
    const user = exampleUserList.find((user) => user.id === id) || null
    return user
  }
}

export async function deleteUsers(ids: number[]): Promise<null> {
  if (process.env.NEXT_PUBLIC_ENV == "development") {
    // const user = exampleUserList.find((user) => user.id === id) || null
    return { status: "success", data: "test" }
  }
}
