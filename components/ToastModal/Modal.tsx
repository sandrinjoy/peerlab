import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";

export default function Modal({ visible, type = "default", message = "" }) {
  return (
    <Transition
      show={visible}
      as={Fragment}
      enter="ease-out duration-500"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="ease-in duration-500"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div className="z-[9999] fixed w-full  left-0      text-start  sm:w-auto bottom-5    ">
        <div className="w-10/12 p-5 mx-auto bg-neutral-800">
          <p className="text-sm rounded-lg text-neutral-50">{message}</p>
        </div>
      </div>
    </Transition>
  );
}
