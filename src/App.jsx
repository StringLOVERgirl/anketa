import { useEffect, useState } from 'react'
import './App.css'
import { Up } from './compnents/up'

function App() {

  let [preloader, setpreloader] = useState('')
  let [userAgent, setuseragent] = useState({bottompanel: '', preloader: ''})

  useEffect(()=>{
    setTimeout(()=>{setpreloader('hidepreloader')}, 3000)

    // useEffect(() => {
        const ua = navigator.userAgent;
        const isIphone = /iPhone/.test(ua);
        const safari = /^((?!chrome|android).)*safari/i.test(ua)
        const isEdge = /Edg/.test(ua);
        console.log(isIphone || safari)
        if (isIphone ){
            setuseragent(prev=>({preloader: 'preloaderiphone', bottompanel: 'bottomiphone'}))
        } else if (isEdge) {
            setuseragent(prev=>({preloader: 'preloaderiphone', bottompanel: 'bottomalt'}))
        }
        // setuseragent(_=>({iphone: isIphone, edge: isEdge}))
        // setTimeout(()=> console.log(userAgent), 2000)
    // },[])
  },[])

  return (
    <div className="App">
      <div className={`preloaderCont ${preloader} ${userAgent.preloader}`}>
        <div className="preloadersuqare"></div>
        <div className="preloader">
          <div className="preloaderline"></div>
          <div className="preloadertext">loading</div>
        </div>
      </div>
      <Up userAgent={userAgent}></Up>
    </div>
  )
}

export default App
