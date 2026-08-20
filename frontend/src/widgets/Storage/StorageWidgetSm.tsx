import { WidgetBox } from "@/components/ui/WidgetBox";
import { StorageCirce } from "@/widgets/Storage/StorageCirce";

interface IProps {
  total: number;
  free: number;
}
export const StorageWidgetSm = ({total, free}:IProps) => {
  return <WidgetBox cells={[1,1]} title={"Disk Load"}>
    <StorageCirce total={total} used={total - free}/>
  </WidgetBox>
}