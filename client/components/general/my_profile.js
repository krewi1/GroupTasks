/*
import React, {Component} from 'react';
import gql from 'graphql-tag';
import {graphql} from 'react-apollo';
import {Link, hashHistory} from 'react-router';

import Loader from './loader.js';

class MyProfile extends Component {
    render() {
        const data = this.props.data;
        if(data.loading){return <Loader />;}
        return (
            <div className="row">
                <Link to="/" >Back</Link>
                <h3>{data.profile.nickName}</h3>
                {data.profile.name}
                {data.profile.email}
            </div>
        )
    }
}

const query = gql`{
        profile{
            id
            nickName
            name
            email
        }
    }`;

 mutation AddBudget($value: Int, $expDate: String, $group: GroupInputType){
 addBudget(value: $value, expDate: $expDate, group: $group){
 id
 budgetInfo{
 id
 value
 }
 }
 }


 {
 "value": 200,
 "expDate": "11/22/2016",
 "group": {
 "id": "HJfTZbs7Z",
 "users": [
 "1",
 "2",
 "3"
 ]
 }
 }

export default graphql(query)(MyProfile);*/
