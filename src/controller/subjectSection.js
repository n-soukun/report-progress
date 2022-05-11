import $ from 'jquery'
import { gradeData, app } from '../app'
import Item from '../components/item'
import ItemList from '../components/itemList'
import ProgressBar from '../components/ProgressBar'
import TabControl from '../components/tabControl'
import backPage from './backPage'
import reportSection from './reportSection'

function subjectSection(){
    const subjectId = $(this).data('id')
    const subject =  gradeData.getSubjectById(subjectId)
    const obj = {
        title : subject.title,
        items : [],
        callback: backPage
    }
    const incompleteReports = subject.getIncompleteReports()
    let incompleteReportItems = []
    for (let i = 0; i < incompleteReports.length; i++) {
        const report = incompleteReports[i]
        const item = new Item({
            title: `第${report.index}回`,
            value: report.progress,
            text: `〆${report.month}/15`,
            callback: reportSection,
            argument: {}
        })
        incompleteReportItems[i] =  item
    }
    const completeReports = subject.getCompleteReports()
    let completeReportItems = []
    for (let i = 0; i < completeReports.length; i++) {
        const report = completeReports[i]
        const item = new Item({
            title: `第${report.index}回`,
            value: report.progress,
            text: `〆${report.month}/15`,
            callback: reportSection,
            argument: {}
        })
        completeReportItems[i] =  item
    }
    const tabObj = {
        tabs : [
            {title: `未完了- ${incompleteReportItems.length}`,items: [new ItemList(0,incompleteReportItems)]},
            {title: `完了 - ${completeReportItems.length}`,items: [new ItemList(1,completeReportItems)]}
        ],
        height : "initial"
    }
    let currentTab = 0
    if(incompleteReportItems.length == 0) currentTab = 1
    obj.items.push(new ProgressBar(subject.progress()))
    obj.items.push(new TabControl(tabObj, currentTab))
    app.createPage(obj)
}

export default subjectSection