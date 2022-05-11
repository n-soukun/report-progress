import $ from 'jquery'

class TabControl{
    constructor (obj,currentTab) {
        this.contents = obj
        this.pageId = null
        this.element = null
        this.currentTab = currentTab
    }
    render(parentElement){
        $(parentElement).append(`
        <div id="tab-box-${this.pageId}" class="tab-box">
            <div class="tab-control"></div>
            <div class="tab-content"></div>
        </div>`)
        this.element = $(`#tab-box-${this.pageId}`).get()
        for (let i = 0; i < this.contents.tabs.length; i++) {
            const tab = this.contents.tabs[i]
            $(this.element).find('.tab-control').append(`<div id="tab-button-${i}" class="tab-button">${tab.title}</div>`)
            $(this.element).find('.tab-content').append(`<div id="tab-section-${i}" class="tab-section"></div>`)
            tab.items.forEach(item => {
                item.pageId = this.pageId;
                item.render($(this.element).find(`#tab-section-${i}`).get())
            });
            $(this.element).find(`#tab-button-${i}`).on('click', ()=>{
                this.change(i)
            });
        }
        $(this.element).find(`#tab-button-${this.currentTab}`).addClass("selected-tab")
        $(this.element).find(`#tab-section-${this.currentTab}`).addClass("active-tab")
        $(this.element).css("height", this.contents.height)
    }
    change(id){
        $(this.element).find(`#tab-button-${this.currentTab}`).removeClass("selected-tab")
        $(this.element).find(`#tab-section-${this.currentTab}`).removeClass("active-tab")
        this.currentTab = id
        $(this.element).find(`#tab-button-${this.currentTab}`).addClass("selected-tab")
        $(this.element).find(`#tab-section-${this.currentTab}`).addClass("active-tab")
        $(`#ex-body-${this.pageId}`).scrollTop(0)
    }
    remove(){
        $(this.element).remove()
    }
}

export default TabControl