import React, { useState } from "react"

interface Props {
    tabs: Array<{
        name: string
        element: JSX.Element
    }>
    active?: number
}

const TabControl: React.FC<Props> = (props) => {
    const [activeTab, setActiveTab] = useState(props.active || 0)
    return (
        <div id="tab-box-${this.pageId}" className="tab-box">
            <div className="tab-control">
                {props.tabs.map((tab, i) => {
                    const classNames = ["tab-button"]
                    if(i == activeTab) classNames.push("selected-tab")
                    return <div className={classNames.join(" ")} onClick={()=>setActiveTab(i)}>{tab.name}</div>
                })}
            </div>
            <div className="tab-content">
                {props.tabs[activeTab].element}
            </div>
        </div>
    )
}

export default TabControl