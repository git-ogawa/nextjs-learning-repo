import React, { useState } from "react"
import { Meta, StoryFn } from "@storybook/react"
import PopupModal from "./popupModal"

export default {
  title: "PopupModal",
  component: PopupModal,
  tags: ["autodocs"],
} as Meta<typeof PopupModal>

const Template: StoryFn<typeof PopupModal> = (args) => {
  const [isOpen, setIsOpen] = useState(false)

  const handleYes = () => {
    setIsOpen(false)
    alert("Yes clicked")
  }

  const handleNo = () => {
    setIsOpen(false)
    alert("No clicked")
  }

  return (
    <div>
      <button onClick={() => setIsOpen(true)} className='px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700'>
        Open Modal
      </button>
      <PopupModal {...args} open={isOpen} onYes={handleYes} onNo={handleNo} />
    </div>
  )
}

export const Default = Template.bind({})
Default.args = {
  text: "Are you sure you want to proceed?",
}
