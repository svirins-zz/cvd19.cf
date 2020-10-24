import { EPIDEMIC_START } from "const";
import {
  Counts,
  Periods,
  Period,
  Countries,
  Country,
  OutbreakStatus,
  PeriodSummary,
  GlobalStats,
} from "../@types";

export const validatePeriodLength = (periodLength: number) => {
  if (periodLength === 0) {
    return 5;
  }
  return periodLength;
};

export const getDaysAgo = (date: Date): number => {
  const millisecondsAgo = new Date().valueOf() - new Date(date).valueOf();
  return Math.floor(millisecondsAgo / (1000 * 60 * 60 * 24));
};

export const getPeriodCount = (periodLength: number) =>
  Math.floor(getDaysAgo(new Date(EPIDEMIC_START)) / periodLength);

export const periodStatus = (
  totalDeaths: number,
  currentNewDeaths: number,
  previousNewDeaths: number,
  growthRate: number
): OutbreakStatus | undefined => {
  if (totalDeaths === 0) {
    return OutbreakStatus.None;
  }
  if (totalDeaths < 10) {
    return OutbreakStatus.Small;
  }
  if (
    (growthRate >= 100 && Number.isFinite(growthRate)) ||
    currentNewDeaths >= 1000
  ) {
    return OutbreakStatus.Losing;
  }
  if (
    (growthRate > 0 && Number.isFinite(growthRate)) ||
    currentNewDeaths >= 100
  ) {
    return OutbreakStatus.Flattening;
  }
  if (currentNewDeaths === 0 && previousNewDeaths === 0) {
    return OutbreakStatus.Won;
  }
  if (currentNewDeaths < 10) {
    return OutbreakStatus.Winning;
  }
  if ((currentNewDeaths >= 10 && currentNewDeaths < 100) || growthRate < -50) {
    return OutbreakStatus.Crushing;
  }
  return undefined;
};

export const getPeriodName = (endingDaysAgo: number) => {
  const endDate = new Date(
    new Date().setDate(new Date().getDate() - endingDaysAgo)
  );
  return `${endDate.getDate()}/${endDate.getMonth() + 1}`;
};

export const getPeriodNames = (periodLength: number) => {
  const columnCount = 6;
  const validPeriodLength = validatePeriodLength(periodLength);
  const periodNames = Array(columnCount).fill("");
  return periodNames.map((_, index) => {
    const endingDaysAgo = 1 + validPeriodLength * index;
    return getPeriodName(endingDaysAgo);
  });
};

export const calulatePeriodData = (
  counts: Counts[],
  periodLength: number
): Periods => {
  const validPeriodLength = validatePeriodLength(periodLength);
  const periodsWithDeaths: Period[] = [];
  const periods = counts.map((currentCounts, index, array) => {
    if (index < array.length - 2) {
      const previousNewDeaths =
        counts[index + 1].deaths - counts[index + 2].deaths;
      const currentNewDeaths = currentCounts.deaths - counts[index + 1].deaths;
      const growthRate =
        ((currentNewDeaths - previousNewDeaths) / previousNewDeaths) * 100;
      const currentNewCases = currentCounts.cases - counts[index + 1].cases;
      const currentStatus = periodStatus(
        currentCounts.deaths,
        currentNewDeaths,
        previousNewDeaths,
        growthRate
      );
      const period = {
        endDate: getPeriodName(1 + index * validPeriodLength),
        totalDeaths: currentCounts.deaths,
        newDeaths: currentNewDeaths,
        status: currentStatus,
        totalCases: currentCounts.cases,
        newCases: currentNewCases,
        growthRate:
          Number.isFinite(growthRate) && !Number.isNaN(growthRate)
            ? Math.round(growthRate * 100) / 100
            : 0,
      };
      if (currentCounts.deaths > 0) {
        periodsWithDeaths.push(period);
      }
      return period;
    }
    return {
      endDate: "",
      totalDeaths: 0,
      newDeaths: 0,
      growthRate: 0,
      totalCases: 0,
      newCases: 0,
      status: OutbreakStatus.None,
    };
  });
  return {
    periodsWithDeaths,
    periods,
  };
};

export const calculateData = (
  data: Countries | undefined,
  periodLength: number
): Country[] => {
  const validPeriodLength = validatePeriodLength(periodLength);
  const periodCount = getPeriodCount(validPeriodLength);
  if (!data?.countries) {
    return [];
  }
  const countries: Country[] = [];
  data?.countries?.forEach((country) => {
    const counts: Counts[] = Array.from({ length: periodCount }, () => ({
      deaths: 0,
      cases: 0,
    }));
    country?.results?.forEach((result) => {
      if (!result?.date) {
        return;
      }
      const daysAgo = getDaysAgo(new Date(result?.date));
      if (daysAgo <= periodCount * validPeriodLength && daysAgo >= 1) {
        counts[Math.round(daysAgo / validPeriodLength) - 1] = {
          deaths: result?.deaths ?? 0,
          cases: result?.confirmed ?? 0,
        };
      }
    });
    // process exclusion for diamond Princess
    const allPeriods = calulatePeriodData(counts, periodLength);

    if (country.name !== "Diamnd Princess") {
      countries.push({
        ...country,
        name: country.name === "US" ? "United States" : country.name,
        periods: allPeriods.periods,
        periodsWithDeaths: allPeriods.periodsWithDeaths,
      });
    }
  });
  return countries;
};

export const sumPeriodData = (
  countries: Country[],
  periodLength: number
): Country[] => {
  const validPeriodLength = validatePeriodLength(periodLength);
  const periodCount = getPeriodCount(validPeriodLength);
  const counts = countries.reduce(
    (global, country) =>
      global.map((currentPeriodTotals, index) => ({
        deaths: currentPeriodTotals.deaths + country.periods[index].totalDeaths,
        cases: currentPeriodTotals.cases + country.periods[index].totalCases,
      })),
    Array.from({ length: periodCount }, () => ({
      deaths: 0,
      cases: 0,
    }))
  );
  const allPeriods = calulatePeriodData(counts, validPeriodLength);
  return [
    {
      name: "Global",
      results: [],
      periods: allPeriods.periods,
      periodsWithDeaths: allPeriods.periodsWithDeaths,
    },
  ];
};

export const calculateGlobalSummary = (
  countries: Country[],
  periodLength: number
): PeriodSummary[] => {
  const validPeriodLength = validatePeriodLength(periodLength);
  const periodCount = getPeriodCount(validPeriodLength);
  const initialPeriodSummaries: PeriodSummary[] = Array.from(
    { length: periodCount - 2 },
    (_value, index) => ({
      endDate: getPeriodName(1 + index * validPeriodLength),
      none: 0,
      small: 0,
      losing: 0,
      flattening: 0,
      crushing: 0,
      winning: 0,
      won: 0,
      pandemicFree: 0,
      underControl: 0,
    })
  );
  const periodSummaries = countries.reduce(
    (globalPeriods, country) =>
      globalPeriods.reduce(
        (globalPeriodsInner, _currentPeriod, periodIndex) => {
          const newGlobalPeriods = globalPeriodsInner;
          if (country.periods[periodIndex].status === OutbreakStatus.None) {
            newGlobalPeriods[periodIndex].none += 1;
          } else if (
            country.periods[periodIndex].status === OutbreakStatus.Small
          ) {
            newGlobalPeriods[periodIndex].small += 1;
          } else if (
            country.periods[periodIndex].status === OutbreakStatus.Losing
          ) {
            newGlobalPeriods[periodIndex].losing += 1;
          } else if (
            country.periods[periodIndex].status === OutbreakStatus.Flattening
          ) {
            newGlobalPeriods[periodIndex].flattening += 1;
          } else if (
            country.periods[periodIndex].status === OutbreakStatus.Crushing
          ) {
            newGlobalPeriods[periodIndex].crushing += 1;
          } else if (
            country.periods[periodIndex].status === OutbreakStatus.Winning
          ) {
            newGlobalPeriods[periodIndex].winning += 1;
          } else if (
            country.periods[periodIndex].status === OutbreakStatus.Won
          ) {
            newGlobalPeriods[periodIndex].won += 1;
          }
          if (
            country.periods[periodIndex].newDeaths === 0 &&
            country.periods[periodIndex].newCases === 0
          ) {
            newGlobalPeriods[periodIndex].pandemicFree += (1 / 186) * 100;
          }
          if (
            country.periods[periodIndex].status === OutbreakStatus.None ||
            country.periods[periodIndex].status === OutbreakStatus.Small ||
            country.periods[periodIndex].status === OutbreakStatus.Crushing ||
            country.periods[periodIndex].status === OutbreakStatus.Winning ||
            country.periods[periodIndex].status === OutbreakStatus.Won
          ) {
            newGlobalPeriods[periodIndex].underControl += (1 / 186) * 100;
          }
          return newGlobalPeriods;
        },
        globalPeriods
      ),
    initialPeriodSummaries
  );
  periodSummaries.reverse();
  return periodSummaries;
};

export const calculateSummaryData = (
  data: Countries | undefined
): GlobalStats => {
  const days = data!.countries[0].results.length;
  const countries = data!.countries.length ? data!.countries.length : 0;
  const reducedResult = data!.countries
    .map((e) => e.results.slice(-1)[0])
    .reduce(
      (a, e) => ({
        confirmed: a.confirmed + e.confirmed,
        deaths: a.deaths + e.deaths,
        recovered: a.recovered + e.recovered,
      }),
      {
        confirmed: 0,
        deaths: 0,
        recovered: 0,
      }
    );
  const stats = {
    ...reducedResult,
    countries,
    days,
  };
  return stats;
};
