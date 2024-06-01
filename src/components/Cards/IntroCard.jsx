import { BriefcaseBusiness, GraduationCap, Heart, Home } from "lucide-react"
import { Link } from "react-router-dom"
import { useQuery } from "@tanstack/react-query";
import { getUserIntroDetails } from "@/api/QueryFunctions";
function IntroCard({username}) {
  const { data  } = useQuery({
    queryKey: ["userintrodetails", username],
    queryFn: ({ queryKey }) => getUserIntroDetails(queryKey[1]),
  });
  function formatRelationshipStatus(status) {
    switch(status) {
        case 'SINGLE':
            return 'Single';
        case 'MARRIED':
            return 'Married';
        case 'INRELATIONSHIP':
            return 'In Relationship';
        default:
            return 'Unknown Status';
    }
}
  return (
    <div className='relative max-w-[35%] h-[50vh] bg-white rounded-lg shadow-2xl mr-20 px-10 py-4'>
        <h1 className="Intro font-bold text-black text-lg">Intro</h1>
        <ul className='mt-10 flex flex-col gap-y-6'>
            {data?.profession&&<li className="flex items-center gap-2"> <BriefcaseBusiness />  <span className="text-lg font-bold whitespace-nowrap">Profession</span> · <Link className="text-xl hover:underline truncate">{data?.profession}</Link> </li>}
           {data?.studiedAt && <li className="flex items-center gap-2"> <GraduationCap />  <span className="text-lg font-bold whitespace-nowrap">Studied at</span> · <Link className="text-xl hover:underline truncate">{data?.studiedAt}</Link> </li>}
            {data?.wentTo&&<li className="flex items-center gap-2"> <GraduationCap />  <span className="text-lg font-bold whitespace-nowrap">Went To</span> · <Link className="text-xl hover:underline truncate">{data?.wentTo}</Link> </li>}
            {data?.livesIn&&<li className="flex items-center gap-2"> <Home />  <span className="text-lg font-bold whitespace-nowrap">Lives in</span> · <Link className="text-xl hover:underline truncate">{data?.livesIn}</Link> </li>}
            {data?.RelationshipStatus&&<li className="flex items-center gap-2"> <Heart />  <span className="text-lg font-bold whitespace-nowrap">Relationship Status</span> · <Link className="text-xl hover:underline truncate">{formatRelationshipStatus(data?.RelationshipStatus)}</Link> </li>}
        </ul>
    </div>
  )
}

export default IntroCard