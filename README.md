# dbus-serialbattery documentation

This documentation is built using [Docusaurus 3](https://docusaurus.io/), a modern static website generator.

It can be found at https://mr-manuel.github.io/venus-os_dbus-serialbattery_docs.

## Contribution

To contribute to this documentation you have to fork this repository, add or edit the content in the `docs` folder and then open a pull request to merge your changes.

## Local Development

This command installs all missing dependencies:

```bash
yarn
```

### Build

This command generates static content into the `build` directory and can be served using any static contents hosting service:

```bash
yarn build
```

### Start local server

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server:

```bash
npm run serve
```

OR

```bash
yarn start
```

but with `yarn` not everything seems to work.

## Create a new documentation version

This command creates a new version of the documentation. This allows to match the documentation always to the current version of the driver.

```bash
yarn docusaurus docs:version v1.6.20250131
```

For more informations see https://docusaurus.io/docs/versioning.

### Upgrade Docusaurus to the latest version

This command updates Docusaurus to the latest version:

```bash
yarn upgrade @docusaurus/core@latest @docusaurus/preset-classic@latest
```

## Possible problems and resolutions

### `yarn` command not found

Install it by executing this command:

```bash
npm install --global yarn
```

### `npm` command not found

Download and install it from [nodejs.org](https://nodejs.org/en).
