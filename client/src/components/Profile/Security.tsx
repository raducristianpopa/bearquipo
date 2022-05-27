import axios from "axios";
import { Warning } from "phosphor-react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

import { APIError } from "../../api";
import { changePassword } from "../../api/services/user";
import { selectCurrentUser, updateUserState } from "../../features/auth/userSlice";
import { useAppDispatch, useTypedSelector } from "../../utils/hooks";
import { Form, useForm } from "../../utils/useForm";
import InputField from "../ui/InputField";
import ButtonOrLink from "../ui/ButtonOrLink";
import { removeAllSessions } from "../../api/auth";

interface ISecurityForm {
  oldPassword: string;
  newPassword: string;
  newConfirmPassword: string;
}

const securitySchema = z
  .object({
    oldPassword: z.string().min(1),
    newPassword: z.string().min(8, "Password should be at least 8 characters long."),
    newConfirmPassword: z.string().min(8, "Confirm password should be at least 8 characters long."),
  })
  .refine(data => data.newPassword === data.newConfirmPassword, {
    message: "Passwords do not match.",
    path: ["newConfirmPassword"],
  });

const Security = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useTypedSelector(selectCurrentUser);
  const userAgent = window.navigator.userAgent;
  console.log(user?.tokens);
  const securityForm = useForm({
    schema: securitySchema,
  });

  const handleSubmit = async (values: ISecurityForm) => {
    try {
      const response = await changePassword(values);
      alert(response.data);
      dispatch(updateUserState({ user: null }));
      return navigate(0);
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        const errors = err.response.data as APIError;

        if (errors.fields) {
          Object.values(errors.fields).forEach((data, _idx) => {
            securityForm.setError(data.field, { type: "custom", message: data.message });
          });
        } else {
          alert(errors.message);
        }
      }
    }
  };

  const handleClick = async () => {
    try {
      const response = await removeAllSessions();
      alert(response.data);
      dispatch(updateUserState({ user: null }));
      return navigate(0);
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        const errors = err.response.data as APIError;
        alert(errors.message);
      }
    }
  };
  return (
    <>
      <Form form={securityForm} onSubmit={handleSubmit}>
        <div className="shadow sm:rounded-sm sm:overflow-hidden shadow-slate-300">
          <div className="px-4 py-5 space-y-6 bg-white sm:p-6">
            <p className="text-3xl font-bold text-black">Security</p>
            <div className="flex items-center w-full p-6 bg-red-100 shadow-lg pace-x-4 rounded-xl">
              <div className="shrink-0">
                <Warning size={64} color="#ff2600" weight="thin" />
              </div>
              <div className="ml-5">
                <div className="text-lg font-medium text-red-500">Important!</div>
                <p className="text-red-500">
                  Changing your password will automatically sign out of all other devices.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-4 gap-6">
              <div className="col-span-4 sm:col-span-4 sm:mx-32">
                <InputField
                  type="password"
                  label="Old password"
                  color="text-black"
                  className="flex-1 block w-full border-gray-300 rounded-md focus:ring-gray-500 focus:border-gray-500"
                  placeholder="Old password"
                  {...securityForm.register("oldPassword")}
                />
              </div>
              <div className="col-span-4 sm:col-span-2">
                <InputField
                  type="password"
                  label="New password"
                  color="text-black"
                  className="flex-1 block w-full border-gray-300 rounded-md focus:ring-gray-500 focus:border-gray-500"
                  placeholder="New password"
                  {...securityForm.register("newPassword")}
                />
              </div>
              <div className="col-span-4 sm:col-span-2">
                <InputField
                  type="password"
                  label="New confirm password"
                  color="text-black"
                  className="flex-1 block w-full border-gray-300 rounded-md focus:ring-gray-500 focus:border-gray-500"
                  placeholder="New confirm password"
                  {...securityForm.register("newConfirmPassword")}
                />
              </div>
            </div>
          </div>
          <div className="px-4 py-3 text-right bg-gray-50 sm:px-6">
            <button
              type="submit"
              className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-black border border-transparent rounded-sm shadow-sm hover:bg-opacity-80 focus:outline-none "
            >
              Save
            </button>
          </div>
        </div>
      </Form>

      <div className="mt-3 shadow sm:rounded-sm sm:overflow-hidden shadow-slate-300">
        <div className="px-4 py-5 space-y-6 bg-white sm:p-6">
          <div className="flex items-center justify-between">
            <p className="text-xl font-bold text-black">Sessions</p>
            <ButtonOrLink
              className="p-3 text-black border border-black rounded-sm hover:text-white hover:bg-black"
              onClick={handleClick}
            >
              Sign out all devices
            </ButtonOrLink>
          </div>
          <div className="flex flex-col">
            {user?.tokens ? (
              user.tokens.map((token, index) => (
                <div key={index} className="flex flex-col py-3 text-black border-b border-gray-300">
                  <span className="text-lg font-semibold">
                    {token.browser} - {token.os}
                  </span>
                  <span className="text-thin">Issued at: {token.issuedAt}</span>
                  {userAgent === token.userAgent && (
                    <span className="font-bold text-green-700">This is your current session.</span>
                  )}
                </div>
              ))
            ) : (
              <>test</>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Security;
