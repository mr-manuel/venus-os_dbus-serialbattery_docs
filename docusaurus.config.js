// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion
const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

const organizationName = "mr-manuel";
const projectName = "venus-os_dbus-serialbattery_docs";
const projectNameCode = "venus-os_dbus-serialbattery";

/** @type {import('@docusaurus/types').Config} */
const config = {
    title: 'dbus-serialbattery',
    tagline: 'Venus OS battery driver',
    favicon: 'img/favicon.ico',

    // Set the production url of your site here
    url: `https://${organizationName}.github.io`,
    // Set the /<baseUrl>/ pathname under which your site is served
    // For GitHub pages deployment, it is often '/<projectName>/'
    baseUrl: `/${projectName}/`,

    // GitHub pages deployment config.
    // If you aren't using GitHub pages, you don't need these.
    organizationName: organizationName, // Usually your GitHub org/user name.
    projectName: projectName, // Usually your repo name.

    markdown: {
        hooks: {
            onBrokenMarkdownLinks: 'warn',
            onBrokenMarkdownImages: 'throw',
        },
    },

    // Even if you don't use internalization, you can use this field to set useful
    // metadata like html lang. For example, if your site is Chinese, you may want
    // to replace "en" with "zh-Hans".
    i18n: {
        defaultLocale: 'en',
        locales: ['en'],
    },

    presets: [
        [
            'classic',
            /** @type {import('@docusaurus/preset-classic').Options} */
            ({
                docs: {
                    routeBasePath: '/',
                    sidebarPath: require.resolve('./sidebars.js'),
                    // Please change this to your repo.
                    // Remove this to remove the "edit this page" links.
                    editUrl: ({ docPath }) => {
                        return `https://holocron.so/github/pr/${organizationName}/${projectName}/master/editor/docs/${docPath}`
                    },
                    sidebarCollapsible: false,
                    versions: {
                        current: {
                            label: 'v2.1.x-dev 🌜',
                            //path: 'docs',
                            banner: 'none',  // none, unreleased, unmaintained
                            //badge: true,  // true, false
                        },
                    },
                },
                theme: {
                    customCss: require.resolve('./src/css/custom.css'),
                },
            }),
        ],
    ],

    themeConfig:
        /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
        ({
            algolia: {
                appId: '28QXXQCY25',
                apiKey: 'be57479272c890c67a6abf7452bdc47d',
                indexName: 'mr-manuelio',
                askAi: '5nWkeRyTo5dR',
                contextualSearch: true,  // default: true
            },
            //
            colorMode: {
                //defaultMode: 'light',
                //disableSwitch: false,
                respectPrefersColorScheme: true,
            },
            // Replace with your project's social card
            image: 'img/docusaurus-social-card.jpg',
            navbar: {
                title: projectName,
                logo: {
                    alt: `${projectName} Logo`,
                    src: 'img/logo.svg',
                },
                items: [{
                        to: '/',
                        activeBasePath: 'docs',
                        label: 'Docs',
                        position: 'left',
                    },
                    {
                        to: '/faq',
                        activeBasePath: 'docs',
                        label: 'FAQ',
                        position: 'left',
                    },
                    {
                        label: 'Changelog',
                        href: `https://github.com/${organizationName}/${projectNameCode}/blob/master/CHANGELOG.md`,
                        position: 'left',
                    },
                    {
                        label: 'GitHub',
                        href: `https://github.com/${organizationName}/${projectNameCode}`,
                        position: 'left',
                    },
                    {
                        label: 'GitHub Issues',
                        href: `https://github.com/${organizationName}/${projectNameCode}/issues?q=is%3Aissue`,
                        position: 'left',
                    },
                    {
                        label: 'GitHub Discussions',
                        href: `https://github.com/${organizationName}/${projectNameCode}/discussions?discussions_q=`,
                        position: 'left',
                    },
                    {
                        type: 'html',
                        position: 'right',
                        value: '<span class="menu__select_driver_version">Select driver version:</span>',
                    },
                    {
                        type: 'docsVersionDropdown',
                        position: 'right',
                        // dropdownItemsAfter: [{to: '/versions', label: 'All versions'}],
                        dropdownActiveClassDisabled: true,
                    },
                ],
            },
            footer: {
                style: 'dark',
                links: [{
                    title: 'Community',
                    items: [{
                            label: 'GitHub',
                            href: `https://github.com/${organizationName}/${projectNameCode}`,
                        },
                        {
                            label: 'GitHub Issues',
                            href: `https://github.com/${organizationName}/${projectNameCode}/issues?q=is%3Aissue`,
                        },
                        {
                            label: 'GitHub Discussions',
                            href: `https://github.com/${organizationName}/${projectNameCode}/discussions?discussions_q=`,
                        },
                    ],
                }],
                copyright: `Copyright © ${new Date().getFullYear()} ${organizationName}`,
            },
            prism: {
                theme: lightCodeTheme,
                darkTheme: darkCodeTheme,
            },
        }),

    scripts: [
        {
            src: `/${projectName}/matomo.js`,
            async: true
        },{
            src: `//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit`,
            async: true
        },
    ],
};

module.exports = config;
