
import { Link } from "react-router-dom"


function PhotoCard({username}) {
  return (
    <div className='relative max-w-[35%]   bg-white rounded-lg shadow-2xl mr-20 px-10 py-4 mt-10'>
   <div className="headercon flex items-center justify-between">
   <h1 className="Intro font-bold text-black text-lg  ">Photos</h1>
   <Link  to={`/${username}/photos`} className="text-blue-500 font-semibold">See All Photos</Link>
   </div>
   <div className="grid grid-rows-3 grid-cols-3 gap-3 mt-3">
    {/* TODO:Loop the user photos here not more than 9  with links to the photo id  */}
   </div>
   
</div>
  )
}

export default PhotoCard