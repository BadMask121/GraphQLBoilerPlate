class InvalidException extends Error {
    constructor(message) {
        super(message)
        this.message = {
            InvalidException:{
                message
            }
        }
    }
}

module.exports = InvalidException