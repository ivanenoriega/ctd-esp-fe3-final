/// <reference types="cypress"/>

describe("open form successfully", () => {
    beforeEach(() => {
      cy.visit("http://localhost:3000");
    });
  
    it("should open form successfully", () => {
      cy.get(
        ":nth-child(4) > .MuiPaper-root > .MuiCardActions-root > .MuiButton-contained"
      ).click();
      cy.contains("Formulario de compra").should("be.visible");
    });
    it("should send form successfully", () => {
      cy.get(
        ":nth-child(4) > .MuiPaper-root > .MuiCardActions-root > .MuiButton-contained"
      ).click();
      //personal form
      cy.get('input[name="firstName"]').type("jesica");
      cy.get('input[name="lastName"]').type("Muñoz");
      cy.get('input[name="email"]').type("jesy@gmail.com");
      cy.wait(2000);
      cy.get("button").contains("Siguiente").click();
  
      //address form
      cy.get('input[name="address"]').type("Corrientes 680");
      cy.get('input[name="department"]').type("2");
      cy.get('input[name="province"]').type("Buenos Aires");
      cy.get('input[name="city"]').type("CABA");
      cy.get('input[name="postalCode"]').type("1427");
      cy.wait(2000);
      cy.get("button").contains("Siguiente").click();
  
      //payment form
      cy.get('input[name="number"]').type("4242424242424242");
      cy.get('input[name="name"]').type("jesica M");
      cy.get('input[name="expiry"]').type("12/24");
      cy.get('input[name="cvc"]').type("123");
      cy.wait(2000);
      cy.get("button").contains("Enviar").click();
  
      //Confirmación compra
      cy.contains("¡Que disfrutes tu compra!").should("be.visible");
    });
    it("should not send form, invalid credit card", () => {
      cy.get(
        ":nth-child(4) > .MuiPaper-root > .MuiCardActions-root > .MuiButton-contained"
      ).click();
      //personal form
      cy.get('input[name="firstName"]').type("jesica");
      cy.get('input[name="lastName"]').type("Muñoz");
      cy.get('input[name="email"]').type("jesy@gmail.com");
      cy.wait(2000);
      cy.get("button").contains("Siguiente").click();
  
      //address form
      cy.get('input[name="address"]').type("Corrientes 680");
      cy.get('input[name="department"]').type("2");
      cy.get('input[name="province"]').type("Buenos Aires");
      cy.get('input[name="city"]').type("CABA");
      cy.get('input[name="postalCode"]').type("1427");
      cy.wait(2000);
      cy.get("button").contains("Siguiente").click();
  
      //payment form
      cy.get('input[name="number"]').type("4141414141414141");
      cy.get('input[name="name"]').type("jesica M");
      cy.get('input[name="expiry"]').type("12/24");
      cy.get('input[name="cvc"]').type("123");
      cy.wait(2000);
      cy.get("button").contains("Enviar").click();
  
      //Confirmación compra
      cy.contains(
        "The card data is not valid. Please review your data and submit it again"
      ).should("be.visible");
    });
  });
  