import React from "react";

type AppProps = { socketStatus: ISocketStatus };
const StateBubble = ({ socketStatus }: AppProps) => {
  return (
    <>
      <div
        className={
          (socketStatus === "connecting"
            ? " shadow-orange-500/40 bg-orange-500/70 "
            : socketStatus === "connected"
            ? " shadow-green-500/40 bg-green-500/70 "
            : " shadow-red-500/40 bg-red-500/70 ") +
          "p-2 transition duration-500 ease-in-out border-4 border-white rounded-full shadow-md group gradientBorder "
        }
      ></div>
      {socketStatus}
    </>
  );
};
export default StateBubble;
