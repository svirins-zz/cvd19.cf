import React, { useMemo, useCallback } from "react";
import { useImmer } from "use-immer";
import { useQuery } from "@apollo/client";
import {
  Typography,
  Divider,
  Col,
  Row,
  Radio,
  Checkbox,
  InputNumber,
} from "antd";
import { Loading, Error, Page, SEO } from "components/layout";
import CountryFilter from "components/data/CountryFilter";
import GlobalDataChart from "components/charts/GlobalDataChart";
import TotalTable from "components/tables/TotalTable";
import { PERIOD_LENGTH } from "const";
import COUNTRY_QUERY from "queries";
import { calculateData, sumPeriodData, getTags, getChartInfo } from "lib";
import {
  TableState,
  Tags,
  CountriesState,
  Countries,
  Country,
} from "../@types";
const { Title, Text, Paragraph } = Typography;
const Data = () => {
  const [periodInfo, setPeriodInfo] = useImmer({
    length: PERIOD_LENGTH,
  });
  const [selectedTable, setSelectedTable] = useImmer<TableState>({
    table: "newDeaths",
  });
  const [selectedCountries, setSelectedCountries] = useImmer<CountriesState>({
    countries: [],
  });
  const [startAtDeaths, setStartAtDeaths] = useImmer({
    isStart: false,
  });
  const chartInfo = getChartInfo(selectedTable.table, periodInfo.length);
  const onCountriesChange = (currentCountries: string[]) => {
    setSelectedCountries((draft) => {
      draft.countries = [...currentCountries];
    });
  };

  const { loading, error, data } = useQuery<Countries>(COUNTRY_QUERY);
  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <Error error={error} />;
  }
  const countries: Country[] = useMemo(
    () => calculateData(data, periodInfo.length),
    [data, periodInfo.length]
  );
  const allCountries: Tags[] = getTags(countries);
  const preparedCountries: Country[] = [
    ...countries,
    ...sumPeriodData(countries, periodInfo.length),
  ];
  return (
    <Page>
      <SEO title="All Data" />
      <Row gutter={[8, 8]}>
        <Col span={24}>
          <Title level={3} style={{ marginBottom: "0px" }}>
            Data reports constructor
          </Title>
          <Paragraph>choose data type, period, countries</Paragraph>
          <Divider className="divider" />
        </Col>
      </Row>
      <Row gutter={[8, 8]}>
        <Col span={24}>
          <Radio.Group
            value={selectedTable.table}
            onChange={(e) => {
              setSelectedTable((draft) => {
                draft.table = e.target.value;
              });
            }}
          >
            <Radio.Button value="newDeaths">New Deaths</Radio.Button>
            <Radio.Button value="totalDeaths">Total Deaths</Radio.Button>
            <Radio.Button value="growthRate">Change in Deaths</Radio.Button>
            <Radio.Button value="newCases">New Cases</Radio.Button>
            <Radio.Button value="totalCases">Total Cases</Radio.Button>
          </Radio.Group>
        </Col>
      </Row>
      <Row gutter={[8, 8]}>
        <Col span={24}>
          <Text>Period, days: </Text>
          <InputNumber
            min={1}
            max={20}
            placeholder="Period length, days"
            defaultValue={periodInfo.length}
            onChange={(val) =>
              setPeriodInfo((draft) => {
                draft.length = Number(val);
              })
            }
          />
          {"    "}
          <Checkbox
            onChange={(e) =>
              setStartAtDeaths((draft) => {
                draft.isStart = e.target.checked;
              })
            }
            checked={startAtDeaths.isStart}
          >
            Start at 1-st death
          </Checkbox>
        </Col>
      </Row>{" "}
      <Row gutter={[8, 8]}>
        <Col span={24}>
          <CountryFilter
            selected={selectedCountries.countries}
            setSelected={onCountriesChange}
            countries={allCountries}
          />
        </Col>
      </Row>
      <GlobalDataChart
        countries={preparedCountries}
        countriesT={allCountries}
        selectedCountries={selectedCountries.countries}
        x={chartInfo.x}
        y={chartInfo.y}
        startAtDeaths={startAtDeaths.isStart}
        title={chartInfo.title}
      />
      <Col span={24}>
        <Title level={3} style={{ marginBottom: "0px" }}>
          {chartInfo.title}
        </Title>
        <Paragraph>all countries included, last 6 periods</Paragraph>
        <Divider className="divider" />
        <TotalTable
          data={preparedCountries}
          periodLength={periodInfo.length}
          kind={selectedTable.table}
          size={6}
        />
      </Col>
    </Page>
  );
};

export default Data;

