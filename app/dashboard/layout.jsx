"use client"

import { SignedIn, SignIn } from '@clerk/nextjs'
import React from 'react'
import SideNav from './_components/SideNav'

function DashboardLayout({children}) {
  return (
    <div>
        <SignedIn>
        <div className = "md:w-64 fixed">
          <SideNav/>
        </div>
    <div className ="md:ml-64">
    {children}
    </div>
        </SignedIn>
     </div>
  )
}

export default DashboardLayout
