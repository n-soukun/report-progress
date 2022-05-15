import $ from 'jquery'
import openPanel from '../controller/openPanel'

class OpenButton{
    constructor () {}
    render(parentElement: string){
        $(parentElement).append(`
        <div id="ex-score-open">
            <div id="open-panel-button" class="nav-button"></div>
        </div>
        `)
        $('#open-panel-button').on('click', openPanel)
    }
    remove(){
        $('#open-panel-button').off('click', openPanel)
        $("#ex-score-open").remove()
    }
}

export default OpenButton