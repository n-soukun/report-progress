import { gradeData, app } from '../app'
import BigItem from '../components/bigItem'
import ItemList from '../components/itemList'
import yearSection from './yearSection'
import monthSection from './monthSection'
 
function homeSection(){
    const obj = {
        title : "レポート進捗度(beta)",
        items : []
    }
    let items = [
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
    })
    obj.items.push(new ItemList(0,items))
    app.createPage(obj)
}

export default homeSection;