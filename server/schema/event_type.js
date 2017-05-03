const graphql = require('graphql');
const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLInt,
    GraphQLString
} = graphql;

const EventType = new GraphQLObjectType({
    name: 'EventType',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        expDate: {type: GraphQLString},
        value: {type: GraphQLInt}
    })
});

module.exports = EventType;
