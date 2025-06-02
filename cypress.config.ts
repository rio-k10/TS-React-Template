import { defineConfig } from "cypress";
import dotenv from "dotenv";
dotenv.config();

export default defineConfig({
  e2e: {
    baseUrl: `http://localhost:${process.env.VITE_PORT}`,
    setupNodeEvents() {
      // implement node event listeners here
    },
  },
});
