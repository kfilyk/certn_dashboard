# Description

Support Tool built for Certn by UVic Seng 499 students.

## How to run (locally)

-   Ensure you have npm installed `npm -v`. If not, follow the instructions [here](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm).
-   Once npm is installed, run the following commands:
    1. `npm install` - Installs all necessary dependencies
    2. `npm start` - Starts the app on port 3000

### Husky Precommit Hooks

-   Husky is a package we have installed which can trigger commands/scripts to be run after a developer sends a commit message off. If that command suceeds then the commit goes through, but if the command fails then so too does the commit.
-   The various hooks which can be added are stored in the `/.husky` directory. Existing hooks can be edited and removed by going into the specific hook file (`/.husky/pre-commit` for example) and editing the text. New commands can also be added this way.
-   New commands can also be added from the command line using

```
npx husky add .husky/<name-of-hook> "<script to run>"
```

For example:

```
npx husky add .husky/pre-commit "npm run test"
```

### ESLint and Prettier

-   ESLint and Prettier are tools for maintaining code standards throughout this project.
-   It is HIGHLY recommended to integrate prettier with your code editor of choice so that it formats on save. More information can be found here https://prettier.io/docs/en/editors.html
-   There are a few scripts set up to run ESLint and Prettier manually
-   If you are having any issues with ESLint or Prettier, reach out to @rmcilwain6 (Reed)

```
npm run lint            # runs the linter in the src/ directory looking for issues

npm run lint:fix        # runs the linter in the src/ directory and fixes any issues it can

npm run prettier:check  # runs prettier in the entire repo checking that all files meet formatting standards

npm run prettier:fix    # runs prettier in the entire repo and fixes any formatting issues
```

## Branch standards

-   Keep each branch limited to solve single ticket, or add single feature.
-   Name branch as `{ticket ID}-{short description}`
    -   e.g. `26-pr-template`

## Git commit standards

-   Keep messages short (under 50 chars) but descriptive.
-   Commit as logical units rather than with every file change.
