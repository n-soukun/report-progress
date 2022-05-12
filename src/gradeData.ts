import $ from 'jquery'

interface ReportData {
    index: number
    subjectId: number
    month: number
    progress: number
    score?: number
}

function getReport(index: number, trElements: HTMLTableRowElement[], subjectId: number): ReportData | null{
    const limitDate = trElements[0].getElementsByTagName("td")[index + 1].textContent
    const progress = trElements[1].getElementsByTagName("td")[index].textContent
    const score = trElements[2].getElementsByTagName("td")[index].textContent
    const month = limitDate?.match(/(\d+)\/\d+/)
    const progressText = progress?.match(/(\d+)%/)
    const scoreNumber = (()=>{
        const scoreText = score?.match(/(\d+)/)
        if(scoreText) return Number(scoreText)
    })()
    if(!month || !progressText) return null
    return {
        index: index +1,
        subjectId: subjectId,
        month: Number(month[1]),
        progress: Number(progressText[1]),
        score: scoreNumber
    }
}

class Subject {
    constructor (
        public id: number,
        public title: string,
        public reports: Array<ReportData>
    ){}

    progress() {
        let totalProgress = 0
        this.reports.forEach( report => {
            totalProgress += report.progress
        })
        const result = Math.round((totalProgress / (100 * this.reports.length)) * 100)
        return result
    }

    getIncompleteReports() {
        let reports = this.reports.filter((item) => item.progress < 100)
        reports.sort(function(a, b) {
            if (a.progress > b.progress) {
                return -1
            } else {
                return 1
            }
        })
        return reports
    }

    getCompleteReports() {
        let reports = this.reports.filter((item) => item.progress == 100)
        return reports
    }
    
}

class MonthlyReport {
    title: string
    constructor (
        public id: number,
        public reports: Array<ReportData>
    ) {
        this.title = id+"月レポート"
    }

    progress() {
        let totalProgress = 0
        this.reports.forEach( report => {
            totalProgress += report.progress
        })
        const result = Math.round((totalProgress / (100 * this.reports.length)) * 100)
        return result
    }

    getIncompleteReports() {
        let reports = this.reports.filter((item) => item.progress < 100)
        reports.sort(function(a, b) {
            if (a.progress > b.progress) {
                return -1
            } else {
                return 1
            }
        })
        return reports
    }

    getCompleteReports() {
        let reports = this.reports.filter((item) => item.progress == 100)
        return reports
    }
}

class GradeData{
    reports: Array<ReportData>
    subjectNames: Array<string>
    month: Array<number>
    constructor () {
        this.reports = []
        this.subjectNames = []
        this.month = []
        const subjectsLength = ($("#result_table tbody tr").length - 4) / 3
        let reportLength = 0
        for (let i = 0; i < subjectsLength; i++) {
            const table =  document.getElementById("result_table")
            if(!table) break
            let trs = [];
            for (let i2 = 0; i2 < 3; i2++) {
                const trsIndex = 2 + (3 * i) + i2
                trs[i2] = table.getElementsByTagName("tr")[trsIndex]
            }

            //教科名を登録
            const subjectName = trs[0].getElementsByTagName("td")[0].textContent
            if(!subjectName) break
            this.subjectNames[i] = subjectName
            
            //レポートのオブジェクトを追加
            for (let i2 = 0; i2 < 15; i2++) {
                const result = getReport(i2,trs,i)
                if(result){
                    if(this.month.indexOf(result.month) == -1){
                        this.month.push(result.month)
                    }
                    this.reports[reportLength] = result
                    reportLength++
                }else{
                    break
                }
            }
        }
    }

    getSubjectById(id: number) {
        let reports = this.reports.filter((item) => item.subjectId == id)
        const name = this.subjectNames[id]
        return new Subject(id,name,reports)
    }

    getMonthlyReport(id: number) {
        let reports = this.reports.filter((item) => item.month == id)
        return new MonthlyReport(id,reports)
    }

    getNotDoneReports(){
        let NotDoneReports = this.month.filter((item) => (this.getMonthlyReport(item)).progress() != 100);
        let showMonth: number[] = [];
        NotDoneReports.forEach(report => {
            let periodMonth = report;
            const date = new Date();
            const today = date.getDate();
            const ThisMonth = date.getMonth() + 1;
            if(ThisMonth >= this.month[0]){//今年
                if(periodMonth < this.month[0]){
                    periodMonth += 12;
                }
            }else{//来年
                if(periodMonth >= this.month[0]){
                    periodMonth -= 12;
                }
            }
            let diffMonth = periodMonth - ThisMonth;
            if(today > 16){
                diffMonth -= 1;
            }
            if(diffMonth < 1){
                showMonth.push(report);
            }else if(showMonth.length == 0){
                showMonth.push(report);
            }
        });
        return showMonth;
    }

    progress() {
        let totalProgress = 0;
        this.reports.forEach( report => {
            totalProgress += report.progress;
        });
        const result = Math.round((totalProgress / (100 * this.reports.length)) * 100);
        return result;
    }
}

export default GradeData