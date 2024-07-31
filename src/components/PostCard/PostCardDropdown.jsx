import { deletePost } from "@/api/QueryFunctions";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shadcomponents/ui/dropdown-menu";
import { useToast } from "@/shadcomponents/ui/use-toast";
import { useMutation } from "@tanstack/react-query";

import { Bookmark, Trash } from "lucide-react";
import { useSelector } from "react-redux";
function PostCardDropdown({ children, className, username, postId }) {
  const { toast } = useToast();
  const loggedInusername = useSelector((state) => state?.userData?.username);
  const onDeletePostHandler = () => {
    mutation.mutate(postId);
  };

  const mutation = useMutation({
    mutationFn: (pid) => deletePost(pid),
    mutationKey: [],
    onSuccess: (res) => {
      toast({
        title: "Post Deleted",
        description: res?.message,
      });
    },
  });
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
          <DropdownMenuItem>
            <span className="flex gap-3">
              <Bookmark /> Save Post
            </span>
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
