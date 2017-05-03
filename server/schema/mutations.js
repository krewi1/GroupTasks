const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLID } = graphql;
const axios = require('axios');
const MessageType = require('./message_type');

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addMessage: {
      type: MessageType,
      args: {
        text: { type: GraphQLString }
      },
      resolve(parentValue, { text }) {
        return axios.post('http://localhost:3000/messages', {text})
            .then(res=>res.data);
      }
    }
  }
});

module.exports = mutation;

