"use client"
import React, {useState} from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { Textarea } from "@/components/ui/textarea"

  

function CreateForm() {
    const [openDialog,setOpenDailog] = useState(false)
  return (
    <div>
        <Button>+ Create Form </Button>
      <Dialog open= {open}>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Create new Form </DialogTitle>
      <DialogDescription>
      <Textarea />
 
      </DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog>

    </div>
  )
}

export default CreateForm
