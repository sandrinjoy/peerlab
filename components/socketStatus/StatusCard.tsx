import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useAppDispatch, useAppSelector } from "../../app/hooks";

import StateBubble from "./StateBubble";
import { RiRepeatLine, RiShutDownLine } from "react-icons/ri";
import Router from "next/router";
import ToastModal from "../ToastModal";
import { useWebSocket } from "../../ws/WebSocketContext";
import { newUserRequest } from "../../ws/actions";

export default function StatusCard() {
  const { ws, wsCloseConnection, wsRestartConnection, status } = useWebSocket();
  const [toast, setToast] = useState(false);
  const [error, setError] = useState("");

  // const ws = useAppSelector((state) => state.ws);
  const user = useAppSelector((state) => state.user);

  useEffect(() => {
    if (status) {
      ws.send(JSON.stringify(newUserRequest(user.name)));
    }
  }, [status]);

  return (
    <>
      <div className="fixed bottom-0 flex items-center justify-between w-full gap-3 px-5 py-3 overflow-hidden text-xs font-semibold transition bg-neutral-100 ">
        <div className="flex items-center justify-center gap-3 ">
          <StateBubble socketStatus={status} />
          <button
            onClick={() => wsRestartConnection()}
            className="p-2 bg-white rounded-full shadow-md"
          >
            <RiRepeatLine className="text-orange-500" />
          </button>

          <button
            onClick={wsCloseConnection}
            className="p-2 bg-white rounded-full shadow-md"
          >
            <RiShutDownLine className="text-red-500" />
          </button>
        </div>

        {/* {userId} */}
      </div>
      <ToastModal visible={toast} message={error} />
    </>
  );
}
