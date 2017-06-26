const axios = require('axios');
const graphql = require('graphql');
const {GraphQLObjectType, GraphQLList, GraphQLID,GraphQLString, GraphQLNonNull} = graphql;
const GroupType = require('./group_type');
const UserType = require('./user_type');
const EventType = require('./event_type');

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: () => ({
        group: {
            type: GroupType,
            args: {id: {type: new GraphQLNonNull(GraphQLID)}},
            resolve(parnetValue, {id}) {
                return axios.get(`http://localhost:3000/groups/${id}`)
                    .then(res => res.data);
            }
        },
        event: {
            type: EventType,
            args: {userId: {type: new GraphQLNonNull(GraphQLID)}},
            resolve(parnetValue, {userId}) {
                return axios.get(`http://localhost:3000/events/${userId}`)
                    .then(res => res.data);
            }
        },
        profile: {
            type: UserType,
            args: {userId: {type: GraphQLID}},
            resolve(parentValue, {userId}) {
                userId = userId || "1";
                return axios.get(`http://localhost:3000/users/${userId}`)
                    .then(res => {
                       return res.data
                    });
            }
        }
    })
});

module.exports = RootQuery;
