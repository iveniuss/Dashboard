import { Box, Heading } from "@chakra-ui/react";
import { ColorModeButton } from "@/components/ui/color-mode";

export const Header = () => {
  return (
    <Box
      bg={"bg/50"}
      w={"full"}
      h={"5rem"}
      shadow={"md"}
      display={"flex"}
      alignItems={"center"}
      justifyContent={"space-between"}
      px={"1rem"}
      position={"sticky"}
      top="0"
      zIndex="100"
      backdropFilter="blur(20px)"
    >
      <Heading>Dashboard</Heading>
      <ColorModeButton justifySelf={"flex-end"}/>
    </Box>
  );
};
