import {
  Center
} from "@chakra-ui/react";

import { WidgetBox } from "@/components/ui/WidgetBox";
import { CpuCircle } from "@/widgets/Cpu/CpuCircle";

interface CpuWidgetProps {
  usage: number;
}

export const CpuWidgetSm = ({ usage }: CpuWidgetProps) => {
  return (
    <WidgetBox
      cells={[1, 1]}
      position="relative"
      title={"CPU Load"}
    >
      <Center>
        <CpuCircle usage={usage} />
      </Center>
    </WidgetBox>
  );
};
