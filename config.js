import dotenv from "dotenv" //  Import dotenv using ESModules

dotenv.config() // Load variables of .env file onto process.env

// Export de-structured values of variables with default values
// (e.g. if they are not defined in .env)

export const {
    PORT = 3000,
    mysql_host = "127.0.0.1",
    mysql_user,
    mysql_password,
    mysql_database = "bytewise",
    SECRET_JWT_KEY
} = process.env

//  This is the way to export an individual env variable that needs conversion.
export const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS, 10) || 11

// For example, to import PORT on another file you would write
//    import { PORT } from "./config.js"
// and just use it as a constant.

// Verify that critical variables are actually defined
if (!PORT || !mysql_host || !mysql_user || !mysql_password || !mysql_database || !SECRET_JWT_KEY || !SALT_ROUNDS) {
    throw new Error("Missing required variables in .env file.")
}
