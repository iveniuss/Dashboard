import { useMetrics } from "@/shared/useMetrics";
import * as signalR from "@microsoft/signalr";
import { Container, Grid } from "@chakra-ui/react";
import { Fragment } from "react";
import { widgetRegistry, type WidgetId } from "@/widgets/registry";

interface IProps {
  widgets: WidgetId[];
  showControls?: boolean;
}

const MetricsGrid = ({ widgets }: IProps) => {
  const { metrics, history, connectionState } = useMetrics();

  if (connectionState !== signalR.HubConnectionState.Connected) {
    return <div>Подключение...</div>;
  }

  return (
    <>
      <Container pt={"10"}>
        {metrics && (
          <Grid gap={"2rem"} templateColumns={"repeat(auto-fill, 10rem)"}>
            {widgets.map((id) => {
              const widget = widgetRegistry[id];
              if (!widget) return null;
              return (
                <Fragment key={id}>
                  {widget.render({ metrics, history })}
                </Fragment>
              );
            })}
          </Grid>
        )}
      </Container>
    </>
  );
};

export default MetricsGrid;