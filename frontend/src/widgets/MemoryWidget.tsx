import {
  AbsoluteCenter,
  Box,
  Flex,
  ProgressCircle,
  Text,
  DataList,
  FormatByte,
} from "@chakra-ui/react";
import { CardBox } from "@/components/ui/CardBox";

interface MemoryWidgetProps {
  total: number;
  used: number;
  usedWithCache: number;
}

export const MemoryWidget = (memInfo: MemoryWidgetProps) => {
  return (
    <CardBox
      w={"22rem"}
      h={"10rem"}
    >
      <Text textStyle={"md"} fontWeight={"bold"}>
        Memory Load
      </Text>
      <Flex
        position="relative"
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Box>
          <DataList.Root orientation="horizontal">
            <DataList.Item>
              <DataList.ItemLabel minW="5rem">Total</DataList.ItemLabel>
              <DataList.ItemValue>
                <FormatByte value={memInfo.total} />
              </DataList.ItemValue>
            </DataList.Item>
            <DataList.Item>
              <DataList.ItemLabel minW="5rem">Used</DataList.ItemLabel>
              <DataList.ItemValue>
                <FormatByte value={memInfo.used} />
              </DataList.ItemValue>
            </DataList.Item>
            <DataList.Item>
              <DataList.ItemLabel minW="5rem">Cached</DataList.ItemLabel>
              <DataList.ItemValue>
                <FormatByte value={memInfo.usedWithCache - memInfo.used} />
              </DataList.ItemValue>
            </DataList.Item>
          </DataList.Root>
        </Box>
        <Box position="relative" lineHeight={"0"}>
          <ProgressCircle.Root
            size={"2xl"}
            value={(memInfo.usedWithCache / memInfo.total) * 100}
          >
            <ProgressCircle.Circle>
              <ProgressCircle.Track stroke={"gray.emphasized"} />
              <ProgressCircle.Range
                strokeLinecap={"round"}
                stroke={"blue.muted"}
              />
            </ProgressCircle.Circle>
          </ProgressCircle.Root>
          <ProgressCircle.Root
            size={"2xl"}
            value={(memInfo.used / memInfo.total) * 100}
            position="absolute"
            top="0"
            left="0"
          >
            <ProgressCircle.Circle>
              <ProgressCircle.Track stroke={"transparent"} />
              <ProgressCircle.Range
                strokeLinecap={"round"}
                stroke={"blue.focusRing"}
              />
            </ProgressCircle.Circle>
            <AbsoluteCenter>
              <ProgressCircle.Label>
                <Text textStyle={"2xl"} fontWeight={"bold"}>
                  {Math.round((memInfo.used / memInfo.total) * 100)}
                  <Text textStyle={"sm"} verticalAlign={"baseline"} as={"span"}>
                    %
                  </Text>
                </Text>
              </ProgressCircle.Label>
            </AbsoluteCenter>
          </ProgressCircle.Root>
        </Box>
      </Flex>
    </CardBox>
  );
};
