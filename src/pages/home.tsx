import React from "react"
import Header from "../components/header"
import ItemList from "../components/itemList"
import GradeData from "../gradeData"

interface Props {
    gradeData: GradeData
}

const Home: React.FC<Props> = (props) => {

    const items = []

    items.push({
        title: "年間レポート",
        value: props.gradeData.progress(),
        text: `〆${props.gradeData.month.slice(-1)[0]}/15`,
    })

    const notDoneReports = props.gradeData.getNotDoneReports()

    items.concat(notDoneReports.map(month => {
        return {
            title: `${month}月レポート`,
            text: `〆${month}/15`,
            value: (props.gradeData.getMonthlyReport(month)).progress()
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