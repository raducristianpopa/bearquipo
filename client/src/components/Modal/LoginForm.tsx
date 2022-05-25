import { Spinner } from "phosphor-react";
import { z } from "zod";
import axios, { AxiosError } from "axios";

import Button from "../ui/Button";
import InputField from "../ui/InputField";
import { useForm } from "../../utils/useForm";
import { Form } from "../../utils/useForm";
import { useAppDispatch } from "../../utils/hooks";
import { API, APIError } from "../../api";
import { setUser } from "../../features/auth/userSlice";
import { useNavigate } from "react-router-dom";

interface ILoginForm {
  email: string;
  password: string;
}

const logInSchema = z.object({
  email: z
    .string()
    .min(1, "Please enter a valid e-mail address.")
    .email("Please enter a valid e-mail address."),
  password: z.string().min(1, ""),
});

const LoginForm = ({ setIsLoginForm }: { setIsLoginForm: Function }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const logInForm = useForm({
    schema: logInSchema,
  });

  const handleSubmit = async (values: ILoginForm) => {
    try {
      const response = await API.post("auth/signin", { email: values.email, password: values.password });
      if (response.status === 201) {
        /* CREATED */ dispatch(setUser());
        return navigate(0);
      }
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        const error = err.response.data as APIError;
        alert(error.message);
      }
    }
  };

  return (
    <>
      <Form form={logInForm} onSubmit={handleSubmit} className="mt-4">
        <div className="flex flex-col justify-center px-10 mt-3 space-y-5">
          <InputField autoComplete="off" type="text" placeholder="Email" {...logInForm.register("email")} />
          <InputField type="password" placeholder="Password" {...logInForm.register("password")} />
        </div>
        <div className="px-10 mt-4">
          <Button
            className="inline-flex justify-center w-full p-2 font-medium text-black bg-white border border-gray-400 hover:bg-slate-200"
            aria-label="Log in"
            type="submit"
            disabled={logInForm.formState.isSubmitting}
          >
            {logInForm.formState.isSubmitting ? <Spinner className="animate-spin" /> : "Log In"}
          </Button>
        </div>
      </Form>
      <div className="flex flex-row items-center justify-center mt-2 space-x-1">
        <p className="font-thin">Don't have an account?</p>
        <Button
          className="inline-flex font-medium hover:underline"
          aria-label="Sign Up"
          disabled={logInForm.formState.isSubmitting}
          onClick={() => setIsLoginForm(false)}
        >
          Sign Up
        </Button>
      </div>
    </>
  );
};

export default LoginForm;
