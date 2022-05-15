import $ from 'jquery'

interface ListItemOption {
    title: string
    value: number
    text: string
    callback: ()=>any
    argument?: object
}

class ListItem{
    title: string
    value: number
    text: string
    callback: ()=>any
    argument?: object
    element?: HTMLElement[]
    itemId?: string
    constructor(obj: ListItemOption) {
        this.title = obj.title
        this.value = obj.value
        this.text = obj.text
        this.callback = obj.callback
        this.argument = obj.argument
    }
    render(parentElement: HTMLElement[]){
        $(parentElement).append(`
        <li id="ex-score-${this.itemId}" class="item">
            <div class="list-content">
                <div class="list-title">${this.title}</div>
                <div class="list-value">${this.text}</div>
            </div>
            <div class="bar">
                <div class="bar-val"></div>
                <span class="bar-val-text">進捗率${this.value}% </span>
            </div>
        </li>
        `)
        this.element = $(`#ex-score-${this.itemId}`).get()
        if(this.argument){
            for (const [key, value] of Object.entries(this.argument)) {
                $(this.element).data(`${key}`,`${value}`)
            }
        }
        $(this.element).on("click", this.callback)
        $(this.element).find('.bar-val').animate({
            width: `${this.value}%`
        }, 800, "swing" )
    }
    remove(){
        if(this.element){
            $(this.element).off("click")
            $(this.element).remove()
        }
    }
}

export default ListItem