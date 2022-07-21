import React, { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import { MdFavorite } from "react-icons/md";

interface Props {
  likes: any;
  loading: boolean;
  handleLike: () => void;
  handleDislike: () => void;
}

const LikeBtn = ({ likes, loading, handleLike, handleDislike }: Props) => {
  const [user] = useAuthState(auth);

  const [hasLiked, setHasLiked] = useState(false);

  const filteredLikes = likes?.filter((item: any) => item._ref === user?.uid);

  useEffect(() => {
    if (filteredLikes?.length > 0) {
      setHasLiked(true);
    } else {
      setHasLiked(false);
    }
  }, [filteredLikes, likes]);

  return (
    <div className="flex flex-col item-start justify-center w-8 md:w-14">
      {hasLiked ? (
        <button className="likeBtn" onClick={handleDislike} disabled={loading}>
          <MdFavorite className="text-[#f51997] text-lg md:text-2xl" />
        </button>
      ) : (
        <button className="likeBtn" onClick={handleLike} disabled={loading}>
          <MdFavorite className="text-black text-lg md:text-2xl" />
        </button>
      )}

      <p className="text-center font-bold text-lg">{likes?.length}</p>
    </div>
  );
};

export default LikeBtn;
