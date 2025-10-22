import {createStore} from 'redux'


  const stateVideo = {
        h1ContOpacity: '',
        videoFull: '',
        isVideoBg: '',
        // isblurbg: '',
        isLetter: '',
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
        isLetter: 'showLetter'
      }
      case 'stop': 
      return {
        ...state,
        h1ContOpacity: '',
        isVideoBg: '',
        // isblurbg: '',
        mainOf: '',
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
