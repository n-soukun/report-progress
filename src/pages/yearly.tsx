import React from 'react'
import Header from '../components/header'
import List from '../components/list'
import ProgressBar from '../components/progressBar'
import TabControl from '../components/tabControl'
import GradeData from '../gradeData'

interface Props {
    gradeData: GradeData
}

const YearlyPage: React.FC<Props> = (props) => {

    const tabContents = []

    tabContents.push({
        name: "月別",
        element: <List items={props.gradeData.month.map(month => {
            const monthlyReport = props.gradeData.getMonthlyReport(month)
            return {
                title: monthlyReport.title,
                subText: `全${monthlyReport.reports.length}個`,
                value: monthlyReport.progress()
            }
        })}/>
    })

    tabContents.push({
        name: "教科別",
        element: <List items={props.gradeData.subjectNames.map((subjectName, i) => {
            const subject = props.gradeData.getSubjectById(i)
            return {
                title: subjectName,
                subText: `全${subject.reports.length}回`,
                value: subject.progress()
            }
        })}/>
    })

    const activeTab = props.gradeData.month.length ? 0 : 1

    return (
        <section className="ex-page">
            <Header title="年間レポート" buttonType="back-button" />
            <div className="ex-body">
                <ProgressBar name="進捗率" value={props.gradeData.progress()}/>
                <TabControl tabs={tabContents} active={activeTab}/>
            </div>
        </section>
    )
}

export default YearlyPage