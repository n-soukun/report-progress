import $ from 'jquery'
import Page, { PageData } from './page'

interface AppState {
    panel_state: boolean,
    pages: Array<PageState<any>>
}

interface PageState<T> {
    id: number
    name: string
    args: T
}

class App{
    pages: Array<Page>
    constructor () {
        this.pages = []
    }
    render(parentElement: string){
        $(parentElement).append(`
        <div id="ex-score"></div>
        `)
        $(":root").css("--ex-app-width", "360px")
    }

    createPage<T>(obj: PageData, pageState: PageState<T>){
        const id = this.pages.length
        this.pages[id] = new Page(id,obj)
        this.pages[id].render("#ex-score")
        if(id > 0){
            this.pages[id -1].hide()
        }
    }
    removePage(id: number){
        this.pages[id].remove()
        this.pages.splice(id, 1)
        if(id > 0){
            this.pages[id -1].show()
        }
    }
    remove(){
        this.pages = []
        $("#ex-score").remove()
        $(":root").css("--ex-app-width", "0px")
    }
}

export default App