import React, {Component} from 'react';
import gql from 'graphql-tag';
import {graphql} from 'react-apollo';
import {Link, hashHistory} from 'react-router';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';

class EventCreate extends Component {
    constructor({user}) {
        super();
        this.state = {
            id: user.group.id,
            name: '',
            value: '0',
            expDate: moment(0, 'mm/dd/YYYY')
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
                name: this.state.name,
                value: Number(this.state.value),
                expDate: date,
                groupId: this.state.id
            }
        };
        this.props.mutate(variableProp)
            .then(() => hashHistory.push('/'));
    };

    render() {
        return (
            <div>
                <Link to="/">Back</Link>

                <h3>Create a new group</h3>

                <form onSubmit={this.onSubmit}>
                    <label>Event name
                        <input type="text"
                               name="name"
                               value={this.state.name}
                               placeholder="Event name"
                               onChange={this.handleInputChange}/>
                    </label>

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
   mutation AddEvent($name: String, $value: Int, $expDate: String, $groupId: ID){
        addEvent(name: $name, value: $value, expDate: $expDate, groupId: $groupId){
            id
            events{
                id
                name
                expDate
                value
            }
        }
    }
`;

export default graphql(mutation)(EventCreate);

