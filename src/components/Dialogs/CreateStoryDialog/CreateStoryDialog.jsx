import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/shadcomponents/ui/dialog"
import CreateStoryDialogContent from './components/CreateStoryDialogContent'
  
function CreateStoryDialog({children}) {
  return (
   <Dialog>
    <DialogTrigger asChild>
        {children}
    </DialogTrigger>
    <DialogContent>
        <DialogHeader>
            <DialogTitle>Create Story</DialogTitle>
        </DialogHeader>
      <CreateStoryDialogContent/>
    </DialogContent>
   </Dialog>
  )
}

export default CreateStoryDialog