import $ from 'jquery'
import App from './components/app'
import GradeData from './gradeData'
import homeSection from './controller/home'

export const gradeData = new GradeData()
export const app = new App()

$(function() {
    app.render('body')
    homeSection()
})

const pageReload = () => {
    
}