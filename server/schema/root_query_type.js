const axios = require('axios');
const graphql = require('graphql');
const {GraphQLObjectType, GraphQLList, GraphQLID, GraphQLNonNull} = graphql;
const GroupType = require('./group_type');

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: () => ({
        groups: {
            type: new GraphQLList(GroupType),
            resolve() {
                return axios.get(`http://localhost:3000/groups`)
                    .then(res => res.data);
            }
        },
        group: {
            type: GroupType,
            args: {id: {type: new GraphQLNonNull(GraphQLID)}},
            resolve(parnetValue, {id}) {
                return axios.get(`http://localhost:3000/groups/${id}`)
                    .then(res => res.data);
            }
        }
    })
});

module.exports = RootQuery;
