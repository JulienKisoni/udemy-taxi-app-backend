const { GraphQLSchema } = require('graphql');

const query = require('./rootQueryType');
const mutation = require('./rootMutationType');

const schema = new GraphQLSchema({
    query,
    mutation
});

module.exports = schema;