function login() {
    cy.clearCookies();
    cy.visit('/');
    cy.get('#login_email').type('certn.test.bot@gmail.com');
    cy.get('#login_password').type('Seng499!!!');
    cy.contains('', 'Log in').click();
}

describe('Header Bar Navigation', () => {
    before(() => {
        login();
    });

    it('Is on the search page after login', () => {
        cy.url().should('include', '/search');
        cy.get('#navbar a[href="/search"]').should('have.class', 'selected');
        cy.get('#navbar a[href="/dashboard"]').should('not.have.class', 'selected');
    });

    it('Can navigate between pages', () => {
        cy.get('#navbar a[href="/dashboard"]').click();
        cy.url().should('include', '/dashboard');
        cy.get('#navbar a[href="/search"]').click();
        cy.url().should('include', '/search');
    });

    it('Logout Button functions correctly', () => {
        cy.get('#navbar').contains('Log Out').click();
        cy.url().should('include', '/login');
    });
});
