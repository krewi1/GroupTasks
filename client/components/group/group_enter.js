import React, {Component} from 'react';
import {Link, hashHistory} from 'react-router';
import {graphql} from 'react-apollo';
import gql from 'graphql-tag';

class GroupEntry extends Component {
    constructor({params}) {
        super();
        this.state = {
            userId: params.id,
            groupId: 0
        }
    }

    handleInputChange = (event) =>{
        this.setState({
            groupId: event.target.value
        })
    };

    onSubmit = (event) => {
        event.preventDefault();

        let variableProp = {
            variables: {
                groupId: this.state.groupId,
                userId: this.state.userId
            }
        };
        this.props.mutate(variableProp)
            .then(() => hashHistory.push(`/${this.state.userId}`));
    };

    render() {
        return (
            <div>
                <Link to="/">Back</Link>

                <h3>Enter a group</h3>

                <form onSubmit={this.onSubmit}>
                    <label>Group id
                        <input type="text"
                               name="id"
                               value={this.state.groupId}
                               placeholder="Enter group id"
                               onChange={this.handleInputChange}/>
                    </label>
                    <button type="submit">Submit</button>
                </form>
            </div>

        )
    }
}

const mutation = gql`
mutation EnterGroup($groupId: ID, $userId: ID){
  enterGroup(groupId: $groupId, userId: $userId){
    id
  }
}
`;

export default graphql(mutation)(GroupEntry);