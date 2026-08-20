import { AbsoluteCenter, FormatByte, ProgressCircle, Text } from "@chakra-ui/react";

interface IProps{
  total: number;
  used: number;
}

export const StorageCirce = ({total, used}: IProps) => {
  return (
    <ProgressCircle.Root value={(used / total) * 100} size={"2xl"}>
      <ProgressCircle.Circle>
        <ProgressCircle.Track stroke={"gray.emphasized"}/>
        <ProgressCircle.Range strokeLinecap={"round"} stroke={"yellow.500"} />
      </ProgressCircle.Circle>
      <AbsoluteCenter>
        <ProgressCircle.Label
          display={"flex"}
          flexDirection={"column"}
          alignItems={"center"}
        >
          <Text textStyle={"lg"} fontWeight={"bold"} textWrap={"nowrap"}>
            <FormatByte value={used} unitDisplay={"narrow"} />
          </Text>
          <Text textStyle={"xs"} color={"gray.400"}>
            /<FormatByte value={total} unitDisplay={"narrow"} />
          </Text>
        </ProgressCircle.Label>
      </AbsoluteCenter>
    </ProgressCircle.Root>
  );
}