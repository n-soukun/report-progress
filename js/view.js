function htmlInit(title,value){
    $("body").append(`
    <div id="ex-score">
        <header id="ex-header" class="ex-header"><div id="ex-header-icon"></div><div id="back-button"></div><p>${title}</p></header>
        <div id="ex-body">
            <div class="pie">${value}%</div>
            <ul id="content-list" class="item-list">
            </ul>
        </div>
    </div>
    `);
    const iconPass =  chrome.extension.getURL("img/data_usage.svg");
    $("#ex-score #back-button").css("background-image",`url(${iconPass})`);
    $("#ex-score .pie").css("--pie-value", `${value}%`);
}

function setTitle(title){   
    $("#ex-score header p").text(title);
}

function setPieValue(value){
    $("#ex-score .pie").text(`${value}%`);
    $("#ex-score .pie").css("--pie-value", `${value}%`);
}

let id = 0;

function addListContents(title,value,callback){
    $("#ex-score #content-list").append(`
    <li id="ex-score-${id}">
        <div class="bar"><div class="bar-val" style="width:${value}%;"></div></div>
        <div class="list-content">
            <div class="list-title">${title}</div>
            <div class="list-value">進捗度${value}%</div>
        </div>
    </li>
    `);
    $(`#ex-score-${id}`).on("click", callback);
    id ++;
}

function refreshList(){
    for (let i = 0; i < id; i++) {
        $(`#ex-score-${i}`).off("click");
    }
    $("#ex-score #content-list").empty();
    id = 0;
}

function setBackButton(callback){
    const iconPass =  chrome.extension.getURL("img/arrow_back.svg");
    $("#ex-score #back-button").css("background-image",`url(${iconPass})`);
    $("#ex-score #back-button").on("click", callback);
}

function removeBackButton(){
    const iconPass =  chrome.extension.getURL("img/data_usage.svg");
    $("#ex-score #back-button").css("background-image",`url(${iconPass})`);
    $("#ex-score #back-button").off("click");
}

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
    }
    removePage(id){
        this.pages[id].remove()
    }
}

class Page{
    constructor (id,obj) {
        this.id = id;
        this.contents = obj;
        this.contents.items.forEach(item => {
            item.pageId = this.id;
        });
    }
    render(parentElement){
        const id = this.id;
        $(parentElement).append(`
        <section id="ex-page-${this.id}">
        <header id="ex-header-${this.id}" class="ex-header">
            <div id="back-button"></div><p>${this.contents.title}</p>
        </header>
        <div id="ex-body-${this.id}" class="ex-body"></div>
        </section>` 
        );
        this.contents.items.forEach(item => {
            console.log(item);
            item.render(`#ex-body-${this.id}`);
        });
    }
    remove(){
        this.contents.items.forEach(item => {
            item.remove();
        });
    }
}

class ItemList{
    constructor (id,array) {
        this.id = id;
        this.items = array;
        this.pageId = null;
    }
    render(parentElement){
        $(parentElement).append(`<ul id="content-list-${this.id}" class="item-list"></ul>`);
        let id = 0;
        this.items.forEach(item => {
            const itemId = `${this.pageId}-${this.id}-${id}`
            $(`#content-list-${this.id}`).append(`
            <li id="ex-score-${itemId}">
                <div class="bar"><div class="bar-val" style="width:${item.value}%;"></div></div>
                <div class="list-content">
                    <div class="list-title">${item.title}</div>
                    <div class="list-value">進捗度${item.value}%</div>
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
        $(`#content-list-${this.id}`).remove();
    }
}