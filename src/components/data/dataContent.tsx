import React, { useState } from 'react';
import {
  Typography, Divider, Col, Radio, Checkbox, InputNumber,
} from 'antd';
import PageLayout from '../layout/pageLayout';
import SEO from '../layout/seo';
import {
  GrowthTable, NewDeathsTable, TotalDeathsTable, NewCasesTable, TotalCasesTable,
} from '../tables/prepareTables';
import AllDataChart from '../charts/allDataChart';
import CountryFilter from './countryFilter';
import { getTags } from '../../utilities/periodUtils';
import {
  PeriodInfo, Table, ChartInfo, Country, Tags,
} from '../../types';

const { Title, Paragraph, Text } = Typography;

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
        <Text>
          Period length, days:
          {' '}
        </Text>
        <InputNumber
          min={1}
          max={20}
          placeholder="Period length, days"
          defaultValue={Number(periodInfo.value)}
          onChange={(val) => onPeriodChange(val)}
        />
      </Paragraph>
      <Paragraph className="centered">
        <Checkbox
          onChange={(e) => setShowAll(e.target.checked)}
          checked={showAll}
        >
          All countries
        </Checkbox>
        {' '}
        <Checkbox
          onChange={(e) => setStartAtDeaths(e.target.checked)}
          checked={startAtDeaths}
        >
          Start at 1-st death
        </Checkbox>
      </Paragraph>
      <Col span={20} offset={2}>
        {/* CountryFilter is broken */}
        <CountryFilter tags={tags} setTags={setTags} />
      </Col>
      <Divider />
      <Title className="centered" level={2}>{chartInfo.title}</Title>
      <AllDataChart
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
