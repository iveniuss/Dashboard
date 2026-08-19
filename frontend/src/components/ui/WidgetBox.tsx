import { Box, type BoxProps, Text } from "@chakra-ui/react";

interface CardBoxProps extends BoxProps {
  cells?: [number, number];
  title?: string;
}

export const WidgetBox = ({
  children,
  cells,
  title,
  ...rest
}: CardBoxProps) => {
  return (
    <Box
      paddingX="1.5rem"
      paddingY="0.5rem"
      bg={"bg.card"}
      rounded="4xl"
      boxShadow="lg"
      w={cells ? `${cells[0] * 10 + (cells[0] - 1) * 2}rem` : ""}
      h={cells ? `${cells[1] * 10 + (cells[1] - 1) * 2}rem` : ""}
      {...rest}
    >
      {title && <Text textStyle={"md"} fontWeight={"bold"}>{title}</Text>}
      {children}
    </Box>
  );
};
