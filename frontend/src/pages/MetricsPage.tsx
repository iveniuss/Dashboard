import MetricsGrid from "@/widgets/MetricsGrid";
import {
  Button,
  CloseButton,
  Drawer,
  Heading,
  Portal
} from "@chakra-ui/react";
import { useState } from "react";

export const MetricsPage = () => {
  const [isEdit, setIsEdit] = useState(false);
  return (
    <>
      <MetricsGrid
        widgets={[
          "cpu-sm",
          "memory-sm",
          "memory-md",
          "storage-sm",
          "code",
          "memory-chart",
        ]}
      />
      <Drawer.Root
        open={isEdit}
        onOpenChange={(e) => {
          setIsEdit(e.open);
        }}
        placement={"bottom"}
      >
        <Drawer.Trigger asChild position={"fixed"} bottom={"1rem"} right={"1rem"}>
          <Button>Edit</Button>
        </Drawer.Trigger>
        <Portal>
          <Drawer.Backdrop/>
          <Drawer.Positioner>
            <Drawer.Content>
              <Drawer.Header>
                <Heading >Edit</Heading>
                <Drawer.CloseTrigger>
                  <CloseButton/>
                </Drawer.CloseTrigger>
              </Drawer.Header>
              <Drawer.Body>
              </Drawer.Body>
            </Drawer.Content>
          </Drawer.Positioner>
        </Portal>
      </Drawer.Root>
    </>
  );
};
