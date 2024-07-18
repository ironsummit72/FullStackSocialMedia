import SideNavBar from "@/components/SideNavBar";
import Container from "@/components/Container";
import CreatePostCard from "@/components/CreatePostCard";
import StoryContainer from "@/components/StoryContainer";
import { useState } from "react";
import { dialogContext } from "@/context/dialogContext";
import CreatePostDialog from "@/components/Dialogs/CreatePostDialog";
import PostCard from "@/components/PostCard/PostCard";
import { useQuery } from "@tanstack/react-query";
import { getAllPostFeed } from "@/api/QueryFunctions";


function Feed() {  
  const [createPostDialog,setCreatePostDialog]=useState(false);
  const query=useQuery({
    queryKey:['feed'],
    queryFn:()=>getAllPostFeed()
  })
  const whatsOnMindOnCLickHandler = ()=>{
    setCreatePostDialog((state)=>!state);
  }
return <div className="bg-gray-100 w-screen h-auto min-h-screen flex overflow-x-hidden">
<SideNavBar/>
<Container>
<StoryContainer>
{/* // add logic to show stories of other users who they follow */}
</StoryContainer>
<dialogContext.Provider value={{createPostDialog,setCreatePostDialog}}>
<CreatePostDialog/>
</dialogContext.Provider>
<CreatePostCard whatsOnMindOnCLick={whatsOnMindOnCLickHandler}/>
<div className="containerfeed w-full h-auto flex items-center mt-20 flex-col gap-10">
  {query.data?.map(data=><PostCard key={data} postId={data} />)}
</div>
</Container>
  </div>;

}

export default Feed;
