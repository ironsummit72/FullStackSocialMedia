import PostCard from "@/components/PostCard/PostCard";
import { useParams } from "react-router-dom";

function ShowPost() {
  const { postId } = useParams();
  return (
    <div className="w-full h-[50%] flex items-center justify-center">
      <PostCard postId={postId} className={"w-[42%] h-1/2"} />
    </div>
  );
}

export default ShowPost;
