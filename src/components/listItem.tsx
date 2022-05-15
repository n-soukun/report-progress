import React from "react"

export interface Props {
    title: string
    subText: string
    value: number
}

const ListItem: React.FC<Props> = (props) => {

    const barLength = {
        width: `${props.value}%`
    }

    return (
        <li className="item">
            <div className="list-content">
                <p className="list-title">{props.title}</p>
                <p className="list-value">{props.subText}</p>
            </div>
            <div className="bar">
                <div className="bar-val" style={barLength}></div>
                <span className="bar-val-text">進捗率{props.value}%</span>
            </div>
        </li>
    )
}

export default ListItem