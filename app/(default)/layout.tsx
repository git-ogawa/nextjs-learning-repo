import "@/components/ui/global.css"
import PageHeader from "@/components/pageHeader"
import SideNav from "@/components/sideNav"

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        <div className="flex h-screen flex-col dark:bg-gray-700">
          <div className="h-[80] flex-none bg-cyan-800 dark:bg-cyan-800">
            <PageHeader />
          </div>
          <div className="flex flex-grow">
            <div className="w-64 flex-none">
              <SideNav />
            </div>

            <div className="flex-grow overflow-auto dark:bg-gray-800">{children}</div>
          </div>
        </div>
      </body>
    </html>
  )
}
