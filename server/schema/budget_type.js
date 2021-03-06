const graphql = require('graphql');
const axios = require('axios');
const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLInt,
    GraphQLString
} = graphql;

const BudgetType = new GraphQLObjectType({
    name: 'BudgetType',
    fields: () => ({
        id: {type: GraphQLID},
        expDate: {type: GraphQLString},
        value: {type: GraphQLInt},
        group: {
            //fixing circular reference with require inside scope
            type: require('./group_type'),
            resolve(parentValue){

                return axios.get(`http://localhost:3000/groups/${parentValue.groupId}`)
                    .then(res => res.data)
                    .catch(() => {})

            }
        }
    })
});

module.exports = BudgetType;
