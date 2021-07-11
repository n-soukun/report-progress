function htmlInit(title,value){
    $("body").append(`
    <div id="ex-score">
        <header>${title}</header>
        <div class="pie">${value}%</div>
        <ul id="content-list">
        </ul>
    </div>
    `);
    $("#ex-score .pie").css("--pie-value", `${value}%`);
}

function setTitle(title){   
    $("#ex-score header").text(title);
}

function setPieValue(value){
    $("#ex-score .pie").text(`${value}%`);
    $("#ex-score .pie").css("--pie-value", `${value}%`);
}

let id = 0;

function addListContents(title,value,callback){
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

function refreshList(){
    for (let i = 0; i < id; i++) {
        $(`#ex-score-${i}`).off("click");
    }
    $("#ex-score #content-list").empty();
    id = 0;
}