import { defineConfig } from "drizzle-kit";
 
export default defineConfig({
  schema: "./configs/schema.js",
  out: "./drizzle",
  dialect: 'postgresql',
  dbCredentials: {
    url: 'postgresql://neondb_owner:S31QheyLtlum@ep-misty-mud-a57o7gog.us-east-2.aws.neon.tech/AI_FORM_BUILDER?sslmode=require',
  }
});