describe('Test all columns are there', () => {
    it('Check that all the column are there and named correctly', () => {
        cy.clearCookies();
        cy.visit('/');
        cy.url().should('include', '/login');
        cy.get('#login_email').type('certn.test.bot@gmail.com');
        cy.get('#login_password').type('Seng499!!!');
        cy.contains('', 'Log in').click();
        cy.url().should('include', '/search');
        cy.contains('Email').should('exist');
        cy.contains('First Name').should('exist');
        cy.contains('Last Name').should('exist');
        cy.contains('Phone').should('exist');
        cy.contains('Created').should('exist');
        cy.contains('Updated').should('exist');
        cy.contains('Status').should('exist');
        cy.contains('Ordered By').should('exist');
        cy.contains('Team').should('exist');
    });
});
