describe('404 Page has correct routing functionality', () => {
    it('When logged out, should route to login on invalid route', () => {
        cy.visit('/thisisnotvalid');
        cy.url().should('include', '/login');
    });

    it('When logged in, non valid routes route to /oops', () => {
        cy.login();
        cy.visit('/whatareyoudoing');
        cy.url().should('include', '/oops');
        cy.visit('/123789574398543');
        cy.url().should('include', '/oops');
        cy.visit('/welcome to certn industries');
        cy.url().should('include', '/oops');
        cy.visit('/Lebron_is_the_GOAT');
        cy.url().should('include', '/oops');
    });
});

describe('404 page has correct functionality', () => {
    it('404 page has Certn logo and button back to search page', () => {
        cy.login();
        cy.visit('/oops');
        cy.get('#404body > img').should('exist');
        cy.get('#404body a[href="/search"]').click();
        cy.url().should('include', '/search');
    });
});
