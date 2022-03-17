import React, { useEffect, useRef } from "react";
import { useRouter } from "next/router";
export default function NewLabForm() {
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const newRoom = () => {
    if (inputRef.current?.value === "") return;
    router.push(`/lab/${inputRef.current.value}`);
  };
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <>
      <input
        type="text"
        ref={inputRef}
        placeholder="Name"
        className="rounded ring-2 ring-neutral-300 p-3 transition  text-neutral-900 hover:ring-blue-600/50 focus:ring-2 active:ring-offset-2 focus:outline-none  focus:ring-blue-600"
      />
      <div className="flex justify-center items-center gap-2">
        <button
          type="button"
          aria-label="New Lab"
          className="px-4 py-2 font-medium transition bg-blue-600 rounded text-neutral-50 hover:bg-blue-700 active:bg-blue-800 active:ring-2 active:ring-offset-4 focus:ring-2 focus:ring-offset-2"
          onClick={newRoom}
        >
          New Lab
        </button>
        <button
          type="button"
          aria-label="Join Lab"
          className="px-4 py-2 font-medium text-blue-600 transition border border-blue-600 rounded hover:bg-neutral-50 active:bg-blue-50 active:ring-2 active:ring-offset-4 focus:ring-2 focus:ring-offset-2"
        >
          Join Lab
        </button>
      </div>
    </>
  );
}
