const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://www.saucedemo.com", 
    screenshotOnRunFailure: true,         
    video: true,                          
    setupNodeEvents(on, config) {
      
    },
  },
});
