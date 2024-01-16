// https://docs.cypress.io/api/introduction/api.html

describe('Home Redirection and Display Test', () => {
  it('Visits the app root url', () => {
    // Visit the root path
    cy.visit('/');

    // Check if the current URL is the login page
    cy.url().should('include', '/login');

    cy.title().should('eq', 'Login — Vue3 Vite Pina Exam');

    // A nav element should exist
    cy.get('nav').should('exist');

    // A [aria-roledescription=logo] element should exist
    cy.get('[aria-roledescription=logo]').should('exist');

    // In the navbar, there should be a home link
    cy.get('nav').contains('Home');

    // In the navbar, there should be a about link
    cy.get('nav').contains('About');

    // In the navbar, there should be a sign up link
    cy.get('nav').should('contain', 'Register');
  });
});
