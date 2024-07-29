import { Input } from "@/shadcomponents/ui/input";
import { Label } from "@/shadcomponents/ui/label";
import { useState } from "react";
import { ImageUp } from "lucide-react";
import { Textarea } from "@/shadcomponents/ui/textarea";
import { Form } from "@/shadcomponents/ui/form";
import { useForm } from "react-hook-form";
import { Button } from "@/shadcomponents/ui/button";
import { axiosInstanceWithCredentials } from "@/axios/axiosInstance";
import { useToast } from "@/shadcomponents/ui/use-toast";


function CreateStoryDialogContent() {
  const handleDrag = (event) => {
    event.preventDefault();
    setDragActive(event.type === 'dragover' || event.type === 'dragenter');
  };
  const handleDrop = (event) => {
    event.preventDefault();
      setDragActive(false);
      if (event.dataTransfer.files.length > 0) {
        setSelectedFiles([...event.dataTransfer.files]);
      }
  };
  const { toast } = useToast();
  const form = useForm();
  const submitHandler = (data) => {
    console.log(data, "this is a handler");
    const formData = new FormData();
    formData.append("caption", data.caption);
    formData.append("story", selectedFiles[0]);
    axiosInstanceWithCredentials
      .post("/stories/create", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        if (res) {
          form.reset();
          setSelectedFiles([]);
          toast({
            title:"Story created successfully",
            description: "you can see stories in home page",
          });
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleFileUpload = (event) => {
    if (event.target.files.length > 1) {
      alert("you can only upload one story at a time");
    } else {
      setSelectedFiles([...event.target.files]);
    }
  };

  const [selectedFiles, setSelectedFiles] = useState([]);
  const [dragActive, setDragActive] = useState(false);

  return (
    <Form>
      <form noValidate onSubmit={form.handleSubmit(submitHandler)}>
        <div
          onDragOver={handleDrag}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDrop={handleDrop}
          className=" w-full h-96 rounded-md"
        >
          {selectedFiles.length === 0 ? (
            <div
              onDragOver={handleDrag}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDrop={handleDrop}
              className={`filesDrop w-full h-96 bg-gray-200 rounded-md border-gray-500 border-2 flex justify-center items-center ${
                dragActive ? "bg-gray-500" : ""
              }`}
            >
              <Label
                htmlFor="upload-dp"
                className="border-gray-500 h-full  w-full flex items-center border text-black font-medium text-lg p-3 rounded-sm flex-col justify-center"
              >
                <ImageUp />
                Add photo/video
                <span className="block text-sm ">or drag and drop</span>
                <Input
                  accept="image/*,video/*"
                  onChange={handleFileUpload}
                  type="file"
                  className="sr-only"
                  id="upload-dp"
                  multiple
                />
              </Label>
            </div>
          ) : (
            <div className="w-full h-96 overflow-auto no-scrollbar">
              <div className="preview flex justify-center">
                {selectedFiles.map((file) => {
                  if (file.type.split("/")[0] === "video") {
                    return (
                      <video
                        className="w-60 rounded-md"
                        key={file.name}
                        autoPlay={true}
                        muted={true}
                        src={URL.createObjectURL(file)}
                      />
                    );
                  } else {
                    return (
                      <img
                        className="w-60 h-full rounded-md"
                        key={file.name}
                        src={URL.createObjectURL(file)}
                        alt=""
                      />
                    );
                  }
                })}
              </div>
            </div>
          )}
        </div>
        <Textarea
          {...form.register("caption")}
          className="border-none outline-0 text-md focus:outline-0 resize-none"
          placeholder={`What's on your mind`}
        />
        <Button className="mt-12 float-right" type="submit">
          Post Story
        </Button>
      </form>
    </Form>
  );
}

export default CreateStoryDialogContent;
