import { TRENDS_AND_COLORS_MAP } from "const";
import { makeDatum } from "lib";
import React from "react";

import { ResponsiveLine, Serie } from "@nivo/line";
import { Period } from "@types";

import { theme } from "../../styles/chartsTheme";
import { PlaceholderChart } from "./placeholderChart";

export const SummaryChart = ({
  periods,
  multiplyer,
}: {
  periods: Period[];
  multiplyer: number;
}) => {
  const chartData: Serie[] = [];
  const colors: string[] = [];
  TRENDS_AND_COLORS_MAP.forEach((element, index) => {
    const preparedPeriods = makeDatum(periods, element.trend, multiplyer);
    colors.push(element.color);
    chartData.push({
      id: element.trend,
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
      yScale={{ type: "linear", min: "auto", max: "auto" }}
      data={chartData}
      lineWidth={2}
      margin={{ top: 20, right: 10, bottom: 60, left: 25 }}
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
