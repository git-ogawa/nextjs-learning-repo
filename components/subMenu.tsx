import React from "react"

type SubMenuProps = {
  items: string[]
  isVisible: boolean
}

const SubMenu: React.FC<SubMenuProps> = ({ items, isVisible }) => {
  if (!isVisible) return null

  return (
    <ul className='absolute bg-white shadow-lg rounded-md mt-2'>
      {items.map((item, index) => (
        <li key={index} className='px-4 py-2 hover:bg-gray-200'>
          {item}
        </li>
      ))}
    </ul>
  )
}

export default SubMenu
