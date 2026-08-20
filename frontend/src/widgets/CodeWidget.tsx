import { WidgetBox } from "@/components/ui/WidgetBox";
import { Box } from "@chakra-ui/react";

export const CodeWidget = ({code}: {code:string}) => {
  return (
    <WidgetBox cells={[3, 2]}>
      <Box overflow={"auto"} boxSize={"full"}>
        <pre>{code}</pre>
      </Box>
    </WidgetBox>
  );
}