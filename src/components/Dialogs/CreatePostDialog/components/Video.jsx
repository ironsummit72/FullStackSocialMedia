import React from "react";
import { twMerge } from "tailwind-merge";





const Video = ({ src, className, autoplay, muted }) => {
  console.log("rendering video");
  
  return (
    <video  muted={muted} autoPlay={autoplay} className={twMerge(className)}>
      <source src={src} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
};

// Memoize the Video component to prevent unnecessary re-renders
export default React.memo(Video);