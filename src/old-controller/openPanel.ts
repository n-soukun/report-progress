import { app, openButton } from '../app'
import homeSection from './home'

function openPanel(){
    openButton.remove()
    app.render('body')
    homeSection()
}

export default openPanel