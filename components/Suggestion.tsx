import React, { useState, useEffect } from "react";
import Link from "next/link";
import { fetchUsers } from "../utils/queries";
import { User } from "../types";
import { GoVerified } from "react-icons/go";

const Suggestion = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const getUsers = async () => {
      const data = await fetchUsers();

      setUsers(data);
    };

    getUsers();
  }, []);

  return (
    <div className="xl:border-b-2 mt-1 border-gray-200 xl:pb-6 xl:mt-4">
      <p className="hidden xl:inline text-gray-500 font-semibold mx-3">
        Suggested accounts
      </p>

      <div className="flex flex-col xl:mt-3 items-center xl:items-start">
        {users?.slice(0, 6).map((user) => (
          <Link key={user._id} href={`/profile/${user?._id}`}>
            <button className="normalLink xl:w-full xl:rounded-lg xl:border-0 xl:py-1.5 xl:hover:bg-gray-100">
              <img
                className="w-7 h-7 xl:w-8 xl:h-8 rounded-full"
                src={user.image}
                alt=""
              />

              <div className="hidden xl:inline-flex flex-col items-start -space-y-0.5">
                <div className="flex items-center space-x-1">
                  <p className="font-bold">
                    {user.username.replace(/\s+/g, "")}
                  </p>

                  <GoVerified className="text-blue-400" />
                </div>

                <p className="capitalize text-sm text-gray-400">
                  {user.username}
                </p>
              </div>
            </button>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Suggestion;
