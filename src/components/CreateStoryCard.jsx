import DisplayPicture from "./DisplayPicture";
import { Plus } from "lucide-react";
import { Button } from "@/shadcomponents/ui/button";
import { Card, CardContent } from "@/shadcomponents/ui/card";
import CreateStoryDialog from "./Dialogs/CreateStoryDialog/CreateStoryDialog";
function CreateStoryCard() {
  return (
    <Card>
      <CardContent className="max-w-40 min-w-40 h-72 shadow-xl rounded-md ml-5 transition ease-in-out delay-150  hover:scale-105 cursor-pointer p-0">
        <div className="w-full flex flex-col">
          <DisplayPicture className="rounded-t-md hover:rounded-t-md" size={320} />
          <CreateStoryDialog> 
          <Button
            className="rounded-full h-14 w-14 relative left-12 bottom-7 border-4 border-white"
            >
              <Plus />
          </Button>
            </CreateStoryDialog>
          <span className="font-semibold">Create Story</span>
        </div>
      </CardContent>
    </Card>
  );
}
export default CreateStoryCard;
