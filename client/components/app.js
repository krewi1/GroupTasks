import React from 'react';

import SideBar from './side_bar.js';

export default ({children}) => {
    return (
    <div className="container">
        <SideBar />
        <div>{children}</div>
    </div>
    );
};