import { useState, useEffect } from "react";
import Head from "next/head";
import { fetchPosts } from "../utils/queries";
import { Video } from "../types";
import Post from "../components/Post";
import NoResults from "../components/NoResults";
import Layout from "../components/Layout";
import { useRouter } from "next/router";

interface Props {
  posts: Video[];
}

const Home = ({ posts }: Props) => {
  const router = useRouter();

  const { topic } = router.query;

  const [filteredPosts, setFilteredPosts] = useState<Video[]>([]);

  useEffect(() => {
    const newPosts = posts.filter((post) => post.topic === topic);

    setFilteredPosts(newPosts);
  }, [topic]);

  return (
    <div>
      <Head>
        <title>VSA - Home</title>
      </Head>

      <Layout>
        {topic ? (
          <div className="mt-4 flex flex-col space-y-10 h-full">
            {filteredPosts?.length > 0 ? (
              filteredPosts?.map((post) => <Post key={post._id} post={post} />)
            ) : (
              <NoResults text="No Posts Available" />
            )}
          </div>
        ) : (
          <div className="mt-4 flex flex-col space-y-10 h-full">
            {posts?.length > 0 ? (
              posts?.map((post) => <Post key={post._id} post={post} />)
            ) : (
              <NoResults text="No Posts Available" />
            )}
          </div>
        )}
      </Layout>
    </div>
  );
};

export const getServerSideProps = async () => {
  const posts = await fetchPosts();

  return {
    props: {
      posts,
    },
  };
};

export default Home;
