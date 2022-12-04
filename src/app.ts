import move from "./components/app"
import $ from 'jquery'

$(function(){
    $("body").append('<div id="ex-score"></div>')
    move("home")
})