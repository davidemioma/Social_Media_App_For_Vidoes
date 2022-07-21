import React, { useState, useEffect } from "react";
import Head from "next/head";
import Layout from "../../components/Layout";
import { fetchSingleUser } from "../../utils/queries";
import { User, Video } from "../../types";
import { GoVerified } from "react-icons/go";
import Post from "../../components/Post";
import NoResults from "../../components/NoResults";

interface Props {
  data: {
    user: User;
    posts: Video[];
    likedPosts: Video[];
  };
}

const Profile = ({ data }: Props) => {
  const { user, posts, likedPosts } = data;

  const [view, setView] = useState("videos");

  const [postsList, setPostsList] = useState<Video[]>([]);

  useEffect(() => {
    if (view === "videos") {
      setPostsList(posts);
    } else {
      setPostsList(likedPosts);
    }
  }, [view, posts, likedPosts]);

  return (
    <div>
      <Head>
        <title>VSA - Profile</title>
      </Head>

      <Layout>
        <div className="flex flex-col space-y-10">
          <div className="flex items-start space-x-3 sm:space-x-4">
            <img
              className="w-12 h-12 rounded-full md:w-24 md:h-24"
              src={user?.image}
              alt=""
            />

            <div className="flex flex-col">
              <div className="flex items-center space-x-1">
                <p className="text-lg font-bold md:text-2xl tracking-wider">
                  {user?.username.replace(/\s+/g, "")}
                </p>

                <GoVerified className="text-blue-400 text-xl" />
              </div>

              <p className="text-sm capitalize">{user?.username}</p>
            </div>
          </div>

          <div className="flex flex-col space-y-6">
            <div className="w-full flex items-center space-x-10 border-b-2 border-gray-200">
              <button
                className={`${
                  view === "videos" ? "activeBtn" : "text-gray-400"
                } selectBtn `}
                onClick={() => setView("videos")}
              >
                Videos
              </button>

              <button
                className={`${
                  view === "liked" ? "activeBtn" : "text-gray-400"
                } selectBtn `}
                onClick={() => setView("liked")}
              >
                Liked
              </button>
            </div>

            <div className="flex gap-6 flex-col md:justify-start">
              {postsList?.length > 0 ? (
                postsList?.map((post, i) => <Post key={i} post={post} />)
              ) : (
                <NoResults
                  text={`No ${view === "videos" ? "" : "Liked"} Videos Yet`}
                />
              )}
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export const getServerSideProps = async (context: any) => {
  const { id } = context.query;

  const data = await fetchSingleUser(id);

  return {
    props: {
      data,
    },
  };
};

export default Profile;
