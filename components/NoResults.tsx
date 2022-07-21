import React from "react";
import { MdOutlineVideocamOff } from "react-icons/md";
import { BiCommentX } from "react-icons/bi";

interface Props {
  text: string;
}

const NoResults = ({ text }: Props) => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="flex flex-col items-center">
        {text === "No Comment yet!" ? (
          <MdOutlineVideocamOff className="text-8xl" />
        ) : (
          <BiCommentX className="text-8xl" />
        )}

        <p className="text-2xl text-center">{text}</p>
      </div>
    </div>
  );
};

export default NoResults;
