const {GraphQLServer} =require('graphql-yoga')
const {prisma} = require('./generated/prisma-client')
const resolvers = require('./resolvers/resolve')
const {schema, host , stage, env , port} = require('../config')

if (env === stage.DEVELOPMENT) {
    // import resolve logger for debugging
    const createGraphQLLogger = require('graphql-log');
    const logExecutions = createGraphQLLogger();
    logExecutions(resolvers)
}

const app = new GraphQLServer({
    typeDefs: schema,
    resolvers,
    context: request => {
        return {
            ...request,
            prisma
        }
    }
})

const options = {
    port,
    endpoint: host
}

app.start(options,(res) => console.log(`Server Started on server ${res.port} `) )
