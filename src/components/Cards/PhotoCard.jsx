
import { getPhotosIntroCard } from "@/api/QueryFunctions"
import { useQuery } from "@tanstack/react-query"
import Photo from "@/components/Photo"

import { Link } from "react-router-dom"
function PhotoCard({username}) {
  const {data}=useQuery({
    queryKey:['photosintro',username],
    queryFn:({queryKey})=>getPhotosIntroCard(queryKey[1])
  })
  return (
    <div className='relative max-w-[100%]   bg-white rounded-lg shadow-2xl mr-20 px-10 py-4  '>
   <div className="headercon flex items-center justify-between">
   <h1 className="Intro font-bold text-black text-lg  ">Photos</h1>
   <Link  to={`/${username}/photos`} className="text-blue-500 font-semibold">See All Photos</Link>
   </div>
   <div className="grid grid-rows-3 grid-cols-3 gap-3 mt-3">

   { data?.data.data.map((datas)=><Photo postId={datas?._id} className={`w-40 h-40 object-cover`} key={datas.media.filename} filename={datas.media.filename}/>)}

   </div>
   
</div>
  )
}

export default PhotoCard