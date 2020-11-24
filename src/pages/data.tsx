import {
	Checkbox,
	Col,
	Divider,
	InputNumber,
	Radio,
	Row,
	Slider,
	Typography
} from 'antd';
import { DataChart } from 'components/charts';
import { Page, SEO } from 'components/layout';
import { Table } from 'components/table';
import { CountryFilter } from 'components/ui';
import { PERIOD_LENGTH } from 'const';
import { myContext } from 'context';
import { useGetDetailedData } from 'hooks';
import { getChartInfo, getColor } from 'lib';
import React, { useContext, useEffect } from 'react';
import { useImmer } from 'use-immer';

import { Country, DataPageState, FiltersState, TableType } from '../@types';

const { Title, Text, Paragraph } = Typography;
const marks = {
	2: '2',
	3: '3',
	4: '4',
	5: '5',
	6: '6',
	7: '7',
	8: '8',
	9: '9',
  10: "10"
};
const Data = ({
	pageContext,
}: {
	pageContext: GatsbyTypes.SitePageContext;
}): JSX.Element => {
	const { width } = useContext(myContext);
  const countries  = pageContext.data?.countries as Country[];
	const [filtersState, setFiltersState] = useImmer<FiltersState>({
		periodLength: PERIOD_LENGTH,
		selectedTable: TableType.NewDeaths,
		selectedCountries: [{ name: 'United States', color: 'rgb(31,119,180)' }],
		startAtDeaths: false,
		startAtLast90Days: false,
	});
	const [dataState, setDataState] = useImmer<DataPageState>({
		countriesList: [],
		preparedCountries: [],
	});
	useEffect(() => {
		const { countriesList, preparedCountries } = useGetDetailedData(
			countries,
			filtersState.periodLength,
		);
		setDataState((draft) => {
			draft.countriesList = countriesList;
			draft.preparedCountries = preparedCountries;
		});
	}, [filtersState.periodLength]);
	const chartInfo = getChartInfo(
		filtersState.selectedTable,
		filtersState.periodLength,
	);

	const onCountriesChange = (currentCountries: string[]) => {
		const countriesWithColors = currentCountries.map((country, index) => {
			return {
				name: country,
				color: getColor(index),
			};
		});
		setFiltersState((draft) => {
			draft.selectedCountries = countriesWithColors;
		});
	};
	const onTableChange = (value: TableType) => {
		setFiltersState((draft) => {
			draft.selectedTable = value;
		});
	};
	const onInputChange = (value: number) =>
		setFiltersState((draft) => {
			draft.periodLength = value;
		});
	const onDeathsChange = (value: boolean) => {
		setFiltersState((draft) => {
			if (filtersState.startAtLast90Days && value) {
				draft.startAtLast90Days = false;
			}
			draft.startAtDeaths = value;
		});
	};
	const onLast90DaysChange = (value: boolean) => {
		setFiltersState((draft) => {
		  if (filtersState.startAtDeaths && value) {
				draft.startAtDeaths = false;
			}
			draft.startAtLast90Days = value;
		});
	};
	// TODO MAKE filters block dixed position
	// TODO: add increase/decrease buttons to chart instead of input
  // always put global at first table position
	// TODO: refactor input to handle >11 input values
	return (
		<Page>
			<SEO
				title='Covid-19 pandemic details'
				description='Covid-19 data, detailed and filtered'
				pathname='/data'
			/>
			<>
				<Row gutter={[8, 8]}>
					<Col span={24}>
						<Title level={3} style={{ marginBottom: '0px' }}>
							Data reports constructor
						</Title>
						<Divider className='divider' />
						<Paragraph className='bold-blue'>
							Choose data type, period, countries (up to 10). Check-buttons affects chart only. <br />Current
							choice:&nbsp;
							<span className='choiceText'>{chartInfo.title}</span>
						</Paragraph>
					</Col>
				</Row>
				<Row gutter={[8, 8]}>
					<Col span={24}>
						<Radio.Group
							value={filtersState.selectedTable}
							onChange={(event) => onTableChange(event.target.value)}
							optionType="button"
							buttonStyle="solid"
						>
							<Radio.Button value='newDeaths'>New Deaths</Radio.Button>
							<Radio.Button value='totalDeaths'>Total Deaths</Radio.Button>
							<Radio.Button value='growthRate'>Change in Deaths</Radio.Button>
							<Radio.Button value='newCases'>New Cases</Radio.Button>
							<Radio.Button value='totalCases'>Total Cases</Radio.Button>
						</Radio.Group>
					</Col>
				</Row>
				<Row gutter={[8, 8]}>
					<Col span={24}>
						{/* <Text>Period, days (2..10): </Text>
						<InputNumber
							min={2}
							max={10}
							placeholder='Period length, days'
							defaultValue={filtersState.periodLength}
							onChange={(value) => onInputChange(value as number)}
						/> */}
						<Slider
							min={2}
							max={10}
							step={1}
							dots={true}
							marks={marks} 
							onChange={(value) => onInputChange(value as number)}
							tooltipVisible
							value={filtersState.periodLength} 
						/>
						{'    '}
						{'    '}
						<Checkbox
						  style={{ paddingLeft: '1em' }}
							onChange={(e) => onDeathsChange(e.target.checked)}
							checked={filtersState.startAtDeaths}
						>
							Start at 1-st death (selected)
						</Checkbox>
						{'    '}
						{'    '}
						<Checkbox
							onChange={(e) => onLast90DaysChange(e.target.checked)}
							checked={filtersState.startAtLast90Days}
						>
							Show last 90 days
						</Checkbox>
					</Col>
				</Row>
				<Row gutter={[8, 8]}>
					<Col span={24} style={{ marginBottom: '20px' }}>
						<CountryFilter
							selected={filtersState.selectedCountries}
							setSelected={onCountriesChange}
							countries={dataState.countriesList}
						/>
					</Col>
				</Row>
				<Col span={24} style={{ marginBottom: '20px' }}>
					<div style={{ height: '450px' }}>
						<DataChart
							data={dataState.preparedCountries}
							selectedCountries={filtersState.selectedCountries}
							yValue={chartInfo.y}
							isStartAtDeaths={filtersState.startAtDeaths}
							isstartAtLast90Days={filtersState.startAtLast90Days}
							periodLength={filtersState.periodLength}
							multiplyer={width?.multiplyer ?? 1}
						/>
					</div>
				</Col>
				<Col span={24}>
					<Paragraph className='bold-blue' style={{ marginBottom: '20px' }}>
						{chartInfo.title}&nbsp;(all countries included)
					</Paragraph>
					<Table
						data={dataState.preparedCountries}
						periodLength={filtersState.periodLength}
						kind={filtersState.selectedTable}
						variation={'wide'}
						multiplyer={width?.multiplyer ?? 1}
					/>
				</Col>
			</>
		</Page>
	);
};
export default Data;
