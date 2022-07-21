import React, { Dispatch, SetStateAction, useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import { fetchUsers } from "../utils/queries";
import { User } from "../types";
import { GoVerified } from "react-icons/go";
import NoResults from "./NoResults";
import Link from "next/link";

interface Props {
  addComment: () => void;
  input: string;
  setInput: Dispatch<SetStateAction<string>>;
  posting: boolean;
  comments: Comment[];
}

interface Comment {
  comment: string;
  length?: number;
  _key: string;
  postedBy: { _ref?: string; _id?: string };
}

const Comments = ({
  addComment,
  input,
  setInput,
  posting,
  comments,
}: Props) => {
  const [user] = useAuthState(auth);

  const [allUsers, setAllUsers] = useState<User[]>([]);

  useEffect(() => {
    const getUsers = async () => {
      const data = await fetchUsers();

      setAllUsers(data);
    };

    getUsers();
  }, []);

  return (
    <div className="w-full h-full relative pb-24 lg:pb-0">
      <div>
        {comments?.length > 0 ? (
          <div>
            {comments?.map((comment, i) => (
              <>
                {allUsers?.map(
                  (item) =>
                    item._id ===
                      (comment.postedBy._id || comment.postedBy._ref) && (
                      <div key={i} className="flex items-start space-x-3">
                        <Link href={`/profile/${item._id}`}>
                          <img
                            className="w-12 h-12 rounded-full cursor-pointer"
                            src={item.image}
                            alt=""
                          />
                        </Link>

                        <div className="flex flex-col space-y-1">
                          <div className="flex items-center space-x-2">
                            <p className="text-xl font-bold">{item.username}</p>

                            <GoVerified className="text-blue-400" />
                          </div>

                          <p>{comment.comment}</p>
                        </div>
                      </div>
                    )
                )}
              </>
            ))}
          </div>
        ) : (
          <NoResults text="No Comment yet!" />
        )}
      </div>

      {user && (
        <div className="absolute bottom-5 w-full flex space-x-5">
          <input
            className="flex-grow outline-none p-3 rounded bg-gray-100"
            value={input}
            type="text"
            placeholder="Add Comment..."
            onChange={(e) => setInput(e.target.value)}
          />

          <button
            className="text-gray-400 disabled:cursor-not-allowed font-semibold"
            onClick={addComment}
            disabled={!input.trim() || posting}
          >
            Comment
          </button>
        </div>
      )}
    </div>
  );
};

export default Comments;
