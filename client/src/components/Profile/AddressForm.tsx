import React from "react";
import { Disclosure } from "@headlessui/react";
import clsx from "clsx";
import { CaretDown } from "phosphor-react";
import { z } from "zod";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { Form, useForm } from "../../utils/useForm";
import InputField from "../ui/InputField";
import { updateAddress } from "../../api/services/user";
import { updateUserAddresses } from "../../features/auth/userSlice";
import { useAppDispatch } from "../../utils/hooks";
import { APIError } from "../../api";

interface IAddressForm {
  id: string;
  addressLine1: string;
  addressLine2?: string | undefined;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  phone: string;
}

const addressSchema = z.object({
  id: z.string().min(1),
  addressLine1: z.string().min(3, "Address line 1 should contain at least 3 characters"),
  addressLine2: z.string().default(""),
  city: z.string().min(3, "City should contain at least 3 characters"),
  state: z.string().min(3, "State should contain at least 3 characters"),
  country: z.string().min(3, "Country should contain at least 3 characters"),
  postalCode: z.string().min(3, "Postal code should contain at least 3 characters"),
  phone: z.string().min(3, "Phoneshould contain at least 3 characters"),
});

const AddressForm: React.FC<{ address: IAddressForm }> = ({ address }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const addressForm = useForm({
    schema: addressSchema,
    defaultValues: {
      ...address,
    },
  });

  const handleSubmit = async (values: IAddressForm) => {
    try {
      const response = await updateAddress(values);
      dispatch(updateUserAddresses({ addresses: response.data }));
      alert("Your address was succesfully updated.");
      navigate(0);
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        const errors = err.response.data as APIError;

        if (errors.fields) {
          Object.values(errors.fields).forEach((data, _idx) => {
            addressForm.setError(data.field, { type: "custom", message: data.message });
          });
        }
      }
    }
  };

  return (
    <Disclosure>
      {({ open }) => (
        <>
          <Disclosure.Button className="flex items-center justify-between w-full p-4 mb-3 text-sm font-medium text-left text-white bg-black rounded-sm hover:bg-opacity-80 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
            <div>
              <p>{address.addressLine1}</p>
              <p>{address.addressLine2}</p>
              <p>
                {address.city}, {address.state}, {address.country}
              </p>
              <p>{address.postalCode}</p>
              <p>{address.phone}</p>
            </div>
            <CaretDown
              size={32}
              weight="thin"
              className={clsx(open ? "rotate-180" : "rotate-0", "ease-in-out duration-200")}
            />
          </Disclosure.Button>
          <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
            <Form form={addressForm} onSubmit={handleSubmit} className="w-full">
              <div className="grid grid-cols-6 gap-6">
                <div className="col-span-6 sm:col-span-6">
                  <InputField type="hidden" {...addressForm.register("id")} />
                  <InputField
                    type="text"
                    label="Address line 1"
                    color="text-black"
                    className="flex-1 block w-full border-gray-300 rounded-md focus:ring-gray-500 focus:border-gray-500"
                    placeholder="Address line 1"
                    {...addressForm.register("addressLine1")}
                  />
                </div>
                <div className="col-span-6 sm:col-span-6">
                  <InputField
                    type="text"
                    label="Addres line 2"
                    color="text-black"
                    className="flex-1 block w-full border-gray-300 rounded-md focus:ring-gray-500 focus:border-gray-500"
                    placeholder="Address line 2"
                    {...addressForm.register("addressLine2")}
                  />
                </div>
                <div className="col-span-6 sm:col-span-2">
                  <InputField
                    type="text"
                    label="City"
                    color="text-black"
                    className="flex-1 block w-full border-gray-300 rounded-md focus:ring-gray-500 focus:border-gray-500"
                    placeholder="City"
                    {...addressForm.register("city")}
                  />
                </div>
                <div className="col-span-6 sm:col-span-2">
                  <InputField
                    type="text"
                    label="State"
                    color="text-black"
                    className="flex-1 block w-full border-gray-300 rounded-md focus:ring-gray-500 focus:border-gray-500"
                    placeholder="State"
                    {...addressForm.register("state")}
                  />
                </div>
                <div className="col-span-6 sm:col-span-2">
                  <InputField
                    type="text"
                    label="Country"
                    color="text-black"
                    className="flex-1 block w-full border-gray-300 rounded-md focus:ring-gray-500 focus:border-gray-500"
                    placeholder="Country"
                    {...addressForm.register("country")}
                  />
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <InputField
                    type="text"
                    label="Postal code"
                    color="text-black"
                    className="flex-1 block w-full border-gray-300 rounded-md focus:ring-gray-500 focus:border-gray-500"
                    placeholder="Postal code"
                    {...addressForm.register("postalCode")}
                  />
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <InputField
                    type="text"
                    label="Phone number"
                    color="text-black"
                    className="flex-1 block w-full border-gray-300 rounded-md focus:ring-gray-500 focus:border-gray-500"
                    placeholder="Phone number"
                    {...addressForm.register("phone")}
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
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default AddressForm;
