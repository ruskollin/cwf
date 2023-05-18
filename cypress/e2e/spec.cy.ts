const link = "http://localhost:3000"

describe("Testing the menu and navigation", () => {
  beforeEach(() => {
    cy.visit(link)
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
    cy.visit(link)
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
    cy.visit(link)
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
    cy.visit(link)
      .get(".bm-burger-button")
      .click()
      .get(".menu-item")
      .contains("ADD A STATION")
      .click();
  });

it("should add a new station when the ADD button is clicked", () => {
  cy.get('[data-testid="nameStation"]')
    .type("Newly Added Stop")
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

  it("should not add a new station when station name is empty", () => {
    cy.get('[data-testid="address"]')
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
      .get(".missingFieldDiv")
      .contains("Please check that all fields are complete.")
  });
});

describe("Testing ADD JOURNEY page", () => {
  beforeEach(() => {
    cy.visit(link)
      .get(".bm-burger-button")
      .click()
      .get(".menu-item")
      .contains("ADD A JOURNEY")
      .click();
  });

    it("should add a new journey", () => {
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

  it("should not add a new journey if Departure Station is empty", () => {
    cy.get(".returnStation")
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
      .get(".missingFieldsDiv")
      .contains("Please check that all fields are complete.");
  });

  it("should not add a new journey if end time is before start time", () => {
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
      .click(100, 80)
      .get(".MuiButtonBase-root")
      .contains("OK")
      .click()
      .get(".datepicker2")
      .click()
      .get(".MuiButtonBase-root")
      .contains("15")
      .click()
      .get(".MuiClock-squareMask")
      .click(120, 180)
      .get(".MuiButtonBase-root")
      .contains("OK")
      .click()
      .get(".addButton")
      .click()
      .get(".errorBox")
      .contains("Please check that the end time is not before the start time.");
  });

  it("should not add a new journey if distance is less than 0.01 kms", () => {
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
      .type("0.001")
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
      .get(".errorBox")
      .contains("Please check that the duration(more than 0.16) and distance(more than 0.01) are correct.");
  });
  
  it("should not add a new journey if distance is not a number/ valid input", () => {
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
      .type("fff100")
      .get('[data-testid="duration"]')
      .type("10")
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
      .get(".errorBox")
      .contains("Please check that the duration(more than 0.16) and distance(more than 0.01) are correct.");
  });

  it("should not add a new journey if distance is not a positive integer", () => {
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
      .type("-1")
      .get('[data-testid="duration"]')
      .type("10")
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
      .get(".errorBox")
      .contains("Please check that the duration(more than 0.16) and distance(more than 0.01) are correct.");
  });


  it("should not add a new journey if duration is less than 0.16 mins", () => {
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
      .type("2")
      .get('[data-testid="duration"]')
      .type("0.15")
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
      .get(".errorBox")
      .contains("Please check that the duration(more than 0.16) and distance(more than 0.01) are correct.");
  });

  it("should not add a new journey if duration is not a number/ valid input", () => {
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
      .type("2")
      .get('[data-testid="duration"]')
      .type("fff100")
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
      .get(".errorBox")
      .contains("Please check that the duration(more than 0.16) and distance(more than 0.01) are correct.");
  });

  it("should not add a new journey if distance is not a positive integer", () => {
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
      .type("2")
      .get('[data-testid="duration"]')
      .type("-1")
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
      .get(".errorBox")
      .contains("Please check that the duration(more than 0.16) and distance(more than 0.01) are correct.");
  });
});
