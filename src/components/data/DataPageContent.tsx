import React, { useState } from "react";
import {
  Typography,
  Divider,
  Col,
  Row,
  Radio,
  Checkbox,
  InputNumber,
} from "antd";
import { PeriodInfo, TableType, Country, Tags, ValT } from "@types";
import { getTags, getChartInfo } from "lib";
import { GlobalDataChart } from "../charts";
import { Page, SEO } from "../layout";
import TotalTable from "../tables/TotalTable";
import CountryFilter from "./CountryFilter";

const { Title, Text, Paragraph } = Typography;
// TODO: check TotalTable re-renders and fix it
// TODO fix wrong country deleting in country filter
const DataPageContent = ({
  countries,
  periodInfo,
  onPeriodChange,
}: {
  countries: Country[];
  periodInfo: PeriodInfo;
  onPeriodChange: (value: number) => void;
}) => {
  const [selectedTable, setSelectedTable] = useState<TableType>("newDeaths");
  const chartInfo = React.useMemo(
    () => getChartInfo(selectedTable, periodInfo.length),
    [selectedTable, periodInfo]
  );
  const allCountries: Tags[] = React.useMemo(() => getTags(countries), [
    countries,
  ]);
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
  const [startAtDeaths, setStartAtDeaths] = useState(false);
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
        countries={countries}
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
        {selectedTable === "growthRate" && (
          <TotalTable
            data={countries}
            periodLength={periodInfo.length}
            kind={"growthRate"}
            size={6}
          />
        )}
        {selectedTable === "newDeaths" && (
          <TotalTable
            data={countries}
            periodLength={periodInfo.length}
            kind={"newDeaths"}
            size={6}
          />
        )}
        {selectedTable === "totalDeaths" && (
          <TotalTable
            data={countries}
            periodLength={periodInfo.length}
            kind={"totalDeaths"}
            size={6}
          />
        )}
        {selectedTable === "newCases" && (
          <TotalTable
            data={countries}
            periodLength={periodInfo.length}
            kind={"newCases"}
            size={6}
          />
        )}
        {selectedTable === "totalCases" && (
          <TotalTable
            data={countries}
            periodLength={periodInfo.length}
            kind={"totalCases"}
            size={6}
          />
        )}
      </Col>
    </Page>
  );
};

export default DataPageContent;
