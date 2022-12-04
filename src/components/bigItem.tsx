import React from 'react'

export interface Props {
    title: string
    text: string
    value: number
    onClick?: () => void
}

const BigItem: React.FC<Props> = (props) => {
    return (
        <li className="big-item" onClick={()=>{if(props.onClick)props.onClick()}}>
                <div className="bar">
                    <span className="bar-text">{props.value}%</span>
                    <div className="bar-val" style={{height: `${props.value}%`}}>
                        <span className="bar-val-text">{props.value}%</span>
                    </div>
                </div>
                <div className="list-content">
                    <div className="list-title">{props.title}</div>
                    <div className="list-value">{props.text}</div>
                </div>
        </li>
    )
}

export default BigItem