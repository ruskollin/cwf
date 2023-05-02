describe("Testing the menu and navigation", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000")
  })

  it("can open the front page", () =>
    cy.contains("Hi!"));

  it("can open the menu bar", () =>
    cy.get(".bm-burger-button")
      .click()
      .get(".bm-menu")
      .should("be.visible"));

  it("can navigate to the homepage from the menu", () =>
    cy.get(".bm-burger-button")
      .click()
      .get(".menu-item")
      .contains("HOMEPAGE")
      .click());

  it("can navigate to the stations page from the menu", () => {
    cy.get(".bm-burger-button")
      .click()
      .get(".menu-item")
      .contains("STATIONS")
      .click();
      cy.wait(500);
    cy.get(".MuiDataGrid-root").should("be.visible").contains("Name");
  });
});

describe("Testing STATION page", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000")
      .get(".bm-burger-button")
      .click()
      .get(".menu-item")
      .contains("STATIONS")
      .click();
  });

  it("should filter stations when the SEARCH button is used", () => {
    cy.get('[data-testid="search"]')
      .type("Sateentie")
      .get(".MuiDataGrid-root")
      .should("be.visible")
      .contains("Sateentie");
  });

  it('should open the info of station when the INFO button is clicked', () => {
    cy.contains('INFO').click()
    .get('.tableStation');
  });

  it("filter by month should show results of calculations from backend", () => {
    cy.contains("INFO")
      .click()
      .get(".filterByMonth")
      .click()
      .get(".buttonListStation")
      //check if all button elements are clicked, multiple could be removed
      .click({ multiple: true })
      .get(".tableStation");
  });

  it("should show map and the marker of each station", () => {
    cy.contains("MAP")
      .click()
      .get(".map-container").should('be.visible')
  });
});

describe("Testing JOURNEYS page", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000")
      .get(".bm-burger-button")
      .click()
      .get(".menu-item")
      .contains("JOURNEYS")
      .click();
  });

  it("should filter journeys when the SEARCH button is used", () => {
    cy.get('[data-testid="search"]')
      .type("Sateentie")
      .get(".MuiDataGrid-root")
      .should("be.visible")
      .contains("Sateentie");
  });
});

describe("Testing ADD STATION page", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000")
      .get(".bm-burger-button")
      .click()
      .get(".menu-item")
      .contains("ADD A STATION")
      .click();
  });

  it("should add a new station when the ADD button is clicked", () => {
    cy.get('[data-testid="nameStation"]')
      .type("Taylor Swift Stop")
      .get('[data-testid="address"]')
      .type("Leppävaara 22")
      .get('[data-testid="city"]')
      .type("Espoo")
      .get('[data-testid="operator"]')
      .type("Kaupunki")
      .get('[data-testid="capacity"]')
      .type("22")
      .get('[data-testid="xMap"]')
      .type("22")
      .get('[data-testid="yMap"]')
      .type("22")
      .get(".addButton")
      .click()
      .get(".successDiv")
      .contains("Good job! Successfully added the station!")
  });
});

describe("Testing ADD JOURNEY page", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000")
      .get(".bm-burger-button")
      .click()
      .get(".menu-item")
      .contains("ADD A JOURNEY")
      .click();
  });

  it("should add a new journey when the ADD button is clicked", () => {
    cy.get(".departureStation")
      .click()
      .get("li")
      .contains("Westendinasema")
      .click()
      .get(".returnStation")
      .click()
      .get("li")
      .contains("Westendinasema")
      .click()
      .get('[data-testid="coveredDistance"]')
      .type("222")
      .get('[data-testid="duration"]')
      .type("222")
      .get(".datepicker1")
      .click()
      .get(".MuiButtonBase-root")
      .contains("15")
      .click()
      .get(".MuiClock-squareMask")
      .click(120, 80)
      .get(".MuiButtonBase-root")
      .contains("OK")
      .click()
      .get(".datepicker2")
      .click()
      .get(".MuiButtonBase-root")
      .contains("15")
      .click()
      .get(".MuiClock-squareMask")
      .click(100, 180)
      .get(".MuiButtonBase-root")
      .contains("OK")
      .click()
      .get(".addButton")
      .click()
      .get(".successDiv")
      .contains("Good job! Successfully added a great journey!");
  });
});
