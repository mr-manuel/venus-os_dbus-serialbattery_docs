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

    //onBrokenLinks: 'throw',
    onBrokenLinks: 'throw',
    onBrokenMarkdownLinks: 'throw',

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
                    }/*,
                    {
                        type: 'html',
                        position: 'right',
                        value: '<button id="custom-ask-ai-button">✨ Ask AI</button>',
                    }*/
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
                }, ],
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
        {
            src: "https://widget.kapa.ai/kapa-widget.bundle.js",
            "data-website-id": "3457d215-3ab3-47ea-81d9-e34e67bfc231",
            "data-project-name": "dbus-serialbattery",
            "data-project-color": "#25c2a0",
            "data-project-logo": "https://docs.kapa.ai/img/logo.png",
            "data-consent-required": "false",
            "data-user-analytics-cookie-enabled": "true",
            // "data-consent-screen-title": "Help us improve our AI assistant",
            // "data-consent-screen-disclaimer": "By clicking 'Allow tracking', you consent to anonymous user tracking which helps us improve our service. We don't collect any personally identifiable information.",
            "data-consent-screen-accept-button-text": "Allow tracking",
            "data-consent-screen-reject-button-text": "No, thanks",

            "data-modal-disclaimer": "This is a custom chatbot with access to [this documentation](https://mr-manuel.github.io/venus-os_dbus-serialbattery_docs/), [GitHub Issues](https://github.com/mr-manuel/venus-os_dbus-serialbattery/issues?q=is%3Aissue) and [GitHub Discussions](https://github.com/mr-manuel/venus-os_dbus-serialbattery/discussions?discussions_q=).\n\nIt's still experimental, so be patient with it.",
            "data-modal-example-questions": "How do I get started?,How to troubleshoot?",
            "data-user-analytics-fingerprint-enabled": "true",
            // "data-modal-x-offset": "0",
            // "data-modal-y-offset": "0",
            // "data-modal-with-overlay": "false",
            // "data-modal-inner-flex-direction": "column",
            // "data-modal-inner-justify-content": "end",
            // "data-modal-inner-max-width": "400px",
            // "data-modal-inner-position-left": "auto",
            // "data-modal-inner-position-right": "20px",
            // "data-modal-inner-position-bottom": "calc(2.5rem + 25px)",
            // "data-button-height": "2.5rem",
            // "data-button-width": "2.5rem",
            // "data-button-text": "Ask AI",
            "data-button-position-right": "20px",
            "data-button-position-bottom": "90px",
            // "data-button-position-bottom": "unset",
            // "data-button-position-top": "80px",
            // "data-conversation-button-icons-only": "true",
            // "data-modal-size": "60%",
            // "data-modal-lock-scroll": "false",

            "data-search-mode-enabled": "true",
            "data-search-mode-default": "false",

            "data-modal-override-open-id": "custom-ask-ai-button",
            async: true
        }
    ],
};

module.exports = config;
