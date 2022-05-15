import $ from 'jquery'
import ListItem from './listItem'

class List{
    element?: HTMLElement[]
    pageId?: number
    constructor (
        public id: number,
        public listItems: Array<ListItem>
    ){}
    render(parentElement: HTMLElement[]){
        $(parentElement).append(`<ul id="list-${this.pageId}-${this.id}" class="list"></ul>`)
        const element = $(`#list-${this.pageId}-${this.id}`).get()
        this.element = element
        let id = 0
        this.listItems.forEach(item => {
            const itemId = `${this.pageId}-${this.id}-${id}`
            item.itemId = itemId
            item.render(element)
            id ++
        })
    }
    remove(){
        if(this.element){
            this.listItems.forEach(item => {
                item.remove()
            })
            $(this.element).remove()
        }
    }
}

export default List