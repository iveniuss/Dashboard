import { useSignalR } from "@/shared/SignalRContext";
import { useEffect, useState } from "react";
import * as signalR from "@microsoft/signalr";
import { CpuWidgetSm } from "@/widgets/CpuWidgetSm";
import { MemoryWidgetMd } from "@/widgets/MemoryWidgetMd";
import { MemoryWidgetSm } from "@/widgets/MemoryWidgetSm";
import { Container, Grid, GridItem } from "@chakra-ui/react";
import { CodeWidget } from "@/widgets/CodeWidget";

interface MetricSnapshot {
  dateTime: string;
  cpu: {
    usage: number;
  };
  mem: {
    total: number;
    used: number;
    usedWithCache: number;
    swapTotal: number;
    swapUsed: number;
  };
  disks: [
    {
      name: string;
      total: number;
      free: number;
    }
  ]
}

const MetricsPage = () => {
  const { connection, connectionState } = useSignalR();
  const [metrics, setMetrics] = useState<MetricSnapshot | null>(null);

  useEffect(() => {
    if (!connection) return;

    const handler = (data: MetricSnapshot) => {
      setMetrics(data);
      console.log(data);
    };
    connection.on("UpdateMetrics", handler);

    return () => connection.off("UpdateMetrics", handler);
  }, [connection]);

  if (connectionState !== signalR.HubConnectionState.Connected) {
    return <div>Подключение...</div>;
  }

  return (
    <>
      <Container pt={"10"}>
        {metrics && (
          <Grid gap={"2rem"} templateColumns={"repeat(auto-fill, 10rem)"}>
            <GridItem colSpan={1}>
              <CpuWidgetSm usage={metrics.cpu.usage} />
            </GridItem>
            <GridItem>
              <MemoryWidgetSm
                total={metrics.mem.total}
                used={metrics.mem.used}
                usedWithCache={metrics.mem.usedWithCache}
              />
            </GridItem>
            <GridItem colSpan={2}>
              <MemoryWidgetMd
                used={metrics.mem.used}
                total={metrics.mem.total}
                usedWithCache={metrics.mem.usedWithCache}
                swapUsed={metrics.mem.swapUsed}
              />
            </GridItem>
            <GridItem colSpan={3} rowSpan={2}>
              <CodeWidget code={JSON.stringify(metrics, null, 2)}/>
            </GridItem>
          </Grid>
        )}
      </Container>
    </>
  );
};

export default MetricsPage;
