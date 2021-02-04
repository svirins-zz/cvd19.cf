import { Col, Divider, Row, Typography } from 'antd';
import { AreaChart, SummaryChart } from 'components/charts';
import { TodayStats } from 'components/data';
import { Page, SEO } from 'components/layout';
import { Table } from 'components/table/table';
import { Spinner } from 'components/ui';
import { PERIOD_LENGTH } from 'const';
import { myContext } from 'context';
import { useGetGlobalData } from 'hooks';
import React, { useContext, useEffect } from 'react';
import { useImmer } from 'use-immer';

import { Country, IndexPageState, OutbreakStatus, TableType } from '@types';

const { Title } = Typography;

const Index = ({
	pageContext,
}: {
	pageContext: GatsbyTypes.SitePageContext;
}): JSX.Element => {
	const [state, setState] = useImmer<IndexPageState>({
		stats: {
			confirmed: 0,
			deaths: 0,
			recovered: 0,
			countries: 0,
			days: 0,
			trend: OutbreakStatus.None,
		},
		trends: [],
		loseTableData: [],
		winTableDat: [],
	});
	const countries = pageContext.data as Country[];
	useEffect(() => {
		const { stats, trends, loseTableData, winTableData } = useGetGlobalData(
			countries,
		);
		setState((draft) => {
			(draft.stats = stats),
				(draft.trends = trends),
				(draft.loseTableData = loseTableData),
				(draft.winTableData = winTableData);
		});
	}, []);
	const { width } = useContext(myContext);
	if (state.stats.confirmed === 0) {
		return <Spinner />;
  }
	return (
		<Page>
			<SEO
				title='Covid-19 Global epidemic situation'
				description='Gloval covid-19 trends and statistics'
				pathname='/'
			/>
			<Row gutter={[8, 8]}>
				<Col span={24}>
					<Title level={2}>
						Covid-19 Global pandemic situation. Today&apos;s stats
					</Title>
					<Divider className='divider' />
				</Col>
				<Col span={24} className="mb-10">
					<TodayStats stats={state.stats} />
				</Col>
			</Row>
			<>
				<Col span={24} className="mb-20">
					<Title level={4}>
						Global data trends by countries
            <Divider className='divider' />
					</Title>
					<div className="chart">
						<SummaryChart
							periods={state.trends}
							multiplyer={width?.multiplyer ?? 1}
						/>
					</div>
				</Col>
				<Col span={24} className="mb-20">
				  <Title level={4}>
						Trend &apos;Under control percent&apos; by countries
            <Divider className='divider' />
					</Title>
					<div className="chart">
						<AreaChart
							periods={state.trends}
							multiplyer={width?.multiplyer ?? 1}
							yValue='underControl'
						/>
					</div>
				</Col>
				<Col span={24} className="mb-20">
					<Title level={4}>
						Trend &apos;Pandemic free percent&apos; by countries
            <Divider className='divider' />
					</Title>
					<div className="chart">
						<AreaChart
							periods={state.trends}
							multiplyer={width?.multiplyer ?? 1}
							yValue='pandemicFree'
						/>
					</div>
				</Col>
			</>
			<Col span={24} className="mb-10">
				<Title level={4}>
					New death cases by countries (last two periods). Winning / won and
					losing / flattening trends.
          <Divider className='divider' />

				</Title>
			</Col>
			<Row gutter={0}>
				<Col xs={24} sm={24} md={24} lg={12} xl={12}>
					<Table
						data={state.winTableData}
						periodLength={PERIOD_LENGTH}
						order={false}
						kind={TableType.NewDeaths}
						variation={'tight'}
					/>
				</Col>
				<Col xs={24} sm={24} md={24} lg={12} xl={12}>
					<Table
						data={state.loseTableData}
						periodLength={PERIOD_LENGTH}
						order={true}
						kind={TableType.NewDeaths}
						variation={'tight'}
					/>
				</Col>
			</Row>
		</Page>
	);
};

export default Index;
