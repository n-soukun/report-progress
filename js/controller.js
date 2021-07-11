function index(){
    htmlInit("年間レポート", 50);
    const trLength =  $("#result_table tbody tr").length
    const reportLength = (trLength - 4) / 3;
    for (let i = 0; i < reportLength; i++) {
        const subjectObj = new subject(i);
        addListContents(subjectObj.title, subjectObj.progress(),subjectSection);
    }
}

function subjectSection(){ 
    const elementId = $(this).attr("id");
    const subjectId = elementId.match(/\d+$/);
    const thisSubject = new subject(subjectId);
    setTitle(thisSubject.title);
    setPieValue(thisSubject.progress());
    refreshList();
    thisSubject.reports.forEach(report => {
        const title = `第${report.index}回`;
        addListContents(title,report.progress,reportFunc);
    });
    $('#ex-score').animate({ scrollTop: 0 }, 500);
}

function reportFunc(){
    console.log("ok");
}