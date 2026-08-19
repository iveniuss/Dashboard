import {
  Box,
  Flex,
  DataList,
  FormatByte,
} from "@chakra-ui/react";
import { WidgetBox } from "@/components/ui/WidgetBox";
import { MemoryCircle } from "@/widgets/MemoryCircle";

interface MemoryWidgetProps {
  total: number;
  used: number;
  usedWithCache: number;
  swapUsed: number;
}

export const MemoryWidgetMd = (memInfo: MemoryWidgetProps) => {
  return (
    <WidgetBox cells={[2, 1]} title={"Memory Load"}>
      <Flex
        position="relative"
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Box>
          <DataList.Root orientation="horizontal" gap="1">
            <DataList.Item>
              <DataList.ItemLabel minW="5rem">Total</DataList.ItemLabel>
              <DataList.ItemValue>
                <FormatByte value={memInfo.total} />
              </DataList.ItemValue>
            </DataList.Item>
            <DataList.Item>
              <DataList.ItemLabel minW="5rem">Used</DataList.ItemLabel>
              <DataList.ItemValue>
                <FormatByte value={memInfo.used} />
              </DataList.ItemValue>
            </DataList.Item>
            <DataList.Item>
              <DataList.ItemLabel minW="5rem">Cached</DataList.ItemLabel>
              <DataList.ItemValue>
                <FormatByte value={memInfo.usedWithCache - memInfo.used} />
              </DataList.ItemValue>
            </DataList.Item>
            <DataList.Item>
              <DataList.ItemLabel minW="5rem">Swap</DataList.ItemLabel>
              <DataList.ItemValue>
                <FormatByte value={memInfo.swapUsed} />
              </DataList.ItemValue>
            </DataList.Item>
          </DataList.Root>
        </Box>
        <MemoryCircle
          total={memInfo.total}
          used={memInfo.used}
          usedWithCache={memInfo.usedWithCache}
        />
      </Flex>
    </WidgetBox>
  );
};
