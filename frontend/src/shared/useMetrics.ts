import { useEffect, useState } from "react";
import { useSignalR } from "@/shared/SignalRContext";
import { type IMetrics } from "@/shared/types";

export function useMetrics() {
  const { connection, connectionState } = useSignalR();
  const [metrics, setMetrics] = useState<IMetrics | null>(null);
  const [history, setHistory] = useState<IMetrics[]>([]);

  useEffect(() => {
    if (!connection) return;

    const metricsHandler = (data: IMetrics) => {
      setMetrics(data);
    };
    connection.on("UpdateMetrics", metricsHandler);

    const historyHandler = (data: IMetrics[]) => {
      setHistory(data);
    };
    connection.on("UpdateHistory", historyHandler);

    return () => {
      connection.off("UpdateMetrics", metricsHandler);
      connection.off("UpdateHistory", historyHandler);
    };
  }, [connection]);

  return { metrics, history, connectionState };
}