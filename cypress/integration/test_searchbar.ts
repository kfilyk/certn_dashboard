describe('Test Searchbar is there', () => {
    it('Check page ends on correct page', () => {
        cy.clearCookies();
        cy.visit('/');
        cy.url().should('include', '/login');
        cy.get('#login_email').type('certn.test.bot@gmail.com');
        cy.get('#login_password').type('Seng499!!!');
        cy.contains('', 'Log in').click();
        cy.url().should('include', '/search');
    });
});

describe('Test searchbar basic input', () => {
    it('Check basic search input exists and search button exists', () => {
        cy.clearCookies();
        cy.get('#search_basic').should('exist');
        cy.get('#search_basic').type('test@test.co');
        // eslint-disable-next-line cypress/no-unnecessary-waiting
        cy.wait(400);
        cy.get('.ant-btn-primary').should('exist');
        cy.get('.ant-btn-primary').click();
    });
});

describe('Test searchbar advanced input firstname', () => {
    it('Check advanced button exists, firstname input exists and the Basic button exists', () => {
        cy.contains('Advanced').should('exist');
        cy.contains('Advanced').click();
        cy.contains('Basic').should('exist');
        cy.contains('Basic').click();
        cy.contains('Advanced').should('exist');
        cy.contains('Advanced').click();
        cy.get('#search_firstname').should('exist');
        // eslint-disable-next-line cypress/no-unnecessary-waiting
        cy.wait(400);
        cy.get('#search_firstname').type('Sebastien');
        cy.get('.ant-btn-primary').click();
    });
});

describe('Test searchbar advanced input lastname', () => {
    it('Check lastname search input exists', () => {
        cy.get('#search_lastname').should('exist');
        // eslint-disable-next-line cypress/no-unnecessary-waiting
        cy.wait(400);
        cy.get('#search_lastname').type('last');
        cy.get('.ant-btn-primary').click();
    });
});

describe('Test searchbar advanced input phone', () => {
    it('Check phone search input exists', () => {
        cy.get('#search_phone').should('exist');
        // eslint-disable-next-line cypress/no-unnecessary-waiting
        cy.wait(400);
        cy.get('#search_phone').type('123-456-7890');
        cy.get('.ant-btn-primary').click();
    });
});

describe('Test searchbar advanced input email', () => {
    it('Check email search input exists', () => {
        cy.viewport(1500, 1000);
        cy.get('#search_email').should('exist');
        // eslint-disable-next-line cypress/no-unnecessary-waiting
        cy.wait(400);
        cy.get('#search_email').type('test@test.co');
        cy.get('.ant-btn-primary').click();
    });
});

describe('Check when invalid phone number', () => {
    it('Check to make sure red error pops up under phone input when an incorrect number is put in', () => {
        cy.get('#search_phone').should('exist');
        // eslint-disable-next-line cypress/no-unnecessary-waiting
        cy.wait(400);
        cy.get('#search_phone').clear().type('asd');
        cy.get('.ant-form-item-explain > div').should('exist');
        cy.get('#search_phone').clear();
    });
});

describe('Check when invalid email number', () => {
    it('Check to make sure red error pops up under email input when an incorrect email is put in', () => {
        cy.viewport(1500, 1000);
        cy.get('#search_email').should('exist');
        // eslint-disable-next-line cypress/no-unnecessary-waiting
        cy.wait(400);
        cy.get('#search_email').clear().type('asd');
        cy.get('.ant-form-item-explain > div').should('exist');
    });
});
