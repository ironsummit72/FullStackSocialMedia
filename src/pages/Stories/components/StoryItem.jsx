import { getStoryById } from "@/api/QueryFunctions";
import { useQuery } from "@tanstack/react-query";
import StoryPhoto from "./StoryPhoto";
import StoryVideo from "./StoryVideo";
import StoryNavbar from "./StoryNavbar";



function StoryItem({ storyId }) {
  const { data } = useQuery({
    queryKey: ["getstorydata", storyId],
    queryFn: ({ queryKey }) => getStoryById(queryKey[1]),
  });
  return (
      <div className="h-screen">
       <StoryNavbar username={data?.user.username} storyData={data}/>
       {data?.content.mimetype.split("/")[0]==='image'?<StoryPhoto storyId={data?._id} className={'h-screen'} filename={data?.content.filename}/>:<StoryVideo storyId={data?._id} filename={data?.content.filename}/>}
      </div>
    );
}

export default StoryItem;
