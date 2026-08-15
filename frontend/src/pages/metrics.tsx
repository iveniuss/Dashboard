import { useSignalR } from "../shared/SignalRContext.tsx"
import { useEffect, useState } from "react"
import * as signalR from "@microsoft/signalr"
import { CpuWidget } from "@/widgets/CpuWidget/CpuWidget.tsx"

interface MetricSnapshot {
  dateTime: string;
  cpu: {
    usage: number;
  }
  mem: {
    total: number;
    used: number;
    usedWithCache: number;
    swapTotal: number;
    swapUsed: number;
  }
}

const MetricsPage = () => {
  const {connection, connectionState} = useSignalR()
  const [metrics, setMetrics] = useState<any>(null)

  useEffect(() => {
    if (!connection) return

    const handler = (data: MetricSnapshot) => {
      setMetrics(data)
      console.log(data)
    }
    connection.on("UpdateMetrics", handler)

    return () => connection.off("UpdateMetrics", handler)
  }, [connection])

  if (connectionState !== signalR.HubConnectionState.Connected) {
    return <div>Подключение...</div>
  }

  return <div>
    {metrics && <CpuWidget usage={metrics.cpu.usage}/>}
  </div>
}

export default MetricsPage