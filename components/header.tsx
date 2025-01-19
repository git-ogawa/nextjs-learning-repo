import React from "react"

export type HeaderProps = {
  bgColor: string
  text: string
}

export default function Header({ bgColor = "", text = "" }: HeaderProps) {
  return (
    <header className={`text-white py-6 ${bgColor}`}>
      <div className='container mx-auto flex justify-center items-center'>
        <h1 className='text-2xl font-bold'>{text}</h1>
      </div>
    </header>
  )
}
