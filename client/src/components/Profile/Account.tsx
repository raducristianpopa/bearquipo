import axios from "axios";
import { z } from "zod";

import { APIError } from "../../api";
import { updateUser } from "../../api/services/user";
import { selectCurrentUser, updateUserState } from "../../features/auth/userSlice";
import { useAppDispatch, useTypedSelector } from "../../utils/hooks";
import { Form, useForm } from "../../utils/useForm";
import InputField from "../ui/InputField";

interface IAccountForm {
  firstName: string;
  lastName: string;
}

const accountSchema = z.object({
  firstName: z.string().min(3, "First name should contain at least 3 characters"),
  lastName: z.string().min(3, "First name should contain at least 3 characters"),
});

const Account = () => {
  const dispatch = useAppDispatch();
  const user = useTypedSelector(selectCurrentUser);

  const accountForm = useForm({
    schema: accountSchema,
    defaultValues: {
      firstName: user?.firstName,
      lastName: user?.lastName,
    },
  });

  const handleSubmit = async (values: IAccountForm) => {
    try {
      const response = await updateUser(values);
      dispatch(updateUserState({ user: response.data }));
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        const errors = err.response.data as APIError;

        if (errors.fields) {
          Object.values(errors.fields).forEach((data, _idx) => {
            accountForm.setError(data.field, { type: "custom", message: data.message });
          });
        }
      }
    }
  };

  return (
    <Form form={accountForm} onSubmit={handleSubmit}>
      <div className="shadow sm:rounded-sm sm:overflow-hidden shadow-slate-300">
        <div className="px-4 py-5 space-y-6 bg-white sm:p-6">
          <p className="text-3xl font-bold text-black">Account</p>
          <div className="grid grid-cols-4 gap-6">
            <div className="col-span-4 sm:col-span-2">
              <InputField
                type="text"
                label="First name"
                color="text-black"
                className="flex-1 block w-full border-gray-300 rounded-md focus:ring-gray-500 focus:border-gray-500"
                placeholder="First name"
                {...accountForm.register("firstName")}
              />
            </div>
            <div className="col-span-4 sm:col-span-2">
              <InputField
                type="text"
                label="Last name"
                color="text-black"
                className="flex-1 block w-full border-gray-300 rounded-md focus:ring-gray-500 focus:border-gray-500"
                placeholder="Last name"
                {...accountForm.register("lastName")}
              />
            </div>
          </div>
          <hr />
          <InputField
            type="text"
            label="E-mail"
            color="text-black"
            className="flex-1 block w-full text-gray-600 border-gray-300 rounded-md focus:ring-gray-500 focus:border-gray-500 read-only:bg-gray-200"
            defaultValue={user?.email}
            disabled
            readOnly
          />
        </div>
        <div className="px-4 py-3 text-right bg-gray-50 sm:px-6">
          <button
            type="submit"
            className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-black border border-transparent rounded-md shadow-sm hover:bg-opacity-80 focus:outline-none "
          >
            Save
          </button>
        </div>
      </div>
    </Form>
  );
};

export default Account;
