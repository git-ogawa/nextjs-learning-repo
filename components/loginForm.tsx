"use client"
import { useActionState } from "react"
import { authenticate } from "@/app/lib/action"
import { useRouter } from "next/navigation"
import React, { useState, useEffect } from "react"
import { ProjectIcon } from "@/components/ui/icon"
import Image from "next/image"
import ProjectLogo from "@/public/logo-tmp.png"

export default function LoginForm() {
  const router = useRouter()
  const [errorMessage, formAction, isPending] = useActionState(authenticate, undefined)

  useEffect(() => {
    if (!isPending && !errorMessage) {
      router.push("/") // ログイン成功後に / にリダイレクト
    }
  }, [isPending, errorMessage])

  return (
    <div className="mx-auto w-full max-w-xs">
      <form
        className="mb-4 rounded px-8 pb-8 pt-6 shadow-md dark:bg-gray-700 dark:text-white"
        action={formAction}
      >
        <div className="w-full items-center">
          <Image src={ProjectLogo} alt="project logo" />
        </div>
        <h1 className={`mb-3 py-6 text-2xl`}>Welcome to Job runner</h1>
        <div className="mb-4">
          <label className="mb-2 block text-sm font-bold" htmlFor="username">
            Username
          </label>
          <input
            className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none dark:bg-gray-800 dark:text-white"
            id="username"
            name="username"
            type="text"
            placeholder="Username"
          />
        </div>
        <div className="mb-6">
          <label className="mb-2 block text-sm font-bold" htmlFor="password">
            Password
          </label>
          <input
            className="focus:shadow-outline mb-3 w-full appearance-none rounded border px-3 py-2 leading-tight shadow focus:outline-none dark:bg-gray-800 dark:text-white"
            id="password"
            name="password"
            type="password"
            placeholder="Password"
          />
        </div>
        <div className="flex items-center">
          <button
            type="submit"
            className="inline-block rounded rounded-3xl px-6 py-3 font-bold hover:bg-sky-400 dark:bg-sky-500 dark:text-white"
          >
            Sign In
          </button>
        </div>
        {errorMessage && (
          <div className="flex items-end space-x-1 pt-6" aria-live="polite" aria-atomic="true">
            <p className="text text-red-500">{errorMessage}</p>
          </div>
        )}
      </form>
    </div>
  )
}
