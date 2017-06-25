const graphql = require('graphql');
const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLInt,
    GraphQLString
} = graphql;

const EventType = new GraphQLObjectType({
    name: 'EventType',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
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
        },
        user: {
            //fixing circular reference with require inside scope
            type: require('./group_type'),
            resolve(parentValue){

                return axios.get(`http://localhost:3000/users/${parentValue.userId}`)
                    .then(res => res.data)
                    .catch(()=>{})

            }
        }
    })
});

module.exports = EventType;
