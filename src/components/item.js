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
            <div class="bar">
                <span class="bar-text">${this.value}% </span>
                <div class="bar-val">
                    <span class="bar-val-text">${this.value}% </span>
                </div>
            </div>
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
        $(this.element).find('.bar-val').animate({
            width: this.value
        }, 800, "swing" );
    }
    remove(){
        $(this.element).off("click");
        $(this.element).remove();
    }
}

export default Item;