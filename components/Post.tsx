import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Video } from "../types";
import { HiVolumeUp, HiVolumeOff } from "react-icons/hi";
import { BsFillPlayFill, BsFillPauseFill } from "react-icons/bs";
import { GoVerified } from "react-icons/go";

interface Props {
  post: Video;
}

const Post = ({ post }: Props) => {
  const [isHovering, setIsHovering] = useState(false);

  const [isPlaying, setIsPlaying] = useState(false);

  const [isMuted, setIsMuted] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);

  const onVideoClick = () => {
    if (isPlaying) {
      videoRef?.current?.pause();

      setIsPlaying(false);
    } else {
      videoRef?.current?.play();

      setIsPlaying(true);
    }
  };

  useEffect(() => {
    if (videoRef?.current) {
      videoRef.current.muted = isMuted;
    }
  }, [isMuted]);

  return (
    <div className="flex flex-col space-y-3 border-b-2 border-gray-200 pb-6">
      <div className="flex space-x-3">
        <Link href={`/profile/${post.postedBy._id}`}>
          <img
            className="w-10 h-10 md:w-16 md:h-16 rounded-full object-contain cursor-pointer"
            src={post.postedBy.image}
            alt=""
          />
        </Link>

        <div className="flex flex-col space-y-2">
          <div className="flex items-center space-x-2">
            <p className="font-bold lowercase">{post.postedBy.username}</p>

            <GoVerified className="text-blue-400" />

            <p className="hidden md:inline capitalize text-sm text-gray-500">
              {post.postedBy.username}
            </p>
          </div>

          <p>{post.caption}</p>
        </div>
      </div>

      <div className="relative">
        <div
          className="w-[200px] lg:w-[600px]"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <Link href={`/detail/${post._id}`}>
            <video
              loop
              ref={videoRef}
              className="w-full h-[300px] md:h-[400px] lg:h-[528px] lg:ml-16 bg-gray-100 rounded-2xl cursor-pointer"
              src={post.video.asset.url}
            />
          </Link>

          {isHovering && (
            <div className="absolute bottom-6 z-10 lg:left-16 px-4 w-[200px] lg:w-[600px] flex items-center justify-between ">
              {isPlaying ? (
                <button>
                  <BsFillPauseFill
                    className="videoIcon"
                    onClick={onVideoClick}
                  />
                </button>
              ) : (
                <button>
                  <BsFillPlayFill
                    className="videoIcon"
                    onClick={onVideoClick}
                  />
                </button>
              )}

              {isMuted ? (
                <button>
                  <HiVolumeOff
                    className="videoIcon"
                    onClick={() => setIsMuted(false)}
                  />
                </button>
              ) : (
                <button>
                  <HiVolumeUp
                    className="videoIcon"
                    onClick={() => setIsMuted(true)}
                  />
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Post;
