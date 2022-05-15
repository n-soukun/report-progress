import React from "react"
import ListItem, { Props as ListItemProps } from './listItem'

interface Props {
    items: ListItemProps[]
}

const List: React.FC<Props> = (props) => {
    return (
        <ul className="list">
            {props.items.map(item => <ListItem title={item.title} subText={item.subText} value={item.value}/>)}
        </ul>
    )
}

export default List