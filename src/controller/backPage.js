import { app } from '../app'

function backPage(){
    app.removePage(app.pages.length - 1)
}

export default backPage