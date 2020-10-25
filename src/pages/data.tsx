import React, { useMemo, useState } from "react";
import { Loading, Error } from "components/layout";
import { PERIOD_LENGTH } from "const";
import { calculateData, sumPeriodData } from "lib";
import { DataPageContent } from "../components/data";
import { PeriodInfo } from "../@types";
import { useFetchCountries } from "../hooks";
const DataPage = () => {
  const [periodInfo, setPeriodInfo] = useState<PeriodInfo>({
    length: PERIOD_LENGTH,
    value: String(PERIOD_LENGTH),
  });
  const { loading, error, data } = useFetchCountries();
  const countries = useMemo(() => calculateData(data, periodInfo.length), [
    data,
    periodInfo,
  ]);
  const allData = [
    ...countries,
    ...sumPeriodData(countries, periodInfo.length),
  ];
  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <Error error={error} />;
  }
  return (
    <DataPageContent
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
