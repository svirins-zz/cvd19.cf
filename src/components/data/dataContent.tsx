import React, { useState } from 'react';
import {
  Typography, Divider, Col, Row, Radio, Checkbox, InputNumber,
} from 'antd';
import PageLayout from '../layout/pageLayout';
import SEO from '../layout/seo';
import {
  GrowthTable, NewDeathsTable, TotalDeathsTable, NewCasesTable, TotalCasesTable,
} from '../tables/prepareTables';
import AllDataChart from '../charts/allDataChart';
import CountryFilter from './countryFilter';
import { getTags } from '../../utilities/periodUtils';
import getChartInfo from '../../utilities/getChartInfo';
import {
  PeriodInfo, Table, Country, Tags, ValT,
} from '../../types';

const { Title, Text } = Typography;

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
  const possibleTags = React.useMemo(() => getTags(countries), [countries]);
  const [tags, setTags] = useState<Tags>({
    currentTags: [
      { id: 'United States', name: 'United States' },
      { id: 'Brazil', name: 'Brazil' },
      { id: 'India', name: 'India' },
    ],
    suggestedTags: possibleTags,
  });
  const [startAtDeaths, setStartAtDeaths] = useState(false);
  return (
    <PageLayout>
      <SEO title="All Data" />
      <Row gutter={[8, 16]}>
        <Col offset={1}>
          <Title level={2}>All Data</Title>
        </Col>
      </Row>
      <Row gutter={[8, 16]}>
        <Col offset={1}>
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
        <Col span={22} offset={1}>
          <Text>
            Period, days:
            {' '}
          </Text>
          <InputNumber
            min={1}
            max={20}
            placeholder="Period length, days"
            defaultValue={Number(periodInfo.value)}
            onChange={(val: ValT) => onPeriodChange(val)}
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
        <Col span={22} offset={1}>
          <CountryFilter tags={tags} setTags={setTags} />
          <Divider />
        </Col>
      </Row>
      <Col span={22} offset={1}>
        <Title level={3}>{chartInfo.title}</Title>
      </Col>
      <AllDataChart
        countries={countries}
        x={chartInfo.x}
        y={chartInfo.y}
        tags={tags.currentTags}
        startAtDeaths={startAtDeaths}
      />
      <Col span={22} offset={1}>
        <Divider />
        <Title level={3}>Some header</Title>
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
