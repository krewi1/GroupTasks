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
        group: {
            //fixing circular reference with require inside scope
            type: require('./group_type'),
            resolve(parentValue){

                    return axios.get(`http://localhost:3000/groups/${parentValue.groupId}`)
                        .then(res => res.data)
                        .catch(()=>{})

            }
        }
    })
});

module.exports = UserType;
