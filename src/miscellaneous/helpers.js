const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const {
    ACCESS_SECRET
} = require('../../config') //get ACCESS_SECRET key from config
const {
    InvalidException,
    NullException,
    ErrorHandler
} = require('./error/errorHandler') // out custom errorHandler



// A helper function to insertToken into database
async function insertToken(ctx, args) {
    const token = jwt.sign({
        ...args
    }, ACCESS_SECRET)
        if (!token)
            throw new InvalidException(`Token generated but not Inserted`)

    return token;
}

//getVendorId token from Authorization header
async function getUserId(ctx) {
    const auth = await ctx.request.get('Authorization')
    if (!auth)
        throw new NullException("Please add authorization header")

    const token = auth.replace('Bearer ', '')
    if (!token)
        throw new NullException("token not found")

    const vendorId = jwt.verify(token, ACCESS_SECRET).id
    if (!vendorId)
        throw new InvalidException(`Invalid authorization token`)

    return vendorId
}

//helper function for saliting password
async function saltPassword( pass){
    const password = await bcrypt.hash(pass, 10)
        if( password === null || typeof password === 'undefined')    
            throw new NullException("Password hashing unsuccessful")
    return password
}


//-----------Validations-------------

// helper function for validating emails
function validateEmail(email){
    let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(String(email).toLowerCase())
}

function validatePassword(password){
    if( password.length <= 6 || password.length >= 20)
        return false

    const passwordTestRegex = /[!@#$%^&*+\-\\<>\/?\\A-Z\\a-z\(0-9)]/
        if (!passwordTestRegex.test(String(password)))
            return false

    return true
}


module.exports  ={
    ACCESS_SECRET,
    insertToken,
    getUserId,
    saltPassword,
    validateEmail,
    validatePassword
}

