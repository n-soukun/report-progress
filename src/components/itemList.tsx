import React from "react"
import BigItem from "./bigItem"
import { Props as BigItemProps } from './bigItem'

interface Props {
    items: BigItemProps[]
}

const List: React.FC<Props> = (props) => {
    return (
        <ul className="item-list">
            {props.items.map(item => <BigItem title={item.title} text={item.text} value={item.value}/>)}
        </ul>
    )
}

export default List