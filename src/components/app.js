import $ from 'jquery'
import Page from './page'

class App{
    constructor () {
        this.pages = []
    }
    render(parentElement){
        $(parentElement).append(`
        <div id="ex-score"></div>
        `)
    }
    createPage(obj){
        const id = this.pages.length
        this.pages[id] = new Page(id,obj)
        this.pages[id].render("#ex-score")
        if(id > 0){
            this.pages[id -1].hide()
        }
    }
    removePage(id){
        this.pages[id].remove()
        this.pages.splice(id, 1)
        if(id > 0){
            this.pages[id -1].show()
        }
    }
}

export default App