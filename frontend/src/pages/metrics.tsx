import { useSignalR } from "../shared/SignalRContext.tsx"
import { useEffect, useState } from "react"
import * as signalR from "@microsoft/signalr";

const MetricsPage = () => {
  const {connection, connectionState} = useSignalR();
  const [metrics, setMetrics] = useState<any>(null);

  useEffect(() => {
    if (!connection) return;

    const handler = (data) => setMetrics(data);
    connection.on("UpdateMetrics", handler)

    return () => connection.off("UpdateMetrics", handler)
  }, [connection])

  if (connectionState !== signalR.HubConnectionState.Connected) {
    return <div>Подключение...</div>;
  }
  return <div>
    {metrics && <pre>{JSON.stringify(metrics, null, 2)}</pre>}
  </div>
}

export default MetricsPage