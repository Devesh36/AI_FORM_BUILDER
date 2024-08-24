"use client"
import { Button } from '@/components/ui/button'
import { SignInButton, UserButton, useUser } from '@clerk/nextjs';
import Image from 'next/image'
import React from 'react'
import Link from 'next/link';
function Header() {
  const {user , isSignedIn } = useUser();
  return (
    <div className = "bg-white-100 p-4 ">
        <div className = "flex justify-between ">
          <Image src ={'/logo.svg'} width={180} height ={50} alt = 'logo'/>

          {isSignedIn?
        <div className = "flex items-center gap-5">
          <Link href={'/dashboard'}>
          <Button variant = "outline">Dashboard</Button>
          </Link>
            <UserButton/>
        </div>  :
        <SignInButton>
           <Button>Get Started</Button>
        </SignInButton>
        }
         
        </div>
    </div>
  )
}

export default Header
