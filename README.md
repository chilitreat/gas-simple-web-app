# gas-simple-web-app

Template repository for creating simple web apps in GAS

## Features

- TypeScript
- pnpm
- Clasp
- esbuild
- esbuild-plugin-gas
- vitest

## Requirement

- pnpm
- Node.js v20~

## Usage

1. git clone (or gh repo clone)
2. npx clasp login
3. npx clasp create --rootDir ./dist
4. Write your code in `src` directory
5. mkdir dist && mv appsscript.json.example dist/appsscript.json
6. pnpm run deploy
7. pnpm run open
8. Create a new deployment on GAS editor
9. Done!
