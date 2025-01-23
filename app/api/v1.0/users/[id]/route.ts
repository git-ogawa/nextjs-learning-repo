import { NextRequest } from "next/server"
import { getUser } from "@/app/api/v1.0/users/route"

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: number }> }) {
  const userId = Number((await params).id)

  const user = (await getUser(userId)) || {}
  return Response.json(user)
}
