import {
  AbsoluteCenter,
  Box,
  Center,
  ProgressCircle,
  Text,
} from "@chakra-ui/react";

interface CpuWidgetProps {
  usage: number;
}

export const CpuWidget = ({ usage }: CpuWidgetProps) => {
  return (
    <Box
      paddingX="1.5rem"
      paddingY="0.5rem"
      bg={"bg.card"}
      w={"10rem"}
      h={"10rem"}
      position="relative"
      rounded="4xl"
      boxShadow="md"
    >
      <Text textStyle={"md"} fontWeight={"bold"}>
        CPU Load
      </Text>
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
    </Box>
  );
};
