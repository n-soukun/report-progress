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

export default monthSection;