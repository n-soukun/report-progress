class ItemList{
    constructor (id,array) {
        this.id = id;
        this.items = array;
        this.element = null;
        this.pageId = null;
    }
    render(parentElement){
        $(parentElement).append(`<ul id="content-list-${this.pageId}-${this.id}" class="item-list"></ul>`);
        this.element = $(`#content-list-${this.pageId}-${this.id}`).get();
        let id = 0;
        this.items.forEach(item => {
            const itemId = `${this.pageId}-${this.id}-${id}`
            item.itemId = itemId;
            item.render(this.element);
            id ++;
        });
    }
    remove(){
        this.items.forEach(item => {
            item.remove(); 
        });
        $(this.element).remove();
    }
}

export default ItemList;