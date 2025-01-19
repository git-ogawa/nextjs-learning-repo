"use client"
import { Template } from "@/app/types/template"
import { useState } from "react"
import type { Monaco } from "@monaco-editor/react"
import dynamic from "next/dynamic"
import yaml from "js-yaml"
import { ExclamationTriangleIcon, CheckCircleIcon } from "@heroicons/react/24/outline"
import Link from "next/link"
import { deleteTemplate } from "@/app/api/template"
import PopupModal from "@/components/popupModal"

export default function TemplateDetail({ template }: { template: Template }) {
  const [showConfirm, setShowConfirm] = useState(false)
  const [apiCallResult, setAPIResult] = useState<{
    result: "success" | "error" | "none"
    message: string
    additionalText?: string
  }>({ result: "none", message: "", additionalText: "" })

  const yamlContent = yaml.dump(template.content)
  const MonacoEditor = dynamic(() => import("@monaco-editor/react"), { ssr: false })

  const handleDeleteTemplate = () => {
    setShowConfirm(true)
  }

  const handleConfirmYes = async () => {
    const res = await deleteTemplate([template.templateName])
    setShowConfirm(false)
    handleApiCall(res)
  }

  const handleConfirmNo = () => {
    setShowConfirm(false)
  }

  const handleEditorWillMount = (monaco: Monaco) => {
    console.log("Monaco Editor is loading...", monaco)
  }

  const handleApiCall = async (res: JobApiResponse) => {
    setAPIResult({ result: "none", message: "", additionalText: "" })

    switch (res.status) {
      case "success":
        setAPIResult({ result: "success", message: res.data.title, additionalText: res.data.body })
        break
      case "error":
        setAPIResult({ result: "error", message: res.data.title, additionalText: res.data.body })
        break
      default:
        setAPIResult({ result: "error", message: "", additionalText: "Unknown error" })
        break
    }
    setTimeout(() => {
      setAPIResult({ result: "none", message: "", additionalText: "" })
    }, 10000)
  }

  return (
    <div className='flex-none px-12 py-12 bg-gray-800'>
      <h2 className='flex dark:text-white text-3xl py-6 font-bold'>{`Template > ${template.templateName}`}</h2>

      {apiCallResult.result === "success" && (
        <div className='pb-4'>
          <div className='w-full flex-grow rounded rounded-xl px-6 py-4 bg-green-600 '>
            <div className='flex text-2xl font-bold text-gray-900 dark:text-white items-center gap-2'>
              <CheckCircleIcon className='w-10 h-10 ' /> {apiCallResult.message}
            </div>
            <div className='text-xl py-2'>
              <div className={`text-base font-semibold leading-relaxed  dark:text-white`}>{apiCallResult.additionalText}</div>
            </div>
          </div>
        </div>
      )}

      {apiCallResult.result === "error" && (
        <div className='pb-4'>
          <div className='w-full flex-grow rounded-xl px-6 py-4 bg-red-400 '>
            <div className='flex text-2xl font-bold text-gray-900 dark:text-white items-center gap-2'>
              <ExclamationTriangleIcon className='w-10 h-10 ' /> {apiCallResult.message}
            </div>
            <div className='text-xl py-2'>
              <div className={`text-base font-semibold leading-relaxed  dark:text-white`}>{apiCallResult.additionalText}</div>
            </div>
          </div>
        </div>
      )}

      <div className='flex justify-between items-center mb-4'>
        <div className='flex gap-2 mr-auto '>
          <Link href='/template/update'>
            <button type='button' className='inline-block rounded-3xl px-6 py-2 dark:bg-sky-500 dark:text-white font-bold hover:bg-sky-400'>
              Update
            </button>
          </Link>

          <button
            type='button'
            className='inline-block rounded-3xl px-4 py-2 dark:bg-orange-400 dark:text-white font-bold  hover:dark:bg-orange-300'
            onClick={handleDeleteTemplate}
          >
            Delete
          </button>
        </div>
      </div>

      {showConfirm && (
        <PopupModal text='Do you want to delete the template?' open yesLabel='Yes' noLabel='No' onYes={handleConfirmYes} onNo={handleConfirmNo} />
      )}

      <div className='flex-auto p-4 border border-white dark:text-white max-w-7xl'>
        <h3 className='p-2 text-2xl font-bold'>Overview</h3>
        <div className='grid grid-cols-5 gap-4 p-4'>
          <div>
            <div className='font-bold text-lg'>Version</div>
            <div className=''>
              <div className='flex items-center'>{template.version}</div>
            </div>
          </div>
          <div>
            <div className='font-bold text-lg'>Created at</div>
            <div className=''>{template.createdAt}</div>
          </div>
        </div>
      </div>

      <h2 className='flex dark:text-white text-3xl py-6 font-bold'>Tags</h2>
      <div className='flex-grow x p-4 border border-white max-w-7xl dark:text-white'>
        {template.tags && Object.keys(template.tags).length > 0 && (
          <div className='flex-grow x p-4 max-w-7xl '>
            <div>
              {Object.entries(template.tags).map(([key, value]) => (
                <div key={key} className='flex gap-2'>
                  {key}: {value}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <h2 className='flex dark:text-white text-3xl py-6 font-bold'>Content</h2>

      <div className='flex-grow x p-4 border border-white'>
        <div style={{ height: "50vh" }}>
          <MonacoEditor
            height='100%'
            defaultLanguage='yaml'
            value={yamlContent}
            beforeMount={handleEditorWillMount}
            theme='vs-dark' // ダークテーマを適用
            options={{
              fontSize: 14,
              minimap: { enabled: false },
              scrollBeyondLastLine: false,
              readOnly: true,
            }}
          />
        </div>
      </div>
    </div>
  )
}
