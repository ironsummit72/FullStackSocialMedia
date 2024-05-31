import  { useEffect, useState } from 'react';
import { AspectRatio } from '@/shadcomponents/ui/aspect-ratio';
import { axiosInstanceWithCredentials } from '@/axios/axiosInstance';

function CoverPicture({className,username}) {
    const [CoverPicture,setCoverPicture]=useState('');
    useEffect(() => {
        if (username) {
          axiosInstanceWithCredentials
            .get(`resource/coverpicture/${username}`, { responseType: "blob" })
            .then((response) => {
              setCoverPicture(URL.createObjectURL(response.data));
            });
        } else {
          axiosInstanceWithCredentials
            .get(`resource/coverpicture`, { responseType: "blob" })
            .then((response) => {
              setCoverPicture(URL.createObjectURL(response.data));
            });
        }
      }, [username]);
  return (
    <div className="w-full h-[70%] ">
      <AspectRatio className={`flex justify-center h-full  ${className}`} ratio={16 / 9}>
        <video poster={CoverPicture} alt="Image" className="rounded-md object-cover w-[80%] h-[65%] object-[top_right]" />
      </AspectRatio>
    </div>
  );
}

export default CoverPicture;