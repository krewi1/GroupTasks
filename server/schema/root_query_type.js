const axios = require('axios');
const graphql = require('graphql');
const {GraphQLObjectType, GraphQLList, GraphQLID,GraphQLString, GraphQLNonNull} = graphql;
const GroupType = require('./group_type');
const UserType = require('./user_type');

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
        profile: {
            type: UserType,
            resolve() {
                return axios.get(`http://localhost:3000/users/1`)
                    .then(res => res.data);
            }
        }
    })
});

module.exports = RootQuery;
