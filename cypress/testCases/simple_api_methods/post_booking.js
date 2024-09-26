describe('',()=>{

    let booking =[]
    after('Deleting the bookings after test case',()=>{

        booking.forEach((id)=>{
          cy.deleteBooking(id)
        })
      })
    // Case 1 valid data
    it('creating a booking and verifing the response',()=>{
        cy.fixture('bookings_data').then((data)=>{
        cy.request({
            method: 'POST',
            url: `${Cypress.env('BASE_URL')}/booking`,
            body: data[0],  // Accept data passed from the test
            headers: {
            'Content-Type': 'application/json',
            },
        }).then((response) => {
            // Log the booking ID for debugging purposes
            cy.log(response.body.bookingid);
            
            // Assert that the status code is 200
            expect(response.status).to.eq(200);

            // Assert that the body is not null
            expect(response.body).to.not.be.null;

            // Assert the booking id
            expect(response.body).to.have.property('bookingid');

            // Assert the booking details
            expect(response.body.booking).to.have.include({
                firstname: "Ghayur",
                lastname: "Irfan",
                totalprice: 5000,
                depositpaid: true,
                additionalneeds: "Breakfast"
            });

      // Assert the booking dates
      expect(response.body.booking.bookingdates).to.include({
        checkin: "2025-01-01",
        checkout: "3040-01-01"
      });
      
      // Optionally, log the entire response for debugging purposes
      cy.log(JSON.stringify(response.body));
           
        });
    })
    })

    // As the APIs are demo APIs for practice the errors are not handled properly to it will fail rest cases

    // Case 2 with first name missing
    it('Should fail when firstname is missing', () => {
        cy.request({
          method: 'POST',
          url: `${Cypress.env('BASE_URL')}/booking`,
          failOnStatusCode: false,  // Prevent Cypress from failing on a 4xx status
          headers: {
            'Content-Type': 'application/json',
            },
          body: {
            
            lastname: "Irfan",
            totalprice: 5000,
            depositpaid: true,
            bookingdates: {
              checkin: "2025-01-01",
              checkout: "2025-01-07"
            }
          }
        }).then((response) => {
            // should be 400 but api is giving wrong to test will fail
          expect(response.status).to.eq(400);
          expect(response.body).to.have.property('error', 'Bad request');
        });
      });
      // Test Case 3: Missing lastname
  it('Should fail when lastname is missing', () => {
    cy.request({
      method: 'POST',
      url: `${Cypress.env('BASE_URL')}/booking`,
      failOnStatusCode: false,
      headers: {
        'Content-Type': 'application/json',
      },
      body: {
        firstname: "Ghayur",
        totalprice: 5000,
        depositpaid: true,
        bookingdates: {
          checkin: "2025-01-01",
          checkout: "2025-01-07"
        }
      }
    }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body).to.have.property('error', 'Bad request');
    });
  });

  // Test Case 4: Invalid date format
  it('Should fail with invalid date format', () => {
    cy.request({
      method: 'POST',
      url: `${Cypress.env('BASE_URL')}/booking`,
      failOnStatusCode: false,
      headers: {
        'Content-Type': 'application/json',
      },
      body: {
        firstname: "Ghayur",
        lastname: "Irfan",
        totalprice: 5000,
        depositpaid: true,
        bookingdates: {
          checkin: "01-01-2025", // Invalid format
          checkout: "07-01-2025"  // Invalid format
        }
      }
    }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body).to.have.property('error', 'Bad request');
    });
  });

  // Test Case 5: Missing bookingdates
  it('Should fail when bookingdates is missing', () => {
    cy.request({
      method: 'POST',
      url: `${Cypress.env('BASE_URL')}/booking`,
      failOnStatusCode: false,
      headers: {
        'Content-Type': 'application/json',
      },
      body: {
        firstname: "Ghayur",
        lastname: "Irfan",
        totalprice: 5000,
        depositpaid: true
      }
    }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body).to.have.property('error', 'Bad request');
    });
  });

  // Test Case 6: checkout date before checkin date
  it('Should fail when checkout date is before checkin date', () => {
    cy.request({
      method: 'POST',
      url: `${Cypress.env('BASE_URL')}/booking`,
      failOnStatusCode: false,
      headers: {
        'Content-Type': 'application/json',
      },
      body: {
        firstname: "Ghayur",
        lastname: "Irfan",
        totalprice: 5000,
        depositpaid: true,
        bookingdates: {
          checkin: "2025-01-07",
          checkout: "2025-01-01"
        }
      }
    }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body).to.have.property('error', 'Invalid date range');
    });
  });

  // Test Case 7: Missing totalprice
  it('Should fail when totalprice is missing', () => {
    cy.request({
      method: 'POST',
      url: `${Cypress.env('BASE_URL')}/booking`,
      failOnStatusCode: false,
      headers: {
        'Content-Type': 'application/json',
      },
      body: {
        firstname: "Ghayur",
        lastname: "Irfan",
        depositpaid: true,
        bookingdates: {
          checkin: "2025-01-01",
          checkout: "2025-01-07"
        }
      }
    }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body).to.have.property('error', 'Bad request');
    });
  });

  // Test Case 8: Invalid totalprice (string instead of number)
  it('Should fail when totalprice is a string', () => {
    cy.request({
      method: 'POST',
      url: `${Cypress.env('BASE_URL')}/booking`,
      failOnStatusCode: false,
      headers: {
        'Content-Type': 'application/json',
      },
      body: {
        firstname: "Ghayur",
        lastname: "Irfan",
        totalprice: "Five Thousand", // Invalid data type
        depositpaid: true,
        bookingdates: {
          checkin: "2025-01-01",
          checkout: "2025-01-07"
        }
      }
    }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body).to.have.property('error', 'Invalid data type');
    });
  });

  // Test Case 9: Missing all required fields
  it('Should fail when all required fields are missing', () => {
    cy.request({
      method: 'POST',
      url: `${Cypress.env('BASE_URL')}/booking`,
      failOnStatusCode: false,
      headers: {
        'Content-Type': 'application/json',
      },
      body: {}
    }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body).to.have.property('error', 'Bad request');
    });
  });

  // Test Case 10: Exceeding character limit in firstname
  it('Should fail when firstname exceeds character limit', () => {
    cy.request({
      method: 'POST',
      url: `${Cypress.env('BASE_URL')}/booking`,
      failOnStatusCode: false,
      headers: {
        'Content-Type': 'application/json',
      },
      body: {
        firstname: "Ghayur".repeat(100), // Exceeding limit
        lastname: "Irfan",
        totalprice: 5000,
        depositpaid: true,
        bookingdates: {
          checkin: "2025-01-01",
          checkout: "2025-01-07"
        }
      }
    }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body).to.have.property('error', 'Firstname exceeds character limit');
    });
  });
})