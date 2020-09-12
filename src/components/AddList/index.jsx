import React from 'react';
import List from "../List";
import './AddList.scss'
import Badge from "../Badge";
import closeSvg from "../../assets/img/close.svg"

const AddList = ({colors}) => {
    const [visiblePopup,setVisiblePopup] = React.useState(false)
    const [selectedColor,setColor] = React.useState(colors[0].id)
    return (
        <div className="add-list">
            <List onClick={() => setVisiblePopup(true)} items={[{
                className:'list__add-button',
                icon:(
                    <svg
                        width="12"
                        height="12"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M8 1V15"
                            stroke="black"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M1 8H15"
                            stroke="black"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>

                ),
                name:'Добавить лист'
            }]}/>
            {visiblePopup && <div className="add-list__popup">
                <img onClick={() => setVisiblePopup(false)} src={closeSvg} alt="Closer" className="add-list__popup-close-btn"/>
                <input className="field"  type="text" placeholder="Введите название списка"/>
                <div className="add-list__popup-colors">
                    {colors.map((color,index) => <Badge className={selectedColor === color.id && 'active' }
                                                        onClick={() => setColor(color.id)}
                                                         key={color.id}
                                                        color={color.name}/>)}
                </div>
                <button className="button">Добавить</button>

            </div>}
        </div>
    );
};

export default AddList;