import { useEffect, useState } from "react"
import { useRef } from "react"
import hierarchyost from '/audio/hierarchy.mp3'
import xxx from '/audio/XXXTENTACION - before I dive (AI Generated Song).mp3'
import bones from '/audio/IAmCertainlyNotWorthYourTime.mp3'
import chlorella from '/audio/BONES-Chlorella.mp3'
import chikoi from '/audio/Chikoi_The_Maid_-_Reflection_(SkySound.cc).mp3'
import burgos from '/audio/White-Girls-in-the-Back-of-the-Bus.mp3'
import handbook from '/audio/HandbookForTheRecentlyDeceased.mp3'
import blacklungs from '/audio/BlackLungs&YellowTape.mp3'
import twoh from '/audio/2high.mp3'
import dclxvi from '/audio/DCLXVI_-_DISSECTION_76038142.mp3'
import dissection from '/assets/dissection720.mp4'
import { use } from "react"





function CreditsRL() {
// мне леень было раздедлять на компоненты -итак сойдет
    const content = [
        [
           'Reborn Rich',
           'Revenge of Others',
           'Death\'s Game',
           'Parasyte: The Grey',
           'The 8 Show',
           'Black Mirror',
           'Happiness',
           'Squid Game',
           'Alice in Borderland',
           'Hierarchy',
           'True Detective: 1 season',
           'Mister Robot'
        ],
        [
           'It Follows',
           'MCU',
           'Longlegs',
           'Boîte noire',
           'Substance 2024',
           'Passengers',
           'Prometheus',
           '2049'
        ],
        [    
        //    'Used to play Detroit 2038',
        //    'and minecraft,',
        //    'learn English',
        //    'and math',
        //    'Like web-design and', 
        //    'frontend development',
        //    '(but sometimes I burn out',
        //    'and abandon it',
        //    'A few random facts:',
        //    'I\'m curious and well-read', 
        //    'value creativity and creation', 
        //    'love hotels, and', 
        //    'find music and voices more important than text'
           'Нравится Detroit 2038',
           'и minecraft,',
           'изучала английский',
           'и математику',
           'нравится веб-дизайн и', 
           'фронтенд разработка',
           '(но иногда выгораю и забрасываю)',
           'И еще несколько случайных фактов:',
           'Я любознательная', 
           'имею читательский опыт', 
           'ценю творчество и созидание', 
           'люблю отели, и', 
           'музыка и голос важнее текста'
        ]
    ]


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


export function Up () {

    const mainCont = useRef(null)
    let [mainOf, setmainOf] = useState('')
    const topSection = useRef(null)
    const middleSection = useRef(null)
    const middleSectionCont = useRef(null)
    const audioref = useRef(null)
    const maskref = useRef(null)
    const leftTextTop = useRef(null) 
    let [text, isText] = useState('')
    const isMobile = useRef()
    let [next, setnext] = useState({next: '', prev: ''})
    const videoref = useRef(null)
    let [videoSet, setfirstplay] = useState({status: false, class: ""})
    let [h1ContOpacity, setH1Opacity] = useState('')
    let [videoFull, setFull] = useState('')
    let [isVideoBg, setvideobg] = useState('')
    let [isblurbg, setblurbg] = useState('')
    let [isLetter, setLetter] = useState('')
    const bgVideo = useRef(null)


    function fullScreen(){
        if (videoFull != 'fullScreen') {
            setFull('fullScreen')
        }
        else {
            setFull('')
        }
    }

    function dclxviChecking(direction){
        console.log(videoSet.status, playerst.label)
        if (playerst.label == 'burgos' && videoSet.status == false && direction == '+') {
            console.log(123245)
            setfirstplay(prev=>({
                status: true, class: 'speedhunters' 
            }))
            videoref.current.play()
            setH1Opacity('h1ContVideo')
            setvideobg('videoBgShow')
            setblurbg('hideviolet')
            setmainOf('mainCont')
            setLetter('showLetter')
            window.scrollTo(0,0)
            if (window.innerWidth < 600) {
                topSection.current.style.setProperty('--onPlayOpacity', 0.6)
            } else {
               topSection.current.style.setProperty('--onPlayOpacity', 0.3)
            }
        }
        if (videoSet.class == 'speedhunters') {
             setfirstplay(prev=>({
                status: true, class: '' 
            }))
            setH1Opacity('')
            setvideobg('')
            setblurbg('')
            setmainOf('')
            topSection.current.style.setProperty('--onPlayOpacity', 1)
        }
    }
    
    const player = {
        hierarchy: ['kum junhyeon - ruin life', 'hierarchyOst', hierarchyost],
        burgos: ['White Girls in the Back of the Bus', 'burgos', burgos],
        special: ['DCLXVI - Dissection • SPECIAL', 'dclxvi', dclxvi],
        handbook: ['Bones - HandbookForTheRecentlyDeceased', 'handbook', handbook],
        xxx: ['XXXTENTACION - before I dive (AI) ', 'xxxost', xxx],
        bones: [' Bones - IAmCertainlyNotWorthYourTime ', 'bones', bones],
        maid: [' Chikoi The Maid - Reflection ', 'chekoi', chikoi],
        blackl: [' Bones - BlackLungs & YellowTape ', 'handbook', blacklungs],
        twohigh: [' Yushee -  2high Released on: 2021-04-02 ', 'twohigh', twoh],
        chlorellaBones: [' Bones - Chlorella by TeamSESH ', 'chlorella', chlorella],
    }

    const playlist = Object.keys(player)
    console.log(playlist)

    let currentindex = useRef(0)
    let [currenttrack, setCurrentTrack] = useState(playlist[0])
    console.log(currenttrack)

    let [playerst, setPlayer] = useState({
        title: player[currenttrack][0],
        label: player[currenttrack][1],
        track: player[currenttrack][2]
    })

    let [playstatus, setPlaystatus] = useState('pause')

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
        setPlayer(prev => (
           {
            title: player[nexttrack][0],
            label: player[nexttrack][1],
            track: player[nexttrack][2]
           }
           ))

           if (direction == '+') {setnext(pr=>({...pr, next: 'trackButtonsScale'}))} else {
            setnext(pr=>({...pr, prev: 'trackButtonsScale'}))   
        }
        
       setTimeout(()=>{ 
        audioref.current.play()
        setPlaystatus('play')
        setnext(_=>({prev: '', next: ''}))
        // setnext(_=>({prev:'',next:''}))
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
        if (playstatus == 'pause') {
            setPlaystatus('play') 
            if (playerst.label == 'dclxvi') {videoref.current.play()}
            audioref.current.play()
        } else {
            setPlaystatus('pause')
            if (playerst.label == 'dclxvi') {videoref.current.pause()}
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


    return (<div className={mainOf} ref={mainCont}>
        <section className="upSection" ref={topSection}>
            <div className="upOutter">
                <div className="upInner">

                    {/* <div className="maskBg" ref={maskref} onMouseMove={(ev)=> {if(window.innerWidth >= 600){mask(ev)}}}></div> */}
                    <div className={`blurBg ${isblurbg}`} ref={maskref} onMouseMove={(ev)=> {if(window.innerWidth >= 600){mask(ev)}}}>
                       <div className="maskBg"></div>
                       <div className="maskBg blurbg2"></div>
                    </div>
                    <div className={`special ${videoSet.class}`}>
                        <video playsInline className={videoFull} src={dissection} ref={videoref} muted onEnded={() => {
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
                        {/* <div className="fullCont" onClick={fullScreen}>
                            <button className="full full1"></button>
                            <button className="full full2"></button>
                        </div>     */}
                    </div>

                    <div className='playerCont'>
                        <div className="leftPanelCont">
                            <button className={`playstatus ${playstatus}`} onClick={changePlayStatus}></button>
                            <div className={`label ${playerst.label}`}></div>
                            <button className={`prevTrack ${next.prev}`} onClick={()=>playnext('-')}></button>
                            <button className={`nextTrack ${next.next}`} onClick={()=>playnext('+')}></button>
                            <div className="audioRL">
                                <div className="audioRLInner">
                                    <div className="ostTitle">{playerst.title}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}</div>
                                    <div className="ostTitle2">{playerst.title}</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* <div className="year">October 2025</div> */}
                    <div className="linkCont">
                        {/* <div className="elHoyoImg"></div> */}
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

                    <audio src={playerst.track} ref={audioref} onEnded={() => {
                           setPlaystatus('pause')
                           if (playerst.label == 'dclxvi') {
                              setfirstplay(prev=>({...prev, class: ''}))
                              setH1Opacity('')
                              setvideobg('')
                              setblurbg('')
                              setmainOf('')
                           }
                        }}></audio>
                    <div className={`upTextCont ${h1ContOpacity}`}>
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
                                {/* <div className="time">{time}</div>
                                <div>{'\u00A0'}</div>
                                <div className="moscow">Moscow</div> */}
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

        <div className={`videoBgCont ${isVideoBg}`}>  

            <div className="bottomPanel">
            <div className="fullCont" onClick={fullScreen}>
                            <button className="full full1"></button>
                            <button className="full full2"></button>
                        </div>  
            <div className="specialTitle">  
                <div className="underlineSpecial"></div>
                <div style={{display: 'flex'}}>
                {
                    'DCLXVI\u00A0-\u00A0Dissection'.split('').map((e,i)=>{
                        return <div className="h2Special">
                                  <span className={`letter ${isLetter}`} style={{'--delayLetter': (i+1) * 0.03+'s'}}>{e}</span>
                               </div>
                    })
                }
                </div>
            </div>
            <div className="bottomPanelDecor"></div>
            </div>

        </div>

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