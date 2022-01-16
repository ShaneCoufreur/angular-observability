describe('My First Test', () => {
  it('Visits the initial project page and Navigates to Demo', () => {
    cy.visit('/');
    cy.contains('Unsere Trainingplatform');
    cy.contains('Demo').click();
    cy.contains('Perform complex Task');
  });

  it('Adds a new Bewertung', () => {
    cy.visit('/trainings');
    cy.get('.content-container').should('have.length', 4);
    cy.contains('Zum Training').click();
    cy.get('form [data-e2e="star5"]').trigger('mouseover').click();
    cy.get('#comment').type('This was good!');
    cy.contains('Absenden').click();
    cy.get('[data-e2e="card-result"]').contains('This was good!');
  });
});
