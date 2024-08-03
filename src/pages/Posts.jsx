import { getUserPostFeed } from "@/api/QueryFunctions";
import IntroCard from "@/components/Cards/IntroCard";
import PhotoCard from "@/components/Cards/PhotoCard";
import PostCard from "@/components/PostCard/PostCard";

import { useInfiniteQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";
function Posts() {
  const { username } = useParams();
  const { ref, inView } = useInView({});
  useEffect(() => {
    fetchNextPage();
  }, [inView]);
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useInfiniteQuery({
      queryKey: ["postfeed", username],
      queryFn: ({ pageParam, queryKey }) =>
        getUserPostFeed(queryKey[1], pageParam, 5),
      initialPageParam: 1,
      getNextPageParam: (pages) => {
        if (pages.currentPage < pages.totalPages) {
          return pages.currentPage + 1;
        } else {
          return pages.totalPage;
        }
      },
    });
  return (
    <div className="mt-10  flex ">
      <div className="leftdiv h-full  w-[40%]  sticky top-0 flex flex-col gap-5 justify-around">
        <IntroCard username={username} />
        <PhotoCard username={username} />
      </div>
      <div className="rightdiv h-auto min-h-screen w-[50%] mt-10 ml-10 gap-10 flex flex-col">
        {status === "pending" ? (
          <p>Loading...</p>
        ) : status === "error" ? (
          <p>Error...</p>
        ) : (
          data.pages.map((group, i) => {
            return (
              <React.Fragment key={i}>
                {group.data.map((posts) => (
                  <PostCard
                    key={posts._id}
                    postId={posts._id}
                    className={"w-[95%]"}
                  />
                ))}
              </React.Fragment>
            );
          })
        )}
        <p className="text-center" ref={ref}>
          {isFetchingNextPage
            ? "Loading more..."
            : hasNextPage
            ? "Load More"
            : "Nothing more to load"}
        </p>
      </div>
    </div>
  );
}

export default Posts;
