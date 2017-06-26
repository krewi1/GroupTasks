import React from 'react';
import {Link, hashHistory} from 'react-router';

const ListWrapper = ({context, props, model, mutationable, clickable, externalListModification, keyValue}) => {
    const externalModificationEnabled = externalListModification && externalListModification.allowed;
    let addButton;
    if(externalModificationEnabled) {
        addButton = <i className="btn material-icons yellow darken-4"
                       onClick={() => hashHistory.push(externalModificationEnabled && externalListModification.path)}>ADD</i>;
    }
    return (
        <div>
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
            <div className="right-align">{externalModificationEnabled && addButton}</div>
        </div>
    );
};

function renderHead(names) {
    return names.map((name) => renderCell(name))
}

function renderBody(props, model, clickable, mutationable, keyValue) {
    return model.map((item) => {
        let importantKey = item[keyValue];
        let delButton;
        let clickButton;
        if (mutationable.allowed) {
            delButton =
                <td>
                    <i className="btn material-icons red darken-4" onClick={() => mutationable.handler(importantKey)}>delete</i>
                </td>;
        }

        if (clickable.allowed) {
            clickButton =
                <td>
                    <div className="btn material-icons blue darken-4"
                         onClick={() => clickable.handler(importantKey)}>{clickable.value}</div>
                </td>;
        }
        let rowCols = props.map((prop) => renderCell(item[prop]));
        if (!clickable.allowed) {
            return (<tr key={item.id}>
                {rowCols}
                {mutationable.allowed && delButton}
            </tr>)
        }
        return (<tr className="clickAble" onClick={() => clickable.handler(importantKey)}>
            {rowCols}
            {mutationable.allowed && delButton}
            {clickable.allowed && clickButton}
        </tr>)
    })
}

function renderCell(value) {
    return <td key={value}>{value}</td>;
}


export default ListWrapper;