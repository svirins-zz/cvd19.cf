import React, { useMemo, useState } from "react";
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
import { calculateData, sumPeriodData, getTags, getChartInfo } from "lib";
import { PeriodInfo, TableType, Tags, ValT } from "../@types";
import { useFetchCountries } from "../hooks";

const { Title, Text, Paragraph } = Typography;

const DataPage = () => {
  const [periodInfo, setPeriodInfo] = useState<PeriodInfo>({
    length: PERIOD_LENGTH,
    value: String(PERIOD_LENGTH),
  });
  const [selectedTable, setSelectedTable] = useState<TableType>("newDeaths");
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
  const [startAtDeaths, setStartAtDeaths] = useState(false);
  const { loading, error, data } = useFetchCountries();
  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <Error error={error} />;
  }

  const countries = calculateData(data, periodInfo.length);
  const chartInfo = getChartInfo(selectedTable, periodInfo.length);
  const allCountries: Tags[] = getTags(countries);
  const preparedCountries = [
    ...countries,
    ...sumPeriodData(countries, periodInfo.length),
  ];

  const onPeriodChange = (val: number) => {
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
  };
  return (
    <Page>
      <SEO title="All Data" />
      <Row gutter={[8, 8]}>
        <Col span={20} offset={2}>
          <Title level={3} style={{ marginBottom: "0px" }}>
            Data reports constructor
          </Title>
          <Paragraph>choose data type, period, countries</Paragraph>
          <Divider className="divider" />
        </Col>
      </Row>
      <Row gutter={[8, 8]}>
        <Col span={20} offset={2}>
          <Radio.Group
            value={selectedTable}
            onChange={(e) => {
              setSelectedTable(e.target.value);
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
        <Col span={20} offset={2}>
          <Text>Period, days: </Text>
          <InputNumber
            min={1}
            max={20}
            placeholder="Period length, days"
            defaultValue={Number(periodInfo.value)}
            onChange={(val: ValT) => onPeriodChange(Number(val))}
          />
          {"    "}
          <Checkbox
            onChange={(e) => setStartAtDeaths(e.target.checked)}
            checked={startAtDeaths}
          >
            Start at 1-st death
          </Checkbox>
        </Col>
      </Row>{" "}
      <Row gutter={[8, 8]}>
        <Col span={20} offset={2}>
          <CountryFilter
            selected={selectedCountries}
            setSelected={setSelectedCountries}
            countries={allCountries}
          />
        </Col>
      </Row>
      <GlobalDataChart
        countries={preparedCountries}
        countriesT={allCountries}
        selectedCountries={selectedCountries}
        x={chartInfo.x}
        y={chartInfo.y}
        startAtDeaths={startAtDeaths}
        title={chartInfo.title}
      />
      <Col span={20} offset={2}>
        <Title level={3} style={{ marginBottom: "0px" }}>
          {chartInfo.title}
        </Title>
        <Paragraph>all countries included, last 6 periods</Paragraph>
        <Divider className="divider" />
        <TotalTable
          data={preparedCountries}
          periodLength={periodInfo.length}
          kind={selectedTable}
          size={6}
        />
      </Col>
    </Page>
  );
};

export default DataPage;
