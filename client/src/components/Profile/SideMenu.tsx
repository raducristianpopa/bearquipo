import clsx from "clsx";
import { AddressBook, ShieldStar, User } from "phosphor-react";
import { useLocation } from "react-router-dom";

import ButtonOrLink from "../ui/ButtonOrLink";

const SideMenu = () => {
  const { pathname } = useLocation();

  const SideMenuItems = [
    { name: "Account", href: "/profile/account", icon: <User size={32} /> },
    { name: "Security", href: "/profile/security", icon: <ShieldStar size={32} /> },
    { name: "Addresses", href: "/profile/addresses", icon: <AddressBook size={32} /> },
  ];

  return (
    <div className="md:col-span-1">
      <div className="px-4 sm:px-0">
        <div className="flex flex-col">
          {SideMenuItems.map(item => {
            return (
              <div className="mb-2" key={item.name}>
                <ButtonOrLink
                  href={item.href}
                  className={clsx(
                    pathname === item.href
                      ? "bg-white text-black"
                      : "text-gray-300 hover:bg-slate-100 hover:text-black hover:bg-opacity-70",
                    "px-5 py-2 rounded-md font-medium flex items-center gap-5 ease-linear duration-150"
                  )}
                >
                  {item.icon}
                  {item.name}
                </ButtonOrLink>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SideMenu;
