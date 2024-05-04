import SideNavBar from "@/components/SideNavBar";
import Container from "@/components/Container";
import CreatePostCard from "@/components/CreatePostCard";
import StoryContainer from "@/components/StoryContainer";



function Feed() {  
return <div className="bg-gray-100 w-screen h-auto min-h-screen flex overflow-x-hidden">
<SideNavBar/>
<Container>
<StoryContainer>
{/* // add logic to show stories of other users who they follow */}


</StoryContainer>
<CreatePostCard/>
</Container>
  </div>;

}

export default Feed;
