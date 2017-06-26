import React, {Component} from 'react';
import {graphql, withApollo} from 'react-apollo';
import {hashHistory} from 'react-router';

import SideBar from './side_bar.js';
import Loader from './loader.js';
import {query} from '../../queries/queries.js'

class App extends Component {
    constructor(props) {
        super();
        this.state = {
            selected: props.params.id
        }
    }

    componentWillReceiveProps() {
        debugger;
        const data = this.props.data;
        const selected = this.state.selected;

        data.refetch({
            variables: {
                userId: selected
            }
        });
    }

    changeUser = (event) => {
        this.setState({selected: event.target.value});
        hashHistory.push(`/${event.target.value}`);
    };

    render() {
        const data = this.props.data;
        if (data.loading) {
            return <Loader />;
        }

        return (
            <div className="container">
                <SideBar changeUser={this.changeUser} selected={this.state.selected}/>
                <div>{React.cloneElement(this.props.children, {user: data.profile})}</div>
            </div>
        );
    }
}


export default graphql(query, {
    options: ({params}) => ({variables: {userId: params.id || 1}})
})(App)