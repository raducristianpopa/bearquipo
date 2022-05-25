import { ReactNode } from "react";

const ProfileContainer: React.FC<{ children: ReactNode }> = ({ children }) => {
  return <div className="mt-5 md:mt-0 md:col-span-3">{children}</div>;
};

export default ProfileContainer;
