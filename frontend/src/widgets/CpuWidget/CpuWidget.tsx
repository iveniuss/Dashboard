import { AbsoluteCenter, Box, ProgressCircle, Text } from "@chakra-ui/react";

interface CpuWidgetProps {
  usage: number;
}

export const CpuWidget = ({ usage }: CpuWidgetProps) => {
  return (
    <Box
      p="1rem"
      bg={"gray.muted"}
      w={"10rem"}
      h={"10rem"}
      position="relative"
      rounded="4xl"
      boxShadow="md"
    >
      <ProgressCircle.Root value={usage} colorPalette="green">
        <ProgressCircle.Circle
          css={{ "--size": "8rem", "--thickness": "0.75rem" }}
        >
          <ProgressCircle.Track />
          <ProgressCircle.Range strokeLinecap={"round"} />
        </ProgressCircle.Circle>
        <AbsoluteCenter>
          <Text textStyle={"2xl"} fontWeight={"bold"}>
            {usage}
            <Text textStyle={"sm"} verticalAlign={"baseline"} as={"span"}>%</Text>
          </Text>
        </AbsoluteCenter>
      </ProgressCircle.Root>
    </Box>
  );
};
