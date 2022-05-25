import { Spinner } from "phosphor-react";
import { z } from "zod";
import { SubmitHandler } from "react-hook-form";
import axios from "axios";

import Button from "../ui/Button";
import InputField from "../ui/InputField";
import { useForm } from "../../utils/useForm";
import { Form } from "../../utils/useForm";
import { API, APIError } from "../../api";
import regex from "../../utils/regex";

interface ISignUpSchema {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const signUpSchema = z
  .object({
    firstName: z
      .string()
      .trim()
      .min(3)
      .regex(regex.ONLY_ALPHA_SPACES, "First name should contain only alpha characters."),
    lastName: z
      .string()
      .trim()
      .min(3)
      .regex(regex.ONLY_ALPHA_SPACES, "Last name should contain only alpha characters."),
    email: z.string().min(1).email("Please enter a valid e-mail address."),
    password: z.string().min(8, "Password should be at least 8 characters long."),
    confirmPassword: z.string().min(8, "Password should be at least 8 characters long."),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

const SignUpForm = ({ setIsLoginForm }: { setIsLoginForm: Function }) => {
  const signUpForm = useForm({
    schema: signUpSchema,
  });

  const handleSubmit: SubmitHandler<ISignUpSchema> = async (values, event) => {
    event?.preventDefault();
    try {
      const response = await API.post("auth/signup", values);
      if (response.status === 201) {
        alert(response.data.message);
        setIsLoginForm(true);
      }
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        const errors = err.response.data as APIError;

        if (errors.fields) {
          Object.values(errors.fields).forEach((data, _idx) => {
            signUpForm.setError(data.field, { type: "custom", message: data.message });
          });
        }
      }
    }
  };

  return (
    <>
      <Form form={signUpForm} onSubmit={handleSubmit} className="mt-4">
        <div className="flex flex-col justify-center px-10 mt-3 space-y-5">
          <InputField
            autoComplete="off"
            type="text"
            placeholder="First name"
            {...signUpForm.register("firstName")}
          />
          <InputField
            autoComplete="off"
            type="text"
            placeholder="Last name"
            {...signUpForm.register("lastName")}
          />
          <InputField autoComplete="off" type="email" placeholder="Email" {...signUpForm.register("email")} />
          <InputField type="password" placeholder="Password" {...signUpForm.register("password")} />
          <InputField
            type="password"
            placeholder="Confirm password"
            {...signUpForm.register("confirmPassword")}
          />
        </div>
        <div className="px-10 mt-4">
          <Button
            className="inline-flex justify-center w-full p-2 font-medium text-black bg-white border border-gray-400 hover:bg-slate-200"
            aria-label="Log in"
            type="submit"
            disabled={signUpForm.formState.isSubmitting}
          >
            {signUpForm.formState.isSubmitting ? <Spinner className="animate-spin" /> : "Sign Up"}
          </Button>
        </div>
      </Form>
      <div className="flex flex-row items-center justify-center mt-2 space-x-1">
        <p className="font-thin">Already have an account?</p>
        <Button
          className="inline-flex font-medium hover:underline"
          aria-label="Sign Up"
          disabled={signUpForm.formState.isSubmitting}
          onClick={() => setIsLoginForm(true)}
        >
          Log In
        </Button>
      </div>
    </>
  );
};

export default SignUpForm;
