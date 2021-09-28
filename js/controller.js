const gradeData = new GradeData();

function index(){
    setTitle("進捗度グラフ");
    setPieValue(gradeData.progress());
    removeBackButton();
    refreshList();
    const trLength =  $("#result_table tbody tr").length
    const reportLength = (trLength - 4) / 3;
    for (let i = 0; i < reportLength; i++) {
        const subjectObj = gradeData.getSubjectById(i);
        addListContents(subjectObj.title, subjectObj.progress(),subjectSection);
    }
    $('#ex-score #ex-body').animate({ scrollTop: 0 }, 500);
}

function subjectSection(){
    const elementId = $(this).attr("id");
    const subjectId = elementId.match(/\d+$/);
    const thisSubject = gradeData.getSubjectById(subjectId);
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

function test(){
    const app = new App();
    app.render('body');
    const obj = {
        title : "テスト画面",
        items : []
    }
    const testItems = [
        {
            title: "hoge1",
            value: 50
        },
        {
            title: "hoge2",
            value: 100
        }
    ]
    obj.items.push(new ItemList(0,testItems));
    app.createPage(obj);
}

function reportFunc(){
    console.log("ok");
}