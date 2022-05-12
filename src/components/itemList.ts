import $ from 'jquery'

class ItemList{
    element?: HTMLElement[]
    pageId?: number
    constructor (
        public id: number,
        public items: Array<any>
    ) {}
    render(parentElement: string){
        $(parentElement).append(`<ul id="content-list-${this.pageId}-${this.id}" class="item-list"></ul>`)
        this.element = $(`#content-list-${this.pageId}-${this.id}`).get()
        let id = 0
        this.items.forEach(item => {
            const itemId = `${this.pageId}-${this.id}-${id}`
            item.itemId = itemId
            item.render(this.element)
            id ++
        })
    }
    remove(){
        if(this.element){
            this.items.forEach(item => {
                item.remove()
            })
            $(this.element).remove()
        }
    }
}

export default ItemList