import { useSignalR } from "@/shared/SignalRContext";
import { useEffect, useState } from "react";
import * as signalR from "@microsoft/signalr";
import { CpuWidget } from "@/widgets/CpuWidget";
import { MemoryWidget } from "@/widgets/MemoryWidget";
import { Container, Grid, GridItem } from "@chakra-ui/react";

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
}

const MetricsPage = () => {
  const { connection, connectionState } = useSignalR();
  const [metrics, setMetrics] = useState<any>(null);

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
              <CpuWidget usage={metrics.cpu.usage} />
            </GridItem>
            <GridItem colSpan={2}>
              <MemoryWidget
                used={metrics.mem.used}
                total={metrics.mem.total}
                usedWithCache={metrics.mem.usedWithCache}
                swapUsed={metrics.mem.swapUsed}
              />
            </GridItem>
          </Grid>
        )}
      </Container>
    </>
  );
};

export default MetricsPage;
