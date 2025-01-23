"use client"
import { authenticate } from "@/app/lib/action"
import { ProjectIcon } from "@/components/ui/icon"
import { useActionState } from "react"

export default function LoginForm() {
  const [errorMessage, formAction, isPending] = useActionState(authenticate, undefined)

  return (
    <div className="mx-auto w-full max-w-xs">
      <form
        className="mb-4 rounded px-8 pt-6 pb-8 shadow-md dark:bg-gray-700 dark:text-white"
        action={formAction}
      >
        <ProjectIcon />
        <h1 className="mb-3 py-6 text-2xl">Welcome to Job runner</h1>
        <div className="mb-4">
          <label className="mb-2 block font-bold text-sm" htmlFor="username">
            Username
          </label>
          <input
            className="w-full appearance-none rounded border px-3 py-2 text-gray-700 leading-tight shadow focus:shadow-outline focus:outline-none dark:bg-gray-800 dark:text-white"
            id="username"
            name="username"
            type="text"
            placeholder="Username"
          />
        </div>
        <div className="mb-6">
          <label className="mb-2 block font-bold text-sm" htmlFor="password">
            Password
          </label>
          <input
            className="mb-3 w-full appearance-none rounded border px-3 py-2 leading-tight shadow focus:shadow-outline focus:outline-none dark:bg-gray-800 dark:text-white"
            id="password"
            name="password"
            type="password"
            placeholder="Password"
          />
        </div>
        <div className="flex items-center">
          <button
            type="submit"
            className="inline-block rounded-3xl px-6 py-3 font-bold hover:bg-sky-400 dark:bg-sky-500 dark:text-white"
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
