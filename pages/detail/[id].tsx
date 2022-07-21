import React, { useRef, useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import { fetchPost } from "../../utils/queries";
import { Video } from "../../types";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";
import { GoVerified } from "react-icons/go";
import { MdOutlineCancel } from "react-icons/md";
import { BsFillPlayFill } from "react-icons/bs";
import { HiVolumeUp, HiVolumeOff } from "react-icons/hi";
import LikeBtn from "../../components/LikeBtn";
import Comments from "../../components/Comments";

interface Props {
  postData: Video;
}

const Detail = ({ postData }: Props) => {
  const router = useRouter();

  const [post, setPost] = useState(postData);

  const [user] = useAuthState(auth);

  const videoRef = useRef<HTMLVideoElement>(null);

  const [playing, setIsPlaying] = useState(false);

  const [isMuted, setIsMuted] = useState(false);

  const [loading, setIsLoading] = useState(false);

  const [input, setInput] = useState("");

  const [posting, setPosting] = useState(false);

  const onVideoClick = () => {
    if (playing) {
      videoRef?.current?.pause();

      setIsPlaying(false);
    } else {
      videoRef?.current?.play();

      setIsPlaying(true);
    }
  };

  const handleLike = async (like: boolean) => {
    setIsLoading(true);

    const res = await fetch("/api/likePost", {
      method: "PUT",
      body: JSON.stringify({
        userId: user?.uid,
        postId: post?._id,
        like,
      }),
    });

    const data = await res.json();

    setPost({ ...post, likes: data.likes });

    setIsLoading(false);
  };

  const addComment = async () => {
    setPosting(true);

    const res = await fetch("/api/addComment", {
      method: "POST",
      body: JSON.stringify({
        postId: post._id,
        userId: user?.uid,
        comment: input,
      }),
    });

    const data = await res.json();

    setPost({ ...post, comments: data.comments });

    setInput("");

    setPosting(false);
  };

  useEffect(() => {
    if (videoRef?.current) {
      videoRef.current.muted = isMuted;
    }
  }, [isMuted]);

  if (!post) return null;

  return (
    <div>
      <Head>
        <title>VSA - Post</title>
      </Head>

      <div className="flex flex-col lg:flex-row w-full h-screen overflow-y-scroll">
        <div className="relative h-[60vh] lg:h-screen w-full lg:w-[55%] bg-black flex items-center justify-center">
          <button
            className="absolute top-5 left-5"
            onClick={() => router.back()}
          >
            <MdOutlineCancel className="text-4xl text-white" />
          </button>

          {!playing && (
            <button
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer"
              onClick={onVideoClick}
            >
              <BsFillPlayFill className="text-7xl text-white" />
            </button>
          )}

          <button className="absolute bottom-5 right-5">
            {isMuted ? (
              <HiVolumeOff
                className="text-4xl text-white"
                onClick={() => setIsMuted(false)}
              />
            ) : (
              <HiVolumeUp
                className="text-4xl text-white"
                onClick={() => setIsMuted(true)}
              />
            )}
          </button>

          <video
            ref={videoRef}
            loop
            src={post.video.asset.url}
            onClick={onVideoClick}
          />
        </div>

        <div className="pt-10 lg:pt-20 w-full lg:w-[45%]">
          <div className="px-5 sm:px-10 pb-4 border-b-2">
            <div className="flex items-center space-x-3">
              <Link href={`/profile/${post.postedBy._id}`}>
                <img
                  className="w-16 h-16 rounded-full object-contain cursor-pointer"
                  src={post.postedBy.image}
                  alt=""
                />
              </Link>

              <div className="flex flex-col">
                <div className="flex items-center space-x-2">
                  <p className="font-bold text-xl">{post.postedBy.username}</p>

                  <GoVerified className="text-blue-400" />
                </div>

                <p className="capitalize ">{post.postedBy.username}</p>
              </div>
            </div>

            <p className="mt-5 mb-10 text-gray-600">{post.caption}</p>

            {user && (
              <LikeBtn
                likes={post.likes}
                loading={loading}
                handleLike={() => handleLike(true)}
                handleDislike={() => handleLike(false)}
              />
            )}
          </div>

          <div className="bg-gray-50 lg:h-[60%] px-5 sm:px-10 pt-4 border-b-2">
            <Comments
              addComment={addComment}
              input={input}
              setInput={setInput}
              posting={posting}
              comments={post.comments}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = async (context: any) => {
  const { id } = context.query;

  const data = await fetchPost(id);

  return {
    props: {
      postData: data,
    },
  };
};

export default Detail;
