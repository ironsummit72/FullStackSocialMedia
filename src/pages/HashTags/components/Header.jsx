import { getIsFollowingHashTag, postFollowHashTag,getHashTags } from "@/api/QueryFunctions";
import { Button } from "@/shadcomponents/ui/button";
import { Card, CardContent } from "@/shadcomponents/ui/card";
import { useMutation, useQuery,useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/shadcomponents/ui/use-toast";
function Header({ tagname}) {
  const {toast}=useToast();
  const queryClient=useQueryClient();
  const {data:following}=useQuery({
    queryKey:['hashtagisfollowing',tagname],
    queryFn:({queryKey})=>getIsFollowingHashTag(queryKey[1]),
  })
  const followmutate=useMutation({
    mutationKey:['followunfollowhashtag',tagname],
    mutationFn:(hashtag)=>postFollowHashTag(hashtag),onSuccess:(data)=>{
      queryClient.invalidateQueries({queryKey:['hashtagisfollowing']})
      queryClient.invalidateQueries({queryKey:['hashtagdata']})
       toast({title:'Hashtag follow status',
        description:data.message
       })
    }
  })
  const { data } = useQuery({
    queryKey: ["hashtagdata", tagname],
    queryFn: ({ queryKey }) => getHashTags(queryKey[1]),
    enabled: !!tagname,
  });
  return (
    <Card className="w-full h-48 flex">
      <CardContent className="h-full w-full flex items-center justify-center">
        <div className="w-[80%] flex justify-between  items-center">
          <div className="flex flex-col gap-2">
            <h1 className="font-bold text-2xl">#{tagname}</h1>
            <span className="text-gray-400">{data?.tagData?.posts.length} posts · {data?.tagData?.followers.length} follows</span>
          </div>
         {following?<Button onClick={()=>{followmutate.mutate(tagname)}} className="py-6 px-6 text-md" variant='secondary'>Following</Button>:<Button onClick={()=>{followmutate.mutate(tagname)}} className="py-6 px-6 text-md">Follow</Button> }
        </div>
      </CardContent>
    </Card>
  );
}

export default Header;
