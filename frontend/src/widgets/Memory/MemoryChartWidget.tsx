import { WidgetBox } from "@/components/ui/WidgetBox";
import { MemoryChart } from "@/widgets/Memory/MemoryChart";
import type { IMetrics } from "@/shared/types";

interface IProps {
  metricsHistory: IMetrics[];
}

export const MemoryChartWidget = ({metricsHistory}:IProps) => {
  return <WidgetBox
    cells={[3,2]}
    title={"Memory Load"}
    display={"flex"}
    flexDirection={"column"}
    gap={"1rem"}
  >
    <MemoryChart metricsHistory={metricsHistory}/>
  </WidgetBox>
}