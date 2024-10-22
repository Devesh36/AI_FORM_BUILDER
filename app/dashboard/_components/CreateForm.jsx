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
import { AiChatSession } from '@/configs/AiModel'
import { JsonForms } from '@/configs/schema'
import { db } from '@/configs'
import { useUser } from '@clerk/nextjs'
import moment from 'moment/moment'
import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'

const PROMPT = ", Based on the description, generate a form structure in JSON format containing the following compulsory elements: formTitle, formSubheading, formName, formFields (with each field including: formLabel, fieldName, placeholderName, fieldRequired, fieldType). Ensure that the form is well-structured and adheres to common form conventions."
function CreateForm() {
    const [openDialog,setOpenDailog] = useState(false);
    const [userInput , setUserInput ] = useState();
    const [loading,setLoading]=useState();
    const {user} =  useUser();
    const route = useRouter();

    const onCreateForm=async()=> {

      setLoading(true)
     const result =  await AiChatSession.sendMessage("Description:" +userInput+PROMPT);
     console.log(result.response.text());
      if(result.response.text()){
        const resp=await db.insert(JsonForms)
        .values({
          jsonform:result.response.text(), 
          createdBy:user?.primaryEmailAddress?.emailAddress,
          createdAt:moment().format('DD/MM/yyyy')  
      }).returning({id:JsonForms.id});
      console.log("New Form Id ",resp[0].id);
      if(resp[0].id)
      {
        route.push('/edit-form/'+resp[0].id)
      }
        setLoading(false);
        }
        setLoading(false);
 }
  return (
    <div>
        <Button onClick={()=> setOpenDailog(true)}>+ Create Form </Button>
      <Dialog open={openDialog}>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Create new Form </DialogTitle>
      <DialogDescription>
      <Textarea className="my-2" 
        onChange = {(event) => setUserInput(event.target.value)}
      placeholder="Write description of your form " />
          <div className = 'flex gap-2 my-3 justify-end'>
            <Button variant = "destructive"
            onClick={()=>setOpenDailog(false)}>Cancel</Button>
            <Button 
              disabled={loading }
              onClick={()=>onCreateForm()}>
                {loading?
                <Loader2 className='animate-spin'/>:'Create'
                }

           </Button>
          </div>
      </DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog>

    </div>
  )
}

export default CreateForm
