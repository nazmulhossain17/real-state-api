require("dotenv").config();

const dbURL = process.env.DB_URL;
const secretToken = process.env.SECRET_TOKEN;

export const config = { dbURL, secretToken };
