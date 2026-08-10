import { createContext, type ReactNode, useContext, useEffect, useRef, useState } from "react"
import * as signalR from "@microsoft/signalr";

interface SignalRContextValue {
  connection: signalR.HubConnection | null;
  connectionState: signalR.HubConnectionState;
}

const SignalRContext = createContext<SignalRContextValue>({
  connection: null,
  connectionState: signalR.HubConnectionState.Disconnected,
});

export function SignalRProvider({ children }: { children: ReactNode }) {
  const connectionRef = useRef<signalR.HubConnection | null>(null);
  const [connectionState, setConnectionState] = useState(
    signalR.HubConnectionState.Disconnected
  );

  useEffect(() => {
    const connection = new signalR.HubConnectionBuilder()
      .withUrl("/hubs/metrics")
      .withAutomaticReconnect()
      .configureLogging(signalR.LogLevel.Information)
      .build();

    connection.onreconnecting(() => setConnectionState(signalR.HubConnectionState.Reconnecting));
    connection.onreconnected(() => setConnectionState(signalR.HubConnectionState.Connected));
    connection.onclose(() => setConnectionState(signalR.HubConnectionState.Disconnected));

    connection
      .start()
      .then(() => setConnectionState(signalR.HubConnectionState.Connected))
      .catch((err) => console.error("SignalR connection error:", err));

    connectionRef.current = connection;

    return () => {
      connection.stop();
    };
  }, []);

  return (
    <SignalRContext.Provider value={{ connection: connectionRef.current, connectionState }}>
      {children}
    </SignalRContext.Provider>
  );
}

export function useSignalR() {
  return useContext(SignalRContext);
}