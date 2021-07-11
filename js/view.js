const htmlInit = (title,value) => {
    $("body").append(`
    <div id="ex-score">
        <h1>${title}</h1>
        <div class="pie">${value}%</div>
        <ul id="content-list">
        </ul>
    </div>
    `);
    $("#ex-score .pie").css("--pie-value", `${value}%`);
}

const setTitle = (title) => {
    $("#ex-score h1").text(title);
}

const setPieValue = (value) => {
    $("#ex-score .pie").text(value);
    $("#ex-score .pie").css("--pie-value", `${value}%`);
}

let id = 0;

const addListContents = (title,value,callback) => {
    $("#ex-score #content-list").append(`
    <li id="ex-score-${id}">
        <div class="list-title">${title}</div>
        <div class="list-value">進捗度${value}%</div>
        <div class="bar"><div class="bar-val" style="width:${value}%;"></div></div>
    </li>
    `);
    $(`#ex-score-${id}`).on("click", callback);
    id ++;
}