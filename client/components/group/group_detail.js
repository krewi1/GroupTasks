import React, {Component} from 'react';
import {graphql, compose} from 'react-apollo';
import gql from 'graphql-tag';
import moment from 'moment'

import ProgressBar from '../general/progress_bar';
import ListWrapper from '../general/list_wrapper';
import Budget from './budget';
import {query} from '../../queries/queries.js'

class GroupDetail extends Component {
    constructor({group, user}) {
        super();
        let delGroup = {
            id: group.id,
            users: group.users
        };
        this.state = {
            adminMode: user.id === group.leader.id,
            selected: 0,
            group: delGroup
        }
    }

    enterEvent = (eventId) => {
        let variableProp = {
            variables: {
                eventId,
                userId: this.props.user.id
            },
            //refetchQueries: [{query: query}]
        };
        this.props.enterEvent(variableProp);
    };

    handleUserRemove = (userId) => {
        let variableProp = {
            variables: {
                group: this.state.group,
                userId
            },
            //refetchQueries: [{query: query}]
        };
        this.props.userRemove(variableProp);
    };
    handleEventRemove = (id) => {
        let variableProp = {
            variables: {
                id: id
            }/*,
             refetchQueries: [{query: query}]*/
        };
        this.props.eventRemove(variableProp);
    };

    render() {
        debugger;
        let group = this.props.group;
        return (
            <div>
                <ProgressBar adminMode={this.state.adminMode} progress={group.budgetInfo[this.props.user.id]}
                maximum={group.budget.value}/>
                <h2>Group</h2>
                <div className="tab">
                    <button className="tablinks" onClick={() => this.setState({selected: 0})}>Users</button>
                    <button className="tablinks" onClick={() => this.setState({selected: 1})}>Events</button>
                    <button className="tablinks" onClick={() => this.setState({selected: 2})}>Budget</button>
                </div>

                <div className="tabcontent" style={{display: this.state.selected !== 0 && "none"}}>
                    <ListWrapper props={{nickName: "Nick"}} model={group.users}
                                 mutationable={{allowed: this.state.adminMode, handler: this.handleUserRemove}}
                                 clickable={{allowed: false}}
                                 keyValue="id"/>
                </div>

                <div className="tabcontent" style={{display: this.state.selected !== 1 && "none"}}>
                    <ListWrapper props={{name: "Name", expDate: "Expiration Date", value: "Value"}}
                                 model={group.events.filter((event)=>!Boolean(event.user) && moment().diff(event.expDate) < 0)}
                                 mutationable={{allowed: this.state.adminMode}}
                                 clickable={{
                                     allowed: !this.state.adminMode,
                                     handler: this.enterEvent,
                                     value: "REGISTER"
                                 }}
                                 externalListModification={{allowed: true, path: "/event-create"}}
                                 keyValue="id"/>
                </div>

                <div className="tabcontent" style={{display: this.state.selected !== 2 && "none"}}>
                    <Budget group={group}/>
                </div>
            </div>
        );
    }
}

const userRemove = gql`
    mutation RemoveUserFromGroup($group: GroupInputType, $userId: ID) {
  removeUserFromGroup(group: $group, userId: $userId) {
  id
    users{
      id
      name
    }
  }
}
`;

const eventRemove = gql`
    mutation AddGroup($name: String, $opened: boolean){
        addSong(name: $name) {
            id
            opened
            name
        }
    }
`;

const enterEvent = gql`
    mutation RegisterEvent($eventId: ID, $userId: ID){
        registerToEvent(eventId: $eventId, userId: $userId){
            id
            name
            events{
                id
                name
                expDate
                value
                group{
                    id
                }
                user{
                    id
                }
            }
  }
}
`;


export default compose(
    graphql(userRemove, {name: 'userRemove'}),
    graphql(eventRemove, {name: 'deleteSomething'}),
    graphql(enterEvent, {name: 'enterEvent'})
)(GroupDetail);

