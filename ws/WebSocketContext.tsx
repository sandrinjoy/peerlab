import Router from "next/router";
import React, {
  createContext,
  useReducer,
  useContext,
  useEffect,
  useState,
} from "react";
import { useAppSelector } from "../app/hooks";
import {
  NEW_USER,
  NEW_LAB,
  JOIN_LAB,
  newUserRequest,
  newLabRequest,
  joinLabRequest,
  setUsername,
  WS_SUCCESS,
  VALIDATE_USER,
} from "./actions";

export const WebSocketContext = createContext(null);
export function useWebSocket() {
  return useContext(WebSocketContext);
}

export default function WebSocketProvider({ children }) {
  const user = useAppSelector((state) => state.user);
  const [ws, setWebSocket] = useState(null);
  const [status, setStatus] = useState(false);

  const [reset, setReset] = useState(false);

  function wsOnOpen() {
    setStatus(true);
  }
  function wsOnMessage(e) {
    const msg = JSON.parse(e.data);
    try {
      switch (msg.type) {
        case WS_SUCCESS: {
          break;
        }
        case VALIDATE_USER: {
          break;
        }
        case JOIN_LAB: {
          console.log(msg.payload);
          break;
        }
        case NEW_LAB: {
          Router.push(`lab/${msg.payload.id}`);
          break;
        }
      }
    } catch {}
  }
  function wsOnClose() {
    try {
      ws.close();
    } catch {}
    setStatus(false);
  }
  function wsRestartConnection() {
    setReset(!reset);
  }
  function wsCloseConnection() {
    try {
      ws.close();
    } catch {}
  }
  function wsOnError() {
    setStatus(false);
  }
  useEffect(() => {
    const newWS = () => {
      const tws = new WebSocket(process.env.NEXT_PUBLIC_WSS);
      tws.onopen = wsOnOpen;
      tws.onmessage = wsOnMessage;
      tws.onclose = wsOnClose;
      tws.onerror = wsOnError;

      setWebSocket(tws);
      return tws;
    };

    const cws = newWS();

    return function cleanup() {
      setStatus(false);
      cws.close();
    };
  }, [reset]);

  const value = {
    ws,
    status,
    newUserRequest,
    newLabRequest,
    joinLabRequest,
    setUsername,
    wsCloseConnection,
    wsRestartConnection,
  };
  return (
    <WebSocketContext.Provider value={value}>
      {children}
    </WebSocketContext.Provider>
  );
}
