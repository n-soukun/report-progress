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
        },300);
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
        this.element = null;
    }
    render(parentElement){
        $(parentElement).append(`
            <div id="progress-bar-${this.pageId}" class="progress-bar">
                <div class="progress-text">進捗度</div>
                <div class="bar"><span class="bar-text">${this.val}%</span><div class="bar-val" style="width:${this.val}%;"><span class="bar-val-text">${this.val}%</span></div></div>
            </div>
        `);
        this.element = $(`#progress-bar-${this.pageId}`).get();
    }
    remove(){
        $(this.element).remove();
    }
}

class TabControl{
    constructor (obj,currentTab) {
        this.contents = obj;
        this.pageId = null;
        this.element = null;
        this.currentTab = currentTab;
    }
    render(parentElement){
        $(parentElement).append(`
        <div id="tab-box-${this.pageId}" class="tab-box">
            <div class="tab-control"></div>
            <div class="tab-content"></div>
        </div>`);
        this.element = $(`#tab-box-${this.pageId}`).get();
        for (let i = 0; i < this.contents.tabs.length; i++) {
            const tab = this.contents.tabs[i];
            $(this.element).find('.tab-control').append(`<div id="tab-button-${i}" class="tab-button">${tab.title}</div>`);
            $(this.element).find('.tab-content').append(`<div id="tab-section-${i}" class="tab-section"></div>`);
            tab.items.forEach(item => {
                item.pageId = this.pageId;
                item.render($(this.element).find(`#tab-section-${i}`).get());
            });
            $(this.element).find(`#tab-button-${i}`).on('click', ()=>{
                this.change(i);
            });
        }
        $(this.element).find(`#tab-button-${this.currentTab}`).addClass("selected-tab");
        $(this.element).find(`#tab-section-${this.currentTab}`).addClass("active-tab");
        $(this.element).css("height", this.contents.height);
    }
    change(id){
        $(this.element).find(`#tab-button-${this.currentTab}`).removeClass("selected-tab");
        $(this.element).find(`#tab-section-${this.currentTab}`).removeClass("active-tab");
        this.currentTab = id;
        $(this.element).find(`#tab-button-${this.currentTab}`).addClass("selected-tab");
        $(this.element).find(`#tab-section-${this.currentTab}`).addClass("active-tab");
        $(`#ex-body-${this.pageId}`).scrollTop(0);
    }
    remove(){
        $(this.element).remove();
    }
}

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

class Item{
    constructor(obj) {
        this.title = obj.title;
        this.value = obj.value;
        this.text = obj.text;
        this.callback = obj.callback;
        this.argument = obj.argument;
        this.itemId = null;
        this.element = null;
    }
    render(parentElement){
        $(parentElement).append(`
        <li id="ex-score-${this.itemId}" class="item">
            <div class="bar"><span class="bar-text">${this.value}% </span><div class="bar-val" style="width:${this.value}%;"><span class="bar-val-text">${this.value}% </span></div></div>
            <div class="list-content">
                <div class="list-title">${this.title}</div>
                <div class="list-value">${this.text}</div>
            </div>
        </li>
        `);
        this.element = $(`#ex-score-${this.itemId}`).get();
        if(this.argument != null){
            Object.keys(this.argument).forEach(key => {
                $(this.element).data(`${key}`,`${this.argument[key]}`);
            });
        }
        $(this.element).on("click", this.callback);
    }
    remove(){
        $(this.element).off("click");
        $(this.element).remove();
    }
}

class BigItem{
    constructor(obj) {
        this.title = obj.title;
        this.value = obj.value;
        this.text = obj.text;
        this.callback = obj.callback;
        this.argument = obj.argument;
        this.itemId = null;
        this.element = null;
    }
    render(parentElement){
        $(parentElement).append(`
        <li id="ex-score-${this.itemId}" class="big-item">
            <div class="bar"><span class="bar-text">${this.value}% </span><div class="bar-val" style="height:${this.value}%;"><span class="bar-val-text">${this.value}% </span></div></div>
            <div class="list-content">
                <div class="list-title">${this.title}</div>
                <div class="list-value">${this.text}</div>
            </div>
        </li>
        `);
        this.element = $(`#ex-score-${this.itemId}`).get();
        if(this.argument != null){
            Object.keys(this.argument).forEach(key => {
                $(this.element).data(`${key}`,`${this.argument[key]}`);
            });
        }
        $(this.element).on("click", this.callback);
    }
    remove(){
        $(this.element).off("click");
        $(this.element).remove();
    }
}