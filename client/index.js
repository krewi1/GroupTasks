import './style/style.css'
import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-client';
import {ApolloProvider} from 'react-apollo';
import {Router, Route, hashHistory, IndexRoute} from 'react-router';

import GroupList from './components/general/landing_page';
import App from './components/general/app';
import GroupCreate from './components/group/group_create';
import EventCreate from './components/event/event_create';
import EventDetail from './components/event/event_detail';
import MyEvents from './components/event/my_events';
import GroupEnter from './components/group/group_enter';

const client = new ApolloClient({
    dataIdFromObject: o => o.id
});

const Root = () => {
    return (
        <ApolloProvider client={client}>
            <Router history={hashHistory}>
                <Route path="/(:id)" component={App}>
                    <IndexRoute component={GroupList}/>
                    {/*<Route path="profile" component={Profile}/>*/}
                    <Route path="group-create" component={GroupCreate}/>
                    <Route path="event-create" component={EventCreate}/>
                    <Route path="event-detail/:id" component={EventDetail}/>
                    <Route path="my-events" component={MyEvents}/>
                    <Route path="group-enter" component={GroupEnter}/>
                </Route>
            </Router>
        </ApolloProvider>
    )
};

ReactDOM.render(
    <Root />,
    document.querySelector('#root')
);
