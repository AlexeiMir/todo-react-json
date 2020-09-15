import React from 'react';
import './List.scss'
import classNames from 'classnames'
import Badge from "../Badge";
import removeSvg from '../../assets/img/remove.svg'


const List = ({items,onClick,isRemovable,onRemove}) => {

    const removeList = (list) => {
        if (window.confirm('Вы действительно хотите удалить лист?')){
            onRemove(list)
        }
    }

    return (
        <ul onClick={onClick} className="list">
            {items.map((item,index) => <li key={item.index} className={item.active ? 'active' : ''}>
                <i>
                    {item.icon ? item.icon : <Badge color={item.color}/>}
                </i>
                <span>{item.name}</span>
                {isRemovable && <img onClick={() => removeList(item)} className="list__remove-icon" src={removeSvg} alt="Remove icon"/>}
            </li>)}
            
        </ul>
    );
};

export default List;