const gradeData = new GradeData();
const app = new App();

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

function subjectSection(subjectId){
    //const elementId = $(this).attr("id");
    //const subjectId = elementId.match(/\d+$/);
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

function backPage(){
    app.removePage(app.pages.length - 1);
}

function reportSectionTest(){
    console.log("ok");
}

function subjectSectionTest(){
    const elementId = $(this).attr('id');
    const subjectId = (elementId.match(/\d+$/))[0];
    const subject =  gradeData.getSubjectById(subjectId);
    const obj = {
        title : subject.title,
        items : [],
        callback: backPage
    }
    let reportItems = [];
    for (let i = 0; i < subject.reports.length; i++) {
        const report = subject.reports[i];
        const obj = {
            title: `第${report.index}回`,
            value: report.progress,
            text: `〆${report.month}/15`,
            callback: reportSectionTest
        }
        reportItems[i] =  obj;
    }
    obj.items.push(new ProgressBar(subject.progress()));
    obj.items.push(new ItemList(0,reportItems));
    app.createPage(obj);
}

function monthSectionTest(){
    const elementId = $(this).attr('id');
    const id = Number((elementId.match(/\d+$/))[0]);
    const month =  gradeData.getMonthlyReport(id + 6);
    const obj = {
        title : month.title,
        items : [],
        callback: backPage
    }
    let reportItems = [];
    for (let i = 0; i < month.reports.length; i++) {
        const report = month.reports[i];
        const obj = {
            title: gradeData.subjectNames[report.subjectId],
            value: report.progress,
            text: `第${report.index}回`,
            callback: reportSectionTest
        }
        reportItems[i] =  obj;
    }
    obj.items.push(new ProgressBar(month.progress()));
    obj.items.push(new ItemList(0,reportItems));
    app.createPage(obj);
}

function test(){
    app.render('body');
    const obj = {
        title : "年間レポート(Beta)",
        items : []
    }
    let subjectItems = [];
    for (let i = 0; i < gradeData.subjectNames.length; i++) {
        const subject = gradeData.getSubjectById(i);
        const title = gradeData.subjectNames[i];
        const obj = {
            title: title,
            value: subject.progress(),
            text: `全${subject.reports.length}回`,
            callback: subjectSectionTest
        }
        subjectItems[i] =  obj;
    }
    let monthItems = [];
    for (let i = 0; i < gradeData.month.length; i++) {
        const month = gradeData.month[i];
        const monthlyReport = gradeData.getMonthlyReport(month);
        const title = monthlyReport.title;
        const obj = {
            title: title,
            value: monthlyReport.progress(),
            text: `全${monthlyReport.reports.length}個`,
            callback: monthSectionTest
        }
        monthItems[i] =  obj;
    }
    const tabObj = {
        tabs : [
            {title: "教科別",items: [new ItemList(0,subjectItems)]},
            {title: "月別",items: [new ItemList(1,monthItems)]}
        ],
        height : "initial"
    }
    obj.items.push(new ProgressBar(gradeData.progress()));
    obj.items.push(new TabControl(tabObj));
    app.createPage(obj);
}

function reportFunc(){
    console.log("ok");
}