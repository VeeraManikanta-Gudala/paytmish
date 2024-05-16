const mongoose = require('mongoose')
mongoose.connect("mongodb://localhost:27017/paytmApp")
const userSchema = mongoose.Schema({
    username: String,
    password: String,
    fname: String,
    lname: String
})
const user = mongoose.model("user",userSchema)
module.exports = {
    user
}