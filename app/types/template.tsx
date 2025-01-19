export type Template = {
  id: string
  templateName: string
  createdAt: string
  version: number
  content: TemplateContent
  tags: map[]
}

export type TemplateList = Template[]

export type TemplateContent = {
  image: string
  cpu: number
  memory: number
  env: map
  privileged: boolean
  version: number
  command: string[]
}
