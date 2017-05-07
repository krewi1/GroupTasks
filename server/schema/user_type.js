const axios = require('axios');
const graphql = require('graphql');
const {GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList} = graphql;
const EventType = require('./event_type');

const UserType = new GraphQLObjectType({
    name: 'UserType',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        nickName: {type: GraphQLString},
        email: {type: GraphQLString},
        events: {
            type: new GraphQLList(EventType),
            resolve(parentValue) {
                return axios.get(`http://localhost:3000/users/${parentValue.id}/events`)
                    .then(res => res.data);
            }
        },
        groups: {
            //fixing circular reference with require inside scope
            type: new GraphQLList(require('./group_type')),
            resolve(parentValue){
                return axios.get(`http://localhost:3000/users/${parentValue.id}/groups`)
                    .then(res => res.data);
            }
        }
    })
});

module.exports = UserType;
