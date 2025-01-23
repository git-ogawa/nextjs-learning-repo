"use client"
import type React from "react"
import "@/components/ui/global.css"

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <title>Login</title>
      </head>
      <body>
        <main className="flex h-screen items-center justify-center dark:bg-gray-800">
          <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4">
            {children}
          </div>
        </main>
      </body>
    </html>
  )
}
