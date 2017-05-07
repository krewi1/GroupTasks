import React, {Component} from 'react';

class MyGroup extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div className="row">
                <div className="valign-wrapper">
                    <div className="col s6 centered"><h4>Create Group</h4><i className="large material-icons">add</i></div>
                    <div className="col s6 centered"><h4>Enter Group</h4><i className="large material-icons">queue</i></div>
                </div>
            </div>

        )
    }
}

export default MyGroup;