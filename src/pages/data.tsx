import React, { useMemo, useState } from 'react';
import { useQuery } from '@apollo/client';
import Loading from 'components/layout/loading';
import Error from 'components/layout/error';
import { PERIOD_LENGTH } from 'const';
import { Countries, PeriodInfo } from 'types';
import { calculateData } from 'lib/calcAllData';
import { sumPeriodData } from 'lib/calcGlobal';
import DataContent from 'components/data/dataContent';
import COUNTRY_QUERY from 'queries';
// TODO: Change API - missing countries appear !!!
const DataPage = () => {
  const [periodInfo, setPeriodInfo] = useState<PeriodInfo>({
    length: PERIOD_LENGTH,
    value: String(PERIOD_LENGTH),
  });
  const { loading, error, data } = useQuery<Countries>(COUNTRY_QUERY);
  const countries = useMemo(() => calculateData(data, periodInfo.length), [data, periodInfo]);
  const allData = [...countries, ...sumPeriodData(countries, periodInfo.length)];
  if (loading) { return <Loading />; }
  if (error) { return <Error error={error} />; }
  return (
    <DataContent
      countries={allData}
      periodInfo={periodInfo}
      onPeriodChange={(val) => {
        const length = val;
        if (length > 0) {
          setPeriodInfo({
            length: val,
            value: val.toString(),
          });
        } else {
          setPeriodInfo({
            length: PERIOD_LENGTH,
            value: val.toString(),
          });
        }
      }}
    />
  );
};

export default DataPage;
