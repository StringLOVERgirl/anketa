import {createStore} from 'redux'


  const stateVideo = {
        h1ContOpacity: '',
        videoFull: '',
        isVideoBg: '',
        isLetter: '',
        class: '',
        blurBg: '',
        //   ограничивает скролл при видео
        mainOf: ''
  }

  
  function reducer(state = stateVideo, action){
    switch(action.type){
      case 'play': 
      return {
        ...state,
        h1ContOpacity: 'h1ContVideo',
        isVideoBg: 'videoBgShow',
        // isblurbg: 'hideviolet',
        mainOf: 'mainCont',
        blurBg: 'hideviolet',
        class: 'speedhunters',
        isLetter: 'showLetter'
      }

      case 'stop': 
      return {
        ...state,
        h1ContOpacity: '',
        isVideoBg: '',
        mainOf: '',
        blurBg: '',
        class: '',
        isLetter: ''
      }

      case 'full':
      return {...state, videoFull: 'fullScreen'}

      case 'unfull': 
      return {...state, videoFull: ''}

      default: 
      return state
    }
  }

  export const store = createStore(reducer)
