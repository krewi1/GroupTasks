const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLBoolean } = graphql;
const axios = require('axios');
const MessageType = require('./message_type');
const GroupType = require('./group_type');

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addGroup: {
      type: GroupType,
      args: {
        name: { type: GraphQLString },
        opened: { type: GraphQLBoolean }
      },
      resolve(parentValue, {name, opened}) {
        return axios.post('http://localhost:3000/groups', {name, opened})
            .then(res=>res.data);
      }
    }
  }
});

module.exports = mutation;

