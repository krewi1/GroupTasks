const graphql = require('graphql');
const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString
} = graphql;

const MessageType = new GraphQLObjectType({
    name: 'MessageType',
    fields: () => ({
        id: {type: GraphQLID},
        text: {type: GraphQLString}
    })
});

module.exports = MessageType;
