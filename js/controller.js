const gradeData = new GradeData();
const app = new App();
app.render('body');

function backPage(){
    app.removePage(app.pages.length - 1);
}

function homeSection(){
    const obj = {
        title : "レポート進捗度(beta)",
        items : []
    }
    items = [
        new BigItem({
            title: "年間レポート",
            value: gradeData.progress(),
            text: "〆12/15",
            callback: yearSection,
            argument: {}
        }),
        new BigItem({
            title: "10月レポート",
            value: (gradeData.getMonthlyReport(10)).progress(),
            text: "〆10/15",
            callback: monthSection,
            argument: {id:10}
        })
    ]
    obj.items.push(new ItemList(0,items));
    app.createPage(obj);
}

function yearSection(){
    const obj = {
        title : "年間レポート",
        items : [],
        callback: backPage
    }
    let monthItems = [];
    for (let i = 0; i < gradeData.month.length; i++) {
        const month = gradeData.month[i];
        const monthlyReport = gradeData.getMonthlyReport(month);
        const title = monthlyReport.title;
        const item = new Item({
            title: title,
            value: monthlyReport.progress(),
            text: `全${monthlyReport.reports.length}個`,
            callback: monthSection,
            argument: {id:month}
        });
        monthItems[i] =  item;
    }
    let subjectItems = [];
    for (let i = 0; i < gradeData.subjectNames.length; i++) {
        const subject = gradeData.getSubjectById(i);
        const title = gradeData.subjectNames[i];
        const item = new Item({
            title: title,
            value: subject.progress(),
            text: `全${subject.reports.length}回`,
            callback: subjectSection,
            argument: {id:i}
        });
        subjectItems[i] =  item;
    }
    const tabObj = {
        tabs : [
            {title: "月別",items: [new ItemList(0,monthItems)]},
            {title: "教科別",items: [new ItemList(1,subjectItems)]}
        ],
        height : "initial"
    }
    obj.items.push(new ProgressBar(gradeData.progress()));
    obj.items.push(new TabControl(tabObj));
    app.createPage(obj);
}

function subjectSection(){
    const subjectId = $(this).data('id');
    const subject =  gradeData.getSubjectById(subjectId);
    const obj = {
        title : subject.title,
        items : [],
        callback: backPage
    }
    let reportItems = [];
    for (let i = 0; i < subject.reports.length; i++) {
        const report = subject.reports[i];
        const item = new Item({
            title: `第${report.index}回`,
            value: report.progress,
            text: `〆${report.month}/15`,
            callback: reportSection,
            argument: {}
        });
        reportItems[i] = item;
    }
    obj.items.push(new ProgressBar(subject.progress()));
    obj.items.push(new ItemList(0,reportItems));
    app.createPage(obj);
}

function monthSection(){
    const id = $(this).data('id');
    const month =  gradeData.getMonthlyReport(id);
    const obj = {
        title : month.title,
        items : [],
        callback: backPage
    }
    let reportItems = [];
    for (let i = 0; i < month.reports.length; i++) {
        const report = month.reports[i];
        const item = new Item({
            title: gradeData.subjectNames[report.subjectId],
            value: report.progress,
            text: `第${report.index}回`,
            callback: reportSection,
            argument: {}
        });
        reportItems[i] =  item;
    }
    obj.items.push(new ProgressBar(month.progress()));
    obj.items.push(new ItemList(0,reportItems));
    app.createPage(obj);
}

function reportSection(){
    console.log("ok");
}