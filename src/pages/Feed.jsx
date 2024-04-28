import { useSelector } from "react-redux"
function Feed() {
  const state=useSelector((state)=>state.userData)
  console.log('state',state);
  return (
    <div>{state?.username}</div>
  )
}

export default Feed