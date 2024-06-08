import { useQuery } from "@tanstack/react-query";
import UserFollowInfoCard from "../components/UserFollowInfoCard";
import {useParams} from 'react-router-dom';
import { getFollowing } from "@/api/QueryFunctions";

function Following() {
    const {username}=useParams()
    const {data:following}=useQuery({
        queryKey:['following',username],
        queryFn:({queryKey})=>getFollowing(queryKey[1]),
       
      })
  return ( following?.data.data.length>0?
    <div className="w-full min-h-screen h-auto ">
      <div className="followcontainer grid grid-cols-2 grid-rows-min">    
        {following?.data.data.map((following)=> <UserFollowInfoCard key={following?.username} username={following?.username} />)}
      </div>
    </div>:<div className='w-full  h-auto flex items-start justify-center'>
        <h1 className="text-2xl font-semibold">Not following anyone</h1>
    </div>
  );
}

export default Following;
