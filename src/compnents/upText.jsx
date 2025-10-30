import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { getRandomInRange } from './functions';


function UptextInner({text}){

    let words = 'Thanks\u00A0for\u00A0visiting.\u00A0Have\u00A0a\u00A0nice\u00A0UX'.split('\u00A0')
    let letters = 'Thanks\u00A0for\u00A0visiting.\u00A0Have\u00A0a\u00A0nice\u00A0UX'.split('')
    const numbers = useRef(new Set)
    // const elements = useMemo(() =>
    // можно сделать так при перерегенерации чтобы запускалось новые анимции
    // }), [numbers.current]
    // );
    const elements = useRef(null)
    console.log(letters, words)
    const globalindex = useRef(-2)
    useEffect(()=>{
      for (let i = 0; i < 7; i++){
            let index = getRandomInRange(0, letters.length-1, numbers)
            
            numbers.current.add(index)
        }
    },[])
    
    useEffect(()=>{

        elements.current =  words.map((ew,iw)=> {     
           globalindex.current+=1
            return  <>
               <div style={{display: 'flex', whiteSpace: 'nowrap'}} key={iw+' alt word'}>
                  {ew.split('').map((e,i)=>{
                      globalindex.current+=1
                      return numbers.current.has(globalindex.current) && e != '.' && e.trim() != '' 
                      ? <div aria-label={e} style={{'--delayAS': getRandomInRange(0, letters.length-5, numbers)+'s'}} className={`ux`}></div>
                      :<div>{e}</div>}
                  )}
                  {iw != words.length-1 ? '\u00A0' : ''}
              </div> 
           </> }         
           )
    },[])

    return(
        <>
         {/* <div className="leftup topText">Thank you for visiting</div> */}
        {/* <div className="leftup bottomText">Our best solutions for your personal brand</div> */}
        <div className={`leftup topText ${text}`} style={{display: 'flex'}}>
           {elements.current}
        </div>
        {/* <div className="leftup topText">Спасибо, что решила (или решил) заглянуть </div> */}
        {/* <div className="leftup bottomText">Здесь немного из мира моих интересов</div> */}
        <div className={`leftup bottomText ${text}`} style={{display: 'flex'}}>
            {
             'Here\'re\u00A0some\u00A0things\u00A0about\u00A0me.'.split('\u00A0').map((e,i)=><>
             <div style={{display: 'flex', whiteSpace: 'nowrap'}} key={i+' alt bottom word'}>{e}</div>
             {'\u00A0'}
             </>)   
            }
        </div>
        </>
    )
}

export const Uptext = React.memo(() => {

    const [init, setinit ]= useState({meg: null, text: ''})
    const leftTextTop = useRef(null) 

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
            // setMeg('showMeg')
            setinit({meg: 'showMeg', text: 'showText'})
            // isText('showText')
        }, 3200)

        interval.current = setInterval(() => setTime(new Date().toLocaleTimeString('ru-RU', options)), 1000);

        return (() => {
            clearInterval(interval.current);
        })
    }, [])
    

    return(

    <div className={`upTextCont ${videoState.h1ContOpacity}`}>
        <div className='divH1Cont'>
            {/* {['s','k','y'].map((e,i) => { */}
            {['m','e','g'].map((e,i) => {
                   if (i == 2) {return <span className={`meg g ${init.meg}`} style={{'--delay': i * 0.17 + "s"}}>{e}</span>}
                   else {return <span className={`meg ${init.meg}`} style={{'--delay': i * 0.17 + 's'}}>{e}</span>}
               })
            }
        </div>

        <div className={`upTextLeftCont`}>
            <div className={`leftTextTop `} ref={leftTextTop}>
               {/* <UptextInner></UptextInner> */}
               <UptextInner text={init.text}></UptextInner>
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
})