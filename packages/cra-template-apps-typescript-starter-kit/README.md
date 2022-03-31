# Datadog UI App React TypeScript Starter Kit

This is a [`create-react-app`](https://create-react-app.dev/) [custom template](https://create-react-app.dev/docs/custom-templates) that helps you get started building a Datadog UI App.

## Getting Started

### Using npx

```sh
npx create-react-app starter-kit --template @datadog/apps-typescript-starter-kit
```

### Using npm

```sh
npm init react-app starter-kit --template @datadog/apps-typescript-starter-kit
```

### Using yarn

```sh
yarn create react-app starter-kit --template @datadog/apps-typescript-starter-kit
```

**Note**: This template currently uses v17 of React due to the `peerDependency` that `"@datadog/ui-extensions-react"` has on `17.0.2`; once the relevant `@types/` packages for React and ReactDOM are updated and we can move to v18 across the board, we will.
