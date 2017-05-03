const graphql = require('graphql');
const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLInt,
    GraphQLString
} = graphql;

const MessageType = require('./message_type')

const SubscriptionType = new GraphQLObjectType({
    name: "MessageSubscription",
    fields: {
        addMessage: {
            type: MessageType,
            description: "Send newly added comments",
            args: {
                postId: {type: GraphQLString}
            }
        }
    }
});

module.exports = SubscriptionType;