import React from 'react'
import "./Video.css"
function Video() {
  return (
    <div className="video">
        <div className="top">
            <div className="circle"></div>
            <div className="circle"></div>
            <div className="circle"></div>

            <div className="rectangle"></div>
        </div>
    <video controls>
    <source src="" type="video/mp4"/>
    <source src="" type="video/ogg"/>
     Your browser does not support the video tag.
    </video>
    <div className="bottom"></div>
</div>
  )
}

export default Video