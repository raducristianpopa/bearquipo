import { selectCurrentUser } from "../../features/auth/userSlice";
import { useTypedSelector } from "../../utils/hooks";
import NewAddressForm from "./NewAddressForm";
import AddressForm from "./AddressForm";

const Addresses = () => {
  const user = useTypedSelector(selectCurrentUser);

  return (
    <>
      <div className="mb-5 shadow sm:rounded-sm sm:overflow-hidden shadow-slate-30">
        <div className="px-4 py-5 space-y-6 bg-white sm:p-6">
          <p className="text-3xl font-bold text-black">Add a new address</p>
          <div className="w-full mx-auto">
            <NewAddressForm />
          </div>
        </div>
      </div>
      <div className="shadow sm:rounded-sm sm:overflow-hidden shadow-slate-300">
        <div className="px-4 py-5 space-y-6 bg-white sm:p-6">
          <p className="text-3xl font-bold text-black">Your addresses</p>
          <div className="w-full mx-auto">
            {user?.addresses
              ? user.addresses.map((address, index) => <AddressForm key={index} address={address} />)
              : ""}
          </div>
        </div>
      </div>
    </>
  );
};

export default Addresses;
