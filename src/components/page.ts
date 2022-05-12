import $ from 'jquery'

export interface PageData {
    title: string
    items: Array<any>
    callback?: ()=>any
}

class Page{
    element?: HTMLElement[]
    constructor (
        public id: number,
        public contents: PageData
    ) {
        this.contents.items.forEach(item => {
            item.pageId = this.id
        })
    }
    render(parentElement: string){
        const id = this.id
        $(parentElement).append(`
        <section id="ex-page-${this.id}" class="ex-page">
        <header id="ex-header-${this.id}" class="ex-header">
            <div class="header-button"></div><p>${this.contents.title}</p>
        </header>
        <div id="ex-body-${this.id}" class="ex-body"></div>
        </section>` 
        )
        this.element = $(`#ex-page-${this.id}`).get()
        $(this.element).css('z-index', id)
        const headerButton = $(this.element).find('.header-button')
        if(this.id == 0){
            headerButton.attr('id', 'home')
        }else{
            headerButton.attr('id', 'back-button')
            if(this.contents.callback){
                headerButton.on('click', this.contents.callback)
            }
        }
        this.contents.items.forEach(item => {
            item.render(`#ex-body-${this.id}`)
        })
    }
    remove(){
        if(this.element){
            const element = $(this.element)
            element.removeClass("pageShow")
            element.addClass("pageOut")
            setTimeout(()=>{
                this.contents.items.forEach(item => {
                    item.remove()
                })
                element.remove()
            },300)
        }
    }
    show(){
        if(this.element){
            $(this.element).removeClass('pageHide')
            $(this.element).addClass('pageShow')
        }
    }
    hide(){
        if(this.element){
            $(this.element).addClass('pageHide')
        }
    }
}

export default Page