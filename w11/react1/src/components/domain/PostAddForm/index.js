import React from "react";
import { Spinner } from "../..";
import { usePostContext } from "../../../contexts/PostProvider";
import { useForm } from "../../../hooks";

const PostAddForm = () => {
  const { onAddPost } = usePostContext();

  const { isLoading, errors, handleChange, handleSubmit } = useForm({
    initialValues: {
      useId: 1,
      title: "",
      body: "",
    },
    onSubmit: async (values) => {
      await onAddPost(values);
    },
    validate: ({ title, body }) => {
      const errors = {};
      if (!title) errors.title = "NO TITLE";
      if (!body) errors.body = "NO BODY";

      return errors;
    },
  });
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input type="text" name="title" onChange={handleChange} />
        {errors.title}
      </div>
      <div>
        <input type="text" name="body" onChange={handleChange} />
        {errors.body}
      </div>
      {isLoading ? <Spinner></Spinner> : <button type="submit">ADD</button>}
    </form>
  );
};

export default PostAddForm;
