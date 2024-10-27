import React from 'react'
import { Navbar } from '../_components/Navbar'
import { VideoSearch } from '../_components/VideoSearch'

const VideoSearchPage = () => {
  return (
    <div className=' h-screen w-screen flex flex-col items-center overflow-x-hidden '>
        <Navbar/>
        <VideoSearch/>
    </div>
  )
}

export default VideoSearchPage