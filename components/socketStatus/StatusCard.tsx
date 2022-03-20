import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { setSocket, setStatus } from "../../features/ws/wsSlice";
import StateBubble from "./StateBubble";
import { RiRepeatLine, RiShutDownLine } from "react-icons/ri";
export default function StatusCard() {
  const [userId, setUserId] = useState(null);
  const ws = useAppSelector((state) => state.ws);
  const user = useAppSelector((state) => state.user);
  const [reset, setReset] = useState(false);
  const dispatch = useDispatch();

  // function for wsOpen
  const wsSendMessage = (msg) => {
    try {
      ws.currentWS.send(JSON.stringify(msg));
    } catch {}
  };

  const wsOpen = () => {
    wsSendMessage(user);
    dispatch(setStatus(true));
  };

  const wsReceiveMessage = (msg) => {
    msg = JSON.parse(msg);
    if (msg.type === "ID_GENERATED") {
      setUserId(msg.body.id);
    }
    console.log(msg.data);
  };
  const wsClose = () => {
    try {
      ws.currentWS.close();
      dispatch(setSocket({ currentWS: null, status: false }));
    } catch {}
  };
  useEffect(() => {
    const newWS = () => {
      const tws = new WebSocket(process.env.NEXT_PUBLIC_WSS);
      tws.onopen = wsOpen;
      tws.onmessage = wsReceiveMessage;
      tws.onclose = wsClose;
      dispatch(setSocket({ currentWS: tws, status: true }));
    };
    newWS();
  }, [reset]);

  return (
    <div className="fixed bottom-0 flex items-center justify-between w-full gap-3 p-3 overflow-hidden text-xs font-semibold transition bg-neutral-100 ">
      <div className="flex items-center justify-center gap-3">
        <StateBubble socketStatus={ws.status} />
      </div>
      {/* {userId} */}
      <div className="flex items-center justify-center gap-3">
        <button onClick={() => setReset(!reset)}>
          <RiRepeatLine className="text-orange-500" />
        </button>
        <button onClick={wsClose}>
          <RiShutDownLine className="text-red-500" />
        </button>
      </div>
    </div>
  );
}
