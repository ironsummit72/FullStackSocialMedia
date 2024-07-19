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
      <DialogHeader className={`h-auto max-h-[80vh]`}>
        <div className="overflow-y-scroll h-full">
       {showlikesquery?.data?.map((userdata)=><UserInfoCard key={userdata.username} username={userdata.username}/>)}
        </div>
      </DialogHeader>
    </DialogContent>
  </Dialog>
  )
}

export default ShowLikesDialog