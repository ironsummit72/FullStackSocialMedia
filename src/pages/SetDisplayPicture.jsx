import { Input } from "@/shadcomponents/ui/input";
import { Label } from "@/shadcomponents/ui/label";
import { useState } from "react";
import { Upload, CircleX } from "lucide-react";
import noimage from "@/assets/noimage.png";
import { Button } from "@/shadcomponents/ui/button";
import CustomAlertDialog from "@/components/AlertDialog";


import { useNavigate } from "react-router-dom";
import { axiosInstanceWithCredentials } from "@/axios/axiosInstance";
import { toast } from "sonner";
function SetDisplayPicture() {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previewImageFile, setPreviewImageFile] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  const navigate = useNavigate();
  const [imageFile, SetImage] = useState(null);

  const onCancelImageHandler = () => {
    setSelectedFiles(null);
    setPreviewImageFile(null);
  };
  const handleDrag = (event) => {
    event.preventDefault();
    setDragActive(event.type === "dragover" || event.type === "dragenter");
  };
  const handleDrop = (event) => {
    event.preventDefault();
    setDragActive(false);
    setSelectedFiles([...event.dataTransfer.files]);
    setPreviewImageFile(URL.createObjectURL(event.dataTransfer.files[0]));
    SetImage(event.dataTransfer.files[0]);
  };
  const handleFileUpload = (event) => {
    setSelectedFiles([...event.target.files]);
    setPreviewImageFile(URL.createObjectURL(event.target.files[0]));
    SetImage(event.target.files[0]);
  };

  const uploadImage = () => {
    if (imageFile !== null) {
      setOpenDialog(true);
    }
  };
  const onContinueHandler = () => {
    // write the logic to set display picture here
    if (imageFile !== null) {
      const formData = new FormData();
      formData.append("displaypicture", imageFile);
      axiosInstanceWithCredentials
        .post("/set/dp", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((response) => {
            console.log(response.data.code);
          if(response.data.code===200)
          {
            toast("DisplayPicture set successfull")
            SetImage(null)
            setOpenDialog(false)
            axiosInstanceWithCredentials.get('check/coverpicture').then((response)=>{
                if(response.data.data===false)
                {
                    navigate('/set/cover',{replace:true})
                }else{
                    navigate('/',{replace:true})
                }
            })
          }
        });
    }
  };

  return (
    <div className="w-screen flex gap-20 flex-col justify-center items-center  h-screen">
      <div className="imgPreviewContainer w-screen h-[40%] flex justify-center">
        <img
          className="w-80 h-80 rounded-full object-cover"
          src={previewImageFile ?? noimage}
          alt=""
        />
      </div>
      <div
        onDragOver={handleDrag}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
        id="dropZone"
        className={`fileuploadcontainer border border-black border-2 rounded-md w-[80%] h-60 flex justify-center items-center gap-4 flex-col ${
          dragActive ? "active" : ""
        }`}
      >
        <div className="border border-yellow-50 w-14 h-14 rounded-full flex justify-center items-center">
          <Upload size={"1.5em"} color="yellow" />
        </div>
        <h3 className=" font-semiboldn text-2xl">
          {dragActive
            ? "drop your files here"
            : `Drag and drop an image file here to upload display picture`}
        </h3>
        <div className="fileInputContainer mt-5 relative  ">
          <Label
            htmlFor="upload-dp"
            className="border-yellow-50 border  p-3 rounded-sm"
          >
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
                <div
                  className="flex mt-3 gap-2 items-center justify-center"
                  key={file.name}
                >
                  <li className="">{file.name}</li>
                  <button onClick={onCancelImageHandler}>
                    <CircleX color="red" />
                  </button>
                </div>
              );
            })}
          </ul>
        }
      </div>
      <CustomAlertDialog
        title={"Set Image"}
        onCancelHandler={() => {
          setOpenDialog(false);
        }}
        description={
          "This will be your display picture. Other user can identify you using this picture "
        }
        onContinueHandler={onContinueHandler}
        open={openDialog}
      />
      <Button
        onClick={uploadImage}
        variant=""
        className="absolute bottom-5 right-14"
      >
        Next
      </Button>
    </div>
  );
}

export default SetDisplayPicture;
