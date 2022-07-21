import React, { useState, useEffect } from "react";
import Head from "next/head";
import { fetchSearchResults } from "../../utils/queries";
import { Video, User } from "../../types";
import { GoVerified } from "react-icons/go";
import Layout from "../../components/Layout";
import Post from "../../components/Post";
import NoResults from "../../components/NoResults";
import { useRouter } from "next/router";
import { fetchUsers } from "../../utils/queries";
import Link from "next/link";

interface Props {
  posts: Video[];
}

const Search = ({ posts }: Props) => {
  const [viewAccount, setViewAccount] = useState(false);

  const router = useRouter();

  const { searchTerm } = router.query;

  const [users, setUsers] = useState<User[]>([]);

  const [searchedUsers, setSearchedUsers] = useState<User[]>([]);

  useEffect(() => {
    const getUsers = async () => {
      const data = await fetchUsers();

      setUsers(data);
    };

    getUsers();
  }, []);

  useEffect(() => {
    setSearchedUsers(
      users.filter((user) =>
        user.username.toLowerCase().includes(`${searchTerm}`)
      )
    );
  }, [searchTerm]);

  return (
    <div className="w-full">
      <Head>
        <title>VSA - Search</title>
      </Head>

      <Layout>
        <div>
          <div className="w-full mb-7 flex items-center space-x-10 border-b-2 border-gray-200">
            <button
              className={`${
                viewAccount ? "activeBtn" : "text-gray-400"
              } selectBtn `}
              onClick={() => setViewAccount(true)}
            >
              Accounts
            </button>

            <button
              className={`${
                !viewAccount ? "activeBtn" : "text-gray-400"
              } selectBtn `}
              onClick={() => setViewAccount(false)}
            >
              Videos
            </button>
          </div>

          {viewAccount ? (
            <div className="flex flex-col space-y-6 md:justify-start">
              {searchedUsers?.length > 0 ? (
                searchedUsers?.map((user, i) => (
                  <div
                    key={i}
                    className="flex items-center space-x-3 py-3 border-b-2"
                  >
                    <Link href={`/profile/${user._id}`}>
                      <img
                        className="w-12 h-12 rounded-full cursor-pointer"
                        src={user.image}
                        alt=""
                      />
                    </Link>

                    <div className="flex flex-col">
                      <div className="flex items-center space-x-1">
                        <p className="text-lg font-bold">{user.username}</p>

                        <GoVerified className="text-blue-400" />
                      </div>

                      <p className="text-sm font-semibold text-gray-400">
                        {user.username}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <NoResults text={`No Account Results for ${searchTerm}`} />
              )}
            </div>
          ) : (
            <div>
              {posts?.length > 0 ? (
                posts?.map((post, i) => <Post key={i} post={post} />)
              ) : (
                <NoResults text={`No Video Results for ${searchTerm}`} />
              )}
            </div>
          )}
        </div>
      </Layout>
    </div>
  );
};

export const getServerSideProps = async (context: any) => {
  const { searchTerm } = context.query;

  const posts = await fetchSearchResults(searchTerm);

  return {
    props: {
      posts,
    },
  };
};

export default Search;
