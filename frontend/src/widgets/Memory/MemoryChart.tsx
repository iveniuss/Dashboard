import { Chart, useChart } from "@chakra-ui/charts";
import { useLocaleContext } from "@chakra-ui/react";
import { Area, AreaChart, XAxis, YAxis } from "recharts";
import type { IMetrics } from "@/shared/types";
import { useMemo } from "react";

const GB = 1024 ** 3;

interface IProps {
  metricsHistory: IMetrics[];
}

interface IChartData {
  used: number;
  usedWithCache: number;
  timestamp: string;
}

export const MemoryChart = ({ metricsHistory }: IProps) => {
  const { locale } = useLocaleContext();

  const data = useMemo<IChartData[]>(
    () =>
      metricsHistory.map((snapshot) => ({
        used: snapshot.mem.used,
        usedWithCache: snapshot.mem.usedWithCache,
        timestamp: snapshot.timestamp,
      })),
    [metricsHistory],
  );

  const chart = useChart({
    data: data,
    series: [
      { name: "usedWithCache", color: "yellow.solid" },
      { name: "used", color: "green.solid" },
    ],
  });

  const formatGb = chart.formatNumber({
    style: "unit",
    unit: "gigabyte",
    maximumFractionDigits: 1,
  });

  const formatTime = useMemo(
    () =>
      new Intl.DateTimeFormat(locale, {
        hour: "2-digit",
        minute: "2-digit",
        hourCycle: "h23",
      }),
    [locale],
  );

  const total = metricsHistory.at(-1)?.mem.total;

  return (
    <Chart.Root chart={chart} flex={"1"} minH={"0"} aspectRatio={"auto"}>
      <AreaChart accessibilityLayer data={chart.data} responsive>
        <XAxis
          dataKey={chart.key("timestamp")}
          tickMargin={8}
          tickFormatter={(value: string) => formatTime.format(new Date(value))}
          stroke={chart.color("border")}
        />
        <YAxis
          stroke={chart.color("border")}
          domain={[0, total ?? "auto"]}
          tickFormatter={(value: number) => formatGb(value / GB)}
        />
        {chart.series.map((item) => (
          <Area
            type="natural"
            key={item.name}
            isAnimationActive={false}
            dataKey={chart.key(item.name)}
            fill={chart.color(item.color)}
            fillOpacity={0.2}
            stroke={chart.color(item.color)}
          />
        ))}
      </AreaChart>
    </Chart.Root>
  );
};
