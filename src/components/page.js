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

export default Page;