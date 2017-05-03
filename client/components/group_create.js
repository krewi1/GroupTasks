import React, {Component} from 'react';
import gql from 'graphql-tag';
import {graphql} from 'react-apollo';
import {Link, hashHistory} from 'react-router';

class SongCreate extends Component {
    constructor(props) {
        super(props);
        this.state = {title: ''};
    }

    onSubmit(event) {
        event.preventDefault();

        let variableProp = {
            variables: {
                title: this.state.title
            },
            refetchQueries: [{query: query}]
        };
        //can be broken becouse of cache happends when working with collections
        //becouse of this we have refetch queries
        //target component will not rerender twice becouse of appolo caching
        this.props.mutate(variableProp)
            .then(() => hashHistory.push('/'));
    }

    render() {
        return (
            <div>
                <Link to="/">Back</Link>
                <h3>Create a new song</h3>
                <form onSubmit={this.onSubmit.bind(this)}>
                    <label>Song Title</label>
                    <input value={this.state.title}
                           placeholder="Song Title"
                           onChange={event => this.setState({title: event.target.value})}/>
                </form>
            </div>
        );
    }
}

const mutation = gql`
    mutation AddSong($title: String){
        addSong(title: $title) {
            id
            title
        }
    }
`;

export default graphql(mutation)(SongCreate);

