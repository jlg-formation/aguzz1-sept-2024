describe('My First Test', () => {
  it('Visits the initial project page', () => {
    cy.visit('/');
    cy.contains('Gestion Stock');
    cy.contains('a', 'Voir le stock').click();
    cy.get('a[title="Ajouter"]').click();

    const uuid = () => Cypress._.random(0, 1e6);
    const id = uuid();
    const testname = `o-${id}`;

    cy.get('input').eq(0).clear().type(testname);
    cy.get('input').eq(1).clear().type('12');
    cy.get('input').eq(2).clear().type('14');

    cy.contains('button', 'Ajouter').click();

    cy.contains(testname).click();
    cy.get('button[title="Supprimer"]').click();
    cy.contains(testname).should('not.exist');
  });
});
