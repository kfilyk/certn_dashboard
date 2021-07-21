/* eslint-disable @typescript-eslint/no-namespace */
export {};

declare global {
    namespace Cypress {
        interface Chainable {
            login: typeof login;
        }
    }
}

function login(email = 'certn.test.bot@gmail.com', password = 'Seng499!!!'): void {
    cy.clearCookies();
    cy.visit('/');
    cy.get('#login_email').type(email);
    cy.get('#login_password').type(password);
    cy.contains('', 'Log in').click();
    cy.url().should('contain', '/search');
}

Cypress.Commands.add('login', login);
