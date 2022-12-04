import React from "react"
import Header from "../components/header"
import ItemList from "../components/itemList"
import GradeData from "../gradeData"
import move from "../components/app"

const Home: React.FC = () => {

    const gradeData = new GradeData()

    let items = []

    items.push({
        title: "年間レポート",
        value: gradeData.progress(),
        text: `〆${gradeData.month.slice(-1)[0]}/15`,
        onClick: () => move("yearly")
    })

    const notDoneReports = gradeData.getNotDoneReports()

    items = items.concat(notDoneReports.map(month => {
        return {
            title: `${month}月レポート`,
            text: `〆${month}/15`,
            value: (gradeData.getMonthlyReport(month)).progress(),
            onClick: () => move("monthly", month)
        }
    }))

    return (
        <section className="ex-page">
            <Header title="Report Progress" buttonType="home" />
            <div className="ex-body">
                <ItemList items={items}/>
            </div>
        </section>
    )
}

export default Home