

const Query = require("./query/init")
const Mutation = require("./mutations/init")
const Root = require('./root/init')


module.exports = {
    Query,
    Mutation,
    ...Root
}
