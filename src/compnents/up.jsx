import { useEffect, useState } from "react"
import { useRef } from "react"
import dissection from '/assets/dissection720.mp4'
import { player } from "./player"
import { content } from "./content"
import { VideoPanel } from "./videopanel"
import { useSelector, useDispatch } from 'react-redux';



function CreditsRL() {
// мне леень было раздедлять на компоненты -итак сойдет
//  сокращу коллчиеств остейтов может организю редукс
//  разоью на комопненты 
// разделю стили 
// уберу логи 

    return(
        <div className="">
            <div className="shows">
                <div className="title">shows</div>
                <div className="mostly">*Mostly Korean</div>
                {content[0].map(e=><div className="titleContent">{e}</div>)}
            </div>
            <div className="movies">
                <div className="title">movies</div>
                {content[1].map(e=><div className="titleContent">{e}</div>)}
            </div>
            <div className="other">
                <div className="title">other</div>
                {content[2].map(e=><div className="titleContent">{e}</div>)}
            </div>
        </div>
    )
}


export function Up ({userAgent}) {

    const dispatch = useDispatch()
    const videoState = useSelector(state => state)
    console.log(videoState)
    function playVideo(){
        dispatch({type: 'play'})
        // вызывает редьюсер 
      }
    function endVideo(){
        dispatch({type: 'stop'})
        // вызывает редьюсер 
    }

    const mainCont = useRef(null)
    const topSection = useRef(null)
    const middleSection = useRef(null)

    const audioref = useRef(null)

    const maskref = useRef(null)
    const leftTextTop = useRef(null) 
    let [text, isText] = useState('')
    const isMobile = useRef() // ???

    const videoref = useRef(null)
    // const specialtitle = useRef(null)
    let [videoSet, setfirstplay] = useState({status: false, class: ""})

    // let [videoState, setVideoState] = useState({
    //     h1ContOpacity: '',
    //     videoFull: '',
    //     isVideoBg: '',
    //     isblurbg: '',
    //     isLetter: '',
    //     //   ограничивает скролл при видео
    //     mainOf: ''
    // })


    const playlist = Object.keys(player)
    let currentindex = useRef(0)
    let [currenttrack, setCurrentTrack] = useState(playlist[0])
    const [playerState, setPlayerState] = useState({
        next: {next: '', prev: ''},   
        playerUi: {
            title: player[currenttrack][0],
            label: player[currenttrack][1],
            track: player[currenttrack][2]
        },
        playstatus: 'pause'
    })
    

    function fullScreen(){
        if (videoState.videoFull != 'fullScreen') {
            // setVideoState(prev=>({...prev, videoFull: 'fullScreen'}))
            dispatch({type: 'full'})
        }
        else {
            // setVideoState(prev=>({...prev, videoFull: ''}))
            dispatch({type: 'unfull'})
        }
    }

    function videoUI(action){
            const state = action == 'on' ? 'speedhunters' : ''
            setfirstplay(_=>({
                status: true, class: state
            }))
            videoref.current.play()
            // setVideoState(prev=>({
            //     ...prev, 
            //     h1ContOpacity: state[0][0],
            //     isVideoBg: state[0][1],
            //     isblurbg: state[0][2],
            //     mainOf: state[0][3],
            //     isLetter: state[0][4]
            // }))  
            if (action == 'on') {
                playVideo()
            } else {
                endVideo()
            }
    }

    function dclxviChecking(direction){
        console.log(videoSet.status, playerState.playerUi.label)
        if (playerState.playerUi.label == 'burgos' && videoSet.status == false && direction == '+') {
            
            console.log(123245)
            videoUI('on')     

            topSection.current.style.setProperty('--letterBg', 1)
            window.scrollTo(0,0)
            if (window.innerWidth < 600) {
                topSection.current.style.setProperty('--onPlayOpacity', 0.6)
            } else {
               topSection.current.style.setProperty('--onPlayOpacity', 0.5)
            }
        }
        if (videoSet.class == 'speedhunters') {

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
            setPlayerState(pr=>({...pr, next: {...pr.next, next: 'trackButtonsScale'}}))} else {
            setPlayerState(pr=>({...pr, next: {...pr.next, prev: 'trackButtonsScale'}}))   
        }
        
       setTimeout(()=>{ 
        audioref.current.play()
        setPlayerState(pr=>({...pr, playstatus: 'play', next: {next: '', prev: ''}}))
        // setPlayerState(pr=>({...pr, next: {next: '', prev: ''}}))   
       }, 300)
    }

    const options = {
        timeZone: "Europe/Moscow",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false
      }

    const moscowStr = new Date().toLocaleTimeString('ru-RU', options)

    let [time, setTime] = useState(moscowStr)

    let [meg, setMeg] = useState(null)

    function mask(event) {
        const x = event.clientX
        const y = event.clientY + window.scrollY;
        const radius = 100; // можно менять радиус круга здесь
    
        // на сам эл или родитель ближайшмй
        maskref.current.style.maskImage = `radial-gradient(circle ${radius}px at ${x}px ${y}px, transparent 0%, black 100%)`;
        maskref.current.style.webkitMaskImage = `radial-gradient(circle ${radius}px at ${x}px ${y}px, transparent 0%, black 100%)`;
    }

    function changePlayStatus() {
        if (playerState.playstatus == 'pause') {
            setPlayerState(pr=>({...pr, playstatus: 'play'}))
            if (playerState.playerUi.label == 'dclxvi') {videoref.current.play()}
            audioref.current.play()
        } else {
            setPlayerState(pr=>({...pr, playstatus: 'pause'}))
            if (playerState.playerUi.label == 'dclxvi') {videoref.current.pause()}
            audioref.current.pause()
        }
    }

    function middleParallax () {
        const value = window.scrollY * 0.008 + "%"
        console.log(value)
        middleSection.current.style.setProperty('--prlxMiddle', value)
    }

    useEffect(() => {

        setTimeout(()=>{
            setMeg('showMeg')
            isText('showText')
        }, 3200)

        const id = setInterval(() => setTime(new Date().toLocaleTimeString('ru-RU', options)), 1000);

        // if (window.innerWidth >= 600){
            window.addEventListener('scroll', middleParallax) 
        // }

        return (() => {
            // if (window.innerWidth >= 600){
            window.removeEventListener('scroll', middleParallax) 
        // }
            clearInterval(id);
        })

    },[])


    return (
    <div className={videoState.mainOf} ref={mainCont}>
        <section className="upSection" ref={topSection}>
            <div className="upOutter">
                <div className="upInner">

                    {/* <div className="maskBg" ref={maskref} onMouseMove={(ev)=> {if(window.innerWidth >= 600){mask(ev)}}}></div> */}
                    <div className={`blurBg ${videoState.isblurbg}`} ref={maskref} onMouseMove={(ev)=> {if(window.innerWidth >= 600){mask(ev)}}}>
                       <div className="maskBg"></div>
                       <div className="maskBg blurbg2"></div>
                    </div>
                    <div className={`special ${videoSet.class}`}>
                        <video playsInline className={videoState.videoFull} src={dissection} ref={videoref} muted onEnded={() => {
                               videoref.current.style.setProperty('--opacity', 0)
                               topSection.current.style.setProperty('--onPlayOpacity', 1)
                            }}
                             onClick={()=>{
                            if (videoref.current.paused){
                                videoref.current.play()
                                changePlayStatus()
                            }else{
                                videoref.current.pause()
                                changePlayStatus()
                            }
                            }}
                            onDoubleClick={fullScreen}
                        ></video>
                    </div>

                    <div className='playerCont'>
                        <div className="leftPanelCont">
                            <button className={`playstatus ${playerState.playstatus}`} onClick={changePlayStatus}></button>
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

                    {/* <div className="year">October 2025</div> */}
                    <div className="linkCont">
                        {/* <div className="elHoyoImg"></div> */}
                        {/* удалить стили */}
                        <div className="linkTextCont">
                            <div className="another">my project</div>
                            <div className="inspBy">
                                <a className="link" target="_blank" href="https://platform-react-amber.vercel.app/">El Hoyo</a>
                            </div>
                        </div>
                    </div>

                    <div className="inspiredCont">
                        <div>
                           <div className="insp"></div>
                           <div className="inspTitle">Hierarchy</div>
                        </div>
                        <div className="inspBy">
                            <a className="inspByInner" target="_blank" href="https://www.google.com/search?q=hierarchy+2024">Inspired by</a>
                        </div>
                    </div>

                    <audio src={playerState.playerUi.track} ref={audioref} onEnded={() => {
                           setPlayerState(pr=>({...pr, playstatus: 'pause'}))
                           if (playerState.playerUi.label == 'dclxvi') {
                              setfirstplay(prev=>({...prev, class: ''}))
                            //   setVideoState(prev=>({
                            //     ...prev, 
                            //     h1ContOpacity: '',
                            //     isVideoBg: '',
                            //     isblurbg: '',
                            //     mainOf: '',
                            //   }))  
                              endVideo() 
                           }
                        }}></audio>
                    <div className={`upTextCont ${videoState.h1ContOpacity}`}>
                        <div className='divH1Cont'>
                            {/* {['s','k','y'].map((e,i) => { */}
                            {['m','e','g'].map((e,i) => {
                                   if (i == 2) {return <span className={`meg g ${meg}`} style={{'--delay': i * 0.17 + "s"}}>{e}</span>}
                                   else {return <span className={`meg ${meg}`} style={{'--delay': i * 0.17 + 's'}}>{e}</span>}
                               })
                            }
                        </div>

                        <div className="upTextLeftCont">
                            <div className={`leftTextTop ${text}`} ref={leftTextTop}>
                                {/* <div className="leftup topText">Thank you for visiting</div> */}
                                {/* <div className="leftup bottomText">Our best solutions for your personal brand</div> */}
                                <div className="leftup topText">Thanks for visiting. </div>
                                {/* <div className="leftup topText">Спасибо, что решила (или решил) заглянуть </div> */}
                                {/* <div className="leftup bottomText">Здесь немного из мира моих интересов</div> */}
                                <div className="leftup bottomText">Here are some things I like.</div>
                            </div>

                            <div className="leftTextBottom">
                                <div className="metaLeft">
                                    <div className="time">{time}</div>
                                    <div>{'\u00A0'}</div>
                                    <div className="moscow">Moscow</div>
                                </div>
                                <div className="year">October 2025</div>
                            </div>
                        </div>
                    </div>

                    <div className="snowCont">
                        <div className="decorSnow snowblur"></div>
                        <div className="decorSnow"></div>
                    </div>
                </div>
            </div>
        </section>
        
        <VideoPanel userAgent={userAgent} fullScreen={fullScreen}></VideoPanel>
        
        <section className="middleSection">
            <div className="creditsCont">
                <div className="creditsRL">
                    <CreditsRL></CreditsRL>
                    <CreditsRL></CreditsRL>
                </div>
            </div>
            <div className="middleBg" ref={middleSection}></div>
        </section>
    </div>)
}