const { GraphQLObjectType, GraphQLString } = require('graphql');

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: {
        id: { type: GraphQLString },
        username: { type: GraphQLString },
        email: { type: GraphQLString },
        picture: { type: GraphQLString }
    }
});

module.exports = UserType;