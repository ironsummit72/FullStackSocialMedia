import { getShowLikes } from "@/api/QueryFunctions"
import {
    Dialog,
    DialogContent,
   
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/shadcomponents/ui/dialog"
import { useQuery } from "@tanstack/react-query"
import UserInfoCard from "../UserInfoCard";

  
function ShowLikesDialog({children,postId}) {
    const showlikesquery=useQuery({
        queryKey:['showlikes',postId],
        queryFn:({queryKey})=>getShowLikes(queryKey[1])
    });
   
  return (
    <Dialog >
    <DialogTrigger asChild>
        {children}
    </DialogTrigger>
    <DialogContent>
        <DialogTitle>Likes</DialogTitle>
      <DialogHeader>
       {showlikesquery?.data?.map((userdata)=><UserInfoCard key={userdata.username} username={userdata.username}/>)}
      </DialogHeader>
    </DialogContent>
  </Dialog>
  )
}

export default ShowLikesDialog