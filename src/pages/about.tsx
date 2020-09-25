import React from 'react';
import { Link } from 'gatsby';
import PageLayout from '../components/shared/layout/pageLayout';
import SEO from '../components/shared/layout/seo';

const AboutPage = () => (
  <PageLayout>
    <SEO title="About" />
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
