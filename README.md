# Description

Support Tool built for Certn by UVic Seng 499 students.

## How to run (locally)

-   Ensure Nodejs is installed with a version of atleast 14+. You can check with `node -v`. If you need to update your version you can find a download link [here](https://nodejs.org/en/download/)

-   Ensure you have npm installed with a version of atleast 7+. You can check with `npm -v`. If not, follow the instructions [here](https://docs.npmjs.com/try-the-latest-stable-version-of-npm).
    -   If you are using windows, this [tool](https://github.com/felixrieseberg/npm-windows-upgrade) might be useful
-   Clone the repo and run the following commands to begin developing:

    1. `npm ci` - Installs all necessary dependencies
    2. `npm start` - Starts the app on port 3000

-   A full list of the npm scripts which can be run on this project can be found in the `package.json` file of the project.

## Git Standards

### Branch standards

-   Keep each branch limited to solve single ticket, or add single feature.
-   Name branch as `{ticket ID}-{short description}`
    -   e.g. `26-pr-template`

### Git commit standards

-   Keep messages short (under 50 chars) but descriptive.
-   Commit as logical units rather than with every file change.

## Certn API

-   **Team Expert(s): Kelvin & Keegan**

    There are two sections of the Certn API: 'Property Management' and 'Human Resources'. As of yet, we have no requirements that pertain to the 'Property Management' functionality: our domain is entirely concerning Human Resources, which deals with applicant background checks:
    https://docs.certn.co/#tag/Human-Resources
    https://docs.certn.co/#section/Services

    _Our two major API POST endpoints are:_

    *https://demo-api.certn.co/hr/v1/applications/invite/*
    When you don't know the applicant, and want to 'invite' them by email to participate in a background check- thus none of their information is needed to be filled out, and the body of an invite can be as simple as:
    {
    request_softcheck: true,
    email: 'test@certn.co',
    });

    *https://demo-api.certn.co/hr/v1/applications/quick/*
    When you do know the applicant, and want to fill our their application for them. Will require more detailed to be filled out in order to pass.

    So far, we have the following checks written out:

    -   Softcheck
    -   Equifax (credit check)

    Our goal is to implement all 24 checks available in the API. All of these checks follow the same simple JSON formatting and only require the use of a boolean flag to indicate that a certain check is being requested. Some checks require preliminary data to be provided (credit check requires SSN). Others require other checks to be completed beforehand in order to be authorized.

    Importing and calling the function useToken() within the Certn-Api/index.tsx file returns your session key upon valid login entry. This can be used to issue check requests to the API and is structured:

    "Token (SESSION KEY)"

    _Our major API GET endpoints are:_
    *https://demo-api.certn.co/hr/v1/applications/?adjudication_status!=ARCHIVED&ordering=created*
    Gets the entire list of archived applicants currently in the database.

    *https://demo-api.certn.co/hr/v1/applicants/{applicant_id}/*
    Gets an applicant's information given their ID.

## Notable Packages

### ESLint and Prettier

-   **Team Expert(s): Reed**
-   ESLint and Prettier are tools for maintaining code standards throughout this project.
-   To integrate prettier and ESLint with VSCode, install the ESLint and Prettier VSCode extensions.
    -   [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
    -   [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
-   Once the extensions have been installed, you need to enable Auto Formatting on Save
    -   Click Settings button in bottom left in VSCode (Gear -> Settings)
    -   Text Editor Dropdown -> Formatting -> Format on Save

```
npm run lint            # runs the linter in the src/ directory looking for issues

npm run lint:fix        # runs the linter in the src/ directory and fixes any issues it can

npm run prettier:check  # runs prettier in the entire repo checking that all files meet formatting standards

npm run prettier:fix    # runs prettier in the entire repo and fixes any formatting issues
```

### Husky Precommit Hooks

-   **Team Expert(s): Reed**
-   Husky is a package we have installed which can trigger commands/scripts to be run after a developer sends a commit message off. If that command suceeds then the commit goes through, but if the command fails then so too does the commit.
-   The various hooks which can be added are stored in the `/.husky` directory. Existing hooks can be edited and removed by going into the specific hook file (`/.husky/pre-commit` for example) and editing the text. New commands can also be added this way.

### React Router

-   **Team Expert(s): Conor and Kelvin**
-   React Router provides a way to easily navigate between pages. Docs can be found [here](https://reactrouter.com/web/guides/quick-start)
-   See App.tsx for examples on how routing is done.
-   For each page/component, wrap the component in a `<Route>` and within the Route, list the component name and the desired URL ending.
-   Example:

```
<Route path="/login" component={Login} />
```

-   The above example will place the Login component at the URL `{base_url}/login`.
-   To navigate between pages, use `history.push('/dashboard')`. Docs on the use of history can be found [here](https://reactrouter.com/web/api/history)

### Cypress Testing

-   **Team Expert(s): Reed**
-   Cypress is an automated testing tool that has been installed in the repo to faciliate the testing of this application.
-   Cypress makes use of common testing patterns used by other popular testing frameworks, such as Mocha, Chai, and others.
-   To run cypress, enter `npm run cypress`
-   Check our their [documentation](https://docs.cypress.io/guides/overview/why-cypress) to learn more

### Typescript

-   **Team Expert(s): Conor, Keegan, Kelvin, and Reed**
-   This project uses Typescript, which can sometimes be an extra burden on top of JS which is difficult to learn. This project has linting support for Typescript built in, and this should be relied on to help ensure correct Typescript syntax.
-   Docs for typescript can be found [here](https://www.typescriptlang.org/docs/)

### AntD

-   **Team Expert(s): Conor**
-   AntD provides pre-built react components that can be imported to each file and used throughout.
-   Be sure to read the [docs](https://ant.design/components/overview/) for each component that you plan to use so that you know all of the props that are available to use on that specific component.
-   The AntD components have a default style that does not match the Certn theme. To style the components to match the Certn theme, use Styled Components. For examples, see `LoginSC.tsx`
-   Usage:

```
    import { Button } from 'antd';

    export const Demo = (): JSX.Element => {

        const doSomething = () => {
            <fun code>
        }

        return (
            <div>
                <Button size='large' onClick={() => doSomething()}>
                    Click Me!
                </Button>
            </div>
        );
    };
```

### Styled Components

-   **Team Expert(s): Conor**
-   Styled components is a library which allows for the creation of unique React components with CSS styling built in on a component by component basis. Read the basics [here](https://styled-components.com/).
-   Styled components also provides an option to use a custom theme. In the case of this project, the theme provided by Certn in the figma doc has been imported into the `Theme` folder. To access the project theme, see the Usage below and note the use of props.
-   To see examples of styled components in use refer to `LoginSC.tsx`
-   Usage:

1. Standard html element (Important to notice the backticks):

```
        export const StyledDiv = styled.div`
            background: ${(props) => props.theme.color.green.default};
            border-color: ${(props) => props.theme.color.green.default};
        `;
```

2. AntD Component:

```
        import { Button } from 'antd';

        export const StyledButton = styled(Button)`
            width: 100%;
            background: ${(props) => props.theme.color.green.default};
            border-color: ${(props) => props.theme.color.green.default};
            :hover {
                background: ${(props) => props.theme.color.green[400]};
                border-color: ${(props) => props.theme.color.green[400]};
            }
        `;
```

## Useful Resources

-   If you find any good resources, whether it is tutorials, stackoverflow pages, etc, feel free to leave the links here

## Common Bugs

-   If you're having issues with errors related to `some node modules is missing`, a good trick to fixing this is to delete the `node_modules` folder and the `package-lock.json` file and then run

```
npm install && npm start
```

-   `npm ci` is also a useful tool and will run a clean install, however there must be a `package-lock.json` file existing for this commanto work

-   If you're seeing issues related to `chokidar` being the incorrect version, try running an `npm update` to see if that fixes the problem.
