require('dotenv').config()

let PORT = process.env.PORT
let DB_USERNAME = process.env.DB_USERNAME
let DB_PASSWORD = process.env.DB_PASSWORD
let DB_NAME = 'blogilista'

if (process.env.NODE_ENV === 'test') {
    DB_NAME = 'blogilista-test'
}

let MONGO_URL = `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@fullstack2020-bysw0.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`

const PASSWORD_SALT_ROUNDS = 10

module.exports = {
    PORT,
    MONGO_URL,
    PASSWORD_SALT_ROUNDS,
}