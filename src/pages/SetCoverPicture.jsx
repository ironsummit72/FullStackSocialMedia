import { Input } from '@/shadcomponents/ui/input';
import { Label } from '@/shadcomponents/ui/label';
import { useState } from 'react';
import { Upload ,CircleX} from 'lucide-react'

import { AspectRatio } from '@radix-ui/react-aspect-ratio';
import { Button } from '@/shadcomponents/ui/button';
import CustomAlertDialog from '@/components/AlertDialog';
import { useNavigate } from 'react-router-dom';
import noimage from "@/assets/noimage.png";
import { axiosInstanceWithCredentials } from '@/axios/axiosInstance';
import {toast} from 'sonner'

function SetCoverPicture() {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previewImageFile, setPreviewImageFile] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const navigate = useNavigate();
  const [imageFile, SetImage] = useState(null);


  const onCancelImageHandler = () => {
    console.log('click');
    setSelectedFiles(null);
    setPreviewImageFile(null);
  };
  const handleDrag = (event) => {
    event.preventDefault();
    setDragActive(event.type === 'dragover' || event.type === 'dragenter');
  };
  const handleDrop = (event) => {
    event.preventDefault();
    setDragActive(false);
    setSelectedFiles([...event.dataTransfer.files]);
    setPreviewImageFile(URL.createObjectURL(event.dataTransfer.files[0]));
    SetImage(event.dataTransfer.files[0])
  };
  const handleFileUpload = (event) => {
    // Your file processing/upload code here
    setSelectedFiles([...event.target.files]);
    setPreviewImageFile(URL.createObjectURL(event.target.files[0]));
    SetImage(event.target.files[0])
  };
  const uploadImage = () => {
    if (imageFile !== null) {
      setOpenDialog(true);
    }
  };
  const onContinueHandler = () => {
    if (imageFile !== null) {
      const formData = new FormData();
      formData.append("coverpicture", imageFile);
      axiosInstanceWithCredentials
        .post("/set/cover", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((response) => {
            console.log(response.data.code);
          if(response.data.code===200)
          {
            toast("CoverPicture set successfull")
            SetImage(null)
            setOpenDialog(false)
            navigate('/',{replace:true})
          }
        }).catch(err => console.log(err));
    }
  };


  return (
    <div className="w-screen flex gap-20 flex-col justify-center items-center bg-white h-screen overflow-hidden">
      <div className="imgPreviewContainer relative left-80 w-[100vw] h-[50%] flex  ">
        <AspectRatio className="w-[60%] h-[50vh]  rounded-md" ratio={16 / 9}>
          <img
            className="w-full h-full rounded-md object-cover object-center"
            src={previewImageFile ?? noimage}
            alt=""
          />
        </AspectRatio>
      </div>
      <div
        onDragOver={handleDrag}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
        id="dropZone"
        className={`fileuploadcontainer border border-2 border-black rounded-md  w-[80%] h-60 flex justify-center items-center gap-4 flex-col ${
          dragActive ? 'active' : ''
        }`}>
        <div className="border  w-14 h-14 rounded-full flex justify-center items-center">
          <Upload size={'1.5em'}  />
        </div>
        <h3 className=" font-semiboldn text-2xl">
          {dragActive
            ? 'drop your files here'
            : `Drag and drop an image file here to upload cover picture`}
        </h3>
        <div className="fileInputContainer mt-5 relative  ">
          <Label
            htmlFor="upload-dp"
            className=" border  p-3 rounded-sm">
            Choose a Image
            <Input
              accept="image/*"
              onChange={handleFileUpload}
              type="file"
              className="sr-only"
              id="upload-dp"
            />
          </Label>
        </div>
        {
          <ul>
            <hr className="w-auto relative top-2" />
            {selectedFiles?.map((file) => {
              return (
                <div className="flex mt-3 gap-2 items-center justify-center" key={file.name}>
                  <li className="">{file.name}</li>{' '}
                  <button onClick={onCancelImageHandler}>
                    <CircleX color="red" />
                  </button>
                </div>
              );
            })}
          </ul>
        }
      </div>
      <CustomAlertDialog open={openDialog}  onCancelHandler={()=>{setOpenDialog(false)}}  onContinueHandler={onContinueHandler} title={'Are you Sure'} description={'this image will be set as cover picture'}/>
      <Button onClick={uploadImage}  className="absolute bottom-5 right-14">
        Finish
      </Button>
    </div>
  );
}

export default SetCoverPicture;