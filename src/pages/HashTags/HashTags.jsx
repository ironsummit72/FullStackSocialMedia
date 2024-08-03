import { useInfiniteQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import Header from "./components/Header";
import {getHashTagsInfiniteScroll} from "@/api/QueryFunctions";
import {Link} from 'react-router-dom'

import PostCard from "@/components/PostCard/PostCard";
import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";

function HashTags() {
  const { tagname } = useParams();
  const { ref, inView } = useInView({
  });
  useEffect(() =>{
    fetchNextPage()
  },[inView]);
  const {data,hasNextPage,fetchNextPage,status,isFetchingNextPage}=useInfiniteQuery({
    queryKey:["hashtag",tagname],
    queryFn:({queryKey,pageParam})=>getHashTagsInfiniteScroll(queryKey[1],pageParam,5),
    initialPageParam:1,
    getNextPageParam:(pages) => {
      if (pages?.currentPage < pages?.totalPages) {
        return pages?.currentPage + 1;
      } else {
        return pages?.totalPage;
      }
    },
  })
  if (data?.pages) {
    return (
      <div className="w-full flex flex-col bg-gray-100/20 items-center gap-10">
        <Header tagname={tagname} />
        {status === "pending" ? (
          <p>Loading...</p>
        ) : status === "error" ? (
          <p>Error...</p>
        ) : (
          data.pages.map((group, i) => {
            return (
              <React.Fragment key={i}>
                {group.tagData.posts.map((posts) => (
                  <PostCard key={posts._id} postId={posts._id}  className={'w-[40%]'} />
                ))}
              </React.Fragment>
            );
          })
        )}
        <p ref={ref}>
          {isFetchingNextPage
            ? "Loading more..."
            : hasNextPage
            ? "Load More"
            : "Nothing more to load"}
        </p>
      </div>
    );
  } else {
    return (
      <div className="w-full h-screen flex items-center justify-center ">
        <div className="flex flex-col items-center gap-5 ">
        <h1 className="text-2xl font-semibold">This hashTag is not available at the moment</h1>
        <Link className="text-sky-500 font-bold" to={'/'}>Go Back</Link>
        </div>
      </div>
    );
  }
}

export default HashTags;
