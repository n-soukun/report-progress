import $ from 'jquery'

interface BigItemOption {
    title: string
    value: number
    text: string
    callback: ()=>any
    argument?: object
}

class BigItem{
    title: string
    value: number
    text: string
    callback: ()=>any
    argument?: object
    itemId?: string
    element?: HTMLElement[]
    constructor(data: BigItemOption) {
        this.title = data.title
        this.value = data.value
        this.text = data.text
        this.callback = data.callback
        this.argument = data.argument
    }
    render(parentElement: string){
        $(parentElement).append(`
        <li id="ex-score-${this.itemId}" class="big-item">
            <div class="bar"><span class="bar-text">${this.value}% </span><div class="bar-val" style="height:${this.value}%;"><span class="bar-val-text">${this.value}% </span></div></div>
            <div class="list-content">
                <div class="list-title">${this.title}</div>
                <div class="list-value">${this.text}</div>
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
    }
    remove(){
        if(this.element){
            $(this.element).off("click")
            $(this.element).remove()
        }
    }
}

export default BigItem