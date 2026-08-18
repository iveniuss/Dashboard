import {
  AbsoluteCenter,
  Center,
  ProgressCircle,
  Text,
} from "@chakra-ui/react";

import { WidgetBox } from "@/components/ui/WidgetBox";

interface CpuWidgetProps {
  usage: number;
}

export const CpuWidget = ({ usage }: CpuWidgetProps) => {
  return (
    <WidgetBox
      cells={[1, 1]}
      position="relative"
      title={"CPU Load"}
    >
      <Center>
        <ProgressCircle.Root value={usage} colorPalette="green" size={"2xl"}>
          <ProgressCircle.Circle
          >
            <ProgressCircle.Track />
            <ProgressCircle.Range strokeLinecap={"round"} />
          </ProgressCircle.Circle>
          <AbsoluteCenter>
            <Text textStyle={"2xl"} fontWeight={"bold"}>
              {usage}
              <Text textStyle={"sm"} verticalAlign={"baseline"} as={"span"}>
                %
              </Text>
            </Text>
          </AbsoluteCenter>
        </ProgressCircle.Root>
      </Center>
    </WidgetBox>
  );
};
