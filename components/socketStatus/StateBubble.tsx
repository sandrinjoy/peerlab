import React from "react";
import { useAppSelector } from "../../app/hooks";

type AppProps = { socketStatus: ISocketStatus };
const StateBubble = ({ socketStatus }: AppProps) => {
  const user = useAppSelector((state) => state.user);
  return (
    <>
      <div className="flex gap-3 p-2 bg-white shadow-lg rounded-xl">
        <div
          className={
            (socketStatus
              ? " shadow-green-500/40 bg-green-500/70 "
              : " shadow-red-500/40 bg-red-500/70 ") +
            "p-[0.50rem] transition duration-500 ease-in-out  rounded-full shadow-xl group  "
          }
        ></div>
        <span className="text-xs font-semibold text-gray-700 ">
          {user.name}
        </span>
      </div>
    </>
  );
};
export default StateBubble;
