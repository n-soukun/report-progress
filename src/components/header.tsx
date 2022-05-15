import React from 'react'

interface Props {
    title: string
    buttonType: "home" | "back-button"
}

const Header: React.FC<Props> = (props) => {
    return (
        <header className="ex-header">
            <div className="ex-header-inner">
                <div className="header-button nav-button" id={props.buttonType}></div>
                <p>{props.title}</p>
            </div>
            <div className="ex-header-inner">
                <div id="close-button" className="nav-button"></div>
            </div>
        </header>
    )
}

export default Header