import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "src/store";

const PostPage = () => {
  const post = useSelector((state: RootState) => state.post.postList);
  console.log(post);
  return <div></div>;
};

export default PostPage;
