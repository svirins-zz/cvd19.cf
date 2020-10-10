import { OutbreakStatus } from '../types';
import { EPIDEMIC_START } from '../const';

export const validatePeriodLength = (periodLength: number) => {
  if (periodLength === 0) {
    return 5;
  }
  return periodLength;
};

export const getDaysAgo = (date: Date): number => {
  const millisecondsAgo = new Date().valueOf() - new Date(date).valueOf();
  return Math.floor((millisecondsAgo) / (1000 * 60 * 60 * 24));
};

export const getPeriodCount = (
  periodLength: number,
) => Math.floor(getDaysAgo(new Date(EPIDEMIC_START)) / periodLength);

export const periodStatus = (
  totalDeaths: number,
  currentNewDeaths: number,
  previousNewDeaths: number,
  growthRate: number,
): OutbreakStatus | undefined => {
  if (totalDeaths === 0) {
    return OutbreakStatus.None;
  } if (totalDeaths < 10) {
    return OutbreakStatus.Small;
  } if ((growthRate >= 100 && Number.isFinite(growthRate)) || currentNewDeaths >= 1000) {
    return OutbreakStatus.Losing;
  } if ((growthRate > 0 && Number.isFinite(growthRate)) || currentNewDeaths >= 100) {
    return OutbreakStatus.Flattening;
  } if (currentNewDeaths === 0 && previousNewDeaths === 0) {
    return OutbreakStatus.Won;
  } if (currentNewDeaths < 10) {
    return OutbreakStatus.Winning;
  } if ((currentNewDeaths >= 10 && currentNewDeaths < 100) || growthRate < -50) {
    return OutbreakStatus.Crushing;
  }
  return undefined;
};

export const getPeriodName = (endingDaysAgo: number) => {
  const endDate = new Date(new Date().setDate(new Date().getDate() - endingDaysAgo));
  return `${endDate.getDate()}/${endDate.getMonth() + 1}`;
};

export const getPeriodNames = (periodLength: number) => {
  const columnCount = 6;
  const validPeriodLength = validatePeriodLength(periodLength);
  const periodNames = Array(columnCount).fill('');
  return periodNames.map((_, index) => {
    const endingDaysAgo = (1 + (validPeriodLength * index));
    return getPeriodName(endingDaysAgo);
  });
};
