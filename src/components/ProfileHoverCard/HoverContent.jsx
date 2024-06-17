import { useQuery,useQueryClient,useMutation } from "@tanstack/react-query";
import { getUserDetails,getFollowers,getFollowing,getIsFollowing,postFollowUnfollow,getPhotosIntroCard } from "@/api/QueryFunctions";
import DisplayPicture from "../DisplayPicture";
import {Link} from 'react-router-dom'
import { Button } from "@/shadcomponents/ui/button";
import {MessageSquare,Check,UserPlus,Pencil} from 'lucide-react'
import { useSelector } from "react-redux";
import Photo from "@/components/Photo";
function HoverContent({username}) {
    const queryClient = useQueryClient()
    const loggedInuser=useSelector((state)=>state.userData?.username)
    const { data } = useQuery({
        queryKey: ["userprofile", username],
        queryFn: ({ queryKey }) => getUserDetails(queryKey[1]),
        enabled:!!username
      });
      const {data:followers}=useQuery({
        queryKey:['followers',username],
        queryFn:({queryKey})=>getFollowers(queryKey[1]),
        enabled:!! username,
      })
      const {data:following}=useQuery({
        queryKey:['following',username],
        queryFn:({queryKey})=>getFollowing(queryKey[1]),
        enabled:!! username,
      })
      const {data:isfollowing}=useQuery({
        queryKey:['isfollowing',username],
        queryFn:({queryKey})=>getIsFollowing(queryKey[1]),
        enabled:!! username,
        refetchOnWindowFocus:true
      })
      const mutateFollowUnfollow=useMutation({
        mutationFn:(username)=>postFollowUnfollow(username),
        mutationKey:['followunfollow'],
        onSuccess:()=>{
          queryClient.invalidateQueries({queryKey:['isfollowing']})
          queryClient.invalidateQueries({queryKey:['followers']})
          queryClient.invalidateQueries({queryKey:['following']})
        }
      });
      const {data:photoData}=useQuery({
        queryKey:['photosintro',username],
        queryFn:({queryKey})=>getPhotosIntroCard(queryKey[1])
      })
      const onHandleUnFollow=()=>{
        mutateFollowUnfollow.mutate(username)
        }
        const onHandleFollow=()=>{
          mutateFollowUnfollow.mutate(username)
        }
  return (
    <div className="flex flex-col items-center gap-2">
        <div className="flex items-center  gap-5">
        <DisplayPicture username={username} className="w-20 h-20 rounded-full"/>
        <Link to={`/${username}`}>
          <div className="flex flex-col">
           <h1 className="text-lg">{data?.firstname} {data?.lastname}</h1>
          <span  className="font-semibold text-gray-500">@{data?.username}</span>
          </div>
        </Link>
        </div>
        <div className="followersinfo mt-4">
        <div className="followersInfo flex gap-10 w-fit ">
              <Link to={`/${data?.username}/friends/followers`}>Followers <span className="font-semibold">{followers?.data.data.length}</span></Link>
              <Link to={`/${data?.username}/friends/following`}>Following <span className="font-semibold">{following?.data.data.length}</span></Link>
            </div>
        </div>
        <div className="profilebtn flex gap-10">
                <Button variant='secondary' className={' gap-4  '}><MessageSquare />Message</Button>
                {loggedInuser!==username? isfollowing?.data.data==true ? <Button variant='secondary' onClick={onHandleUnFollow} className='px-10 gap-4'><Check/> Following</Button>: <Button disabled={mutateFollowUnfollow.isPending} onClick={onHandleFollow} className='px-10 gap-4'><UserPlus/> Follow</Button>:<Button asChild><Link className="gap-2" to='/set/dp'><Pencil /> Edit Avatar</Link></Button>}
              </div>
              <div className="grid grid-cols-3 gap-3 mt-3">
{ photoData?.data.data.slice(0,3).map((datas)=><Photo postId={datas?._id} className={`w-40 h-40 object-cover`} key={datas.media.filename} filename={datas.media.filename}/>)}
</div>
    </div>
  )
}

export default HoverContent