function index(){
    setTitle("年間レポート");
    setPieValue(50);
    removeBackButton();
    refreshList();
    const trLength =  $("#result_table tbody tr").length
    const reportLength = (trLength - 4) / 3;
    for (let i = 0; i < reportLength; i++) {
        const subjectObj = new subject(i);
        addListContents(subjectObj.title, subjectObj.progress(),subjectSection);
    }
    $('#ex-score #ex-body').animate({ scrollTop: 0 }, 500);
}

function subjectSection(){
    const elementId = $(this).attr("id");
    const subjectId = elementId.match(/\d+$/);
    const thisSubject = new subject(subjectId);
    setTitle(thisSubject.title);
    setPieValue(thisSubject.progress());
    refreshList();
    setBackButton(index);
    thisSubject.reports.forEach(report => {
        const title = `第${report.index}回`;
        addListContents(title,report.progress,reportFunc);
    });
    $('#ex-score #ex-body').animate({ scrollTop: 0 }, 500);
}

function reportFunc(){
    console.log("ok");
}