import { Box, type BoxProps } from "@chakra-ui/react";

export const CardBox = ({ children, ...rest }: BoxProps) => {
  return (
    <Box
      paddingX="1.5rem"
      paddingY="0.5rem"
      bg={"bg.card"}
      rounded="4xl"
      boxShadow="md"
      {...rest}
    >
      {children}
    </Box>
  );
};
