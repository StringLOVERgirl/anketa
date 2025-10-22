import { useRef } from "react"
import { useSelector } from 'react-redux';



export function VideoPanel({userAgent, fullScreen}) {

    const videoState = useSelector(state => state)

    return(
        <div className={`videoBgCont ${videoState.isVideoBg}`}>  

            <div className={`bottomPanel ${userAgent.bottompanel}`}>

                <div className="fullCont" onClick={fullScreen}>
                    <button className="full full1"></button>
                    <button className="full full2"></button>
                </div>  

                <div className="specialTitle">  
                    <div className="underlineSpecial"></div>
                    <div style={{display: 'flex'}}>
                    {
                       'DCLXVI\u00A0-\u00A0DISSECTION'.split('').map((e,i)=>{
                           return <div className="h2Special">
                                      <span className={`letter ${videoState.isLetter}`} style={{'--delayLetter': (i+1) * 0.03+'s'}}>{e}</span>
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