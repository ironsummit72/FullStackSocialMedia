import CreateStoryCard from "./CreateStoryCard";
function StoryContainer({children,className}) {
  return (
    <div className={`storyContainer bg-gray-100  max-w-[70%]  m-auto  h-80 flex flex-grow-1  items-center gap-5 overflow-x-scroll overflow-y-hidden no-scrollbar`}>
        <CreateStoryCard/>
      {children}
    </div>
  );
}

export default StoryContainer;
