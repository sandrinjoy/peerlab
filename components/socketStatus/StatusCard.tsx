import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { setSocket, setStatus } from "../../features/ws/wsSlice";
import StateBubble from "./StateBubble";
import { RiRepeatLine, RiShutDownLine } from "react-icons/ri";
import Router from "next/router";
export const wsSendMessage = (type, payload = null) => {
  switch (type) {
    case "NEW_LAB": {
      return { type: type };
    }
    case "FIND_LAB": {
      return { type, payload };
    }
    default: {
      return;
    }
  }
};

export default function StatusCard() {
  const [userId, setUserId] = useState(null);
  const ws = useAppSelector((state) => state.ws);
  const user = useAppSelector((state) => state.user);
  const [reset, setReset] = useState(false);
  const dispatch = useDispatch();

  const messageController = (data) => {
    const msg = JSON.parse(data);
    switch (msg.type) {
      case "NEW_USER": {
      }
      case "FIND_USER": {
      }
      case "NEW_LAB": {
        Router.push(`lab/${msg.payload}`);
      }
      case "FIND_LAB": {
      }
      default: {
      }
    }
  };
  const wsReceiveMessage = (msg) => {
    messageController(msg.data);
  };

  const wsOpen = () => {
    wsSendMessage(user);
    dispatch(setStatus(true));
  };

  const wsClose = () => {
    try {
      ws.currentWS.close();
    } catch {}
    dispatch(setSocket({ currentWS: null, status: false }));
  };
  const wsError = (e) => {
    dispatch(setSocket({ currentWS: null, status: false }));
  };
  useEffect(() => {
    const newWS = () => {
      const tws = new WebSocket(process.env.NEXT_PUBLIC_WSS);
      tws.onopen = wsOpen;
      tws.onmessage = wsReceiveMessage;
      tws.onclose = wsClose;
      tws.onerror = wsError;

      return tws;
    };
    const t = newWS();
    dispatch(setSocket({ currentWS: t, status: false }));
    return function cleanup() {
      t.close();
    };
  }, [reset]);

  return (
    <div className="fixed bottom-0 flex items-center justify-between w-full gap-3 px-5 py-3 overflow-hidden text-xs font-semibold transition bg-neutral-100 ">
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
