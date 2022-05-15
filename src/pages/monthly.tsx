import React from 'react'
import Header from '../components/header'
import List from '../components/list'
import ProgressBar from '../components/progressBar'
import TabControl from '../components/tabControl'
import { MonthlyReport } from '../gradeData'

interface Props {
    monthly: MonthlyReport
}

const MonthlyPage: React.FC<Props> = (props) => {

    const tabContents = []

    tabContents.push({
        name: "未完了",
        element: <List items={props.monthly.getIncompleteReports().map(report => {
            return {
                title: props.monthly.subjectNames[report.subjectId],
                subText: `第${report.index}回`,
                value: report.progress
            }
        })}/>
    })

    tabContents.push({
        name: "完了",
        element: <List items={props.monthly.getCompleteReports().map(report => {
            return {
                title: props.monthly.subjectNames[report.subjectId],
                subText: `第${report.index}回`,
                value: report.progress
            }
        })}/>
    })

    const activeTab = props.monthly.getIncompleteReports().length ? 0 : 1

    return (
        <section className="ex-page">
            <Header title={props.monthly.title} buttonType="back-button" />
            <div className="ex-body">
                <ProgressBar name="進捗率" value={props.monthly.progress()}/>
                <TabControl tabs={tabContents} active={activeTab}/>
            </div>
        </section>
    )
}

export default MonthlyPage