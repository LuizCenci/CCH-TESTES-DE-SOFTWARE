const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://www.saucedemo.com", // opcional, mas ajuda muito
    screenshotOnRunFailure: true,         // garante prints
    video: true,                          // garante vídeos
    setupNodeEvents(on, config) {
      // listeners se você quiser adicionar futuramente
    },
  },
});
