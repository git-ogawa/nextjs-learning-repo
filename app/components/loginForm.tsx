"use client"
import { useActionState } from "react"
import { authenticate } from "@/app/lib/action"
import { useRouter } from "next/navigation"
import React, { useState, useEffect } from "react"
import { ProjectIcon } from "@/components/ui/icon"

export default function LoginForm() {
  const router = useRouter()
  const [errorMessage, formAction, isPending] = useActionState(authenticate, undefined)

  useEffect(() => {
    if (!isPending && !errorMessage) {
      router.push("/") // ログイン成功後に / にリダイレクト
    }
  }, [isPending, errorMessage, router])

  return (
    <div className='w-full max-w-xs mx-auto'>
      <form className='dark:bg-gray-700 dark:text-white shadow-md rounded px-8 pt-6 pb-8 mb-4' action={formAction}>
        <ProjectIcon />
        <h1 className={`mb-3 text-2xl py-6`}>Welcome to Job runner</h1>
        <div className='mb-4'>
          <label className='block text-sm font-bold mb-2' htmlFor='username'>
            Username
          </label>
          <input
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:bg-gray-800 dark:text-white leading-tight focus:outline-none focus:shadow-outline'
            id='username'
            name='username'
            type='text'
            placeholder='Username'
          />
        </div>
        <div className='mb-6'>
          <label className='block text-sm font-bold mb-2' htmlFor='password'>
            Password
          </label>
          <input
            className='shadow appearance-none border rounded w-full py-2 px-3 dark:bg-gray-800 dark:text-white mb-3 leading-tight focus:outline-none focus:shadow-outline'
            id='password'
            name='password'
            type='password'
            placeholder='Password'
          />
        </div>
        <div className='flex items-center'>
          <button type='submit' className='inline-block rounded rounded-3xl px-6 py-3 dark:bg-sky-500 dark:text-white font-bold hover:bg-sky-400'>
            Sign In
          </button>
        </div>
        {errorMessage && (
          <div className='flex pt-6 items-end space-x-1' aria-live='polite' aria-atomic='true'>
            <p className='text text-red-500'>{errorMessage}</p>
          </div>
        )}
      </form>
    </div>
  )
}
