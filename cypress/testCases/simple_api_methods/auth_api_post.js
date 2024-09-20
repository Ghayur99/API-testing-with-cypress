
describe('Authentication test cases',()=>{

    it.only('best case valid email password',()=>{

        cy.request({
            method: 'POST',
            url: `${Cypress.config('baseUrl')}/auth`,
            headers: {
              'Content-Type': 'application/json'
            },
            body: {
              "username": "admin",
              "password": "password123"
            }
          }).then((response) => {
            // Assert that the request is successful
            expect(response.status).to.eq(200);
      
            // Extract token from the response body
            let authToken = response.body.token;
      
            // Optionally, set the token in Cypress environment
            Cypress.env('authToken', authToken);
      
            // Assert the token is not null or undefined
            expect(authToken).to.not.be.null;
        })
    })




})