
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/shadcomponents/ui/dropdown-menu"

import { Trash } from 'lucide-react'
import { useMutation,useQueryClient } from '@tanstack/react-query'
import { deleteStory } from '@/api/QueryFunctions'
import { useToast } from '@/shadcomponents/ui/use-toast'


function StoryDropDown({children,storyId}) {
    const {toast}=useToast();
    const queryClient = useQueryClient()
    
    const mutation=useMutation({
        mutationFn:(sid)=>deleteStory(sid),
        onSuccess:()=>{
             queryClient.invalidateQueries({ queryKey: ["story"] }); 
             toast({title: 'Story Deleted',description:'Story deleted successfully'})
        }
    })
  return (
    <DropdownMenu>
    <DropdownMenuTrigger>{children}</DropdownMenuTrigger>
    <DropdownMenuContent>
      <DropdownMenuLabel>Story Menu</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuItem onClick={()=>{mutation.mutate(storyId)}} ><span className="text-red-500 flex items-center gap-2 "><Trash/>Delete Story</span></DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
  )
}
export default StoryDropDown