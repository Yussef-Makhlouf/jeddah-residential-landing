"use client"

import { useState } from "react"
import { Sidebar } from "@/component/sidebar"
import { Header } from "@/component/header"
import "./globals.css"


export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <html lang="ar" dir="rtl">
      <head>
    
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        <div className="min-h-screen bg-gray-50" dir="rtl">
          <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
          
          <div className="lg:pl-72">
            <Header setSidebarOpen={setSidebarOpen} />
            
            <main className="py-10">
              <div className="px-4 sm:px-6 lg:px-8">
                {children}
              </div>
            </main>
          </div>
        </div>
      </body>
    </html>
  )
}
