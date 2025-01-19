import { TemplateList } from "@/app/types/template"

export const exampleTemplateList: TemplateList = [
  {
    id: "1",
    templateName: "template-1",
    createdAt: "2023-01-01T00:00:00Z",
    version: 1,
    content: {
      image: "nginx",
      cpu: 1024,
      env: {
        key1: "value1",
        key2: "value2",
      },
      memory: 1024,
      privileged: false,
      version: 1,
      command: ["hello", "world"],
    },
    tags: {
      key1: "value1",
      key2: "value2",
    },
  },
  {
    id: "2",
    templateName: "template-2",
    createdAt: "2023-01-01T00:00:00Z",
    version: 2,
    content: {
      version: 2,
      command: ["hello", "world"],
    },
  },
  {
    id: "3",
    templateName: "template-3",
    createdAt: "2023-01-01T00:00:00Z",
    version: 3,
    content: {
      version: 1,
      command: ["hello", "world"],
    },
  },
  {
    id: "4",
    templateName: "template-4",
    createdAt: "2023-01-01T00:00:00Z",
    version: 4,
    content: {
      version: 1,
      command: ["hello", "world"],
    },
  },
]
