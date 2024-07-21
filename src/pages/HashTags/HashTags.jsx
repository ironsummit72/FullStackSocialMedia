import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import Header from "./components/Header";
import { getHashTags } from "@/api/QueryFunctions";
import {Link} from 'react-router-dom'
import { Button } from "@/shadcomponents/ui/button";
import PostCard from "@/components/PostCard/PostCard";
function HashTags() {
  const { tagname } = useParams();
  const { data } = useQuery({
    queryKey: ["hashtag", tagname],
    queryFn: ({ queryKey }) => getHashTags(queryKey[1]),
    enabled: !!tagname,
  });

  if (data?.tagName) {
    return (
      <div className="w-full flex flex-col bg-gray-100/20 items-center gap-10">
        <Header tagname={data?.tagName} postcount={data?.posts.length} followscount={data?.followers.length} />
         {data?.posts.map((posts)=><PostCard key={posts._id} postId={posts._id}/>)}
      </div>
    );
  } else {
    return (
      <div className="w-full h-screen flex items-center justify-center ">
        <div className="flex flex-col items-center gap-5 ">
        <h1 className="text-2xl font-semibold">This hashTag isn't available at the moment</h1>
        <Link className="text-sky-500 font-bold" to={'/'}>Go Back</Link>
        </div>
      </div>
    );
  }
}

export default HashTags;
