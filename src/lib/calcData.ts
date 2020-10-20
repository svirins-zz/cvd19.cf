import {
  Counts, Periods, Period, Countries, Country, OutbreakStatus, PeriodSummary, GlobalStats,
} from '../@types';
import {
  periodStatus, getPeriodName, getPeriodCount, getDaysAgo, validatePeriodLength,
} from './calcPeriod';

export const calulatePeriodData = (counts: Counts[], periodLength: number): Periods => {
  const validPeriodLength = validatePeriodLength(periodLength);
  const periodsWithDeaths: Period[] = [];
  const periods = counts.map((currentCounts, index, array) => {
    if (index < (array.length - 2)) {
      const previousNewDeaths = counts[index + 1].deaths - counts[index + 2].deaths;
      const currentNewDeaths = currentCounts.deaths - counts[index + 1].deaths;
      const growthRate = ((currentNewDeaths - previousNewDeaths) / previousNewDeaths) * 100;
      const currentNewCases = currentCounts.cases - counts[index + 1].cases;
      const currentStatus = periodStatus(
        currentCounts.deaths,
        currentNewDeaths,
        previousNewDeaths,
        growthRate,
      );
      const period = {
        endDate: getPeriodName(1 + index * validPeriodLength),
        totalDeaths: currentCounts.deaths,
        newDeaths: currentNewDeaths,
        status: currentStatus,
        totalCases: currentCounts.cases,
        newCases: currentNewCases,
        growthRate:
          (Number.isFinite(growthRate) && !Number.isNaN(growthRate))
            ? Math.round(growthRate * 100) / 100
            : 0,
      };
      if (currentCounts.deaths > 0) {
        periodsWithDeaths.push(period);
      }
      return period;
    }
    // In this case this is one of the 2 periods periods which we just needed
    // to calculate the last relevant period
    return {
      endDate: '',
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

export const calculateData = (data: Countries | undefined, periodLength: number): Country[] => {
  const validPeriodLength = validatePeriodLength(periodLength);
  const periodCount = getPeriodCount(validPeriodLength);
  if (!data?.countries) { return []; }
  const countries: Country[] = [];
  data?.countries?.forEach((country) => {
    const counts: Counts[] = Array.from(
      { length: periodCount },
      () => ({
        deaths: 0,
        cases: 0,
      }),
    );
    country?.results?.forEach((result) => {
      if (!result?.date) { return; }
      const daysAgo = getDaysAgo(new Date(result?.date));
      // We're looking at an amount of periods defined by PERIOD_COUNT
      // each with an amount of days defined by validPeriodLength
      // We ignore today as it has incomplete data
      if (daysAgo <= (periodCount * validPeriodLength) && daysAgo >= 1) {
        counts[Math.round(daysAgo / validPeriodLength) - 1] = {
          deaths: result?.deaths ?? 0,
          cases: result?.confirmed ?? 0,
        };
      }
    });
    // process exclusion for diamond Princess
    const allPeriods = calulatePeriodData(counts, periodLength);

    if (country.name !== 'Diamnd Princess') {
      countries.push({
        ...country,
        name: country.name === 'US'
          ? 'United States'
          : country.name,
        periods: allPeriods.periods,
        periodsWithDeaths: allPeriods.periodsWithDeaths,
      });
    }
  });
  return countries;
};

export const sumPeriodData = (countries: Country[], periodLength: number): Country[] => {
  const validPeriodLength = validatePeriodLength(periodLength);
  const periodCount = getPeriodCount(validPeriodLength);
  const counts = countries.reduce(
    (global, country) => global.map(
      (currentPeriodTotals, index) => ({
        deaths: currentPeriodTotals.deaths + country.periods[index].totalDeaths,
        cases: currentPeriodTotals.cases + country.periods[index].totalCases,
      }),
    ),
    Array.from(
      { length: periodCount },
      () => ({
        deaths: 0,
        cases: 0,
      }),
    ),
  );
  const allPeriods = calulatePeriodData(counts, validPeriodLength);
  return [{
    name: 'Global',
    results: [],
    periods: allPeriods.periods,
    periodsWithDeaths: allPeriods.periodsWithDeaths,
  }];
};

export const calculateGlobalSummary = (
  countries: Country[],
  periodLength: number,
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
    }),
  );
  const periodSummaries = countries.reduce(
    (globalPeriods, country) => globalPeriods.reduce(
      (globalPeriodsInner, _currentPeriod, periodIndex) => {
        const newGlobalPeriods = globalPeriodsInner;
        if (country.periods[periodIndex].status === OutbreakStatus.None) {
          newGlobalPeriods[periodIndex].none += 1;
        } else if (country.periods[periodIndex].status === OutbreakStatus.Small) {
          newGlobalPeriods[periodIndex].small += 1;
        } else if (country.periods[periodIndex].status === OutbreakStatus.Losing) {
          newGlobalPeriods[periodIndex].losing += 1;
        } else if (country.periods[periodIndex].status === OutbreakStatus.Flattening) {
          newGlobalPeriods[periodIndex].flattening += 1;
        } else if (country.periods[periodIndex].status === OutbreakStatus.Crushing) {
          newGlobalPeriods[periodIndex].crushing += 1;
        } else if (country.periods[periodIndex].status === OutbreakStatus.Winning) {
          newGlobalPeriods[periodIndex].winning += 1;
        } else if (country.periods[periodIndex].status === OutbreakStatus.Won) {
          newGlobalPeriods[periodIndex].won += 1;
        }
        if (
          country.periods[periodIndex].newDeaths === 0
          && country.periods[periodIndex].newCases === 0
        ) {
          newGlobalPeriods[periodIndex].pandemicFree += ((1 / 186) * 100);
        }
        if (
          country.periods[periodIndex].status === OutbreakStatus.None
          || country.periods[periodIndex].status === OutbreakStatus.Small
          || country.periods[periodIndex].status === OutbreakStatus.Crushing
          || country.periods[periodIndex].status === OutbreakStatus.Winning
          || country.periods[periodIndex].status === OutbreakStatus.Won
        ) {
          newGlobalPeriods[periodIndex].underControl += ((1 / 186) * 100);
        }
        return newGlobalPeriods;
      },
      globalPeriods,
    ),
    initialPeriodSummaries,
  );
  periodSummaries.reverse();
  return periodSummaries;
};

export const calculateSummaryData = (data: Countries): GlobalStats => {
  console.log(data);
  const totalCases = data?.countries.reduce((acc, element) => (
    acc + element.results[element.results.length - 1].confirmed
  ), 0);
  const totalDeaths = data?.countries.reduce((acc, element) => (
    acc + element.results[element.results.length - 1].deaths
  ), 0);
  const totalRecovered = data?.countries.reduce((acc, element) => (
    acc + element.results[element.results.length - 1].recovered
  ), 0);
  const daysPassed = data?.countries[0].results.length;
  const totalCountries = data?.countries.length ? data.countries.length : 0;


  // TODO: chain reduce !!a
  const rez = data.countries.map((e) => e.results.slice(-1)[0]);

  const stats = {
    totalCases,
    totalDeaths,
    totalRecovered,
    daysPassed,
    totalCountries,
  };
  return stats;
};

// const length = data.countries.results.length - 1;
// const reducer = (acc, element) => ({
//   confirmed: acc.confirmed + element[length].confirmed,
//   deaths: acc.deaths + element[length].deaths,
//   recovered: acc.recovered + element[length].recovered,
// });

// const accumulator = {
//   confirmed: 0,
//   deaths: 0,
//   recovered: 0,
// };

// const res = data.countries.reduce(accumulator, reducer);
// console.log(res);
