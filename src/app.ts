import $ from 'jquery'
import App from './components/app'
import GradeData from './gradeData'
import homeSection from './controller/home'
import OpenButton from './components/openButton'

export const gradeData = new GradeData()
export const app = new App()
export const openButton = new OpenButton()

$(function() {
    openButton.render('body')
})

const pageReload = () => {
    
}