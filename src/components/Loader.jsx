import React from 'react'
import { LoaderIcon } from 'react-hot-toast'

function Loader() {
  return (
    <div className='flex items-center justify-start'>Loading Data <span className='ml-2'> <LoaderIcon style={{ width: "1.3rem", height: "1.3rem" }} /></span>
    </div>
  )
}

export default Loader