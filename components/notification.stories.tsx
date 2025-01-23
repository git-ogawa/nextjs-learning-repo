import Notification from "./notification"

export default {
  title: "Notification",
  component: Notification,
  tags: ["autodocs"],
}

export const Default = {
  args: {
    result: "success",
    title: "Success",
    message: "Successfully",
    isVisible: true,
    onClickClose: () => {},
  },
}

export const Width60percent = {
  args: {
    result: "success",
    title: "Success",
    message: "Set width to w-3/5",
    width: "w-3/5",
    isVisible: true,
  },
}

export const Success = {
  args: {
    result: "success",
    title: "Success",
    message: "API call Success",
    isVisible: true,
  },
}

export const Error = {
  args: {
    result: "error",
    title: "Failed to call API",
    message: "API call failed",
    isVisible: true,
  },
}

export const NoVisible = {
  args: {
    result: "error",
    title: "Failed to call API",
    message: "API call failed",
    isVisible: false,
  },
}
