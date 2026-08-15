import { ProgressCircle } from "@chakra-ui/react"

interface CpuWidgetProps {
  usage: number;
}

export const CpuWidget = ({usage}: CpuWidgetProps) => {

  return <ProgressCircle.Root value={usage}>
    <ProgressCircle.Circle>
      <ProgressCircle.Track/>
      <ProgressCircle.Range strokeLinecap={"round"}/>
    </ProgressCircle.Circle>
  </ProgressCircle.Root>

}