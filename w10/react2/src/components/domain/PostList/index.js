import React from "react";
import { usePostContext } from "../../../contexts/PostProvider";
import PostItem from "../PostItem";

const PostList = () => {
  const { posts } = usePostContext();

  return (
    <ul>
      {posts.map((post) => (
        <PostItem key={post.id} post={post}></PostItem>
      ))}
    </ul>
  );
};

export default PostList;
