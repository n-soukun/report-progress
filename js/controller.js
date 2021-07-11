const index = () => {
    htmlInit("年間レポート", 50);
    const trLength =  $("#result_table tbody tr").length
    const reportLength = (trLength - 4) / 3;
    for (let i = 0; i < reportLength; i++) {
        const subjectObj = new subject(i);
        addListContents(subjectObj.title, subjectObj.progress(), subjectSection(i)); 
    }
}

const subjectSection = (index) => {
    window.alert(index);
}