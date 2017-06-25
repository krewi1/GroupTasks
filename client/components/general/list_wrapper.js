import React from 'react';
import {Link} from 'react-router';

const ListWrapper = ({props, model, mutationable, clickable, keyValue}) => { // eslint-disable-line react/prefer-stateless-function
    return (
        <table className="bordered">
            <thead>
            <tr>
                {renderHead(Object.values(props))}
            </tr>
            </thead>

            <tbody>
            {renderBody(Object.keys(props), model, clickable, mutationable, keyValue)}
            </tbody>
        </table>
    );
};

function renderHead(names) {
    return names.map((name) => renderCell(name))
}

function renderBody(props, model, clickable, mutationable, keyValue) {
    return model.map((item) => {
        let deleteKey = item[keyValue];
        let delButton;
        if (mutationable.allowed) {
            delButton = <td><i className="btn material-icons red darken-4" onClick={()=>mutationable.handler(deleteKey)}>delete</i></td>;
        }
        let rowCols = props.map((prop) => renderCell(item[prop]));
        if (!clickable.allowed) {
            return (<tr key={item.id}>
                {rowCols}
                {mutationable.allowed && delButton}
            </tr>)
        }
        return (<tr>
            <Link to={clickable.path}>
                {rowCols}
                {mutationable.allowed && delButton}
            </Link>
        </tr>)
    })
}

function renderCell(value) {
    return <td key={value}>{value}</td>;
}


export default ListWrapper;