import { PERIOD_LENGTH } from "const";
import { calcCountries, calcStats, calcTrends, sumPeriodData } from "lib";

import { Countries, GlobalStats, OutbreakStatus, Trends } from "../@types";

export const useGetGlobalData = (
  data: GatsbyTypes.Maybe<GatsbyTypes.SitePageContextData>
) => {
  const countries = calcCountries(data as Countries, PERIOD_LENGTH);
  const globalData = sumPeriodData(countries, PERIOD_LENGTH);
  const stats: GlobalStats = {
    ...calcStats(data as Countries),
    trend: globalData[0].periods[0].status as OutbreakStatus,
  };
  const trends: Trends[] = calcTrends(countries, PERIOD_LENGTH);
  const loseTableData = countries.filter(
    (country) =>
      country.periods[0].status === OutbreakStatus.Losing ||
      country.periods[0].status === OutbreakStatus.Flattening
  );
  const winTableData = countries.filter(
    (country) =>
      country.periods[0].status === OutbreakStatus.Winning ||
      country.periods[0].status === OutbreakStatus.Won
  );
  return {
    stats,
    trends,
    loseTableData,
    winTableData,
  };
};
