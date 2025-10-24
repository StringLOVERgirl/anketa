import { useEffect, useState } from 'react'
import './App.css'
import { Up } from './compnents/up'

function App() {

  let [preloader, setpreloader] = useState('')
  let [preloadertext, settext] = useState('')
  let [userAgent, setuseragent] = useState({bottompanel: '', preloader: '', copy: '', brand: ''})

  useEffect(()=>{
    setTimeout(()=>{setpreloader('hidepreloader')}, 3000)
    setTimeout(()=>{settext('showPreloaderText')}, 100)
    // setTimeout(()=>{settext('hideprtext')}, 2800)

    // useEffect(() => {
        const ua = navigator.userAgent;
        const isIphone = /iPhone/.test(ua);
        const safari = /^((?!chrome|android).)*safari/i.test(ua)
        const isEdge = /Edg/.test(ua);
        console.log(isIphone || safari)
        if (isIphone ){
            setuseragent(prev=>({preloader: 'preloaderiphone', bottompanel: 'bottomiphone', copy: 'copyIphone', brand: 'brandIphone'}))
        } else if (isEdge) {
            setuseragent(prev=>({preloader: 'preloaderiphone', bottompanel: 'bottomalt', copy: 'copyIphone', brand: 'brandIphone'}))
        }
        // setuseragent(_=>({iphone: isIphone, edge: isEdge}))
        // setTimeout(()=> console.log(userAgent), 2000)
    // },[])
  },[])

  return (
    <div className="App">
      <div className={`preloaderCont ${preloader}`}>
        <div className="preloadersuqare"></div>
        {/* <div className={`preloader ${userAgent.preloader}`}> */}
          {/* <div className="preloaderline"></div> */}
          {/* <div className="preloadertext">currently developing</div> */}
          <div className={`middleCont ${userAgent.brand}`}>
            <div className="personal">
              <span className={`preloadertext ${preloadertext}`}>personal</span>
            </div>
            <div className="brand">
              <span className={`preloadertext ${preloadertext}`}>brand</span>
            </div>
            <div className="logocont">
               <div className={`logo ${preloadertext}`}></div>
            </div>
        
            {/* <div className="bg"></div> */}
          </div>
          <div className={`copy ${userAgent.copy}`}>2025© Meg. All rights reserverd. The logo is the property of Meg, any use is prohibited.</div>
        </div>
      {/* </div> */}
      <Up userAgent={userAgent}></Up>
    </div>
  )
}

export default App
