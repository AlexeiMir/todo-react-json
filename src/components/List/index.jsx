import React from 'react';
import './List.scss'
import classNames from 'classnames'
import Badge from "../Badge";


const List = ({items,onClick}) => {
    return (
        <ul onClick={onClick} className="list">
            {items.map(item => <li className={item.active ? 'active' : ''}>
                <i>
                    {item.icon ? item.icon : <Badge color={item.color}/>}
                </i>
                <span>{item.name}</span>
            </li>)}
            
        </ul>
    );
};

export default List;