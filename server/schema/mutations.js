const graphql = require('graphql');
const { GraphQLObjectType, GraphQLInputObjectType, GraphQLString, GraphQLID, GraphQLBoolean, GraphQLList } = graphql;
const axios = require('axios');
const UserType = require('./user_type');
const GroupType = require('./group_type');

const GroupInputType = new GraphQLInputObjectType({
    name: 'GroupInputType',
    fields: () => ({
        id: {type: GraphQLID},
        users: {
            type: new GraphQLList(GraphQLID)
        }
    })
});

const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addGroup: {
            type: UserType,
            args: {
                name: {type: GraphQLString},
                opened: {type: GraphQLBoolean},
                userId: {type: GraphQLID}
            },
            resolve(parentValue, {name, opened, userId}) {
                return axios.post('http://localhost:3000/groups', {
                    name: name,
                    opened: opened,
                    eventId: [],
                    budgetId: null,
                    userId: [userId],
                    leader: userId
                }).then(res=> {
                    return axios.patch(`http://localhost:3000/users/${userId}`, {
                        groupId: res.data.id
                    })
                }).then((res)=>res.data);
            }
        },
        removeUserFromGroup: {
            type: GroupType,
            args: {
                group: {type: GroupInputType},
                userId: {type: GraphQLID}
            },
            resolve(parentValue, {group, userId}) {
                let users = group.users;

                users.splice(users.indexOf(userId), 1);
                console.log(users);
                return axios.patch(`http://localhost:3000/users/${userId}`, {
                    groupId: null
                }).then(()=> {
                    return axios.patch(`http://localhost:3000/groups/${group.id}`, {
                        users: users
                    })
                }).then((res)=>res.data);
            }
        }
    }
});


module.exports = mutation;

