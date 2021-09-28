function htmlInit(title,value){
    $("body").append(`
    <div id="ex-score">
        <header id="ex-header"><div id="back-button"></div><p>${title}</p></header>
        <div id="ex-body">
            <div class="pie">${value}%</div>
            <ul id="content-list">
            </ul>
        </div>
    </div>
    `);
    const iconPass =  chrome.extension.getURL("img/arrow_back.svg");
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

function setBackButton(callback){
    $("#ex-score #back-button").fadeIn(200);
    $("#ex-score #back-button").on("click", callback);
}

function removeBackButton(){
    $("#ex-score #back-button").fadeOut(200);
    $("#ex-score #back-button").off("click");
}