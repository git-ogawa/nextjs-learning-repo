import UserProfile from "./userProfile"

export default {
  title: "UserProfile",
  component: UserProfile,
  tags: ["autodocs"],
} as Meta

export const Default = {
  args: {
    isOpen: false,
    onClick: () => {},
    formAction: () => {},
  },
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
}
