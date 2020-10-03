import React from 'react';
import { Link } from 'gatsby';
import { Typography } from 'antd';
import PageLayout from '../components/shared/layout/pageLayout';
import SEO from '../components/shared/layout/seo';
import { LegendTable } from '../components/details/legend';

const { Paragraph } = Typography;
// TODO: Add typography and styling
const AboutPage = () => (
  <PageLayout>
    <SEO title="About" />
    <Paragraph className="centered">
      This site aims to provide a simple tool to track global progress in defeating Covid-19,
      by focusing on the rate of change in death count globally.
      Daily data update occurs between 04:45 and 05:15 GMT
    </Paragraph>
    <LegendTable />
    <h2>Covid-19 Pandemic Information</h2>
    <p>
      If you want expert information visit
      {' '}
      <a href="https://www.endcoronavirus.org/">EndCoronavirus.org</a>
      ,
      which provides extensive information, policy advice and guidelines
      for the fight against Covid-19.
    </p>
    <p>
      If you want my 2 cents on the pandemic,
      and what options we have in fighting it you can read my blog post:
      {' '}
      <a href="https://rickkln.com/blog/covid-stop-fighting-the-lockdown">Stop Fighting The Lockdown</a>
      . Summary: the pandemic is serious; we won&apos;t have an economy if we don&apos;t defeat it;
      herd immunity and waiting on a vaccine are not real strategies; masks, lockdowns,
      travel bans, and mass testing are.
    </p>
    <p>
      Other useful resources:
    </p>
    <ul>
      <li><a href="https://www.endcoronavirus.org/">EndCoronavirus.org</a></li>
      <li><a href="https://necsi.edu/corona-virus-pandemic">NECSI Coronavirus resources</a></li>
      <li><a href="https://medium.com/@tomaspueyo/coronavirus-act-today-or-people-will-die-f4d3d9cd99ca">Act today or people will die - Tomas Pueyo</a></li>
      <li><a href="https://medium.com/@tomaspueyo/coronavirus-the-hammer-and-the-dance-be9337092b56">The hammer and the dance - Tomas Pueyo</a></li>
      <li><a href="https://medium.com/@tomaspueyo/coronavirus-out-of-many-one-36b886af37e9">Out of many one - Tomas Pueyo</a></li>
      <li><a href="https://www.nakedcapitalism.com/2020/04/taleb-the-only-man-who-has-a-clue.html">Taleb: The Only Man Who Has A Clue - Yves Smith</a></li>
    </ul>
    <p>
      This site aims to provide a simple tool to track global progress in defeating Covid-19,
      by focusing on the rate of change in death count globally.
      Daily data update occurs between 04:45 and 05:15 GMT
    </p>
    <p>
      All data is pulled from the
      {' '}
      <a href="https://github.com/CSSEGISandData/COVID-19">COVID-19 data repository</a>
      {' '}
      provided by Johns Hopkins University.
      Which in turn pulls data from various government sources, and tracking projects such as
      {' '}
      <a href="https://www.worldometers.info/coronavirus">WorldoMeters</a>
      .
      All code for this site is
      {' '}
      <a href="https://github.com/svirins/covid-charts-and-tables">open source</a>
      . It is built with
      {' '}
      <a href="https://www.gatsbyjs.org/">Gatsby</a>
      {' '}
      and consumes the Johns Hopkins data via a
      {' '}
      <a href="https://github.com/rlindskog/covid19-graphql">GraphQl</a>
      {' '}
      API which in turn wraps a another
      {' '}
      <a href="https://github.com/pomber/covid19">parser</a>
      .
    </p>
    <p>
      There are various other great Covid-19 tracking and information websites.
      {' '}
      <a href="https://www.endcoronavirus.org/">EndCoronavirus.org</a>
      , which is backed by the NECSI, being the best one I have found.
      For a list of recommended resources view
      {' '}
      <Link to="/details">Details</Link>
      .
    </p>
  </PageLayout>
);

export default AboutPage;
