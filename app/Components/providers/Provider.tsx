"use client"
import { SessionProvider } from 'next-auth/react'
import React from 'react'

const Provider = ({children}:{children:React.ReactNode}) => {
  return (
    <SessionProvider refetchInterval={10*60}>
        {children}
    </SessionProvider>
  )
}

export default Provider