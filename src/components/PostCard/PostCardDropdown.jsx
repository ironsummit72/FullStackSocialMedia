import { deletePost, getIsPostSaved, postSavePost } from "@/api/QueryFunctions";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shadcomponents/ui/dropdown-menu";
import { useToast } from "@/shadcomponents/ui/use-toast";
import { useMutation,useQuery,useQueryClient } from "@tanstack/react-query";

import { Bookmark, Trash } from "lucide-react";
import { useSelector } from "react-redux";
function PostCardDropdown({ children, className, username, postId }) {
  const queryClient=useQueryClient();
  const { toast } = useToast();
  const loggedInusername = useSelector((state) => state?.userData?.username);
  const {data:isPostSaved}=useQuery({
    queryKey:['ispostsaved',postId],
    queryFn:({queryKey})=>getIsPostSaved(queryKey[1]),
    enabled:!!postId
  });
  const deleteMutation = useMutation({
    mutationFn: (pid) => deletePost(pid),
    onSuccess: (res) => {
      toast({
        title: "Post Deleted",
        description: res?.message,
      });
    },
  });
  const savePostMutation = useMutation({
    mutationFn: (pid) => postSavePost(pid),
    onSuccess: (res) => {
      toast({
        title: "Post saved",
        description: res?.message,
      });
      queryClient.invalidateQueries({queryKey:['ispostsaved']})
    },
  });
  const onDeletePostHandler = () => {
    deleteMutation.mutate(postId);
  };
  const onSavePostHandler=()=>{
    savePostMutation.mutate(postId)
  }
  return (
    <DropdownMenu className={className}>
      <DropdownMenuTrigger>{children}</DropdownMenuTrigger>
      <DropdownMenuContent
        onCloseAutoFocus={(e) => {
          e.preventDefault();
        }}
        className={className}
      >
        <div className={"flex flex-col gap-2"}>
          <DropdownMenuItem onClick={onSavePostHandler}>
           {isPostSaved? <span className="flex gap-3">
              <Bookmark fill="black" /> Unsave Post
            </span>: <span className="flex gap-3">
              <Bookmark /> Save Post
            </span>}
          </DropdownMenuItem>
          {loggedInusername === username ? (
            <DropdownMenuItem onClick={onDeletePostHandler}>
              <span className="flex gap-3 text-red-500">
                <Trash />
                Delete Post
              </span>
            </DropdownMenuItem>
          ) : (
            <></>
          )}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default PostCardDropdown;
