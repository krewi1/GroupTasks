import React, {Component} from 'react';
import gql from 'graphql-tag';
import {graphql} from 'react-apollo';

import SideBar from './side_bar.js';
import Loader from './loader.js';
import {query} from '../queries/queries.js'

class App extends Component {
    render() {
        const data = this.props.data;
        if(data.loading){return <Loader />;}

        return (
            <div className="container">
                <SideBar />
                <div>{React.cloneElement(this.props.children, {user: data.profile})}</div>
            </div>
        );
    }
}


export default graphql(query)(App)