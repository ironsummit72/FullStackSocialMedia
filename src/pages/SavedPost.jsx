import { getSavedPostInfiniteScroll } from '@/api/QueryFunctions';
import PostCard from '@/components/PostCard/PostCard';
import { useInfiniteQuery } from '@tanstack/react-query'
import React, { useEffect } from 'react'
import { useInView } from 'react-intersection-observer';
import { useSelector } from 'react-redux'


function SavedPost() {
  const { ref, inView } = useInView({
  });
  useEffect(() =>{
    fetchNextPage()
  },[inView]);

  const username = useSelector((state) => state.userData?.username);
  const {data,hasNextPage,fetchNextPage,status,isFetchingNextPage}=useInfiniteQuery({
    queryKey:["savedpost",username],
    queryFn:({queryKey,pageParam})=>getSavedPostInfiniteScroll(queryKey[1],pageParam,5),
    initialPageParam:1,
    enabled:!!username,
    getNextPageParam:(pages) => {
      if (pages?.currentPage < pages?.totalPages) {
        return pages?.currentPage + 1;
      } else {
        return pages?.totalPage;
      }
    },
  })
  if(data?.pages)
  {
    return (
      <div className='w-full flex flex-col bg-gray-100/20 items-center gap-10'>
       <h1 className="font-bold text-2xl text-center mt-10">Saved Posts</h1>
           {status === "pending" ? (
          <p>Loading...</p>
        ) : status === "error" ? (
          <p>Error...</p>
        ) : (
          data.pages.map((group, i) => {
            return (
              <React.Fragment key={i}>
                {group?.savedPostData?.savedPosts?.map((posts) => (
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
            : "No more Saved Posts"}
        </p>
      </div>
    )
  }
}

export default SavedPost