import axios from "axios"
import { TemplateList } from "@/app/types/template"
import { exampleTemplateList } from "@/app/mock/template"

export async function listTemplate(): Promise<TemplateList> {
  if (process.env.NEXT_PUBLIC_ENV == "development") {
    return exampleTemplateList
  }

  const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/template/list`, {})

  if (response.status !== 200) {
    throw new Error("Failed to fetch data")
  }
  return response.data as TemplateList
}

export async function getTemplate(name: string): Promise<Template> {
  if (process.env.NEXT_PUBLIC_ENV == "development") {
    const template = exampleTemplateList.find((template) => template.templateName === name)
    return template || null
  }

  const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/template/list`, {})

  if (response.status !== 200) {
    throw new Error("Failed to fetch data")
  }
  return response.data as Template
}

export async function deleteTemplate(name: string): Promise<Template> {
  if (process.env.NEXT_PUBLIC_ENV == "development") {
    return {
      status: "success",
      data: {
        title: "Successfully",
        body: `Delete the template`,
      },
    }
  }
}
