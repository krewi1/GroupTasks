import React, {Component} from 'react';
import gql from 'graphql-tag';
import {graphql} from 'react-apollo';
import {Link, hashHistory} from 'react-router';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';

import {query} from '../../queries/queries'

class Budget extends Component {
    constructor({group}) {
        super();
        this.state = {
            group: Budget.makeGroupModel(group),
            value: '0',
            expDate: moment(0, 'mm/dd/YYYY')
        };
    }

    static makeGroupModel(group){
        return {
            id: group.id,
            users: group.users.map((user)=>user.id)
        };
    }

    handleInputChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    };

    handleDateChange = (date) =>{
        this.setState({
            expDate: date
        })
    };

    onSubmit = (event) => {
        let date = this.state.expDate;

        date = date.format("DD/MM/YYYY");
        event.preventDefault();

        let variableProp = {
            variables: {
                value: this.state.value,
                expDate: date,
                group: this.state.group
            },
            refetchQueries: [{query: query}]
        };
        this.props.mutate(variableProp)
            .then((res) => {this.setState(Budget.makeGroupModel(res.data.addBudget))});
    };

    render() {
        return (
            <div>
                <Link to="/">Back</Link>

                <h3>Create a new group</h3>

                <form onSubmit={this.onSubmit}>
                    <label>Points
                        <input type="text"
                               name="value"
                               value={this.state.value}
                               placeholder="Event points"
                               onChange={this.handleInputChange}/>
                    </label>
                    <DatePicker selected={this.state.expDate}
                                onChange={this.handleDateChange}
                                placeholderText="Enter expiration date" />
                    <button type="submit">Submit</button>
                </form>
            </div>
        );
    }
}

const mutation = gql`
   mutation AddBudget($value: Int, $expDate: String, $group: GroupInputType){
 addBudget(value: $value, expDate: $expDate, group: $group){
 id
 users{
    id
 }
 budgetInfo
 }
 }
`;

export default graphql(mutation)(Budget);