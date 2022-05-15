import $ from 'jquery'

interface TabControlData {
    tabs: Array<ATabContents>
    height: string
}

interface ATabContents{
    title: string
    items: Array<any>
}

class TabControl{
    element?: HTMLElement[]
    pageId?: number
    constructor (
        public contents: TabControlData,
        public currentTab: number
    ){}
    render(parentElement: string){
        $(parentElement).append(`
        <div id="tab-box-${this.pageId}" class="tab-box">
            <div class="tab-control"></div>
            <div class="tab-content"></div>
        </div>`)
        const element = $(`#tab-box-${this.pageId}`)
        this.element = element.get()
        for (let i = 0; i < this.contents.tabs.length; i++) {
            const tab = this.contents.tabs[i]
            element.find('.tab-control').append(`<div id="tab-button-${i}" class="tab-button">${tab.title}</div>`)
            element.find('.tab-content').append(`<div id="tab-section-${i}" class="tab-section"></div>`)
            tab.items.forEach(item => {
                item.pageId = this.pageId;
                item.render(element.find(`#tab-section-${i}`).get())
            });
            element.find(`#tab-button-${i}`).on('click', ()=>{
                this.change(i)
            });
        }
        element.find(`#tab-button-${this.currentTab}`).addClass("selected-tab")
        element.find(`#tab-section-${this.currentTab}`).addClass("active-tab")
        element.css("height", this.contents.height)
    }
    change(id: number){
        if(this.element){
            $(this.element).find(`#tab-button-${this.currentTab}`).removeClass("selected-tab")
            $(this.element).find(`#tab-section-${this.currentTab}`).removeClass("active-tab")
            this.currentTab = id
            $(this.element).find(`#tab-button-${this.currentTab}`).addClass("selected-tab")
            $(this.element).find(`#tab-section-${this.currentTab}`).addClass("active-tab")
            $(`#ex-body-${this.pageId}`).scrollTop(0)
        }
    }
    remove(){
        if(this.element){
            $(this.element).remove()
        }
    }
}

export default TabControl