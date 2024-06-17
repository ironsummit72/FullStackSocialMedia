import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
  } from "@/shadcomponents/ui/hover-card"

import HoverContent from "./HoverContent"
function Mention({username,children}) {
  return (
    <HoverCard>
    <HoverCardTrigger>{children}</HoverCardTrigger>
    <HoverCardContent className="w-[100%]">
    <HoverContent username={username}/>
    </HoverCardContent>
  </HoverCard>
  )
}

export default Mention