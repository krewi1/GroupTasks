import React, {Component} from 'react';
import gql from 'graphql-tag';
import {graphql} from 'react-apollo';
import {Link, hashHistory} from 'react-router';

class Budget extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpened: true,
            name: ''
        };

        this.handleInputChange = this.handleInputChange.bind(this)
    }

    handleInputChange(event) {
        debugger;
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    onSubmit(event) {
        event.preventDefault();

        let variableProp = {
            variables: {
                name: this.state.name
            }/*,
             refetchQueries: [{query: query}]*/
        };
        this.props.mutate(variableProp)
            .then(() => hashHistory.push('/'));
    }

    render() {
        return (
            <div>
                <Link to="/">Back</Link>
                <h3>Create a new group</h3>
                <form onSubmit={this.onSubmit.bind(this)}>
                    <label>Song Title
                        <input type="text"
                               name="name"
                               value={this.state.name}
                               placeholder="Group name"
                               onChange={this.handleInputChange}/>
                    </label>
                    <p>
                        <input type="checkbox" className="filled-in" id="isOpened"
                               name="isOpened" checked={this.state.isOpened}
                               onChange={this.handleInputChange}/>
                        <label htmlFor="isOpened">Public group</label>
                    </p>
                    <button type="submit">Submit</button>
                </form>
            </div>
        );
    }
}

const mutation = gql`
    mutation AddGroup($name: String, $opened: boolean){
        addSong(name: $name) {
            id
            opened
            name
        }
    }
`;

export default graphql(mutation)(Budget);