import React, { useState, useRef, useEffect } from "react";
import { client } from "../utils/sanity";
import { SanityAssetDocument } from "@sanity/client";
import { topics } from "../utils/constants";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import { useRouter } from "next/router";
import { FaCloudUploadAlt } from "react-icons/fa";
import Nav from "../components/Nav";

const Upload = () => {
  const router = useRouter();

  const [user] = useAuthState(auth);

  const [loading, setIsLoading] = useState(false);

  const filePickerRef = useRef<HTMLInputElement>(null);

  const [videoFile, setVideoFile] = useState<SanityAssetDocument | undefined>();

  const [caption, setCaption] = useState("");

  const [topic, setTopic] = useState("");

  const [uploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (!user) {
      router.push("/");
    }
  }, []);

  const uploadFile = async (e: any) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      setIsLoading(true);

      client.assets
        .upload("file", selectedFile, {
          contentType: selectedFile.type,
          filename: selectedFile.name,
        })
        .then((data) => {
          setVideoFile(data);

          setIsLoading(false);
        });
    }
  };

  const uploadPost = async () => {
    setIsUploading(true);

    const document = {
      _type: "post",
      caption,
      topic,
      video: {
        type: "file",
        asset: {
          _type: "reference",
          _ref: videoFile?._id,
        },
      },
      userId: user?.uid,
      postedBy: {
        _type: "postedBy",
        _ref: user?.uid,
      },
    };

    await fetch("/api/addPost", {
      method: "POST",
      body: JSON.stringify(document),
    }).then(() => router.push("/"));
  };

  return (
    <div>
      <Nav />
      <div className="flex items-center justify-center pt-10 lg:pt-14 bg-[#f8f8f8] ">
        <div className="bg-white rounded-lg p-14 w-full md:w-[80%] lg:w-[75%] ">
          <p className="text-2xl font-bold">Upload video</p>

          <p className="text-gray-400">Post a video to your account</p>

          <div className="mt-10 flex flex-col md:flex-row gap-6">
            <div className="flex flex-col items-center justify-center w-[260px] h-[460px] border-4 border-dashed border-gray-200 p-10 rounded-xl hover:border-red-300 hover:bg-gray-100">
              {loading ? (
                <p className="text-3xl font-bold text-[#f51997]">
                  Uploading.....
                </p>
              ) : (
                <div>
                  {videoFile ? (
                    <div>
                      <video
                        className="bg-black rounded-xl h-[460px]"
                        src={videoFile.url}
                        loop
                        controls
                      />
                    </div>
                  ) : (
                    <div className="flex flex-col cursor-pointer items-center justify-center w-full h-full">
                      <div className="flex flex-col cursor-pointer items-center justify-center mb-10">
                        <FaCloudUploadAlt className="text-gray-300 text-6xl" />

                        <p className="text-lg font-semibold whitespace-nowrap">
                          Select video to upload
                        </p>
                      </div>

                      <div className="flex flex-col cursor-pointer items-center justify-center">
                        <p className="text-center text-sm text-gray-400 leading-10">
                          MP4 or WebM or ogg
                          <br />
                          720x1280 resolution or higher
                          <br />
                          Up to 10 minutes
                          <br />
                          Less than 2 GBß
                        </p>

                        <button
                          className="bg-[#f51997] mt-5 text-white w-full p-1.5 rounded"
                          onClick={() => filePickerRef?.current?.click()}
                        >
                          Select File
                        </button>

                        <input
                          ref={filePickerRef}
                          type="file"
                          accept="video/*"
                          hidden
                          onChange={(e) => uploadFile(e)}
                        />
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="md:flex-grow md:mt-2">
              <div className="flex flex-col space-y-3">
                <label className="text-md font-semibold">Caption</label>

                <input
                  className="border-2 border-gray-300 rounded p-2 outline-none"
                  value={caption}
                  type="text"
                  onChange={(e) => setCaption(e.target.value)}
                />
              </div>

              <div className="flex flex-col space-y-3 mt-2 mb-10">
                <label className="text-md font-semibold">Choose a topic</label>

                <select
                  className="border-2 border-gray-300 rounded p-2 outline-none"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                >
                  {topics.map((topic) => (
                    <option key={topic.name} value={topic.name}>
                      {topic.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center space-x-6">
                <button
                  className="border-2 border-gray-300 p-2 w-28 lg:w-44 rounded font-semibold"
                  onClick={() => router.push("/")}
                >
                  Discard
                </button>

                <button
                  className="bg-[#f51997] flex justify-center items-center disabled:cursor-not-allowed text-white p-2 w-28 lg:w-44 rounded font-semibold"
                  onClick={uploadPost}
                  disabled={
                    !videoFile?.url ||
                    !caption.trim() ||
                    !topic.trim() ||
                    uploading
                  }
                >
                  {uploading ? (
                    <div className="border-white border-t border-l w-6 h-6 rounded-full animate-spin" />
                  ) : (
                    "Post"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Upload;
