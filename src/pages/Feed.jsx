import SideNavBar from "@/components/SideNavBar";
import Container from "@/components/Container";
import CreatePostCard from "@/components/CreatePostCard";
import StoryContainer from "@/components/StoryContainer";
import { useEffect, useState } from "react";
import { dialogContext } from "@/context/dialogContext";
import CreatePostDialog from "@/components/Dialogs/CreatePostDialog";
import PostCard from "@/components/PostCard/PostCard";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getAllPostFeed } from "@/api/QueryFunctions";
import React from "react";
import { useInView } from "react-intersection-observer";

function Feed() {
  const [createPostDialog, setCreatePostDialog] = useState(false);
  const { ref, inView, entry } = useInView({
  });
  useEffect(() => {
    fetchNextPage()
  }, [inView]);
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["feed"],
    queryFn: getAllPostFeed,
    initialPageParam: 1,
    getNextPageParam: (pages) => {
      if (pages.currentPage < pages.totalPages) {
        return pages.currentPage + 1;
      } else {
        return pages.totalPage;
      }
    },
  });
  const whatsOnMindOnCLickHandler = () => {
    setCreatePostDialog((state) => !state);
  };
  return (
    <div className="bg-gray-100 w-screen h-auto min-h-screen flex overflow-x-hidden">
      <SideNavBar />
      <Container>
        <StoryContainer/>        
        <dialogContext.Provider
          value={{ createPostDialog, setCreatePostDialog }}>
          <CreatePostDialog />
        </dialogContext.Provider>
        <CreatePostCard whatsOnMindOnCLick={whatsOnMindOnCLickHandler} />
        <div className="containerfeed w-full h-auto flex items-center mt-20 flex-col gap-10">
          {status === "pending" ? (
            <h1>loading</h1>
          ) : status === "error" ? (
            <h1>error</h1>
          ) : (
            <>
              {data.pages.map((group, i) => (
                <React.Fragment key={i}>
                  {group.postIds.map((postId) => (
                    <PostCard key={postId} postId={postId} className={`w-[51%]`} />
                  ))}
                </React.Fragment>
              ))}
              <p ref={ref}>
                {isFetchingNextPage
                  ? "Loading more..."
                  : hasNextPage
                  ? "Load More"
                  : "Nothing more to load"}
              </p>
            </>
          )}
        </div>
      </Container>
    </div>
  );
}

export default Feed;
