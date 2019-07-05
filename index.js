const $ = require('jquery')
const mm = require('music-metadata')
let songData = {path:[], title:[]}
let audioPlayer = $('audio').get(0)
let playing = false

function chooseMusic(){
    $('input').click()
}

function musicSelected(){
    let files = $('input').get(0).files
    //console.log(files)

    for(let i = 0; i<files.length; i++){
        let {path} = files[i]
        mm.parseFile(path, {native:true}).then(metadata =>{
            songData.path[i] = path
            songData.title[i] = metadata.common.title

            let songRow = `
            <tr ondblclick="playSong(${i})">
                <td>${metadata.common.title}</td>
                <td>${metadata.common.artist}</td>
                <td>${secondsToTime(metadata.format.duration)}</td>
            </tr>
            `

            $('#table-body').append(songRow)
            
        })
    }
}

function playSong(index){
    audioPlayer.src = songData.path[index]
    audioPlayer.load()
    audioPlayer.play()
    playing = true
    $('h4').text(songData.title[index])
    updatePlayButton()
}


function play(){
    if(playing){
        audioPlayer.pause()
        playing = false
    }else{
        audioPlayer.play()
        playing = true
    }
    updatePlayButton()
}

function updatePlayButton(){
    let playIcon = $('#play-button span')
    if(playing){
        playIcon.removeClass('icon-play')
        playIcon.addClass('icon-pause')
    }else{
        playIcon.removeClass('icon-pause')
        playIcon.addClass('icon-play')
    }
}

function secondsToTime(t) {
    return padZero(parseInt((t / (60)) % 60)) + ":" + 
           padZero(parseInt((t) % 60));
  }
function padZero(v) {
return (v < 10) ? "0" + v : v;
}