import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, signInWithGoogle } from "../firebase";
import { FcGoogle } from "react-icons/fc";
import { AiOutlineLogout } from "react-icons/ai";
import { BiSearch } from "react-icons/bi";
import { IoMdAdd } from "react-icons/io";
import { useRouter } from "next/router";

const Nav = () => {
  const [user, loading] = useAuthState(auth);

  const router = useRouter();

  const [searchvalue, setSearchvalue] = useState("");

  const signInHandler = () => {
    signInWithGoogle().then(async (res) => {
      await fetch("/api/addUser", {
        method: "POST",
        body: JSON.stringify({
          _id: res?.user?.uid,
          _type: "user",
          username: res?.user?.displayName,
          image: res?.user?.photoURL,
        }),
      });
    });
  };

  const handleSearch = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (!searchvalue.trim()) return;

    router.push(`/search/${searchvalue}`);
  };

  return (
    <div className="w-full flex items-center justify-between py-2 px-4 border-b-2 border-gray-200">
      <Link href="/">
        <div className="relative w-[100px] h-[38px] md:w-[138px]">
          <Image
            className="cursor-pointer"
            layout="fill"
            src="/assets/logo.png"
            alt="logo"
          />
        </div>
      </Link>

      <div className="hidden md:inline-flex shadow-sm bg-gray-100 rounded-full overflow-hidden">
        <form
          className="flex items-center space-x-4 py-3 px-4"
          onSubmit={handleSearch}
        >
          <input
            className="w-[300px] lg:w-[350px] outline-none flex-grow bg-transparent"
            value={searchvalue}
            type="text"
            placeholder="Search accounts and videos"
            onChange={(e) => setSearchvalue(e.target.value)}
          />

          <div className="h-full w-[2px] bg-gray-200" />

          <button type="submit" className="text-gray-400 text-xl font-bold">
            <BiSearch />
          </button>
        </form>
      </div>

      {loading ? (
        <div />
      ) : (
        <div>
          {user ? (
            <div className="flex items-center space-x-4">
              <Link href="/upload">
                <button className="border-2 p-2 font-semibold flex items-center space-x-2 md:px-4">
                  <IoMdAdd className="text-xl" />

                  <p className="hidden md:inline">Upload</p>
                </button>
              </Link>

              {user?.photoURL && (
                <Link href="/">
                  <img
                    className="w-10 h-10 rounded-full cursor-pointer"
                    src={`${user?.photoURL}`}
                    alt=""
                  />
                </Link>
              )}

              <button
                className="shadow-xl p-2 rounded-full inline-flex items-center justify-center"
                onClick={() => auth.signOut()}
              >
                <AiOutlineLogout className="text-xl text-[#f51997]" />
              </button>
            </div>
          ) : (
            <button
              className="flex items-center space-x-2 p-2 border border-gray-300 rounded"
              onClick={signInHandler}
            >
              <FcGoogle className="text-xl" />

              <p className="text-sm capitalize">sign in with google</p>
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Nav;
