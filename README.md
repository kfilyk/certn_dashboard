# Description
Support Tool built for Certn by UVic Seng 499 students.

## How to run (locally)

- Ensure you have npm installed `npm -v`. If not, follow the instructions [here](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm).
- Once npm is installed, run the following commands:
    1. `npm install` - Installs all necessary dependencies
    2. `npm start` - Starts the app on port 3000


### Husky Precommit Hooks

- Husky is a package we have installed which can trigger commands/scripts to be run after a developer sends a commit message off. If that command suceeds then the commit goes through, but if the command fails then so too does the commit. 
- The various hooks which can be added are stored in the `/.husky` directory. Existing hooks can be edited and removed by going into the specific hook file (`/.husky/pre-commit` for example) and editing the text. New commands can also be added this way.
- New commands can also be added from the command line using
```
npx husky add .husky/<name-of-hook> "<script to run>"
```
For example:
```
npx husky add .husky/pre-commit "npm run test"
```