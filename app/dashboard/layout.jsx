"use client"

import { SignedIn, SignIn } from '@clerk/nextjs'
import React from 'react'

function DashboardLayout({children}) {
  return (
    <div>
        <SignedIn>
            
        </SignedIn>
     {children}
    </div>
  )
}

export default DashboardLayout
