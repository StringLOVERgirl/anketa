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
                <div className="leftup topText">Thanks for visiting. Have a nice UX</div>
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