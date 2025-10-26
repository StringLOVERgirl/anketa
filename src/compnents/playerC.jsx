import { useState, useCallback } from "react"
import { player } from "./player"
import { useRef } from "react"
// import { playVideo, endVideo } from "./storage"
import { play, stop } from './storage'
import { useDispatch } from "react-redux"

export function Player ({topSection, videoref, audioref, playStatus, setPlayStatus, videoBg, loop}) {
// вынести в стор

    const dispatch = useDispatch()

    let currentindex = useRef(0)

    const playlist = Object.keys(player)

    let [videoSet, setfirstplay] = useState({status: false})

    let [currenttrack, setCurrentTrack] = useState(playlist[0])

    const [playerState, setPlayerState] = useState({
        next: {next: '', prev: ''},   
        playerUi: {
            title: player[currenttrack][0],
            label: player[currenttrack][1],
            track: player[currenttrack][2]
        }
        // ,
        // playstatus: 'pause'
    })

    const changePlayStatus= useCallback(() =>{
        if (playStatus == 'pause') {
            // setPlayerState(pr=>({...pr, playstatus: 'play'}))
            setPlayStatus('play')
            if (playerState.playerUi.label == 'dclxvi') {videoref.current.play()}
            requestAnimationFrame(()=> {
                audioref.current.play()
            })
        } else {
            // setPlayerState(pr=>({...pr, playstatus: 'pause'}))
            setPlayStatus('pause')
            if (playerState.playerUi.label == 'dclxvi') {videoref.current.pause()}
            audioref.current.pause()
        }
    }, [playStatus, playerState.playerUi.label, videoref, audioref]);
    

    function videoUI(action){
        const state = action == 'on' ? 'speedhunters' : ''
        setfirstplay(_=>({
            status: true, class: state
        }))
        // setTimeout(() => {
            videoref.current.play()
        // }, 5000);
        // videoref.current.currentTime = 170

        if (action == 'on') {
            // playVideo(dispatch)
            dispatch(play())
        } else {
            // endVideo(dispatch)
            dispatch(stop())
            }
    }

    function dclxviChecking(direction){
        console.log(videoSet.status, playerState.playerUi.label)
        if (playerState.playerUi.label == 'tracy' && videoSet.status == false && direction == '+') {
            
            videoUI('on')     

            videoBg.current.style.setProperty('--letterBg', 1)
            window.scrollTo(0,0)
            if (window.innerWidth < 600) {
               topSection.current.style.setProperty('--onPlayOpacity', 0.6)
            } else {
               topSection.current.style.setProperty('--onPlayOpacity', 0.5)
            }
        }
        if (videoSet.status == true) {

            videoUI('off')      

            topSection.current.style.setProperty('--onPlayOpacity', 1)
        }
    }

    function playnext (direction) {
        if (currentindex.current == playlist.length - 1 && direction != '-' ) return
        if (direction == '-' && currentindex.current === 0) return
        if (direction == '+') {
               currentindex.current += 1 
            } else {
               currentindex.current -= 1
            }
            // video cheking
        dclxviChecking(direction)

        console.log(currentindex.current)
        let nexttrack = playlist[currentindex.current]
        setCurrentTrack(nexttrack);
        setPlayerState(prev => (
           {...prev, playerUi: {
                title: player[nexttrack][0],
                label: player[nexttrack][1],
                track: player[nexttrack][2]
             }
           }
        ))

        if (direction == '+') {
         setPlayerState(pr=>({...pr, next: {...pr.next, next: 'trackButtonsScale'}}))
        } else {
         setPlayerState(pr=>({...pr, next: {...pr.next, prev: 'trackButtonsScale'}}))   
        }
        
       setTimeout(()=>{ 
        // audioref.current.currentTime = 200
          audioref.current.play()
          
          setPlayerState(pr=>({...pr, next: {next: '', prev: ''}}))
          setPlayStatus('play')
       }, 300)
    }

    return(
        <div className='playerCont'>
            <div className="leftPanelCont">

                <audio src={playerState.playerUi.track} ref={audioref} onEnded={() => {
                        //    setPlayerState(pr=>({...pr, playstatus: 'pause'}))
                           setPlayStatus('pause')
                           if (playerState.playerUi.label == 'dclxvi') {
                            console.log(212)
                              setfirstplay(prev=>({...prev, class: ''}))
                              topSection.current.style.setProperty('--onPlayOpacity', 1)
                            //   endVideo(dispatch) 
                              dispatch(stop())
                           }
                           if (loop.loop) {
                            audioref.current.play()
                            setPlayStatus('play')
                           }
                        //    if (playerState.playerUi.label == 'peep') {
                        //     audioref.current.currentTime = 0
                        //     audioref.current.play()
                        //    }
                }}></audio>

                <button className={`playstatus ${playStatus}`} onClick={changePlayStatus}></button>
                <div className={`label ${playerState.playerUi.label}`}></div>
                <button className={`prevTrack ${playerState.next.prev}`} onClick={()=>playnext('-')}></button>
                <button className={`nextTrack ${playerState.next.next}`} onClick={()=>playnext('+')}></button>
                <div className="audioRL">
                    <div className="audioRLInner">
                        <div className="ostTitle">{playerState.playerUi.title}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}</div>
                        <div className="ostTitle2">{playerState.playerUi.title}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}