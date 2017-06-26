/*
import React, {Component} from 'react';
import {graphql, compose} from 'react-apollo';
import gql from 'graphql-tag';

import Loader from '../general/loader.js';

class EventDetail extends Component{
    constructor(){
        super();
    }
    render(){
        const data = this.props.data;
        if(data.loading){return <Loader />;}
        const event = data.event;
        return (
            <div>
                <h2>{name}</h2>
                <table className="bordered">
                    <thead>
                    <tr>
                        <td>{event.name}</td>
                    </tr>
                    </thead>

                    <tbody>
                    <td>{event.}</td>
                    </tbody>
                </table>
            </div>
        );
    }

}

function renderHead(names) {
    return names.map((name) => renderCell(name))
}

function renderBody(props, item) {
    let rowCols = props.map((prop) => renderCell(item[prop]));

    return (<tr>
        {rowCols}
    </tr>)

}

function renderCell(value) {
    return <td key={value}>{value}</td>;
}

const query = gql`
    query QueryEvent($id: ID!){
        event(id: $id){
            id
            name
        }
    }
`;

export default graphql(query, {
    options: ({ params }) => ({ variables: { id: params.id } })
})(EventDetail);

*/
