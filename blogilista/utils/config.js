require('dotenv').config()

let PORT = process.env.PORT
let DB_USERNAME = process.env.DB_USERNAME
let DB_PASSWORD = process.env.DB_PASSWORD
let MONGO_URL = `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@fullstack2020-bysw0.mongodb.net/blogilista?retryWrites=true&w=majority`

module.exports = {
    PORT,
    DB_USERNAME,
    DB_PASSWORD,
    MONGO_URL
}