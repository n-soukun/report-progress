import { gradeData, app } from '../app'
import ListItem from '../components/listItem'
import List from '../components/list'
import ProgressBar from '../components/progressBar'
import TabControl from '../components/tabControl'
import backPage from './backPage'
import monthSection from './monthSection'
import subjectSection from './subjectSection'
import { PageData } from '../components/page'

function yearSection(){
    const obj: PageData = {
        title : "年間レポート",
        items : [],
        callback: backPage
    }
    let monthItems = [];
    for (let i = 0; i < gradeData.month.length; i++) {
        const month = gradeData.month[i]
        const monthlyReport = gradeData.getMonthlyReport(month)
        const title = monthlyReport.title
        const item = new ListItem({
            title: title,
            value: monthlyReport.progress(),
            text: `全${monthlyReport.reports.length}個`,
            callback: monthSection,
            argument: {id:month}
        })
        monthItems[i] =  item
    }
    let subjectItems = []
    for (let i = 0; i < gradeData.subjectNames.length; i++) {
        const subject = gradeData.getSubjectById(i)
        const title = gradeData.subjectNames[i]
        const item = new ListItem({
            title: title,
            value: subject.progress(),
            text: `全${subject.reports.length}回`,
            callback: subjectSection,
            argument: {id:i}
        })
        subjectItems[i] =  item
    }
    const tabObj = {
        tabs : [
            {title: "月別",items: [new List(0,monthItems)]},
            {title: "教科別",items: [new List(1,subjectItems)]}
        ],
        height : "initial"
    }
    const progressBar = new ProgressBar(gradeData.progress())
    obj.items.push(progressBar)
    obj.items.push(new TabControl(tabObj, 0))
    app.createPage(obj)
}

export default yearSection;