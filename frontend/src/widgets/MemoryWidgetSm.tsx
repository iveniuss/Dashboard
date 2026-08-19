import { WidgetBox } from "@/components/ui/WidgetBox";
import { MemoryCircle } from "@/widgets/MemoryCircle";

interface IProps{
  total: number;
  used: number;
  usedWithCache: number;
}

export const MemoryWidgetSm = (memInfo: IProps) => {
  return <WidgetBox cells={[1,1]} title={"Memory Load"}>
    <MemoryCircle total={memInfo.total} used={memInfo.used} usedWithCache={memInfo.usedWithCache}/>
  </WidgetBox>
}