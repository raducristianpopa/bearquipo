import React from "react";
import { z } from "zod";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { Form, useForm } from "../../utils/useForm";
import InputField from "../ui/InputField";
import { addAddress } from "../../api/services/user";
import { updateUserAddresses } from "../../features/auth/userSlice";
import { useAppDispatch } from "../../utils/hooks";
import { APIError } from "../../api";

interface INewAddressForm {
  addressLine1: string;
  addressLine2?: string | undefined;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  phone: string;
}

const newAddressSchema = z.object({
  addressLine1: z.string().min(3, "Address line 1 should contain at least 3 characters"),
  addressLine2: z.string().default(""),
  city: z.string().min(3, "City should contain at least 3 characters"),
  state: z.string().min(3, "State should contain at least 3 characters"),
  country: z.string().min(3, "Country should contain at least 3 characters"),
  postalCode: z.string().min(3, "Postal code should contain at least 3 characters"),
  phone: z.string().min(3, "Phoneshould contain at least 3 characters"),
});

const NewAddressForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const newAddressForm = useForm({
    schema: newAddressSchema,
  });

  const handleSubmit = async (values: INewAddressForm) => {
    try {
      const response = await addAddress(values);
      alert("Your address was successfully added.");
      dispatch(updateUserAddresses({ addresses: response.data }));
      newAddressForm.reset();
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        const errors = err.response.data as APIError;

        if (errors.fields) {
          Object.values(errors.fields).forEach((data, _idx) => {
            newAddressForm.setError(data.field, { type: "custom", message: data.message });
          });
        } else {
          alert(errors.message);
        }
      }
    }
  };

  return (
    <Form form={newAddressForm} onSubmit={handleSubmit} className="w-full">
      <div className="grid grid-cols-6 gap-6">
        <div className="col-span-6 sm:col-span-6">
          <InputField
            type="text"
            label="Address line 1"
            color="text-black"
            className="flex-1 block w-full border-gray-300 rounded-md focus:ring-gray-500 focus:border-gray-500"
            placeholder="Address line 1"
            {...newAddressForm.register("addressLine1")}
          />
        </div>
        <div className="col-span-6 sm:col-span-6">
          <InputField
            type="text"
            label="Addres line 2"
            color="text-black"
            className="flex-1 block w-full border-gray-300 rounded-md focus:ring-gray-500 focus:border-gray-500"
            placeholder="Address line 2"
            {...newAddressForm.register("addressLine2")}
          />
        </div>
        <div className="col-span-6 sm:col-span-2">
          <InputField
            type="text"
            label="City"
            color="text-black"
            className="flex-1 block w-full border-gray-300 rounded-md focus:ring-gray-500 focus:border-gray-500"
            placeholder="City"
            {...newAddressForm.register("city")}
          />
        </div>
        <div className="col-span-6 sm:col-span-2">
          <InputField
            type="text"
            label="State"
            color="text-black"
            className="flex-1 block w-full border-gray-300 rounded-md focus:ring-gray-500 focus:border-gray-500"
            placeholder="State"
            {...newAddressForm.register("state")}
          />
        </div>
        <div className="col-span-6 sm:col-span-2">
          <InputField
            type="text"
            label="Country"
            color="text-black"
            className="flex-1 block w-full border-gray-300 rounded-md focus:ring-gray-500 focus:border-gray-500"
            placeholder="Country"
            {...newAddressForm.register("country")}
          />
        </div>
        <div className="col-span-6 sm:col-span-3">
          <InputField
            type="text"
            label="Postal code"
            color="text-black"
            className="flex-1 block w-full border-gray-300 rounded-md focus:ring-gray-500 focus:border-gray-500"
            placeholder="Postal code"
            {...newAddressForm.register("postalCode")}
          />
        </div>
        <div className="col-span-6 sm:col-span-3">
          <InputField
            type="text"
            label="Phone number"
            color="text-black"
            className="flex-1 block w-full border-gray-300 rounded-md focus:ring-gray-500 focus:border-gray-500"
            placeholder="Phone number"
            {...newAddressForm.register("phone")}
          />
        </div>
      </div>
      <div className="py-3 text-right bg-gray-50">
        <button
          type="submit"
          className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-black border border-transparent rounded-sm shadow-sm hover:bg-opacity-80 focus:outline-none "
        >
          Save
        </button>
      </div>
    </Form>
  );
};

export default NewAddressForm;
