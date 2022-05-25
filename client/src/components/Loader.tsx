import { CircleNotch } from "phosphor-react";

const Loader = () => {
  return (
    <div className="fixed inset-0 bg-black">
      <div className="grid min-h-full place-items-center">
        <CircleNotch size={84} className="animate-spin" />
      </div>
    </div>
  );
};

export default Loader;
