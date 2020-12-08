import { Alert, Col, Divider, Row, Typography } from 'antd';
import logo from "assets/cvd4.svg";
import { Page, SEO } from 'components/layout';
import { DonatePayPalButton } from 'components/ui';
import React from 'react';

const { Title, Paragraph } = Typography;

const About = (): JSX.Element => {
	return (
		<Page>
			<SEO
				title='Covid-19 Global pandemic dasboard app by @svirins'
				description='About page and further information'
				pathname='/about'
			/>
			<Row gutter={[8, 8]}>
				<Col span={24}>
					<Title level={2}>Covid-19 Global pandemic situation</Title>
					<Divider className='divider' />
					<Alert
						message='Stay home and be safe!'
						description='The pandemic is serious! Herd immunity and waiting on a
            vaccine are not real strategies. Masks, lockdowns, travel bans, and mass
            testing are.'
						type='warning'
						showIcon={true}
						closable={true}
						className='mb-10 m1-20'
					/>
				</Col>
			</Row>
				<Col xs={24} sm={24} md={24} lg={24} xl={24}>
					<ul className='mt-20'>
						<li>This app aims to provide a tool to track global trends in the Covid-19 pandemic. You can choose from various data representations and apply sort and filters.
						</li>
						<li>					
						  Data updated during build time. Refer help section to get detailed trend explanaton.
						</li>	
					</ul>
				</Col>
			<Row gutter={[8, 16]}>
				<Col xs={24} sm={24} md={24} lg={24} xl={24}>
					<Title level={4}>
						Extra info and useful resources:
					</Title>
					<Divider className='divider' />
						<ul className='mt-20'>
							<li>
								<a href='https://necsi.edu/corona-virus-pandemic'>
									NECSI Coronavirus resources
								</a>
							</li>
							<li>
								<a href='https://www.endcoronavirus.org/'>EndCoronavirus.org</a>
							</li>
							<li>
								<a href='https://coronavirus.jhu.edu/map.html'>Johns Hopkins Coronavirus Resource Center</a>
							</li>
						</ul>
					<Title level={4}>
					  Tech details: 
					</Title>
					<Divider className='divider' />
					  <ul className='mt-20'>
							<li>
								All data are pulled from the{' '}
								<a href='https://github.com/CSSEGISandData/COVID-19'>
									COVID-19 data repository
								</a>{' '}
								provided by Johns Hopkins University, then parsed with a{' '}
								<a href='https://github.com/pomber/covid19'>JSON parser</a> and,
								finally, turned into{' '}
								<a href='https://github.com/svirins/covid-qrapqhl-server'>
									GraphQL API{' '}
								</a>	
							</li>
							<li> 
								App concept inspired by{' '}
								<a href='https://github.com/rickkln/corona'>Rickkln/corona</a> and
								uses some legacy code, thought massively refactored.
							</li>
							<li> 
                Site is built with <a href='https://www.gatsbyjs.com/'>Gatsby.</a> and hosted by <a href='https://vercel.com/'>Vercel.</a>.{" "}
								Tech stack details <a href='https://stackshare.io/svirins/cvd19'>here.</a>
							</li>
							<li>
								All code for this site is{' '}
								<a href='https://github.com/svirins/cvd19.cf'>open source</a>.{" "} ⇄ Pull/Merge requests and ★ Stars are always welcome.			
							</li>
						</ul>
						<Title level={4}>
					    Support: 
					  </Title>
					  <Divider className='divider' />
					<Paragraph>
						If you enjoyed using this app, and you&apos;d like to help support
						further development, you&apos;re welcome to donate!
					</Paragraph>
					<DonatePayPalButton />
				</Col>
				<Col xs={24} sm={24} md={24} lg={24} xl={24}>
				<img
					src={logo}
					alt="Covid-19 stats & facts"
					height={192}
					width={192}
				/>
				</Col>
			</Row>
		</Page>
	);
};

export default About;
