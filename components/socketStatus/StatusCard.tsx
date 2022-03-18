import React, { useEffect, useRef, useState } from "react";
import StateBubble from "./StateBubble";

export default function StatusCard() {
  const [socketStatus, setSocketStatus] =
    useState<ISocketStatus>("disconnected");
  const [serverMessage, setServerMessage] = useState(null);
  const ws = useRef(null);
  useEffect(() => {
    ws.current = new WebSocket(process.env.NEXT_PUBLIC_WSS);
    setSocketStatus("connecting");
    ws.current.onopen = () => {
      ws.current.send("hi");
      setSocketStatus("connected");
    };
    ws.current.onmessage = (message) => {
      setServerMessage(message.data);
    };
    ws.current.onclose = () => {
      setSocketStatus("disconnected");
    };
    const wsCurrent = ws.current;
    return () => {
      wsCurrent.close();
    };
  }, []);

  return (
    <div className="fixed bottom-0 flex flex-col items-center justify-center w-full gap-3 p-3 overflow-hidden text-xs font-semibold transition bg-neutral-100 ">
      <div className="flex items-center justify-center gap-3">
        socket server <StateBubble socketStatus={socketStatus} />
      </div>
      {serverMessage}
    </div>
  );
}
