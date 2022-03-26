import React, { useEffect, useRef, useState } from "react";

import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { ImCheckmark, ImLab } from "react-icons/im";
import Router from "next/router";
import { useDispatch } from "react-redux";
import ToastModal from "../ToastModal";
import { setSocket } from "../../features/ws/wsSlice";
import { useWebSocket } from "../../ws/WebSocketContext";
import {
  joinLabRequest,
  newLabRequest,
  newUserRequest,
  NEW_LAB,
} from "../../ws/actions";

export default function NewLabForm() {
  const { ws, wsRestartConnection, status } = useWebSocket();

  const joinRef = useRef<HTMLInputElement>(null);

  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const [toast, setToast] = useState(false);

  const [error, setError] = useState("");

  const joinLabResponseHandler = (payload) => {
    if (payload.valid) Router.push(`lab/${payload.id}`);
    else {
      setError("The lab doesn't exists on our server currently");
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 3000);
    }
  };

  useEffect(() => {
    joinRef.current?.focus();
  }, []);

  const searchLab = async () => {
    if (joinRef.current.value === "") return;
    const res = await fetch(
      process.env.NEXT_PUBLIC_HTTPS + "/findlab?id=" + joinRef.current.value
    );
    const data = await res.json();
    joinLabResponseHandler(data);
    // ws.send(JSON.stringify(joinLabRequest(joinRef.current.value)));
  };

  const newLabHandler = () => {
    ws.send(JSON.stringify(newLabRequest()));
  };
  return (
    <>
      {/* <div className="flex flex-wrap items-center justify-start ">
        <label
          htmlFor="userInput"
          className="p-2 font-bold transition-all text-neutral-600 "
        >
          User ID
        </label>
        <span className="p-2 transition text-normal sm:w-auto border-neutral-300 text-neutral-900 hover:border-blue-600/50 focus:outline-none focus:border-blue-600">
          {user.name}
        </span>
      </div> */}

      {/* newLab action */}
      <div className="flex flex-wrap items-center justify-start ">
        <button
          type="button"
          aria-label="New Lab"
          className="flex items-center justify-center w-full gap-1 px-5 py-3 font-medium transition bg-blue-600 rounded text-neutral-50 hover:bg-blue-700 active:bg-blue-800 active:ring-2 active:ring-offset-4 focus:ring-2 focus:ring-offset-2"
          onClick={newLabHandler}
        >
          <ImLab />
          New Lab
        </button>
      </div>

      {/* Join lab action */}
      <div className="flex-col items-center justify-center ">
        <div className="flex justify-between gap-2 p-1 transition rounded ring-2 ring-neutral-300 text-neutral-900 hover:ring-blue-600 focus-within:ring-2 active-within:ring-blue-600 active:ring-offset-2 focus-within:ring-blue-600">
          <input
            type="text"
            ref={joinRef}
            placeholder="Lab Name"
            className="w-10/12 px-2 focus:outline-none "
          />
          <button
            type="button"
            aria-label="Join Lab"
            onClick={searchLab}
            className="px-4 py-2 font-medium text-blue-600 transition rounded hover:bg-neutral-50 active:bg-blue-50 disabled:text-gray-600 "
          >
            Join
          </button>
        </div>

        {loading && (
          <svg
            className="w-8 h-8 mx-auto my-3 text-blue-600 animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        )}
      </div>

      <ToastModal visible={toast} message={error} />
    </>
  );
}
