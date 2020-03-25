const { GraphQLObjectType, GraphQLString } = require('graphql');

const UserType = require('./userType');
const User = require('../mongoose/models/user');

const RootMutationType = new GraphQLObjectType({
    name: 'RootMutation',
    fields: {
        addUser: {
            type: UserType,
            args: {
                username: { type: GraphQLString },
                email: { type: GraphQLString },
                picture: { type: GraphQLString },
            },
            async resolve(parrentValue, { username, email, picture}) {
                let user;
                user = await User.findOne({ email }).exec();
                if(user) {
                    console.log('user already exists');
                } else {
                    user = await new User({
                        username, 
                        email,
                        picture
                    }).save();
                }
                return user;   
            }
        }
    }
});

module.exports = RootMutationType;