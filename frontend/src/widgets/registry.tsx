import { type ReactNode } from "react";
import { type IMetrics } from "@/shared/types";
import { CpuWidgetSm } from "@/widgets/Cpu/CpuWidgetSm";
import { MemoryWidgetSm } from "@/widgets/Memory/MemoryWidgetSm";
import { MemoryWidgetMd } from "@/widgets/Memory/MemoryWidgetMd";
import { MemoryChartWidget } from "@/widgets/Memory/MemoryChartWidget";
import { StorageWidgetSm } from "@/widgets/Storage/StorageWidgetSm";
import { CodeWidget } from "@/widgets/CodeWidget";

export interface IWidgetData {
  metrics: IMetrics;
  history: IMetrics[];
}

interface IWidgetDef {
  title: string;
  render: (data: IWidgetData) => ReactNode;
}

export const widgetRegistry = {
  "cpu-sm": {
    title: "CPU",
    render: ({ metrics }) => <CpuWidgetSm usage={metrics.cpu.usage} />,
  },
  "memory-sm": {
    title: "Memory",
    render: ({ metrics }) => (
      <MemoryWidgetSm
        total={metrics.mem.total}
        used={metrics.mem.used}
        usedWithCache={metrics.mem.usedWithCache}
      />
    ),
  },
  "memory-md": {
    title: "Memory (detailed)",
    render: ({ metrics }) => (
      <MemoryWidgetMd
        total={metrics.mem.total}
        used={metrics.mem.used}
        usedWithCache={metrics.mem.usedWithCache}
        swapUsed={metrics.mem.swapUsed}
      />
    ),
  },
  "memory-chart": {
    title: "Memory (chart)",
    render: ({ history }) => <MemoryChartWidget metricsHistory={history} />,
  },
  "storage-sm": {
    title: "Disk",
    render: ({ metrics }) => (
      <StorageWidgetSm
        total={metrics.disks[0].total}
        free={metrics.disks[0].free}
      />
    ),
  },
  code: {
    title: "Raw JSON",
    render: ({ history }) => (
      <CodeWidget code={JSON.stringify(history, null, 2)} />
    ),
  },
} satisfies Record<string, IWidgetDef>;

export type WidgetId = keyof typeof widgetRegistry;