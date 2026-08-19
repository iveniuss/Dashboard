import { AbsoluteCenter, ProgressCircle, Text } from "@chakra-ui/react";
export const CpuCircle = ({usage}: {usage: number} ) => {
  return (
    <ProgressCircle.Root value={usage} size={"2xl"}>
      <ProgressCircle.Circle>
        <ProgressCircle.Track stroke={"gray.emphasized"}/>
        <ProgressCircle.Range strokeLinecap={"round"} stroke={"green.500"}/>
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
  );
}