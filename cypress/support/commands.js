// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })


Cypress.Commands.add('createBooking', (bookingData) => {
    return cy.request({
      method: 'POST',
      url: `${Cypress.env('BASE_URL')}/booking`,
      body: bookingData,  // Accept data passed from the test
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((response) => {
      // Log the booking ID for debugging purposes
      cy.log(response.body.bookingid);
  
      // Return the booking ID
      return cy.wrap(response.body.bookingid)
    });
  });

Cypress.Commands.add('deleteBooking', (bookingId) => {
    return cy.request({
      method: 'DELETE',
      url: `${Cypress.env('BASE_URL')}/booking/${bookingId}`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic YWRtaW46cGFzc3dvcmQxMjM='
      },
    }).then((response) => {
      // Assert that the response status is as expected (201)
      expect(response.status).to.be.equal(201);
      
      // Optionally return the response for further assertions if needed
      return cy.wrap(response);
    });
  });