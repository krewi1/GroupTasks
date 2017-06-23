import React, {Component} from 'react';
import gql from 'graphql-tag';

import ProgressBar from './progress_bar';
import ListWrapper from './list_wrapper';

class GroupDetail extends Component {
    constructor() {
        super();
        this.state = {
            selected: 0
        }
    }

    render() {
        debugger;
        let group = this.props.group;
        return (
            <div>
                <ProgressBar adminMode={this.props.adminMode}/>
                <h2>Group</h2>
                <div className="tab">
                    <button className="tablinks" onClick={() => this.setState({selected: 0})}>Users</button>
                    <button className="tablinks" onClick={() => this.setState({selected: 1})}>Events</button>
                    <button className="tablinks" onClick={() => this.setState({selected: 2})}>Budget</button>
                </div>

                <div className="tabcontent" style={{display: this.state.selected !== 0 && "none"}}>
                    <ListWrapper props={{nickName: "Nick"}} model={group.users} mutationable={{allowed: false}}
                                 clickable = {{allowed: false}} keyValue="id"/>
                </div>

                <div className="tabcontent" style={{display: this.state.selected !== 1 && "none"}}>
                    <ListWrapper props={{name: "Name", expDate: "Expiration Date", value: "Value"}} model={group.events}
                                 mutationable={{allowed: false}} clickable = {{allowed: false}} keyValue="id"/>
                </div>

                <div className="tabcontent" style={{display: this.state.selected !== 2 && "none"}}>
                    <h3>Tokyo</h3>
                    <p>Tokyo is the capital of Japan.</p>
                </div>
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


export default GroupDetail;

