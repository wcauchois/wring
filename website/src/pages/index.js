import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './styles.module.css';

const features = [
  {
    title: <>Turn the web into a ring</>,
    description: (
      <>
        If the earth is flat, why can't the web be a ring?
      </>
    ),
  },
  {
    title: <>Link to your friends, but hip</>,
    description: (
      <>
        Why use &lt;a href&gt; when you can simply host a JSON file,
        embed the web-ring widget, and join an elite cadre of geniuses?
      </>
    ),
  },
  {
    title: <>Fight the power</>,
    description: () => (
      <>
        You're just a drone scrolling Instagram. Hosting is free<sup>*</sup>. Make something,
        then embrace the alt-discoverability of a web ring.
        <br />
        <br />
        <sup>*</sup>I mean it. See our guides for
        {" "}<Link to={useBaseUrl('docs/getting_started_netlify')}>Netlify</Link> and
        {" "}<Link to={useBaseUrl('docs/getting_started_s3')}>S3</Link>.
      </>
    ),
  },
];

function Feature({imageUrl, title, description}) {
  const imgUrl = useBaseUrl(imageUrl);
  return (
    <div className={clsx('col col--4', styles.feature)}>
      {imgUrl && (
        <div className="text--center">
          <img className={styles.featureImage} src={imgUrl} alt={title} />
        </div>
      )}
      <h3>{title}</h3>
      <p>{typeof description === 'function' ? description() : description}</p>
    </div>
  );
}

function Home() {
  const context = useDocusaurusContext();
  const {siteConfig = {}} = context;
  return (
    <Layout
      title={`W/RING`}
      description="Decentralized webrings for the modern web">
      <header className={clsx('hero hero--primary', styles.heroBanner)}>
        <div className="container">
          <h1 className="hero__title">{siteConfig.title}</h1>
          <p className="hero__subtitle">{siteConfig.tagline}</p>
          <div className={styles.buttons}>
            <Link
              className={clsx(
                'button button--outline button--secondary button--lg',
                styles.getStarted,
              )}
              to={useBaseUrl('docs/')}>
              Get Lit
            </Link>
          </div>
        </div>
      </header>
      <main>
        {features && features.length > 0 && (
          <section className={styles.features}>
            <div className="container">
              <div className="row">
                {features.map((props, idx) => (
                  <Feature key={idx} {...props} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
    </Layout>
  );
}

export default Home;
