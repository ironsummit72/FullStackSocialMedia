import { getFollowers } from '@/api/QueryFunctions';
import { useQuery } from '@tanstack/react-query';
import {useParams} from 'react-router-dom'
import UserFollowInfoCard from '../components/UserFollowInfoCard';


function Followers() {
    const {username}=useParams()
    const {data:followers}=useQuery({
        queryKey:['followers',username],
        queryFn:({queryKey})=>getFollowers(queryKey[1]),
       
      })
  return (followers?.data.data.length >0 ? 
    <div className="w-full min-h-screen h-auto">
      <div className="followcontainer grid grid-cols-2 grid-rows-min">    
        {followers?.data.data.map((followers)=> <UserFollowInfoCard key={followers?.username} username={followers?.username} />)}
      </div>
    </div>:<div className='w-full  h-auto flex items-start justify-center'>
        <h1 className="text-2xl semi-bold">No followers</h1>
    </div>
  );
}

export default Followers