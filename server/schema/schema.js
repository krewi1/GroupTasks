const graphql = require('graphql');
const {GraphQLSchema} = graphql;

const RootQueryType = require('./root_query_type');
const mutations = require('./mutations');
const SubscriptionType = require('./subscription_type');

module.exports = new GraphQLSchema({
    query: RootQueryType,
    mutation: mutations
    //subscription: SubscriptionType
});
