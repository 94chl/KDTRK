import styled from "@emotion/styled";
import { useState } from "react";
import useForm from "../../hooks/useForm";

export default {
  title: "Hook/useForm",
};

const Popover = styled.div`
  width: 100px;
  height: 100px;
  background: orange;
`;

const sleep = () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(), 1000);
  });
};

export const Default = () => {
  const { values, errors, isLoading, handleChange, handleSubmit } = useForm({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      await sleep();
      alert(JSON.stringify(values));
    },
    validate: ({ email, password }) => {
      const errors = {};
      if (!email) errors.email = "이메일 입력하시오";
      if (!password) errors.password = "비밀번호 입력하시오";
      if (!/^.+@.+\..+$/.test(email)) errors.email = "이메일 확인하시오";

      return errors;
    },
  });

  return (
    <form onSubmit={handleSubmit}>
      <h1>SIGN IN</h1>
      <div>
        <input
          type="email"
          name="email"
          placeholder="EMAIL"
          onChange={handleChange}
        />
        {errors.email}
      </div>
      <div>
        <input
          type="password"
          name="password"
          placeholder="PASSWORD"
          onChange={handleChange}
        />
        {errors.password}
      </div>
      <button type="submit" disabled={isLoading}>
        {isLoading ? "LOADING" : "Submit"}
      </button>
    </form>
  );
};
