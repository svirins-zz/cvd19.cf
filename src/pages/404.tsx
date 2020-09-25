import React from 'react';
import PageLayout from '../components/shared/layout/pageLayout';
import SEO from '../components/shared/layout/seo';

const NotFoundPage = () => (
  <PageLayout>
    <SEO title="404: Not found" />
    <h1>NOT FOUND</h1>
    <p>You just hit a link to a page that doesn&#39;t exist... the sadness.</p>
  </PageLayout>
);

export default NotFoundPage;
