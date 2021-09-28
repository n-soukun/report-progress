class Report {
    constructor (index,trElements,subjectId) {
        const limitDate = trElements[0].getElementsByTagName("td")[index + 1].textContent;
        const month = limitDate.match(/(\d+)\/\d+/);
        const progress = trElements[1].getElementsByTagName("td")[index].textContent;
        const progressText = progress.match(/(\d+)%/);
        const score = trElements[2].getElementsByTagName("td")[index].textContent;
        const scoreText = score.match(/(\d+)/);
        if(month !== null){
            this.index = index + 1;
            this.month = Number(month[1]);
            this.progress = Number(progressText[1]);
            this.subjectId = Number(subjectId);
            if(scoreText)this.score = Number(scoreText[1]);
        }else{
            this.manth = null;
        }
    }
}

class Subject {
    constructor (id,name,reports) {
        this.id = id;
        this.title = name;
        this.reports = reports;
    }

    getReportsByMonth(month) {
        let reports = [];
        let i = 0;
        this.reports.forEach( report => {
            if(report.month == month){
                reports[i] = report;
                i ++;
            }
        });
        if(i){
            return reports;
        }else{
            return null;
        }
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

class GradeData{
    constructor () {
        this.reports = [];
        this.subjectNames = [];
        const subjectsLength = ($("#result_table tbody tr").length - 4) / 3;
        let reportLength = 0
        for (let i = 0; i < subjectsLength; i++) {
            const table =  document.getElementById("result_table");
            let trs = [];
            for (let i2 = 0; i2 < 3; i2++) {
                const trsIndex = 2 + (3 * i) + i2;
                trs[i2] = table.getElementsByTagName("tr")[trsIndex];
            }
            //教科名を登録
            this.subjectNames[i] = trs[0].getElementsByTagName("td")[0].textContent;
            //レポートのオブジェクトを追加
            for (let i2 = 0; i2 < 15; i2++) {
                const result = new Report(i2,trs,i);
                if(result.month != null){
                    this.reports[reportLength] = result;
                    reportLength++;
                }else{
                    break;
                }
            }
        }
    }

    getSubjectById(id) {
        let reports = this.reports.filter((item) => item.subjectId == id);
        const name = this.subjectNames[id];
        return new Subject(id,name,reports);
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

$(function() {
    /*htmlInit("進捗度グラフ", 0);
    index();*/
    test();
});

const pageReload = () => {
    
}