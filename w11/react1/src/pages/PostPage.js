import React, { Fragment } from "react";
import { useParams } from "react-router";
import { useAsync } from "@hooks";
import axios from "axios";
import { Spinner, Header, Text } from "@components";

const PostPage = () => {
  const { postId } = useParams();

  const post = useAsync(async () => {
    return await axios
      .get(`http://jsonplaceholder.typicode.com/posts/${postId}`)
      .then((res) => res.data);
  }, [postId]);

  return (
    <div>
      {post.isLoading ? (
        <Spinner></Spinner>
      ) : (
        <Fragment>
          <Header strong>{post.value?.title}</Header>
          <Text>{post.value?.body}</Text>
        </Fragment>
      )}
    </div>
  );
};

export default PostPage;
