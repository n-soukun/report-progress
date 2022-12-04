import React from 'react'
import Header from '../components/header'
import List from '../components/list'
import ProgressBar from '../components/progressBar'
import TabControl from '../components/tabControl'
import GradeData, { Subject } from '../gradeData'

interface Props {
    subject_id: number
}

const SubjectPage: React.FC<Props> = (props) => {

    const gradeData = new GradeData()
    const subject = gradeData.getSubjectById(props.subject_id)
    
    const tabContents = []

    tabContents.push({
        name: "未完了",
        element: <List items={subject.getIncompleteReports().map(report => {
            return {
                title: `第${report.index}回`,
                subText: `〆${report.month}/15`,
                value: report.progress
            }
        })}/>
    })

    tabContents.push({
        name: "完了",
        element: <List items={subject.getCompleteReports().map(report => {
            return {
                title: `第${report.index}回`,
                subText: `〆${report.month}/15`,
                value: report.progress
            }
        })}/>
    })

    const activeTab = subject.getIncompleteReports().length ? 0 : 1

    return (
        <section className="ex-page">
            <Header title={subject.title} buttonType="back-button" />
            <div className="ex-body">
                <ProgressBar name="進捗率" value={subject.progress()}/>
                <TabControl tabs={tabContents} active={activeTab}/>
            </div>
        </section>
    )
}

export default SubjectPage