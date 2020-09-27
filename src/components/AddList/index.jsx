import React from 'react';
import axios from "axios"

import List from "../List";
import './AddList.scss'
import Badge from "../Badge";
import closeSvg from "../../assets/img/close.svg"

const AddList = ({colors,onAdd}) => {
    const [visiblePopup,setVisiblePopup] = React.useState(false)
    const [selectedColor,setColor] = React.useState(null)
    const [inputValue,setInputValue] = React.useState('')
    const [isLoading,setLoading] = React.useState(false)

    React.useEffect(() => {
        if (Array.isArray(colors)){
            setColor(colors[0].id)
        }
    },[colors])

    const onClose = () => {
        setInputValue('')
        setVisiblePopup(false)
        setColor(colors[0].id)
    }

    const addList = () => {
        if (!inputValue) {
            alert('Введите название списка')
            return
        }
        setLoading(true)
        axios.post("http://localhost:3002/lists", {
            "name": inputValue,
            "colorId": selectedColor}).then(({data}) => {
            const color = colors.find(color => color.id === selectedColor)
            const obj = {...data,color,tasks:[]}
            onAdd(obj)
            onClose()
        }).finally(() => {
            setLoading(false)
        })
    }

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
                <img onClick={onClose} src={closeSvg} alt="Closer" className="add-list__popup-close-btn"/>
                <input onChange={(e) => setInputValue(e.target.value)}
                       className="field"  type="text" placeholder="Введите название списка" value={inputValue}/>
                <div className="add-list__popup-colors">
                    {colors.map((color,index) => <Badge className={selectedColor === color.id && 'active' }
                                                        onClick={() => setColor(color.id)}
                                                         key={color.id}
                                                        color={color.name}/>)}
                </div>
                 <button onClick={addList} className="button">{isLoading ? "Добавление ...": "Добавить"}</button>

            </div>}
        </div>
    );
};

export default AddList;