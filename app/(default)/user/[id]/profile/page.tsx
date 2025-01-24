import { getUser } from "@/app/api/v1.0/users/route"
import { auth } from "@/auth"
import { forbidden, notFound } from "next/navigation"
import UserProfileContent from "./userProfileContent"

export default async function UserProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  const user = await getUser(Number(id))

  if (!user) {
    notFound()
  }

  const session = await auth()
  if (session.user.id !== id) {
    forbidden()
  }

  return <UserProfileContent user={user} />
}
