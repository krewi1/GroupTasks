import React, {Component} from 'react';
import {Link} from 'react-router';

class GroupEmpty extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div className="row">
                <div className="valign-wrapper">
                    <div className="col s6 centered"><Link to={`/${this.props.user.id}/group-create`} ><h4>Create Group</h4><i className="large material-icons">add</i></Link></div>
                    <div className="col s6 centered"><Link to={`/${this.props.user.id}/group-enter`} ><h4>Enter Group</h4><i className="large material-icons">queue</i></Link></div>
                </div>
            </div>

        )
    }
}

export default GroupEmpty;