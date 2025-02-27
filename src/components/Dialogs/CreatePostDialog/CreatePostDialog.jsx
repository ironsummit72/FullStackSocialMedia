import {
  AlertDialog,
  AlertDialogContent,
} from "@/shadcomponents/ui/alert-dialog";
import { Button } from "@/shadcomponents/ui/button";
import { X, Earth, Users, Lock, ImageUp } from "lucide-react";
import DisplayPicture from "@/components/DisplayPicture";
import { useSelector } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import { useContext, useState, useRef, useMemo } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/shadcomponents/ui/select";
import { Textarea } from "@/shadcomponents/ui/textarea";
import { Input } from "@/shadcomponents/ui/input";
import { Label } from "@/shadcomponents/ui/label";
import { Form } from "@/shadcomponents/ui/form";

import { dialogContext } from "@/context/dialogContext";
import { axiosInstanceWithCredentials } from "@/axios/axiosInstance";
import { toast } from "sonner";
import useDebounce from "@/hooks/useDebouncing";
import useReactQuery from "@/hooks/useReactQuery";
import { useQueryClient } from "@tanstack/react-query";
import Video from "./components/Video";
function CreatePostDialog() {
  const queryClient = useQueryClient();
  const [suggessionEnable, setSuggessionEnable] = useState(false);
  const textAreaRef = useRef(null);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [textAreaPos, setTextAreaPos] = useState({ top: null, left: null });
  const [tag, setTag] = useState(null);
  const debounce = useDebounce(tag, 600);
  const { data: queryData, isFetched } = useReactQuery(debounce);
  const [dragActive, setDragActive] = useState(false);
  const userData = useSelector((state) => state.userData);
  const { createPostDialog, setCreatePostDialog } = useContext(dialogContext);
  const handleDrag = (event) => {
    event.preventDefault();
    setDragActive(event.type === "dragover" || event.type === "dragenter");
  };
  const handleDrop = (event) => {
    event.preventDefault();
    setDragActive(false);
    if (event.dataTransfer.files.length > 10) {
      alert("you can only upload 10 images and videos in one post");
    } else {
      setSelectedFiles([...event.dataTransfer.files]);
    }
  };
  const handleFileUpload = (event) => {
    if (event.target.files.length > 10) {
      alert("you can only upload 10 images and videos in one post");
    } else {
      setSelectedFiles([...event.target.files]);
    }
  };

  const handleSuggessionClick = (suggestion) => {
    const textArea = textAreaRef.current;
    const currentText = textArea.value;
    const cursorPos = textArea.selectionStart;
    const userTags = currentText
      .split(" ")
      .filter((word) => /^\@/.test(word))
      .map((name) => name.slice(1));
    const currentTag = userTags[userTags.length - 1];
    const newText = `${currentText.substring(
      0,
      cursorPos - currentTag.length
    )}${suggestion} `;

    textArea.value = newText;
    textArea.focus(); // Insert suggestion with space
    // Invaliddate the data
    queryClient.invalidateQueries({ queryKey: ["suggession"] });
    setTag(null);
    setSuggessionEnable(false);
  };
  const handleOnKeyUp = (e) => {
    const value = e.target.value;
    const cursorPos = e.target.selectionStart;
    const textarea = textAreaRef.current;
    const boundingRect = textarea.getBoundingClientRect();
    const top = boundingRect.top + boundingRect.height;
    const left =
      boundingRect.left + (cursorPos - 1) * (boundingRect.width / value.length); // Adjust cursorPos by 1
    console.log("text area ref", textarea.current);
    console.log(`top ${top} left ${left}`);
    setTextAreaPos({ top: Math.round(top - 50), left: Math.round(left - 980) });
    const userTags = value
      .split(" ")
      .filter((word) => /^\@/.test(word))
      .map((name) => name.slice(1));
    setTag(null);
    if (userTags.length > 0) {
      setTag(userTags[userTags.length - 1]);
      setSuggessionEnable(true);
    }
  };
  const form = useForm();
  const submitHandler = (data) => {
    const { postvisibility } = data;
    const caption = textAreaRef?.current.value;
    if (selectedFiles.length !== 0) {
      const formData = new FormData();
      formData.append("caption", caption);
      formData.append("postvisibility", postvisibility);
      for (let files of selectedFiles) {
        formData.append("posts", files);
      }
      axiosInstanceWithCredentials
        .post("/create/post", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((response) => {
          if (response) {
            form.reset();
            setSelectedFiles([]);
            setCreatePostDialog(false);
            toast("Post created successfully", {
              description: "you can view the post in you post section",
            });
            queryClient.invalidateQueries({ queryKey: ["feed"] });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  return (
    <AlertDialog open={createPostDialog}>
      <AlertDialogContent className="h-[90%] flex-col items-start">
        <div className={`h-10  flex justify-center items-center border-b-2`}>
          <h1 className="font-bold text-lg">Create Post</h1>
          <Button
            onClick={() => {
              setCreatePostDialog(false);
              form.reset();
              setSelectedFiles([]);
            }}
            variant="ghost"
            className="w-14 h-14 rounded-full relative left-32"
          >
            <X />
          </Button>
        </div>
        <Form>
          <form
            noValidate
            onSubmit={form.handleSubmit(submitHandler)}
            className=""
          >
            <div className="h-20 profileInfo bg-white p-2 ">
              <DisplayPicture className={`w-14 h-14 rounded-full`} />
              <h1 className="font-semibold relative bottom-14 left-16">
                {userData?.username}
              </h1>
              <Controller
                control={form.control}
                name="postvisibility"
                defaultValue={`PUBLIC`}
                render={({ field: { onChange, value, name } }) => (
                  <Select onValueChange={onChange} value={value} name={name}>
                    <SelectTrigger className="w-[140px] relative bottom-12 left-16 bg-gray-200">
                      <SelectValue placeholder="Post Visibility" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Visibility</SelectLabel>
                        <SelectItem value="PUBLIC">
                          <div className="flex items-center gap-2">
                            <Earth /> <span>Public</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="ONLYME">
                          <div className="flex items-center gap-2">
                            <Lock /> <span>Only Me</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="FOLLOWERS">
                          <div className="flex items-center gap-2">
                            <Users /> <span>Followers</span>
                          </div>
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
            <div className="cap overflow-auto ">
              <Textarea
                {...form.register("caption")}
                onKeyUp={handleOnKeyUp}
                ref={textAreaRef}
                className="border-none outline-0 text-md focus:outline-0 resize-none"
                placeholder={`What's on your mind, ${
                  userData?.fullName.split(" ")[0]
                }?`}
              />
              {suggessionEnable && (
                <div
                  style={{
                    position: "absolute",
                    top: `${textAreaPos.top}px`,
                    left: `${textAreaPos.left}px`,
                  }}
                  className="suggessioncard absolute top-[201px] flex flex-col gap-2  min-w-42 max-w-fit min-h-fit max-h-52 bg-white rounded-md shadow-2xl  overflow-auto"
                >
                  {queryData?.map((data) => (
                    <span
                      onClick={() => handleSuggessionClick(data.username)}
                      className="flex gap-2 bg-white rounded-md shadow-2xl items-center font-bold px-4 py-2 cursor-pointer"
                      key={data.username}
                    >
                      <DisplayPicture
                        className={"w-8 h-8 rounded-full"}
                        username={data.username}
                      />{" "}
                      {`${data.firstname} ${data.lastname}`}
                    </span>
                  ))}
                </div>
              )}
            </div>
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
                  Add photos/videos
                  <span className="block text-sm text-gray-500">
                    or drag and drop
                  </span>
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
                <div className="preview grid grid-cols-2 grid-rows-2 gap-y-4 gap-x-4">
                  {selectedFiles.map((file) => {
                    if (file.type.split("/")[0] === "video") {
                      return (
                        <Video
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
                          className="w-60 rounded-md"
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
            <Button className="mt-12 w-full" type="submit">
              Post
            </Button>
          </form>
        </Form>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default CreatePostDialog;
