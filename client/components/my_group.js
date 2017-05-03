import React, {Component} from 'react';

class MyGroup extends Component {
    constructor(){
        super();
    }
    render(){
        return (
            <div className="row">
                <div className="col s6 centered"><i className="material-icons">add</i><span>Create Group</span></div>
                <div className="col s6 centered"><i className="material-icons">queue</i><span>Enter Group</span></div>
            </div>
        )
    }
}

export default MyGroup;