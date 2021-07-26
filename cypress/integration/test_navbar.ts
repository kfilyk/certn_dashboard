describe('Header Bar Navigation', () => {
    before(() => {
        cy.login();
    });

    it('Is on the search page after login', () => {
        cy.url().should('include', '/search');
        cy.get('#navbar a[href="/search"]').should('have.class', 'selected');
    });

    it('Can navigate between pages', () => {
        cy.get('#navbar a[href="/search"]').click();
        cy.url().should('include', '/search');
    });

    it('Logout Button functions correctly', () => {
        cy.get('#navbar').contains('Log Out').click();
        cy.url().should('include', '/login');
    });
});
