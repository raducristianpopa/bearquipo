import { Outlet } from "react-router-dom";

import ProfileContainer from "./ProfileContainer";

import ProfileLayout from "./ProfileLayout";
import SideMenu from "./SideMenu";

const Profile: React.FC = () => {
  return (
    <ProfileLayout>
      <SideMenu />
      <ProfileContainer>
        <Outlet />
      </ProfileContainer>
    </ProfileLayout>
  );
};

export default Profile;
