describe('Login Page Loading', () => {
    it('Check page loads on clean load', () => {
        cy.clearCookies();
        cy.visit('/');
        cy.url().should('include', '/login');
    });
    it('Check page loads on attempt to load other page', () => {
        cy.clearCookies();
        cy.visit('/search');
        cy.url().should('include', '/login');
    });
});

describe('Login Error Prompts Testing', () => {
    it('Check blank load deny', () => {
        cy.visit('/search');
        cy.url().should('include', '/login');
        cy.contains('', 'Log in').click();
        cy.url().should('include', '/login');
        cy.get(':nth-child(1) > .ant-col > .ant-form-item-explain > div').contains('Please input your Email!');
        cy.get(':nth-child(2) > .ant-col > .ant-form-item-explain > div').contains('Please input your Password!');
    });
    it('Check entry removes errors', () => {
        cy.get('#login_email').type('fake@example.com');
        cy.get(':nth-child(1) > .ant-col > .ant-form-item-explain > div').should('not.exist');
        cy.get('#login_password').type('wowpassword');
        cy.get(':nth-child(2) > .ant-col > .ant-form-item-explain > div').should('not.exist');
    });
    it('Check removal brings errors back', () => {
        cy.get('#login_email').clear();
        cy.get(':nth-child(1) > .ant-col > .ant-form-item-explain > div').should('exist');
        cy.get('#login_password').clear();
        cy.get(':nth-child(2) > .ant-col > .ant-form-item-explain > div').should('exist');
    });
});

describe('Check deny logins', () => {
    it('Check that nonexistant account returns error', () => {
        cy.clearCookies();
        cy.visit('/');
        cy.url().should('include', '/login');
        cy.get('#login_email').type('fake@example.com');
        cy.get('#login_password').type('wowpassword');
        cy.contains('', 'Log in').click();
        cy.url().should('include', '/login');
        cy.get('.ant-notification-notice').should('exist');
    });
});

describe('Test links', () => {
    it('Check "Create Account" link', () => {
        cy.clearCookies();
        cy.visit('/search');
        // Cypress will error out if we attempt to go outside of the localhost while running
        // therefore we check link address instead
        cy.contains('', 'Create Account').should('have.attr', 'href', 'https://whitelabel.certn.co/welcome/signUp');
    });
    it('Check "Forgot your password" link', () => {
        cy.clearCookies();
        cy.visit('/search');
        // Cypress will error out if we attempt to go outside of the localhost while running
        // therefore we check link address instead
        cy.contains('', 'Forgot your password?').should('have.attr', 'href', 'https://whitelabel.certn.co/forgot');
    });
});
