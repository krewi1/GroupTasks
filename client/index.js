import './style/style.css'
import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-client';
import {ApolloProvider} from 'react-apollo';
import {Router, Route, hashHistory, IndexRoute} from 'react-router';

import GroupList from './components/general/landing_page';
import App from './components/general/app';
import Profile from './components/general/my_profile';
import GroupCreate from './components/group/group_create';
import EventCreate from './components/event/event_create';

const client = new ApolloClient({
    dataIdFromObject: o => o.id
});

const Root = () => {
    return (
        <ApolloProvider client={client}>
            <Router history={hashHistory}>
                <Route path="/" component={App}>
                    <IndexRoute component={GroupList}/>
                    <Route path="/profile" component={Profile}/>
                    <Route path="/group-create" component={GroupCreate}/>
                    <Route path="/profile" component={Profile}/>
                    <Route path="/profile" component={Profile}/>
                    <Route path="/event-create" component={EventCreate}/>
                </Route>
            </Router>
        </ApolloProvider>
    )
};

ReactDOM.render(
    <Root />,
    document.querySelector('#root')
);
