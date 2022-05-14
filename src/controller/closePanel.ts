import { app, openButton } from '../app'

function closePanel(){
    app.remove()
    openButton.render('body')
}

export default closePanel