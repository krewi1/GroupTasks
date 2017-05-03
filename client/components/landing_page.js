import React, {Component} from 'react';

import SideBar from './side_bar';
import MyGroup from './my_group';

class LandingPage extends Component {
    render() {
        return (
            <div className="container">
                <SideBar />
                <MyGroup />
            </div>
        )
    }
}

export default LandingPage;