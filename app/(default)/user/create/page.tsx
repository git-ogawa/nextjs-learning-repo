import React from "react"
import UserCreateForm from "./userCreateForm"
import { notFound } from "next/navigation"
import { getUser } from "@/app/api/v1.0/users/route"

export default async function UserCreateFormPage() {
  return <UserCreateForm />
}
