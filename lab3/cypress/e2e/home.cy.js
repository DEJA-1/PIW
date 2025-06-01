describe("Strona główna", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/");
  });

  it("wyświetla listę książek", () => {
    cy.get(".loader-container", { timeout: 10000 }).should("not.exist");
    cy.get(".list-horizontal").should("have.length.at.least", 1);
  });

  it("filtruje książki po wpisanym tekście", () => {
    cy.get(".loader-container", { timeout: 10000 }).should("not.exist");
    cy.get("input[placeholder*='Szukaj po tytule lub autorze']").type("test", { delay: 50 });
    cy.get(".book-info").should("contain", "test");
  });

  it("filtruje książki po wybranym gatunku", () => {
    cy.get(".loader-container", { timeout: 10000 }).should("not.exist");
    cy.get("select").select("fantasy");
    cy.get(".genre-text").each(($genre) => {
      cy.wrap($genre).should("have.text", "fantasy");
    });
  });
});