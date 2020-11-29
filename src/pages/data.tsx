import {
	Alert,
	Col,
	Divider,
	Radio,
	Row,
	Slider,
	Switch,
	Typography,
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

const { Title, Paragraph } = Typography;

const marks = {
	5: '5',
	6: '6',
	7: '7',
	8: '8',
	9: '9',
	10: '10',
	11: '11',
	12: '12',
	13: '13',
	14: '14',
};
const Data = ({
	pageContext,
}: {
	pageContext: GatsbyTypes.SitePageContext;
}): JSX.Element => {
	const { width } = useContext(myContext);
	const countries = pageContext.data?.countries as Country[];
	const [filtersState, setFiltersState] = useImmer<FiltersState>({
		periodLength: PERIOD_LENGTH,
		selectedTable: TableType.NewDeaths,
		selectedCountries: [{ name: 'United States', color: 'rgb(31,119,180)' }],
		startAtDeaths: false,
		startAtLast90Days: false,
		isSliderDisabled: false,
		oldPeriodsValue: PERIOD_LENGTH,
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
			if (value) {
				draft.oldPeriodsValue = filtersState.periodLength;
				draft.periodLength = 5;
				draft.isSliderDisabled = true;
			} else {
				draft.periodLength = filtersState.oldPeriodsValue;
				draft.isSliderDisabled = false;
			}
			draft.startAtLast90Days = value;
		});
	};
	// always put global at first table position
	// TODO: refactor periods to handle VALID ranges
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
						<Title level={2}>
							Data reports constructor
						</Title>
						<Divider className='divider' />
						<Alert
							message='Data selection and filtering tips'
							description='Choose data type, period length (2..10 days), countries (up to 10). Switches works only with chart.'
							type='warning'
							showIcon={true}
							closable={true}
							className="mb-10 mt-10"
						/>
					</Col>
				</Row>
				<Col span={24} className="mb-20">
					<Radio.Group
						value={filtersState.selectedTable}
						onChange={(event) => onTableChange(event.target.value)}
						size='middle'
					>
						<Radio value='newDeaths'>New Deaths</Radio>
						<Radio value='totalDeaths'>Total Deaths</Radio>
						<Radio value='growthRate'>Change in Deaths</Radio>
						<Radio value='newCases'>New Cases</Radio>
						<Radio value='totalCases'>Total Cases</Radio>
					</Radio.Group>
				</Col>

				<Col span={24} className="mb-20">
					<CountryFilter
						selected={filtersState.selectedCountries}
						setSelected={onCountriesChange}
						countries={dataState.countriesList}
					/>
				</Col>
				<Row>
					<Col
						xs={24}
						sm={24}
						md={24}
						lg={12}
						xl={12}
						className="mb-10"
					>
						<Slider
							min={5}
							step={1}
							max={14}
							dots={true}
							marks={marks}
							disabled={filtersState.isSliderDisabled}
							onChange={(value: number) => onInputChange(value)}
							tooltipVisible={false}
							value={filtersState.periodLength}
						/>
					</Col>
					<Col
						xs={24}
						sm={24}
						md={24}
						lg={12}
						xl={12}
						className="mb-10 mt-10"
					>
						<Switch
							checkedChildren='Start at 1-st death'
							unCheckedChildren='Start at 1-st death'
							checked={filtersState.startAtDeaths}
							onChange={(checked) => onDeathsChange(checked)}
						/>
						<Switch
							checkedChildren='Show last 90 days'
							unCheckedChildren='Show last 90 days'
							checked={filtersState.startAtLast90Days}
							onChange={(checked) => onLast90DaysChange(checked)}
							className='mr-10'
						/>
					</Col>
				</Row>
				<Col span={24} className="mb-20">
					<div className="chart">
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
					<Title level={4} className="mb-20">
						{chartInfo.title}&nbsp;(all countries)
						<Divider className='divider' />
					</Title>

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
