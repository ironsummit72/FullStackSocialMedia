import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/shadcomponents/ui/drawer";
import { Button } from "@/shadcomponents/ui/button";
import { useQuery } from "@tanstack/react-query";
import { getStoryViews } from "@/api/QueryFunctions";
import StoryViewsUserInfoCard from "./StoryViewsUserInfoCard";

function StoryViewDrawer({ children, storyId }) {
  const { data } = useQuery({
    queryKey: ["storyviews", storyId],
    queryFn: ({ queryKey }) => getStoryViews(queryKey[1]),
    enabled: !!storyId,
  });
  return (
    <Drawer>
      <DrawerTrigger>{children}</DrawerTrigger>
      <DrawerContent className="w-[33%] h-[80%] m-auto  ">
        <DrawerHeader>
          <DrawerTitle>Viewed By {data?.views.length} </DrawerTitle>
        </DrawerHeader>

        <div className=" overflow-y-scroll">
          {data?.views.map((viewdata) => (
            <StoryViewsUserInfoCard
              key={viewdata._id}
              username={viewdata.username}
            />
          ))}
        </div>

        <DrawerFooter>
          <DrawerClose>
            <Button variant="outline" className='text-red-500'>Close</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

export default StoryViewDrawer;
