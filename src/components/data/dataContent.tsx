import React, { useState } from 'react';
import {
  Typography, Divider, Col, Radio, Switch, InputNumber,
} from 'antd';
import PageLayout from '../shared/layout/pageLayout';
import SEO from '../shared/layout/seo';

import {
  GrowthTable, NewDeathsTable, TotalDeathsTable, NewCasesTable, TotalCasesTable,
} from '../shared/tables/tables';
import DataChart from './dataChart';
import CountryFilter, { Tags } from './countryFilter';
import { Country } from '../../types';
import { getTags } from '../../utilities/periodUtils';

const { Title, Paragraph, Text } = Typography;

export interface PeriodInfo {
  length: number
  value: string
}

type Table =
  | 'growth'
  | 'totalDeaths'
  | 'newDeaths'
  | 'totalCases'
  | 'newCases';

interface ChartInfo {
  x: string
  y: string
  title: string
}

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
// Data page goes here
const DataContent = ({
  countries,
  periodInfo,
  onPeriodChange,
}: {
  countries: Country[],
  periodInfo: PeriodInfo,
  onPeriodChange: ((value: number) => void)
}) => {
  const possibleTags = React.useMemo(() => getTags(countries), [countries]);
  const [selectedTable, setSelectedTable] = useState<Table>('newDeaths');
  const chartInfo = React.useMemo(
    () => getChartInfo(selectedTable, periodInfo.length),
    [selectedTable, periodInfo],
  );
  const [tags, setTags] = useState<Tags>({
    currentTags: [
      { id: 'United States', name: 'United States' },
      { id: 'Brazil', name: 'Brazil' },
      { id: 'India', name: 'India' },
    ],
    suggestedTags: possibleTags,
  });
  const [showAll, setShowAll] = useState(true);
  const [startAtDeaths, setStartAtDeaths] = useState(false);
  return (
    <PageLayout>
      <SEO title="All Data" />
      <Paragraph className="centered">
        <Title level={1}>All Data</Title>
        <Radio.Group value={selectedTable} onChange={(e) => setSelectedTable(e.target.value)}>
          <Radio.Button value="newDeaths">New Deaths</Radio.Button>
          <Radio.Button value="totalDeaths">Total Deaths</Radio.Button>
          <Radio.Button value="growth">Change in Deaths</Radio.Button>
          <Radio.Button value="newCases">New Cases</Radio.Button>
          <Radio.Button value="totalCases">Total Cases</Radio.Button>
        </Radio.Group>
      </Paragraph>
      <Paragraph className="centered">
        <Text> Period length, days:</Text>
        {' '}
        {' '}
        <InputNumber
          min={1}
          max={20}
          defaultValue={Number(periodInfo.value)}
          onChange={(val) => onPeriodChange(val)}
        />
        {' '}
        {' '}
        <Text>All countries</Text>
        {' '}
        {' '}
        <Switch onChange={setShowAll} checked={showAll} />
        {' '}
        {' '}
        <Text>Start at 1-st death</Text>
        {' '}
        {' '}
        <Switch onChange={setStartAtDeaths} checked={startAtDeaths} />
        {/* CountryFilter is broken */}
        <CountryFilter tags={tags} setTags={setTags} />
      </Paragraph>
      <Divider />
      <Title className="centered" level={2}>{chartInfo.title}</Title>
      <DataChart
        countries={countries}
        x={chartInfo.x}
        y={chartInfo.y}
        tags={tags.currentTags}
        showAll={showAll}
        startAtDeaths={startAtDeaths}
      />
      <Col span={20} offset={2}>
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
