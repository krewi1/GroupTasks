import React, {Component} from 'react';

import GroupEmpty from '../group/my_group';
import GroupDetail from '../group/group_detail';

class LandingPage extends Component {
    render() {
        const user = this.props.user;
        const group = user.group;

        if(!this.props.user.group){
            return (
                <GroupEmpty user={user}/>
            )
        }
        return (
            <GroupDetail user={user}
                group={group}/>)
    }
}

export default LandingPage;