const { GraphQLObjectType, GraphQLList } = require('graphql');

const UserType = require('./userType');
const User = require('../mongoose/models/user');

const RootQueryType = new GraphQLObjectType({
    name: 'RootQuery',
    fields: {
        getUsers: {
            type: new GraphQLList(UserType),
            async resolve() {
                const users = await User.find({}).exec();
                return users;
            }
        }
    }
});

module.exports = RootQueryType;