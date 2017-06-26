const graphql = require('graphql');
const {GraphQLObjectType, GraphQLInputObjectType, GraphQLString, GraphQLID, GraphQLBoolean, GraphQLList, GraphQLInt} = graphql;
const axios = require('axios');
const UserType = require('./user_type');
const GroupType = require('./group_type');
const EventType = require('./event_type');
const GraphQLJSON = require('graphql-type-json');

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
                }).then(res => {
                    return axios.patch(`http://localhost:3000/users/${userId}`, {
                        groupId: res.data.id
                    })
                }).then((res) => res.data);
            }
        },
        addEvent: {
            type: GroupType,
            args: {
                name: {type: GraphQLString},
                value: {type: GraphQLInt},
                expDate: {type: GraphQLString},
                groupId: {type: GraphQLID}
            },
            resolve(parentValue, {name, value, expDate, groupId}) {
                return axios.post('http://localhost:3000/events', {
                    name: name,
                    value: value,
                    expDate: expDate,
                    groupId: groupId,
                    completed: false,
                    done: false
                })
                    .then(() => axios.get(`http://localhost:3000/groups/${groupId}`))
                    .then((res) => res.data);
            }
        },
        registerToEvent: {
            type: UserType,
            args: {
                eventId: {type: GraphQLID},
                userId: {type: GraphQLID}
            },
            resolve(parentValue, {userId, eventId}) {
                return axios.patch(`http://localhost:3000/events/${eventId}`, {
                    userId: userId
                })
                    .then(() => axios.get(`http://localhost:3000/users/${userId}`))
                    .then((res) => res.data);
            }
        },
        addBudget: {
            type: GroupType,
            args: {
                value: {type: GraphQLInt},
                expDate: {type: GraphQLString},
                group: {type: GroupInputType}
            },
            resolve(parentValue, {value, expDate, group}) {
                let budgetInfo = new Map;
                group.users.forEach((user) => budgetInfo[user] = 0);
                return axios.post(`http://localhost:3000/budgets/`, {
                    value: value,
                    expDate: expDate,
                    groupsId: group.id
                })
                    .then(() => axios.patch(`http://localhost:3000/groups/${group.id}`, {
                        budgetInfo: budgetInfo
                    }))
                    .then((res) => res.data);
            }
        },
        completeEvent: {
            type: EventType,
            args: {
                eventId: {type: GraphQLID}
            },
            resolve(parentValue, {eventId, budgetInfo}) {
                return axios.patch(`http://localhost:3000/events/${eventId}`, {
                    completed: true
                })
                    .then((res) => res.data);
            }
        },
        doneEvent: {
            type: GroupType,
            args: {
                eventId: {type: GraphQLID},
                budgetInfo: {type: GraphQLJSON}
            },
            resolve(parentValue, {eventId, budgetInfo}) {
                console.log(eventId, budgetInfo);
                return axios.patch(`http://localhost:3000/events/${eventId}`, {
                    completed: true,
                    done: true
                })
                    .then(({data}) => {
                        console.log(data);
                        return axios.patch(`http://localhost:3000/groups/${data.groupId}`, {budgetInfo: JSON.parse(budgetInfo.replace(new RegExp("\'", 'g'),"\""))});
                    })
                    .then((res) => res.data);
            }
        },
        leaveEvent: {
            type: EventType,
            args: {
                eventId: {type: GraphQLID},
                budgetInfo: {type: GraphQLJSON}
            },
            resolve(parentValue, {eventId, budgetInfo}) {
                return axios.patch(`http://localhost:3000/events/${eventId}`, {
                    completed: false,
                    userId: null
                })
                    .then((res) => res.data);
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
                return axios.patch(`http://localhost:3000/users/${userId}`, {
                    groupId: null
                }).then(() => {
                    return axios.patch(`http://localhost:3000/groups/${group.id}`, {
                        users: users
                    })
                }).then((res) => res.data);
            }
        }
    }
});


module.exports = mutation;

