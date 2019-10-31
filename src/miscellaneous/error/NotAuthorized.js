class NotAuhorized extends Error {
    constructor(message) {
        super(message)
        this.message = {
            NotAuhorized: {
                message
            }
        }
    }
}

module.exports = NotAuhorized