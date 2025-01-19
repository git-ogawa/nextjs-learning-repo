import { Revenue } from "./definitions"

export const getStatusClass = (status: string) => {
  switch (status) {
    case "queued":
      return "bg-sky-500"
    case "active":
    case "success":
      return "bg-green-500"
    case "failed":
    case "disconnected":
      return "bg-red-500"
    case "deregistered":
    case "canceled":
      return "bg-orange-500"
    default:
      return ""
  }
}

export const getStatusIcon = (status: string) => {
  return <div className={`h-2.5 w-2.5 rounded-full ${getStatusClass(status)} me-2`}></div>
}
