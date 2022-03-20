import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { changeName } from "../../features/user/userSlice";
import { ImCheckmark, ImLab } from "react-icons/im";
import { FcCheckmark } from "react-icons/fc";
import { useDispatch } from "react-redux";
import ToastModal from "../ToastModal";
import { setSocket } from "../../features/ws/wsSlice";
export default function NewLabForm() {
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const [toast, setToast] = useState(false);
  const user = useAppSelector((state) => state.user);

  const ws = useAppSelector((state) => state.ws);
  const [error, setError] = useState("");
  const newRoom = () => {
    setLoading(true);
    if (user.name === "" || inputRef.current?.value === "") {
      setError(
        "sorry, we dont allow either of user name or Lab name to be empty"
      );
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 5000);
      setLoading(false);
      return;
    }
    ws.currentWS.send(
      JSON.stringify({ id: inputRef.current?.value, users: [user] })
    );
    // router.push(`/lab/${inputRef.current.value}`);
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, []);
  return (
    <>
      <div className="flex flex-wrap items-center justify-start ">
        <label
          htmlFor="userInput"
          className="p-2 text-xs font-bold transition-all text-neutral-600 "
        >
          User ID
        </label>
        <input
          type="text"
          name="userInput"
          placeholder="John"
          defaultValue={user.name}
          onChange={(e) => dispatch(changeName(e.currentTarget.value))}
          className="w-full p-2 text-sm transition border-b-2 sm:w-auto border-neutral-300 text-neutral-900 hover:border-blue-600/50 focus:outline-none focus:border-blue-600"
        />
      </div>

      <div className="flex flex-col items-start justify-between gap-10 rounded-lg ">
        {/* newLab action */}
        <button
          type="button"
          aria-label="New Lab"
          className="flex items-center justify-center w-full gap-1 px-5 py-3 font-medium transition bg-blue-600 rounded sm:w-8/12 text-neutral-50 hover:bg-blue-700 active:bg-blue-800 active:ring-2 active:ring-offset-4 focus:ring-2 focus:ring-offset-2"
          onClick={newRoom}
        >
          <ImLab />
          New Lab
        </button>

        {/* Join lab action */}
        <div className="flex flex-col items-start justify-start w-full gap-10">
          <div className="flex flex-wrap justify-start gap-3 mx-auto sm:mx-0">
            <input
              type="text"
              ref={inputRef}
              placeholder="Lab Name"
              className="flex items-center justify-center w-full gap-1 p-3 px-5 py-3 font-medium transition rounded sm:w-8/12 ring-2 ring-neutral-300 text-neutral-900 hover:ring-blue-600/50 focus:ring-2 active:ring-offset-2 focus:outline-none focus:ring-blue-600"
            />

            <button
              type="button"
              aria-label="Join Lab"
              className="px-4 py-2 mx-auto font-medium text-blue-600 transition rounded hover:bg-neutral-50 active:bg-blue-50 "
            >
              Join
            </button>
          </div>
          {loading && (
            <svg
              className="w-8 h-8 text-blue-600 animate-spin"
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
      </div>
      <ToastModal visible={toast} message={error} />
    </>
  );
}
