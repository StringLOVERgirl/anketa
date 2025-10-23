import { useRef, useEffect } from "react"
import { useSelector } from 'react-redux';



export function VideoPanel({userAgent, fullScreen, videoBg}) {

    const videoState = useSelector(state => state)

    const letters = 'DCLXVI\u00A0-\u00A0DISSECTION'.split('')
    // const numbers = useRef(new Set)

    // useEffect(()=>{
    //     for (let i = 0; i < 7; i++){
    //         let index = getRandomInRange(0, letters.length)
            
    //         numbers.current.add(index)
    //     }
    //     console.log(numbers.current)
    // },[])

    function getRandomInRange(min, max) {
        let index
        do {
            index = Math.floor(Math.random() * (max - min) + min);
        } while (numbers.current.has(index))
        return index
    }

    return(
        <div className={`videoBgCont ${videoState.isVideoBg}`} ref={videoBg}>  

            <div className={`bottomPanel ${userAgent.bottompanel}`}>

                <div className="fullCont" onClick={fullScreen}>
                    <button className="full full1"></button>
                    <button className="full full2"></button>
                </div>  

                <div className="specialTitle">  
                    <div className="underlineSpecial"></div>
                    <div style={{display: 'flex'}}>
                    {
                       letters.map((e,i)=>{
                           return <div className="h2Special">
                                      <span className={`letter ${videoState.isLetter}`} 
                                      style={{
                                        '--delayLetter': (i+1) * 0.03+'s'
                                        // '--delayA': (i+1) * 0.5 +'s',
                                        // animation: numbers.current.has(i) ? 'letterAnimation 15s linear infinite var(--delayA)' : ''
                                      }}>{e}</span>
                                  </div>
                        })
                    }
                    </div>
                </div>

                 <div className="bottomPanelDecor"></div>

            </div>

        </div>
    )
}