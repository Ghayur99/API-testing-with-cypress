
describe('Get bookings api test cases', () => {
    let b_id 
    beforeEach('creating the booking for the tests',()=>{
        cy.request({
            method: 'POST',
            url: `${Cypress.env('BASE_URL')}/booking`,
            body: {
                "firstname" : "Ghayur",
                "lastname" : "Ahmad",
                "totalprice" : 5000,
                "depositpaid" : true,
                "bookingdates" : {
                    "checkin" : "2018-01-01",
                    "checkout" : "2019-01-01"
                },
                "additionalneeds" : "Breakfast"
            },
            headers: {
              'Content-Type': 'application/json',
            },
          }).then((response)=>{
            cy.log(response.body.bookingid)
            b_id = response.body.bookingid
          })
        
    })
    afterEach(()=>{
        cy.request({
            method: 'DELETE',
            url: `${Cypress.env('BASE_URL')}/booking/${b_id}`,
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Basic YWRtaW46cGFzc3dvcmQxMjM='
            },
          }).then((response)=>{
            expect(response.status).to.be.equal(201)
          })

    })

    it.only('Booking API with firstname query parameter', () => {
      // First request to get bookings with firstname
      cy.request({
        method: 'GET',
        url: `${Cypress.env('BASE_URL')}/booking`,
        qs: {
          firstname: 'Ghayur',
        },
        headers: {
          'Content-Type': 'application/json',
        },
      }).then((response) => {
        // Assert that the request is successful
        expect(response.status).to.eq(200);
        cy.log(JSON.stringify(response.body));
  
        // Ensure the response is an array and not empty
        expect(response.body).to.be.an('array').that.is.not.empty;
        expect(response.body[0]).to.have.property('bookingid', b_id);
        
        // Second request to get booking details by booking ID
        return cy.request({
          method: 'GET',
          url: `${Cypress.env('BASE_URL')}/booking/${response.body[0].bookingid}`,
          headers: {
            'Content-Type': 'application/json',
          },
        });
      }).then((bookingResponse) => {
        cy.log(JSON.stringify(bookingResponse.body));
        expect(bookingResponse.body.firstname).to.equals('Ghayur')
      });
      
    });
  
});
  