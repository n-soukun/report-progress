import React from 'react'

interface Props {
    name: string
    value: number
}

const ProgressBar: React.FC<Props> = (props) => {

    const barLength = {
        width: `${props.value}%`
    }

    return (
        <div className="progress-bar">
            <div className="progress-text">{props.name}</div>
            <div className="bar">
                <span className="bar-text">{props.value}%</span>
                <div className="bar-val" style={barLength}>
                    <span className="bar-val-text">{props.value}%</span>
                </div>
            </div>
        </div>
    )
}

export default ProgressBar