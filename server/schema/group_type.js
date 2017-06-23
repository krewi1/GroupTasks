const axios = require('axios');
const graphql = require('graphql');
const {GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList, GraphQLBoolean} = graphql;
const EventType = require('./event_type');
const MessageType = require('./message_type');
const UserType = require('./user_type');

const GroupType = new GraphQLObjectType({
    name: 'GroupType',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        opened: {type: GraphQLBoolean},
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
        }
    })
});

module.exports = GroupType;
