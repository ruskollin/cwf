// describe("Stations and journeys manu", () => {
//   beforeEach(() => {
//     cy.visit("http://localhost:3000")
//   })

//   it("can open the front page", () =>
//     cy.contains("Hi!"));

//   it("can open the menu bar", () =>
//     cy.get(".bm-burger-button")
//       .click()
//       .get(".bm-menu")
//       .should("be.visible"));

//   it("can navigate to the homepage from the menu", () =>
//     cy.get(".bm-burger-button")
//       .click()
//       .get(".menu-item")
//       .contains("HOMEPAGE")
//       .click());

//   it("can navigate to the stations page from the menu", () => {
//     cy.get(".bm-burger-button")
//       .click()
//       .get(".menu-item")
//       .contains("STATIONS")
//       .click();
//       cy.wait(500);
//     cy.get(".MuiDataGrid-root").should("be.visible").contains("Name");
//   });

//   it("can navigate to the stations page from the menu and click add button to show list", () => {
//     cy.get(".bm-burger-button")
//       .click()
//       .get(".menu-item")
//       .contains("STATIONS")
//       .click()
//       cy.get(".addStationButton").click()
//       cy.contains("label", "Station Name")
//   });
// });

// describe('Adding a new station', () => {
//   beforeEach(() => {
//     cy.visit("http://localhost:3000")
//     .get(".bm-burger-button")
//       .click()
//       .get(".menu-item")
//       .contains("STATIONS")
//       .click()
//     cy.get(".addStationButton").click()
//   })

//   it('should add a new station when the ADD button is clicked', () => {
//     cy.get('[data-testid="nameStation"]').type('Taylor Swift Stop')
//     cy.get('[data-testid="address"]').type('Leppävaara 22')
//     cy.get('[data-testid="city"]').type('Espoo')
//     cy.get('[data-testid="operator"]').type('Kaupunki')
//     cy.get('[data-testid="capacity"]').type('22')
//     cy.get('[data-testid="xMap"]').type('22')
//     cy.get('[data-testid="yMap"]').type('22')

//     cy.contains("button", "Add").click();

//     cy.contains("Good job! Successfully added the station!")
//   })
// })





