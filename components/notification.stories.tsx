import Notification from "./notification"

export default {
  title: "Notification",
  component: Notification,
  argTypes: {
    type: { control: "select", options: ["success", "error"] },
    message: { control: "text" },
    onClose: { action: "clicked" },
  },
  tags: ["autodocs"],
}

export const Default = {
  args: {
    type: "success",
    message: "Successfully",
  },
}

export const Success = {
  args: {
    type: "success",
    message: "Successfully",
  },
}

export const Failed = {
  args: {
    type: "error",
    message: "Failed",
  },
}

export const JobCreateSuccess = {
  args: {
    type: "success",
    message: "Successfully created job!",
    additionalText: "Job ID: j12345",
  },
}

export const JobCreateFailed = {
  args: {
    type: "error",
    message: "Failed to creat job!",
    additionalText: "error message xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  },
}
