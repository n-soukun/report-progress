import React from 'react'
import Header from '../components/header'
import List from '../components/list'
import ProgressBar from '../components/progressBar'
import TabControl from '../components/tabControl'
import { Subject } from '../gradeData'

interface Props {
    subject: Subject
}

const SubjectPage: React.FC<Props> = (props) => {

    const tabContents = []

    tabContents.push({
        name: "未完了",
        element: <List items={props.subject.getIncompleteReports().map(report => {
            return {
                title: `第${report.index}回`,
                subText: `〆${report.month}/15`,
                value: report.progress
            }
        })}/>
    })

    tabContents.push({
        name: "完了",
        element: <List items={props.subject.getCompleteReports().map(report => {
            return {
                title: `第${report.index}回`,
                subText: `〆${report.month}/15`,
                value: report.progress
            }
        })}/>
    })

    const activeTab = props.subject.getIncompleteReports().length ? 0 : 1

    return (
        <section className="ex-page">
            <Header title={props.subject.title} buttonType="back-button" />
            <div className="ex-body">
                <ProgressBar name="進捗率" value={props.subject.progress()}/>
                <TabControl tabs={tabContents} active={activeTab}/>
            </div>
        </section>
    )
}

export default SubjectPage