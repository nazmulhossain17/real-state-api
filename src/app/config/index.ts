require("dotenv").config();

const dbURL = process.env.DB_URL;

export const config = { dbURL };
