import { useQuery } from "@tanstack/react-query";
import StoryPreviewCard from "./Cards/StoryPreviewCard/StoryPreviewCard";
import CreateStoryCard from "./CreateStoryCard";
import {
  Carousel,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
} from "@/shadcomponents/ui/carousel";
import { getFollowing } from "@/api/QueryFunctions";
import { useSelector } from "react-redux";

function StoryContainer({ children, className }) {
  const username = useSelector((state) => state.userData?.username);
  const { data } = useQuery({
    queryKey: ["following", username],
    queryFn: ({ queryKey }) => getFollowing(queryKey[1],'false'),
    enabled: !!username,
  });
  return (
    <Carousel
      className={`storyContainer  max-w-[70%]  m-auto  h-80 flex flex-grow-1  items-center gap-5   p-10 `}>
      <CarouselContent className="flex gap-5">
        <CreateStoryCard />
        {children}
        <StoryPreviewCard
            key={username}
            username={username}
            className={"basis-1/3"}
          />
        {data?.map((users) => (
          <StoryPreviewCard
            key={users.username}
            username={users.username}
            className={"basis-1/3"}
          />
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}

export default StoryContainer;
