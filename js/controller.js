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
            text: `〆${gradeData.month.slice(-1)[0]}/15`,
            callback: yearSection,
            argument: {}
        })
    ]
    const notDoneReports = gradeData.getNotDoneReports();
    notDoneReports.forEach(month => {
        items.push(
            new BigItem({
                title: `${month}月レポート`,
                value: (gradeData.getMonthlyReport(month)).progress(),
                text: `〆${month}/15`,
                callback: monthSection,
                argument: {id:month}
            })
        )
    });
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
    obj.items.push(new TabControl(tabObj, 0));
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
    const incompleteReports = subject.getIncompleteReports();
    let incompleteReportItems = [];
    for (let i = 0; i < incompleteReports.length; i++) {
        const report = incompleteReports[i];
        const item = new Item({
            title: `第${report.index}回`,
            value: report.progress,
            text: `〆${report.month}/15`,
            callback: reportSection,
            argument: {}
        });
        incompleteReportItems[i] =  item;
    }
    const completeReports = subject.getCompleteReports();
    let completeReportItems = [];
    for (let i = 0; i < completeReports.length; i++) {
        const report = completeReports[i];
        const item = new Item({
            title: `第${report.index}回`,
            value: report.progress,
            text: `〆${report.month}/15`,
            callback: reportSection,
            argument: {}
        });
        completeReportItems[i] =  item;
    }
    const tabObj = {
        tabs : [
            {title: `未完了- ${incompleteReportItems.length}`,items: [new ItemList(0,incompleteReportItems)]},
            {title: `完了 - ${completeReportItems.length}`,items: [new ItemList(1,completeReportItems)]}
        ],
        height : "initial"
    }
    let currentTab = 0;
    if(incompleteReportItems.length == 0) currentTab = 1;
    obj.items.push(new ProgressBar(subject.progress()));
    obj.items.push(new TabControl(tabObj, currentTab));
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
    const incompleteReports = month.getIncompleteReports();
    let incompleteReportItems = [];
    for (let i = 0; i < incompleteReports.length; i++) {
        const report = incompleteReports[i];
        const item = new Item({
            title: gradeData.subjectNames[report.subjectId],
            value: report.progress,
            text: `第${report.index}回`,
            callback: reportSection,
            argument: {}
        });
        incompleteReportItems[i] =  item;
    }
    const completeReports = month.getCompleteReports();
    let completeReportItems = [];
    for (let i = 0; i < completeReports.length; i++) {
        const report = completeReports[i];
        const item = new Item({
            title: gradeData.subjectNames[report.subjectId],
            value: report.progress,
            text: `第${report.index}回`,
            callback: reportSection,
            argument: {}
        });
        completeReportItems[i] =  item;
    }
    const tabObj = {
        tabs : [
            {title: `未完了- ${incompleteReportItems.length}`,items: [new ItemList(0,incompleteReportItems)]},
            {title: `完了 - ${completeReportItems.length}`,items: [new ItemList(1,completeReportItems)]}
        ],
        height : "initial"
    }
    let currentTab = 0
    if(incompleteReportItems.length == 0) currentTab = 1;
    obj.items.push(new ProgressBar(month.progress()));
    obj.items.push(new TabControl(tabObj, currentTab));
    app.createPage(obj);
}

function reportSection(){
    console.log("ok");
}