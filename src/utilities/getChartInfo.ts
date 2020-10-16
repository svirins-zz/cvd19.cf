import { ChartInfo } from 'types';

const getChartInfo = (selectedTable: string, period: number): ChartInfo => {
  if (selectedTable === 'growth') {
    return {
      x: 'endDate',
      y: 'growthRate',
      title: 'Change in deaths between periods',
    };
  } if (selectedTable === 'newDeaths') {
    return {
      x: 'endDate',
      y: 'newDeaths',
      title: `New deaths by ${period}-day period`,
    };
  } if (selectedTable === 'totalDeaths') {
    return {
      x: 'endDate',
      y: 'totalDeaths',
      title: 'Total deaths by date',
    };
  } if (selectedTable === 'newCases') {
    return {
      x: 'endDate',
      y: 'newCases',
      title: `New cases by ${period}-day period`,
    };
  } if (selectedTable === 'totalCases') {
    return {
      x: 'endDate',
      y: 'totalCases',
      title: 'Total cases by date',
    };
  }
  return {
    x: '',
    y: '',
    title: '',
  };
};

export default getChartInfo;
