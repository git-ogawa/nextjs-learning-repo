"use server"

import { signOut } from "@/auth"

export default async function handler(req, res) {
  await signOut()
  res.status(200).json({ message: "Signed out" })
}
