import { Skeleton } from "@/shadcomponents/ui/skeleton";
import { AspectRatio } from "@/shadcomponents/ui/aspect-ratio";
export function UserProfileSkeleton() {
  return (
    <>
      <div className="w-screen h-screen ">
        <div className="con w-full h-[90%] bg-white shadow-2xl">
          <div className="w-full h-[70%] ">
            <AspectRatio
              className={`flex justify-center h-full `}
              ratio={16 / 9}>
              <Skeleton
                alt="Image"
                className="rounded-md object-cover w-[80%] h-[65%] object-[top_right]"
              />
            </AspectRatio>
          </div>
          <Skeleton className="w-[15em] h-[15em] rounded-full relative left-[10em] bottom-[2em] border-4 border-white" />
          <div className="info relative left-[26em] bottom-[10em] w-fit flex flex-col gap-3 ">
            <div className="headings flex items-center gap-4">
             <Skeleton className="name w-10 h-4"/>
             <Skeleton className="name w-10 h-2"/> 
            </div>
            <div className="followersInfo flex gap-10 w-fit ">
            <Skeleton className="name w-10 h-2"/>
            <Skeleton className="name w-10 h-2"/>
            </div>
            <div className="followers-container flex w-[150%] justify-between">
              <div className="profilebtn flex gap-10">
              <Skeleton className="name w-15 h-8"/>
              <Skeleton className="name w-15 h-8"/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
