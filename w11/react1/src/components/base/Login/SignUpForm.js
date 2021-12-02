import Input from "./Input";
import Button from "./Button";
import useForm from "../../hooks/useForm";
import ErrorText from "./ErrorText";
import Title from "./Title";
import CardForm from "./CardForm";

const SignUpForm = ({ onSubmit }) => {
  const { errors, isLoading, handleChange, handleSubmit } = useForm({
    initialValues: { id: "", password: "", passwordConfirm: "" },
    onSubmit,
    validate: ({ id, password, passwordConfirm }) => {
      const newErrors = {};
      if (!id) newErrors.id = "No ID!";
      if (!password) newErrors.password = "No Password!";
      if (password !== passwordConfirm)
        newErrors.passwordConfirm = "Password is NOT Confirmed!";

      return newErrors;
    },
  });

  console.log(errors);

  return (
    <CardForm onSubmit={handleSubmit}>
      <Title>Sign up</Title>
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
      <Input
        type="password"
        name="passwordConfirm"
        placeholder="PASSWORD CONFIRM"
        style={{ marginTop: 8 }}
        onChange={handleChange}
      />
      {errors.passwordConfirm && (
        <ErrorText>{errors.passwordConfirm}</ErrorText>
      )}
      <Button type="submit" disabled={isLoading} style={{ marginTop: 16 }}>
        Sign up
      </Button>
    </CardForm>
  );
};

export default SignUpForm;
