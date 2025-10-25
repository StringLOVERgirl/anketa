import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';

export function Uptext () {

    let [meg, setMeg] = useState(null)
    const leftTextTop = useRef(null) 
    let [text, isText] = useState('')

    const videoState = useSelector(state => state)

    const options = {
        timeZone: "Europe/Moscow",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false
      }

    const moscowStr = new Date().toLocaleTimeString('ru-RU', options)

    let [time, setTime] = useState(moscowStr)
    
    const interval = useRef(null)

    useEffect(() => {
       setTimeout(()=>{
            setMeg('showMeg')
            isText('showText')
        }, 3200)

        interval.current = setInterval(() => setTime(new Date().toLocaleTimeString('ru-RU', options)), 1000);

        return (() => {
            clearInterval(id);
        })
    }, [])


    let words = 'Thanks\u00A0for\u00A0visiting.\u00A0Have\u00A0a\u00A0nice\u00A0UX'.split('\u00A0')
    let letters = 'Thanks\u00A0for\u00A0visiting.\u00A0Have\u00A0a\u00A0nice\u00A0UX'.split('')
    const numbers = useRef(new Set)
    console.log(letters)
    let globalindex = -1
    useEffect(()=>{
        for (let i = 0; i < 7; i++){
            let index = getRandomInRange(0, letters.length-1)
            
            numbers.current.add(index)
        }
        console.log(numbers.current)
    },[])

    function getRandomInRange(min, max) {
        let index
        do {
            index = Math.floor(Math.random() * (max - min) + min);
        } while (numbers.current.has(index))
        return index
    }

    return(

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
                <div className="leftup topText" style={{display: 'flex'}}>
                   {words.map((ew,iw)=> {     
                    let currentindex = globalindex
                   globalindex+=1
                    return  <div style={{display: 'flex'}}>
                    {ew.split('').map((e,i)=>{
                        // let currentindex = globalindex
                        globalindex+=1
                        console.log(currentindex, letters.length-1)
                       return numbers.current.has(globalindex) && e != '.' && e.trim() != '' ? <div aria-labe={e} style={{'--delayAS': globalindex*0.5+'s'}} className='ux'></div>:<div>{e}</div>}
                    )}
                    {iw != words.length-1 ? '\u00A0' : ''}
                   </div>  }         
                   )}
                </div>
                {/* <div className="leftup topText">Спасибо, что решила (или решил) заглянуть </div> */}
                {/* <div className="leftup bottomText">Здесь немного из мира моих интересов</div> */}
                <div className="leftup bottomText">Here're some things about me.</div>
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
    )
}