import { AbsoluteCenter, Box, ProgressCircle, Text } from "@chakra-ui/react";

interface MemoryCircleProps {
  total: number;
  used: number;
  usedWithCache: number;
}
export const MemoryCircle = (memInfo: MemoryCircleProps) => {
  return (
    <Box position="relative" lineHeight={"0"}>
      <ProgressCircle.Root
        size={"2xl"}
        value={(memInfo.usedWithCache / memInfo.total) * 100}
      >
        <ProgressCircle.Circle>
          <ProgressCircle.Track stroke={"gray.emphasized"} />
          <ProgressCircle.Range strokeLinecap={"round"} stroke={"blue.emphasized"} />
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
  );
};
