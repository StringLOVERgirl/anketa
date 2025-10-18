import { useEffect, useState } from "react"
import { useRef } from "react"
import hierarchyost from '/audio/hierarchy.mp3'
import xxx from '/audio/XXXTENTACION - before I dive (AI Generated Song).mp3'
import bones from '/audio/IAmCertainlyNotWorthYourTime.mp3'
import chlorella from '/audio/BONES-Chlorella.mp3'
import chikoi from '/audio/Chikoi_The_Maid_-_Reflection_(SkySound.cc).mp3'


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

    const topSection = useRef(null)
    const middleSection = useRef(null)
    const audioref = useRef(null)
    const maskref = useRef(null)
    const leftTextTop = useRef(null) 
    let [text, isText] = useState('')
    const isMobile = useRef()
    let [next, setnext] = useState({next: '', prev: ''})
    
    const player = {
        hierarchy: ['kum junhyeon - ruin life', 'hierarchyOst', hierarchyost],
        xxx: ['XXXTENTACION - before I dive (AI Generated Song)', 'xxxost', xxx],
        bones: ['Bones - IAmCertainlyNotWorthYourTime', 'bones', bones],
        maid: ['Chikoi The Maid - Reflection', 'chekoi', chikoi],
        chlorellaBones: ['Bones - Chlorella by TeamSESH', 'chlorella', chlorella],
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
            audioref.current.play()
        } else {
            setPlaystatus('pause')
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


    return (<>
        <section className="upSection" ref={topSection}>
            <div className="upOutter">
                <div className="upInner">

                    <div className="maskBg" ref={maskref} onMouseMove={(ev)=> {if(window.innerWidth >= 600){mask(ev)}}}></div>

                    <div className='playerCont'>
                        <div className="leftPanelCont">
                            <button className={`playstatus ${playstatus}`} onClick={changePlayStatus}></button>
                            <div className={`label ${playerst.label}`}></div>
                            <button className={`prevTrack ${next.prev}`} onClick={()=>playnext('-')}></button>
                            <button className={`nextTrack ${next.next}`} onClick={()=>playnext('+')}></button>
                            <div className="audioRL">
                                <div className="audioRLInner">
                                    <div className="ostTitle">{'\u00A0'}{'\u00A0'}{playerst.title}{'\u00A0'}{'\u00A0'}</div>
                                    <div className="ostTitle2">{'\u00A0'}{'\u00A0'}{playerst.title}</div>
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

                    <audio src={playerst.track} ref={audioref} onEnded={() => setPlaystatus('pause')}></audio>
                    <div className="upTextCont">
                        <div className="divH1Cont">
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
                                <div className="leftup topText">Спасибо, что решила (или решил) заглянуть </div>
                                <div className="leftup bottomText">Здесь немного из мира моих интересов</div>
                            </div>

                            <div className="leftTextBottom">
                                <div className="time">{time}</div>
                                <div>{'\u00A0'}</div>
                                <div className="moscow">Moscow</div>
                                <div className="year">October 2025</div>
                            </div>
                        </div>
                    </div>

                    <div className="decorSnow"></div>
                </div>
            </div>
        </section>

        <section className="middleSection">
            <div className="creditsCont">
                <div className="creditsRL">
                    <CreditsRL></CreditsRL>
                    <CreditsRL></CreditsRL>
                </div>
            </div>
            <div className="middleBg" ref={middleSection}></div>
        </section>
    </>)
}