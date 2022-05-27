import { Menu, Transition } from "@headlessui/react";
import { List } from "phosphor-react";
import { Fragment } from "react";

import { navLinks } from ".";
import ButtonOrLink from "../ui/ButtonOrLink";

const MobileMenu: React.FC = () => {
  return (
    <div className="block md:hidden">
      <Menu as="div" className="relative text-left ">
        <div>
          <Menu.Button className="flex items-center w-full px-4">
            <List
              weight="thin"
              className="w-8 h-8 duration-200 ease-in-out scale-90 cursor-pointer opacity-70 hover:scale-100 hover:opacity-100"
            />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute w-56 mt-2 origin-top-left bg-black border border-white border-opacity-50 divide-y divide-gray-100 rounded-sm shadow-lg left-5 ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="px-1 py-1">
              {navLinks.map((link, index) => (
                <Menu.Item key={index}>
                  {({ active }) => (
                    <ButtonOrLink
                      className={`${
                        active ? "bg-white text-black" : "text-white"
                      } group flex w-full items-center rounded-sm px-2 py-2 text-sm`}
                      key={index}
                      href={link.path}
                    >
                      {link.name}
                    </ButtonOrLink>
                  )}
                </Menu.Item>
              ))}
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};

export default MobileMenu;
