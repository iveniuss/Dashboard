import { Box, Heading } from "@chakra-ui/react";
import { ColorModeButton } from "@/components/ui/color-mode";
import { useEffect, useState } from "react";

export const Header = () => {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0)
    }
    window.addEventListener('scroll', handleScroll, {passive: true})
    return () => window.removeEventListener('scroll', handleScroll)
  })

  return (
    <Box
      bg={"bg.main/50"}
      w={"full"}
      h={"5rem"}
      shadow={scrolled? "md" : "none"}
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
