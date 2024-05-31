import { BriefcaseBusiness, GraduationCap, Heart, Home } from "lucide-react"
import { Link } from "react-router-dom"

function IntroCard() {
  return (
    <div className='relative w-[25%] h-[50vh] bg-white rounded-lg shadow-2xl mr-20 px-10 py-4'>
        <h1 className="Intro font-bold text-black text-lg">Intro</h1>
        <ul className='mt-10 flex flex-col gap-y-6'>
            <li className="flex items-center gap-2"> <BriefcaseBusiness />  <span className="text-lg font-bold">Profession</span> · <Link className="text-xl hover:underline">{`Profession Model`}</Link> </li>
            <li className="flex items-center gap-2"> <GraduationCap />  <span className="text-lg font-bold">Studied at</span> · <Link className="text-xl hover:underline">{`Xaviers International School`}</Link> </li>
            <li className="flex items-center gap-2"> <GraduationCap />  <span className="text-lg font-bold">Went To</span> · <Link className="text-xl hover:underline">{`Harvard Business`}</Link> </li>
            <li className="flex items-center gap-2"> <Home />  <span className="text-lg font-bold">Lives in</span> · <Link className="text-xl hover:underline">{`Italy Millan`}</Link> </li>
            <li className="flex items-center gap-2"> <Heart />  <span className="text-lg font-bold">Relationship Status</span> · <Link className="text-xl hover:underline">{`Single`}</Link> </li>
        </ul>
    </div>
  )
}

export default IntroCard