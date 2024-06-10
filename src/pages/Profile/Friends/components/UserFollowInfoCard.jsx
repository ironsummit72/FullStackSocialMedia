import { getIsFollowing, getUserDetails, postFollowUnfollow } from "@/api/QueryFunctions"
import DisplayPicture from "@/components/DisplayPicture"
import { useQuery,useMutation,useQueryClient } from "@tanstack/react-query"
import { Button } from "@/shadcomponents/ui/button";
import { Link } from "react-router-dom";
import { Check,UserPlus, User } from "lucide-react";
import { useSelector } from "react-redux";


function UserFollowInfoCard({username}) {
    const queryClient = useQueryClient()
    const loggedInuser=useSelector((state)=>state.userData?.username)
    const {data}=useQuery({
        queryKey: ["userprofile", username],
        queryFn: ({ queryKey }) => getUserDetails(queryKey[1]),
    })
    const {data:isfollowing}=useQuery({
        queryKey:['isfollowing',username],
        queryFn:({queryKey})=>getIsFollowing(queryKey[1]),
        refetchOnWindowFocus:true
      })
      const mutateFollowUnfollow=useMutation({
        mutationFn:(username)=>postFollowUnfollow(username),
        mutationKey:['followunfollow'],onSuccess:()=>{
          queryClient.invalidateQueries({queryKey:['isfollowing']})
          queryClient.invalidateQueries({queryKey:['followers']})
          queryClient.invalidateQueries({queryKey:['following']})
        }
      });
   const onHandleUnFollow=()=>{
    mutateFollowUnfollow.mutate(username)
    }
    const onHandleFollow=()=>{
        mutateFollowUnfollow.mutate(username)
        queryClient.invalidateQueries({queryKey:['isfollowing']})
   }
  return (

    <div className="w-[90%] h-28 px-2 bg-white mt-5 ml-5 rounded-md flex items-center justify-between border border-gray-400">
        <Link to={`/${username}`}>
        <div className="followInfoContainer flex items-center gap-5">
            <DisplayPicture className={`w-24 h-24 rounded-md`} username={username}/>
            <h1 className="font-semibold text-lg">{data?.firstname} {data?.lastname}</h1>
        </div>
        </Link>
      {loggedInuser!==username? isfollowing?.data.data==true ? <Button onClick={onHandleUnFollow} variant='secondary' className='px-10 gap-4'><Check/> Following</Button>: <Button onClick={onHandleFollow} className='px-10 gap-4'><UserPlus/> Follow</Button>:<Button asChild variant='secondary'><Link className="gap-2" to='/'><User />Go Profile</Link></Button>}
    </div>

  )
}

export default UserFollowInfoCard