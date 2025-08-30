"use client"

import React from 'react'
import { usePageLoading } from '@/hooks/use-page-loading'
import { PageLoading } from '@/components/ui/loading'

interface PageLoaderWrapperProps {
  children: React.ReactNode
}

export function PageLoaderWrapper({ children }: PageLoaderWrapperProps) {
  const { isLoading } = usePageLoading()

  return (
    <>
      {isLoading && (
        <div className="fixed inset-0 z-50 bg-white">
          <PageLoading />
        </div>
      )}
      <div className={`transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
        {children}
      </div>
    </>
  )
}
