const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    env: {
      BASE_URL: 'https://restful-booker.herokuapp.com',
      test: 'testing'
    },
    specPattern: 'cypress/testCases/*/*.js',
    baseUrl: 'https://restful-booker.herokuapp.com'
  },
});
