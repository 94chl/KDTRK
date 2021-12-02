import Title from "./Title";
import CardForm from "./CardForm";
import Input from "./Input";
import Button from "./Button";
import useForm from "../../hooks/useForm";
import ErrorText from "./ErrorText";

const sleep = () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(), 1000);
  });
};

const LoginForm = ({ onSubmit }) => {
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   onSubmit && onSubmit();
  // };

  const { errors, isLoading, handleChange, handleSubmit } = useForm({
    initialValues: { id: "", password: "" },
    onSubmit,
    validate: ({ id, password }) => {
      const newErrors = {};
      if (!id) newErrors.id = "ID를 입력하세요";
      if (!password) newErrors.password = "Password를 입력하세요";

      return newErrors;
    },
  });

  console.log(errors);

  return (
    <CardForm onSubmit={handleSubmit}>
      <Title>Login</Title>
      <Input type="text" name="id" placeholder="ID" onChange={handleChange} />
      {errors.id && <ErrorText>{errors.id}</ErrorText>}
      <Input
        type="password"
        name="password"
        placeholder="PASSWORD"
        style={{ marginTop: 8 }}
        onChange={handleChange}
      />
      {errors.password && <ErrorText>{errors.password}</ErrorText>}
      <Button type="submit" disabled={isLoading} style={{ marginTop: 16 }}>
        Login
      </Button>
    </CardForm>
  );
};

export default LoginForm;
