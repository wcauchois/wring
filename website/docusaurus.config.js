module.exports = {
  title: 'W/RING',
  tagline: 'Decentralized webrings for the 21st century',
  url: 'https://wring.netlify.app',
  baseUrl: '/',
  favicon: 'img/favicon.ico',
  organizationName: 'wcauchois', // Usually your GitHub org/user name.
  projectName: 'wring', // Usually your repo name.
  themeConfig: {
    navbar: {
      title: 'W/RING',
      logo: {
        alt: 'W/RING Logo',
        src: 'img/logo.png',
      },
      links: [
        {
          to: 'docs/',
          activeBasePath: 'docs',
          label: 'Docs',
          position: 'left',
        },
        {
          href: 'https://github.com/wcauchois/wring',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          // It is recommended to set document id as docs home page (`docs/` path).
          homePageId: 'doc1',
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl:
            'https://github.com/facebook/docusaurus/edit/master/website/',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          editUrl:
            'https://github.com/facebook/docusaurus/edit/master/website/blog/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
