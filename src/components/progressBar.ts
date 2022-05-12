import $ from 'jquery'

class ProgressBar{
    element?: HTMLElement[]
    pageId?: number
    constructor (
        public value: number
    ){}
    render(parentElement: string){
        $(parentElement).append(`
            <div id="progress-bar-${this.pageId}" class="progress-bar">
                <div class="progress-text">進捗率</div>
                <div class="bar">
                    <span class="bar-text">${this.value}%</span>
                    <div class="bar-val">
                        <span class="bar-val-text">${this.value}%</span>
                    </div>
                </div>
            </div>
        `)
        this.element = $(`#progress-bar-${this.pageId}`).get()
        $(this.element).find('.bar-val').animate({
            width: `${this.value}%`
        }, 800, "swing" )
    }
    remove(){
        if(this.element){
            $(this.element).remove()
        }
    }
}

export default ProgressBar