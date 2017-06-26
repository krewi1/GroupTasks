import React, {Component} from 'react';
import {graphql, compose} from 'react-apollo';
import gql from 'graphql-tag';
import moment from 'moment'

import ProgressBar from '../general/progress_bar';
import ListWrapper from '../general/list_wrapper';
import Budget from './budget';

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

    doneEvent = (eventId) => {
        debugger;
        let event = this.props.group.events.find((event) => event.id === eventId);
        let budgetInfo = this.props.group.budgetInfo;
        let currBudgetState = budgetInfo = Object.assign({}, budgetInfo);
        currBudgetState[event.user.id] = budgetInfo[event.user.id] || 0 + event.value;
        let variableProp = {
            variables: {
                eventId,
                budgetInfo: JSON.stringify(currBudgetState)
            },
            //refetchQueries: [{query: query}]
        };
        this.props.doneEvent(variableProp);
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
        let group = this.props.group;
        let progressBar = Boolean(group.budgetInfo) && !this.state.adminMode ? <ProgressBar adminMode={this.state.adminMode} progress={group.budgetInfo[this.props.user.id]||0}
                                                                   maximum={group.budget.value}/> : <div />;
        return (
            <div>
                {progressBar}
                <h2>Group {group.name} #{group.id}</h2>
                <div className="tab">
                    <button className="tablinks" onClick={() => this.setState({selected: 0})}>Users</button>
                    <button className="tablinks" onClick={() => this.setState({selected: 1})}>Events</button>
                    <button className="tablinks" onClick={() => this.setState({selected: 2})}
                            style={{display: !this.state.adminMode && "none"}}>Budget</button>
                    <button className="tablinks" onClick={() => this.setState({selected: 3})}
                            style={{display: !this.state.adminMode && "none"}}>Events done
                    </button>
                </div>

                <div className="tabcontent" style={{display: this.state.selected !== 0 && "none"}}>
                    <ListWrapper props={{nickName: "Nick"}} model={group.users}
                                 mutationable={{allowed: this.state.adminMode, handler: this.handleUserRemove}}
                                 clickable={{allowed: false}}
                                 keyValue="id"/>
                </div>

                <div className="tabcontent" style={{display: this.state.selected !== 1 && "none"}}>
                    <ListWrapper props={{name: "Name", expDate: "Expiration Date", value: "Value"}}
                                 model={group.events.filter((event) => !Boolean(event.user) && moment().diff(event.expDate) < 0)}
                                 mutationable={{allowed: false}}
                                 clickable={{
                                     allowed: !this.state.adminMode,
                                     handler: this.enterEvent,
                                     value: "REGISTER"
                                 }}
                                 externalListModification={{allowed: this.state.adminMode, path: `/${this.props.user.id}/event-create`}}
                                 keyValue="id"/>
                </div>

                <div className="tabcontent" style={{display: this.state.selected !== 2 && "none"}}>
                    <Budget group={group}/>
                </div>

                <div className="tabcontent" style={{display: this.state.selected !== 3 && "none"}}>
                    <ListWrapper props={{name: "Name", expDate: "Expiration Date", value: "Value"}}
                                 model={group.events.filter((event) => event.completed)}
                                 mutationable={{allowed: false}}
                                 clickable={{
                                     allowed: true,
                                     handler: this.doneEvent,
                                     value: "DONE"
                                 }}
                                 externalListModification={{allowed: false}}
                                 keyValue="id"/>
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

const doneEvent = gql`
    mutation DoneEvent($eventId: ID, $budgetInfo: JSON){
  doneEvent(eventId: $eventId, budgetInfo: $budgetInfo){
    id
    budgetInfo
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
    graphql(enterEvent, {name: 'enterEvent'}),
    graphql(doneEvent, {name: 'doneEvent'}),
)(GroupDetail);

