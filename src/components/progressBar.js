class ProgressBar{
    constructor (value) {
        this.value = value;
        this.pageId = null;
        this.element = null;
    }
    render(parentElement){
        $(parentElement).append(`
            <div id="progress-bar-${this.pageId}" class="progress-bar">
                <div class="progress-text">進捗度</div>
                <div class="bar">
                    <span class="bar-text">${this.value}%</span>
                    <div class="bar-val">
                        <span class="bar-val-text">${this.value}%</span>
                    </div>
                </div>
            </div>
        `);
        this.element = $(`#progress-bar-${this.pageId}`).get();
        $(this.element).find('.bar-val').animate({
            width: `${this.value}%`
        }, 800, "swing" );
    }
    remove(){
        $(this.element).remove();
    }
}

export default ProgressBar;