import { useEffect, useState } from 'react'
import './App.css'
import { Up } from './compnents/up'

function App() {

  let [preloader, setpreloader] = useState('')

  useEffect(()=>{
    setTimeout(()=>{setpreloader('hidepreloader')}, 3000)
  },[])

  return (
    <div className="App">
      <div className={`preloaderCont ${preloader}`}>
        <div className="preloader">
          <div className="preloaderline"></div>
          <div className="preloadertext">loading</div>
        </div>
      </div>
      <Up></Up>
    </div>
  )
}

export default App
