
describe("Get bookings api test cases", () => {
  let b_id = []
  
  before('creating the bookings for the tests using data driven',()=>{
  
    cy.fixture('bookings_data').then((data)=>{
      data.forEach((data) => {
        cy.createBooking(data).then((booking_id)=>{
        cy.log('Booking ID:', booking_id);
        expect(booking_id).to.not.be.null;
        b_id.push(booking_id)
        })
      })
    })  
      
  })
  after('Deleting the bookings after test case',()=>{

    b_id.forEach((id)=>{
      cy.deleteBooking(id)
    })
  })

  it('Get booking with firstname query parameter', () => {

    // First request to get bookings with firstname
    cy.fixture('bookings_data').then((data)=>{
      cy.request({
        method: 'GET',
        url: `${Cypress.env('BASE_URL')}/booking`,
        qs: {
          firstname: `${data[0].firstname}`,
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
          expect(response.body[0]).to.have.property('bookingid');
          
          // Second request to get booking details by booking ID
          return cy.request({
            method: 'GET',
            url: `${Cypress.env('BASE_URL')}/booking/${response.body[0].bookingid}`,
            headers: {
              'Content-Type': 'application/json',
            },
          });
      }).then((bookingResponse) => {
          //cy.log(JSON.stringify(bookingResponse.body));
          expect(bookingResponse.body.firstname).to.equals(data[0].firstname)
      });
    })
    
  });

  it('Get booking with lastname query parameter', () => {

    // First request to get bookings with lastname
    cy.fixture('bookings_data').then((data)=>{
      cy.request({
        method: 'GET',
        url: `${Cypress.env('BASE_URL')}/booking`,
        qs: {
          lastname:`${data[0].lastname}`, // getting last name from fixture data
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
          expect(response.body[0]).to.have.property('bookingid');
          
          // Second request to get booking details by booking ID
          return cy.request({
            method: 'GET',
            url: `${Cypress.env('BASE_URL')}/booking/${response.body[0].bookingid}`,
            headers: {
              'Content-Type': 'application/json',
            },
          });
      }).then((bookingResponse) => {
          //Verifing the response boday last name is equal to the last name we have searched for
          expect(bookingResponse.body.lastname).to.equals(data[0].lastname)
      });
    })
    
  })

  //Skiping this as this search qs parameter is not working
  it.skip('Get booking with checkin query parameter', () => {

    // First request to get bookings with lastname
    cy.fixture('bookings_data').then((data)=>{
      cy.request({
        method: 'GET',
        url: `${Cypress.env('BASE_URL')}/booking`,
        qs: {
          checkin:`${data[0].bookingdates.checkin}`, // getting last name from fixture data
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
          expect(response.body).to.have.length(2)
          expect(response.body[0]).to.have.property('bookingid');
          expect(response.body[1]).to.have.property('bookingid');
          
          // Second request to get booking details by booking ID
          return cy.request({
            method: 'GET',
            url: `${Cypress.env('BASE_URL')}/booking/${response.body[0].bookingid}`,
            headers: {
              'Content-Type': 'application/json',
            },
          });
      }).then((bookingResponse) => {
          //Verifing the response boday last name is equal to the last name we have searched for
          expect(bookingResponse.body.lastname).to.equals(data[0].lastname)
      });
    })  
  })


  it('Try to get booking with non existance firstname', () => {

    cy.request({
      method: 'GET',
      url: `${Cypress.env('BASE_URL')}/booking`,
      qs: {
        firstname: "shapakatony", // getting last name from fixture data
      },
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((response) => {

        // Assert that the request is successful
        expect(response.status).to.eq(200);
        cy.log(JSON.stringify(response.body));

        // Ensure the response is an array and not empty
        expect(response.body).to.be.an('array').that.is.empty;

    })  
  })


  it('Try to get booking with non existance lastname', () => {

    cy.request({
      method: 'GET',
      url: `${Cypress.env('BASE_URL')}/booking`,
      qs: {
        lastname: "shapakatony", // getting last name from fixture data
      },
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((response) => {
        // Assert that the request is successful
        expect(response.status).to.eq(200);
        cy.log(JSON.stringify(response.body));

        // Ensure the response is an array and not empty
        expect(response.body).to.be.an('array').that.is.empty;

    })  
  })

  it('Get booking with multiple correct query parameter', () => {

    // First request to get bookings with firstname
    cy.fixture('bookings_data').then((data)=>{
      cy.request({
        method: 'GET',
        url: `${Cypress.env('BASE_URL')}/booking`,
        qs: {
          firstname: `${data[0].firstname}`,
          lastname: `${data[0].lastname}`
        },
        headers: {
          'Content-Type': 'application/json',
        },
      }).then((response) => {
          // Assert that the request is successful
          expect(response.status).to.eq(200);
          cy.log("This is the response body =  ",  JSON.stringify(response.body));

          // Ensure the response is an array and not empty
          expect(response.body).to.be.an('array').that.is.not.empty;
          expect(response.body[0]).to.have.property('bookingid');
          
          // Second request to get booking details by booking ID
          return cy.request({
            method: 'GET',
            url: `${Cypress.env('BASE_URL')}/booking/${response.body[0].bookingid}`,
            headers: {
              'Content-Type': 'application/json',
            },
          });
      }).then((bookingResponse) => {
          //cy.log(JSON.stringify(bookingResponse.body));
          expect(bookingResponse.body.firstname).to.equals(data[0].firstname)
      });
    })  
  });


  it('Try to get booking with one correct and one wrong qs parameter', () => {
    cy.fixture('bookings_data').then((data)=>{
      cy.request({
        method: 'GET',
        url: `${Cypress.env('BASE_URL')}/booking`,
        qs: {
          firstname: `${data[0].firstname}`,
          lastname: "test"
        },
        headers: {
          'Content-Type': 'application/json',
        },
      }).then((response) => {
          // Assert that the request is successful
          expect(response.status).to.eq(200);
          cy.log(JSON.stringify(response.body));

          // Ensure the response is an array and not empty
          expect(response.body).to.be.an('array').that.is.empty;
      })  
    })  
  })
}) 

