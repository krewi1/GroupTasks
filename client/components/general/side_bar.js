import React from 'react';
import {Link} from 'react-router';

const SideBar = (props) => {
    let link = `${props.selected}/my-events`;
    return (
        <div className="side-nav fixed">
            <label>Browser Select</label>
            <select className="browser-default"
                    onChange={props.changeUser}
                    value={props.selected}>
                <option value="1">Admin user</option>
                <option value="2">Normal user</option>
            </select>
            <ul >
                <li>
                    <div className="userView">
                        <div className="background">
                        </div>
                        <a href="#!name"><span className="white-text name">John Doe</span></a>
                        <a href="#!email"><span className="white-text email">jdandturk@gmail.com</span></a>
                    </div>
                </li>
                <li><Link to="/profile"><i className="material-icons">perm_identity</i>Profile</Link></li>
                <li><Link to="/opengroups"><i className="material-icons">lock_open</i>OpenGroups</Link></li>
                <li><Link to={link}><i className="material-icons">group_work</i>My Events</Link></li>
            </ul>
        </div>
    );
};

export default SideBar;