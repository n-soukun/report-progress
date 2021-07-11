class report {
    constructor (index,trs) {
        const limitDate = trs[0].getElementsByTagName("td")[index + 1].textContent;
        const month = limitDate.match(/(\d+)\/\d+/)
        const progress = trs[1].getElementsByTagName("td")[index].textContent;
        const progressText = progress.match(/(\d+)%/);
        const score = trs[2].getElementsByTagName("td")[index].textContent;
        const scoreText = score.match(/(\d+)/);
        this.index = index + 1;
        (month)?this.month = Number(month[1]):this.manth = null;
        (progressText)?this.progress = Number(progressText[1]):this.progress = null;
        (scoreText)?this.score = Number(scoreText[1]):this.score = null;
    }
}

class subject {
    constructor (index) {
        const table =  document.getElementById("result_table");
        let trs = [];
        for (let i = 0; i < 3; i++) {
            const trsIndex = 2 + (3 * index) + i;
            trs[i] = table.getElementsByTagName("tr")[trsIndex];
        }
        this.title = trs[0].getElementsByTagName("td")[0].textContent;

        //レポートのオブジェクトを生成
        let reports = [];
        for (let i = 0; i < 15; i++) {
            this.length = i;
            const result = new report(i,trs);
            if(result.month != null){
                reports[i] = result;
            }else{
                break;
            }
        }
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
        const result = Math.round((totalProgress / (100 * this.length)) * 100);
        return result;
    }

}

$(function() {
    htmlInit("年間レポート", 50);
    index();
});