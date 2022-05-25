// import { useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { X } from "phosphor-react";
import { Fragment, useState } from "react";

import { ReactComponent as Logo } from "../../assets/images/logo.svg";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";

const Modal = ({ isOpen, setModalIsOpen }: { isOpen: boolean; setModalIsOpen: Function }) => {
  const [isLoginForm, setIsLoginForm]: [boolean, Function] = useState<boolean>(true);

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => setModalIsOpen(true)}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-full p-4">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="flex flex-col justify-center w-full max-w-md p-6 pb-12 overflow-hidden transition-all transform bg-black border border-gray-400 border-opacity-50 rounded-sm shadow-xl">
                  <X className="ml-auto cursor-pointer" onClick={() => setModalIsOpen(false)}></X>
                  <Dialog.Title>
                    <Logo className="mx-auto" height={64} width={64} />
                  </Dialog.Title>
                  {isLoginForm ? (
                    <LoginForm setIsLoginForm={setIsLoginForm} />
                  ) : (
                    <SignUpForm setIsLoginForm={setIsLoginForm} />
                  )}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default Modal;
