import { useEffect, useState } from "react"
import { useRef } from "react"
import dissection from '/assets/dissection720.mp4'
import { content } from "./content"
import { VideoPanel } from "./videopanel"
import { useSelector, useDispatch } from 'react-redux';
import { Player } from "./playerC"
import { Uptext } from "./upText"
// import { endVideo } from "./storage"
import { stop, full, unfull } from './storage'




function CreditsRL() {

    
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
    // console.log(play)
    console.log(videoState)
    
    // function playVideo(){
    //     dispatch({type: 'play'})
    //     // вызывает редьюсер 
    //   }
    // function endVideo(){
    //     dispatch({type: 'stop'})
    //     // вызывает редьюсер 
    // }

    const mainCont = useRef(null)
    const topSection = useRef(null)
    const middleSection = useRef(null)

    const maskref = useRef(null)

    const isMobile = useRef() // ???


    let [playStatus, setPlayStatus] = useState('pause')

    const videoBg = useRef(null)
    const audioref = useRef(null)
    const videoref = useRef(null)

    function changePlayStatus() {
        if (playStatus == 'pause') {
            setPlayStatus('play')
            videoref.current.play()
            audioref.current.play()
            requestAnimationFrame(()=> audioref.current.play())
        } else {
            setPlayStatus('pause')
            videoref.current.pause()
            audioref.current.pause()
        }
    }


    function fullScreen(){
        if (videoState.videoFull != 'fullScreen') {
            // dispatch({type: 'full'})
            dispatch(full())
        }
        else {
            // dispatch({type: 'unfull'})
            dispatch(unfull())
        }
    }



    function mask(event) {
        const x = event.clientX
        const y = event.clientY + window.scrollY;
        const radius = 100; // можно менять радиус круга здесь
    
        // на сам эл или родитель ближайшмй
        maskref.current.style.maskImage = `radial-gradient(circle ${radius}px at ${x}px ${y}px, transparent 0%, black 100%)`;
        maskref.current.style.webkitMaskImage = `radial-gradient(circle ${radius}px at ${x}px ${y}px, transparent 0%, black 100%)`;
    }

    function middleParallax () {
        const value = window.scrollY * 0.008 + "%"
        console.log(value)
        middleSection.current.style.setProperty('--prlxMiddle', value)
    }

    useEffect(() => {

        window.addEventListener('scroll', middleParallax) 

        return (() => {
            
            window.removeEventListener('scroll', middleParallax) 

        })

    },[])


    return (
    <div className={videoState.mainOf} ref={mainCont}>
        <section className="upSection" ref={topSection}>
            <div className="upOutter">
                <div className="upInner">

                    <div 
                      className={`blurBg ${videoState.blurBg}`} 
                      ref={maskref} 
                      onMouseMove={(ev)=> {if(window.innerWidth >= 600){mask(ev)}}}>
                         <div className="maskBg"></div>
                         <div className="maskBg blurbg2"></div>
                    </div>

                    <div className={`special ${videoState.class}`}>
                        <video 
                           playsInline 
                           muted
                           className={videoState.videoFull} 
                           src={dissection} 
                           ref={videoref}
                           onEnded={() => {
                            //    endVideo(dispatch)
                            //    dispatch(stop())
                               changePlayStatus()
                               videoref.current.style.setProperty('--opacity', 0)
                            //    topSection.current.style.setProperty('--onPlayOpacity', 1)
                            }}
                           onClick={changePlayStatus} 
                           onDoubleClick={fullScreen}>
                        </video>
                    </div>

                    <Player 
                      videoBg={videoBg}
                      playStatus={playStatus}
                      setPlayStatus={setPlayStatus}
                      audioref={audioref}
                      topSection={topSection} 
                      videoref={videoref}
                    ></Player>

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
                    
                    <Uptext></Uptext>

                    <div className="snowCont">
                        <div className="decorSnow snowblur"></div>
                        <div className="decorSnow"></div>
                    </div>
                </div>
            </div>
        </section>
        
        <VideoPanel userAgent={userAgent} fullScreen={fullScreen} videoBg={videoBg}></VideoPanel>
        
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