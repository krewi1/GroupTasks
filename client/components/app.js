import React, {Component} from 'react';
import gql from 'graphql-tag';
import {graphql} from 'react-apollo';

import SideBar from './side_bar.js';
import Loader from './loader.js';

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
;

const query = gql`{
        profile{
            id
            nickName
            name
            email
            group{
              leader{
                id
              }
              users{
                id
                nickName
              }
              events{
                id
                name
                expDate
                value
              }
            }
        }
    }`;

export default graphql(query)(App)