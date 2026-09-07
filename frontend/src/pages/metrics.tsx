import { useSignalR } from "@/shared/SignalRContext";
import { useEffect, useState } from "react";
import * as signalR from "@microsoft/signalr";
import { CpuWidgetSm } from "@/widgets/Cpu/CpuWidgetSm";
import { MemoryWidgetMd } from "@/widgets/Memory/MemoryWidgetMd";
import { MemoryWidgetSm } from "@/widgets/Memory/MemoryWidgetSm";
import { Container, Grid, GridItem } from "@chakra-ui/react";
import { CodeWidget } from "@/widgets/CodeWidget";
import { StorageWidgetSm } from "@/widgets/Storage/StorageWidgetSm";
import { type IMetrics} from "@/shared/types";
import { MemoryChartWidget } from "@/widgets/Memory/MemoryChartWidget";


const MetricsPage = () => {
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
    }
    connection.on("UpdateHistory", historyHandler);

    return () => connection.off("UpdateMetrics", metricsHandler);
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
            <GridItem>
              <StorageWidgetSm total={metrics.disks[0].total} free={metrics.disks[0].free}/>
            </GridItem>
            <GridItem colSpan={3} rowSpan={2}>
              <CodeWidget code={JSON.stringify(history, null, 2)}/>
            </GridItem>
            <GridItem colSpan={3} rowSpan={2}>
              <MemoryChartWidget metricsHistory={history}/>
            </GridItem>
          </Grid>
        )}
      </Container>
    </>
  );
};

export default MetricsPage;
