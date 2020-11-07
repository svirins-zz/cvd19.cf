import React from "react";
import { ResponsiveLine, Serie } from "@nivo/line";
import { makeDatum } from "lib";
import { PlaceholderChart } from "./placeholderChart";
import { SummaryChartProps } from "@types";
import { theme } from "../../styles/chartsTheme";
export const AreaChart = ({
  periods,
  multiplyer,
  yValue,
}: SummaryChartProps) => {
  const iterable =
    yValue === "underControl" ? ["under control"] : ["pandemic free"];
  const chartData: Serie[] = [];
  const colors = ["#52c41a"];

  iterable.forEach((element, index) => {
    const preparedPeriods = makeDatum(periods, yValue, multiplyer);
    chartData.push({
      id: element,
      key: index,
      data: preparedPeriods,
    });
  });
  if (chartData.length === 0) return <PlaceholderChart />;
  return (
    <ResponsiveLine
      theme={theme}
      colors={colors}
      curve="monotoneX"
      yScale={{ type: "linear", min: 0, max: 100 }}
      data={chartData}
      enableArea={true}
      areaOpacity={0.6}
      margin={{ top: 20, right: 10, bottom: 60, left: 30 }}
      useMesh={true}
      legends={[
        {
          anchor: "top-right",
          direction: "column",
          justify: false,
          translateX: -20,
          translateY: 10,
          itemsSpacing: 0,
          itemDirection: "left-to-right",
          itemWidth: 80,
          itemHeight: 20,
          itemOpacity: 0.75,
          symbolSize: 12,
          symbolShape: "circle",
          symbolBorderColor: "rgba(0, 0, 0, .5)",
          effects: [
            {
              on: "hover",
              style: {
                itemBackground: "rgba(0, 0, 0, .03)",
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
    />
  );
};
