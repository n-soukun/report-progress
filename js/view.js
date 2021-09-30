class App{
    constructor () {
        this.pages = [];
    }
    render(parentElement){
        $(parentElement).append(`
        <div id="ex-score"></div>
        `);
    }
    createPage(obj){
        const id = this.pages.length;
        this.pages[id] = new Page(id,obj);
        this.pages[id].render("#ex-score");
        if(id > 0){
            this.pages[id -1].hide();
        }
    }
    removePage(id){
        this.pages[id].remove();
        this.pages.splice(id, 1);
        if(id > 0){
            this.pages[id -1].show();
        }
    }
}

class Page{
    constructor (id,obj) {
        this.id = id;
        this.contents = obj;
        this.contents.items.forEach(item => {
            item.pageId = this.id;
        });
        this.element = null;
    }
    render(parentElement){
        const id = this.id;
        $(parentElement).append(`
        <section id="ex-page-${this.id}" class="ex-page">
        <header id="ex-header-${this.id}" class="ex-header">
            <div class="header-button"></div><p>${this.contents.title}</p>
        </header>
        <div id="ex-body-${this.id}" class="ex-body"></div>
        </section>` 
        );
        this.element = $(`#ex-page-${this.id}`).get();
        $(this.element).css('z-index', id);
        if(this.id == 0){
            const iconPass =  chrome.extension.getURL("img/data_usage.svg");
            $(this.element).find('.header-button').css("background-image",`url(${iconPass})`);
        }else{
            const iconPass =  chrome.extension.getURL("img/arrow_back.svg");
            $(this.element).find('.header-button').css("background-image",`url(${iconPass})`);
            $(this.element).find('.header-button').attr('id', 'back-button');
            $(this.element).find('.header-button').on("click", this.contents.callback);
        }
        this.contents.items.forEach(item => {
            item.render(`#ex-body-${this.id}`);
        });
    }
    remove(){
        $(this.element).removeClass("pageShow"); 
        $(this.element).addClass("pageOut");
        setTimeout(()=>{
            this.contents.items.forEach(item => {
                item.remove();
            });
            $(this.element).remove();
        },400);
    }
    show(){
        $(this.element).removeClass('pageHide');
        $(this.element).addClass('pageShow');
    }
    hide(){
        $(this.element).addClass('pageHide');
    }
}

class ProgressBar{
    constructor (val) {
        this.val = val;
        this.pageId = null;
    }
    render(parentElement){
        $(parentElement).append(`
            <div id="progress-bar-${this.pageId}" class="progress-bar">
                <div class="progress-text">進捗度</div>
                 <div class="bar"><span class="bar-text">${this.val}%</span><div class="bar-val" style="width:${this.val}%;"><span class="bar-val-text">${this.val}%</span></div></div>
            </div>
        `);
    }
    remove(){

    }
}

class TabControl{
    constructor (obj) {
        this.contents = obj;
        this.pageId = null;
        this.element = null;
    }
    render(parentElement){
        for (let i = 0; i < this.contents.items.length; i++) {
            const item = this.contents.items[i];
            item.pageId = this.pageId;
        }

    }
    remove(){

    }
}

class ItemList{
    constructor (id,array) {
        this.id = id;
        this.items = array;
        this.pageId = null;
    }
    render(parentElement){
        $(parentElement).append(`<ul id="content-list-${this.pageId}-${this.id}" class="item-list"></ul>`);
        let id = 0;
        this.items.forEach(item => {
            const itemId = `${this.pageId}-${this.id}-${id}`
            $(`#content-list-${this.pageId}-${this.id}`).append(`
            <li id="ex-score-${itemId}">
                <div class="bar"><span class="bar-text">${item.value}% </span><div class="bar-val" style="width:${item.value}%;"><span class="bar-val-text">${item.value}% </span></div></div>
                <div class="list-content">
                    <div class="list-title">${item.title}</div>
                    <div class="list-value">${item.text}</div>
                </div>
            </li>
            `);
            $(`#ex-score-${itemId}`).on("click", item.callback);
            id ++;
        });
    }
    remove(){
        for (let id = 0; id < this.items.length; id++) {
            const itemId = `${this.pageId}-${this.id}-${id}`
            $(`#ex-score-${itemId}`).off("click");
        }
        $(`#content-list-${this.pageId}-${this.id}`).remove();
    }
}