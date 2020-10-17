import React, { useState } from 'react';
import {
  Typography, Divider, Col, Row, Radio, Checkbox, InputNumber,
} from 'antd';
import {
  PeriodInfo, Table, Country, Tags, ValT,
} from 'types';
import getTags from 'lib/tagUtils';
import getChartInfo from 'lib/getChartInfo';
import AllDataChart from '../charts/allDataChart';

import PageLayout from '../layout/pageLayout';
import SEO from '../layout/seo';
import {
  GrowthTable, NewDeathsTable, TotalDeathsTable, NewCasesTable, TotalCasesTable,
} from '../tables/prepareTables';
import CountryFilter from './countryFilter';

const { Title, Text, Paragraph } = Typography;

const DataContent = ({
  countries,
  periodInfo,
  onPeriodChange,
}: {
  countries: Country[],
  periodInfo: PeriodInfo,
  onPeriodChange: ((value: number) => void)
}) => {
  const [selectedTable, setSelectedTable] = useState<Table>('newDeaths');
  const chartInfo = React.useMemo(
    () => getChartInfo(selectedTable, periodInfo.length),
    [selectedTable, periodInfo],
  );
  // TODO:refactor allCountries useReducer
  const allCountries: Tags[] = React.useMemo(() => getTags(countries), [countries]);
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
  const [startAtDeaths, setStartAtDeaths] = useState(false);
  return (
    <PageLayout>
      <SEO title="All Data" />
      <Row gutter={[8, 16]}>
        <Col span={20} offset={2}>
          <Title level={3} style={{ marginBottom: '0px' }}>All Data</Title>
          <Paragraph>Choose data type, period, countries:</Paragraph>
          <Divider className="divider" />
        </Col>
      </Row>
      <Row gutter={[8, 16]}>
        <Col span={20} offset={2}>
          <Radio.Group value={selectedTable} onChange={(e) => setSelectedTable(e.target.value)}>
            <Radio.Button value="newDeaths">New Deaths</Radio.Button>
            <Radio.Button value="totalDeaths">Total Deaths</Radio.Button>
            <Radio.Button value="growth">Change in Deaths</Radio.Button>
            <Radio.Button value="newCases">New Cases</Radio.Button>
            <Radio.Button value="totalCases">Total Cases</Radio.Button>
          </Radio.Group>
        </Col>
      </Row>
      <Row gutter={[8, 16]}>
        <Col span={20} offset={2}>
          <Text>
            Period, days:
            {' '}
          </Text>
          <InputNumber
            min={1}
            max={20}
            placeholder="Period length, days"
            defaultValue={Number(periodInfo.value)}
            onChange={(val: ValT) => onPeriodChange(Number(val))}
          />
          {'    '}
          <Checkbox
            onChange={(e) => setStartAtDeaths(e.target.checked)}
            checked={startAtDeaths}
          >
            Start at 1-st death
          </Checkbox>
        </Col>
      </Row>
      <Row gutter={[8, 16]}>
        <Col span={20} offset={2}>
          <CountryFilter
            selected={selectedCountries}
            setSelected={setSelectedCountries}
            countries={allCountries}
          />
        </Col>
      </Row>
      <AllDataChart
        countries={countries}
        countriesT={allCountries}
        selectedCountries={selectedCountries}
        x={chartInfo.x}
        y={chartInfo.y}
        startAtDeaths={startAtDeaths}
        title={chartInfo.title}
      />
      <Col span={20} offset={2}>
        <Title level={3} style={{ marginBottom: '0px' }}>Some header</Title>
        <Paragraph>Some descriptive sub-header</Paragraph>
        {selectedTable === 'growth' && <GrowthTable data={countries} periodLength={periodInfo.length} />}
        {selectedTable === 'newDeaths' && <NewDeathsTable data={countries} periodLength={periodInfo.length} />}
        {selectedTable === 'totalDeaths' && <TotalDeathsTable data={countries} periodLength={periodInfo.length} />}
        {selectedTable === 'newCases' && <NewCasesTable data={countries} periodLength={periodInfo.length} />}
        {selectedTable === 'totalCases' && <TotalCasesTable data={countries} periodLength={periodInfo.length} />}
      </Col>
    </PageLayout>
  );
};

export default DataContent;
