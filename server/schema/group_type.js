const axios = require('axios');
const graphql = require('graphql');
const {GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList, GraphQLBoolean, GraphQLInt, GraphQLScalarType } = graphql;
const GraphQLJSON = require('graphql-type-json');
const EventType = require('./event_type');
const BudgetType = require('./budget_type');
const UserType = require('./user_type');

const HelpType = new GraphQLObjectType({
    name: 'HelpType',
    fields: () => ({
        id: {type: GraphQLID},
        value: {type: GraphQLInt}
    })
});

const GroupType = new GraphQLObjectType({
    name: 'GroupType',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        opened: {type: GraphQLBoolean},
        budgetInfo: {type: GraphQLJSON},
        budget: {
            type: BudgetType,
            resolve(parentValue) {
                console.log(parentValue.id);
                console.log(`http://localhost:3000/groups/${parentValue.id}/budgets`);
                return axios.get(`http://localhost:3000/groups/${parentValue.id}/budgets`)
                    .then(res => res.data[res.data.length-1]);
            }
        },
        events: {
            type: new GraphQLList(EventType),
            resolve(parentValue) {
                return axios.get(`http://localhost:3000/groups/${parentValue.id}/events`)
                    .then(res => res.data);
            }
        },
        leader: {
            type: UserType,
            resolve(parentValue){
                return axios.get(`http://localhost:3000/users/${parentValue.leader}`)
                    .then(res => res.data);
            }
        },
        users: {
            type: new GraphQLList(UserType),
            resolve(parentValue){
                return axios.get(`http://localhost:3000/groups/${parentValue.id}/users`)
                    .then(res => res.data);
            }
        },

    })
});


module.exports = GroupType;
