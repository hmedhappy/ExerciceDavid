import UserContext from "contexts/UserContext";
import { useFormik } from "formik";
import useAuth from "hooks/useAuth";
import { useContext } from "react";
import { Redirect } from "react-router-dom";
import { toast } from "react-toastify";
import { useLogin } from "requests/auth";

const LoginContainer = () => {
  const { user } = useContext(UserContext);
  const [loginCall] = useAuth(useLogin);
  const {
    values: { email, password },
    handleChange,
    handleSubmit,
  } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      loginCall({ variables: values }).then(({ errors }) => {
        if (errors) {
          toast.error((errors as any).message);
          return;
        }
        toast.success("Welcome ");
      });
    },
  });

  if (user) {
    return <Redirect to="/" />;
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={email}
        onChange={handleChange("email")}
        placeholder="email"
      />
      <input
        value={password}
        onChange={handleChange("password")}
        placeholder="password"
        type="password"
      />
      <button>Submit</button>
    </form>
  );
};

export default LoginContainer;
