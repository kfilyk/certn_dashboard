# Description

Support Tool built for Certn by UVic SENG499 students in the Summer of 2021. Functionality includes:

-   The ability to easily search and retrieve applications.
-   Modification of contact email address for an application.
-   Performing common actions on an application for the associated applicant:
    -   Sending/resending an onboarding link.
    -   Sending a link to the applicant's generated Certn report.
    -   Sending/resending consent documents.

Currently, this tool uses mock endpoints for functionality like sending documents, which will have to be updated for full interagration.

## How to run (locally)

-   Ensure Node.js is installed with a version of atleast 14+. You can check with `node -v`. If you need to update your version, you can find a download link [here](https://nodejs.org/en/download/)

-   Ensure you have npm installed with a version of atleast 7+. You can check with `npm -v`. If not, follow the instructions [here](https://docs.npmjs.com/try-the-latest-stable-version-of-npm).
    -   If you are using windows, this [tool](https://github.com/felixrieseberg/npm-windows-upgrade) might be useful
-   Clone the repo and run the following commands to begin developing:

    1. `npm ci` - Installs all necessary dependencies
    2. `npm start` - Starts the app on port 3000

-   A full list of the npm scripts which can be run on this project can be found in the `package.json` file of the project.

## How to Test

This project uses [Cypress](https://www.cypress.io/) to test the front-end operations.

If you want to just test the service, and _don't_ have an instance runing locally use:

`npm test`

This will start the local service, run all tests against it, and then shut the local service down. The results of the tests will be placed on the cli.

If you already have the service running (e.g. you have run `npm start` beforehand):

1. `npm run cy:run` - Runs tests without the Cypress ui, returns results to the cli.
2. `npm run cy:open` - Runs the Cypress app itself, which will allow you to see the tests visually in action.

If you're just doing tests before commiting, `npm run cy:run` should be enough to ensure you haven't broken anything. If you want to find what's breaking, or are making new tests for new features, `npm run cy:open` will be the better option. Either option will require multiple terminal instances.

## Adding Components

To add components to the app, typescript code can be written under a relevent subdirectory in the `components` directory. Styling should be done via a tsx file in the the same subdirectory, using the filename convention `<component name>SC.tsx`. Current code standards have one component file should contain one major element and related subelements. (e.g The search bar and related behaviour is contained to one .tsx file)

## Certn API Usage

_The two major API POST endpoints are:_

*https://demo-api.certn.co/hr/v1/applications/invite/*

When you don't know the applicant, and want to 'invite' them by email to participate in a background check- thus none of their information is needed to be filled out, and the body of an invite can be as simple as:

```
    {
    request_softcheck: true,
    email: 'test@certn.co',
    });
```

_The major API GET endpoints are:_

-   https://demo-api.certn.co/hr/v1/applicants/?adjudication_status!=ARCHIVED&ordering=created

    Gets the entire list of archived applicants currently in the database.

-   https://demo-api.certn.co/hr/v1/applicants/{applicant_id}/

    Gets an applicant's information given their ID.

-   DELETE https://demo-api.certn.co/hr/v1/applicants/<applicant_id>/

    Treat DELETE like a GET request: deletes this applicant from database.

## Notable Packages

Components can be written as tsx files

### ESLint and Prettier

```
npm run lint            # runs the linter in the src/ directory looking for issues

npm run lint:fix        # runs the linter in the src/ directory and fixes any issues it can

npm run prettier:check  # runs prettier in the entire repo checking that all files meet formatting standards

npm run prettier:fix    # runs prettier in the entire repo and fixes any formatting issues
```

### [Husky Precommit Hooks](https://typicode.github.io/husky/)

-   Husky is a package we have installed which can trigger commands/scripts to be run after a developer sends a commit message off. If that command suceeds then the commit goes through, but if the command fails then so too does the commit.
-   The various hooks which can be added are stored in the `/.husky` directory. Existing hooks can be edited and removed by going into the specific hook file (`/.husky/pre-commit` for example) and editing the text. New commands can also be added this way.

### [React Router](https://reactrouter.com/web/guides/quick-start)

-   See App.tsx for examples on how routing is done.
-   For each page/component, wrap the component in a `<Route>` and within the Route, list the component name and the desired URL ending.
-   Example:

```
<Route path="/login" component={Login} />
```

-   The above example will place the Login component at the URL `{base_url}/login`.
-   To navigate between pages, use `history.push('/dashboard')`. Docs on the use of history can be found [here](https://reactrouter.com/web/api/history)

### [Cypress Testing](https://docs.cypress.io/)

### [Typescript](https://www.typescriptlang.org/docs/)

### [AntD](https://ant.design/components/overview/)

-   The AntD components have a default style that does not match the Certn theme. To style the components to match the Certn theme, use Styled Components. For examples, see `LoginSC.tsx`

### [Styled Components](https://styled-components.com/)

-   Styled components also provides an option to use a custom theme. In the case of this project, the Certn styling has been imported into the `Theme` folder.

## Common Bugs

-   If you're having issues with errors related to `some node modules is missing`, a good trick to fixing this is to delete the `node_modules` folder and the `package-lock.json` file and then run

```
npm install && npm start
```

-   `npm ci` is also a useful tool and will run a clean install, however there must be a `package-lock.json` file existing for this commanto work

-   If you're seeing issues related to `chokidar` being the incorrect version, try running an `npm update` to see if that fixes the problem.
