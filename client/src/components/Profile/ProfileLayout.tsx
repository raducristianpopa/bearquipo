import { ReactNode } from "react";

const ProfileLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <div className="md:grid md:grid-cols-4 md:gap-6">{children}</div>
    </div>
  );
};

export default ProfileLayout;
