const InvalidException = require('./InvalidException')
const NullException = require('./NullException')
const NotAuthorized = require('./NotAuthorized')

class ErrorHandler extends Error{

    constructor(message) {
        super(message)
        this.message = {
            ErrorHandler: {
                message
            }
        }
    
    }

    get getMessage(){
        return this.message;
    }
}

module.exports = {
    ErrorHandler,
    InvalidException,
    NullException,
    NotAuthorized
}