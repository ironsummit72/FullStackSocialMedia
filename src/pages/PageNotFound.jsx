
import {Link} from 'react-router-dom'
function PageNotFound() {

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <div className='flex flex-col items-center gap-10'>
      <h1 className='font-extrabold text-4xl'>Sorry,this page is not available.</h1>
      <p>The link you followed may be broken, or the page may have been removed. <Link className='text-blue-500' to="/">Go back</Link></p>
      </div>
    </div>
  )
}

export default PageNotFound