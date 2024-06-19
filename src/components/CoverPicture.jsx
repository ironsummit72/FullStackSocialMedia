import  { useEffect, useState } from 'react';
import { AspectRatio } from '@/shadcomponents/ui/aspect-ratio';
import { useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { getCoverPicture } from '@/api/QueryFunctions';
function CoverPicture({className,username}) {
    const [CoverPicture,setCoverPicture]=useState('');
    const loggedInuser=useSelector((state)=>state.userData?.username)
    const { data } = useQuery({ queryKey: ["coverpicture", username? username:loggedInuser],queryFn:({queryKey})=>getCoverPicture(queryKey[1]),enabled:!!loggedInuser});
    useEffect(()=>{
     if(data)
      {
        setCoverPicture(URL.createObjectURL(data))
      }
    },[data])
  return (
    <div className="w-full h-[70%] ">
      <AspectRatio className={`flex justify-center h-full  ${className}`} ratio={16 / 9}>
        <video poster={CoverPicture} alt="Image" className="rounded-md object-cover w-[80%] h-[65%] object-[top_right]" />
      </AspectRatio>
    </div>
  );
}

export default CoverPicture;