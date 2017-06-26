import React, {Component} from 'react';
import {graphql, compose} from 'react-apollo';
import gql from 'graphql-tag';
import moment from 'moment'
import {Link, hashHistory} from 'react-router';

import ListWrapper from '../general/list_wrapper';

class MyEvents extends Component {
    constructor({user}) {
        super();
        this.state = {
            id: user.id,
            events: user.group.events
        }
    }

    completeEvent = (eventId) => {
        let variableProp = {
            variables: {
                eventId
            },
            //refetchQueries: [{query: query}]
        };
        this.props.completeEvent(variableProp)
            .then(() => hashHistory.push(`/${this.state.id}`));
    };
    leaveEvent = (eventId) => {
        let variableProp = {
            variables: {
                eventId
            }/*,
             refetchQueries: [{query: query}]*/
        };
        this.props.leaveEvent(variableProp)
            .then(() => hashHistory.push(`/${this.state.id}`));
    };

    render() {
        return (
            <div>
                <Link to={`/${this.state.id}`}>Back</Link>
                <h2>MyEvents</h2>

                <div className="tabcontent">
                    <ListWrapper props={{name: "Name", expDate: "Expiration Date", value: "Value"}}
                                 model={this.state.events.filter((event)=>event.user && event.user.id === this.state.id && !event.completed && moment().diff(event.expDate) < 0)}
                                 mutationable={{
                                     allowed: true,
                                     handler: this.leaveEvent,
                                     value: "LEAVE"
                                 }}
                                 clickable={{
                                     allowed: true,
                                     handler: this.completeEvent,
                                     value: "COMPLETE"
                                 }}
                                 externalListModification={{allowed: false, path: "/event-create"}}
                                 keyValue="id"/>
                </div>
            </div>
        );
    }
}

const leaveEvent = gql`
    mutation LeaveEvent($eventId: ID){
  leaveEvent(eventId: $eventId){
    id
  }
}
`;

const completeEvent = gql`
    mutation CompleteEvent($eventId: ID){
  completeEvent(eventId: $eventId){
    id
  }
}
`;


export default compose(
    graphql(leaveEvent, {name: 'leaveEvent'}),
    graphql(completeEvent, {name: 'completeEvent'})
)(MyEvents);

