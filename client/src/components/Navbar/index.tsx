import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Bag, UserCircle } from "phosphor-react";

import { ReactComponent as Logo } from "../../assets/images/logo.svg";
import NavItems from "./NavItems";
import Modal from "../Modal";
import { selectCurentUserStore } from "../../features/auth/userSlice";
import { useTypedSelector } from "../../utils/hooks";

export interface INavLink {
  name: string;
  path: string;
}

const navLinks: INavLink[] = [
  {
    name: "apparel",
    path: "/apparel",
  },
  {
    name: "footwear",
    path: "/footwear",
  },
  {
    name: "accessories",
    path: "/accessories",
  },
];

const Navbar: React.FC = () => {
  const [modalIsOpen, setModalIsOpen]: [boolean, Function] = useState<boolean>(false);
  const navigate = useNavigate();

  const { user } = useTypedSelector(selectCurentUserStore);

  return (
    <>
      <div className="sticky top-0 z-100 min-h-[74px] bg-black">
        <div className="mx-auto max-w-[1920px] px-6">
          <div className="relative flex justify-between py-4">
            <div className="flex items-center flex-1">
              <Link aria-label="Logo" to="/">
                <Logo width={34} height={34} />
              </Link>
              <nav className="block">
                <NavItems links={navLinks} />
              </nav>
            </div>
            <div className="flex items-center justify-end flex-1 space-x-8">
              <nav className="relative flex items-center">
                <Bag className="w-8 h-8 duration-200 ease-in-out scale-90 cursor-pointer opacity-70 hover:scale-100 hover:opacity-100" />

                {/* <Link to="/user"> */}
                <UserCircle
                  onClick={() => (user ? navigate("/profile/account") : setModalIsOpen(!modalIsOpen))}
                  className="w-8 h-8 ml-6 duration-200 ease-in-out scale-90 cursor-pointer opacity-70 hover:scale-100 hover:opacity-100"
                />
                {/* </Link> */}
              </nav>
            </div>
          </div>
        </div>
      </div>
      <Modal isOpen={modalIsOpen} setModalIsOpen={setModalIsOpen} />
    </>
  );
};

export default Navbar;
