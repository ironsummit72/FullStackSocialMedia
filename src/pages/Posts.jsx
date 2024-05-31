import IntroCard from "@/components/Cards/IntroCard"
import PhotoCard from "@/components/Cards/PhotoCard"
import {useParams} from 'react-router-dom'


function Posts() {
  const {username}=useParams()
  return (
    <div className="bg-gray-100 mt-10 ">
      <IntroCard/>
      <PhotoCard username={username}/>
    </div>
  )
}

export default Posts