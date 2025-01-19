"use client"
import React from "react"
import "@/components/ui/global.css"
import LoginForm from "@/components/loginForm"
import { useActionState } from "react"
import { authenticate } from "@/app/lib/action"

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <head>
        <title>Login</title>
      </head>
      <body>
        <main className='flex items-center justify-center h-screen dark:bg-gray-800'>
          <div className='relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4'>{children}</div>
        </main>
      </body>
    </html>
  )
}
