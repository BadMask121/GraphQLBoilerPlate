class NullException extends Error {
    constructor(message) {
        super(message)
        this.message = {
            NullException: {
                message
            }
        }
    }
}

module.exports = NullException