import {createStore} from 'redux'
import { useDispatch } from 'react-redux'
import { createSlice, configureStore } from '@reduxjs/toolkit'


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

  const initialState =  {   
    h1ContOpacity: '',
    videoFull: '',
    isVideoBg: '',
    isLetter: '',
    class: '',
    blurBg: '',
    //   ограничивает скролл при видео
    mainOf: ''
  }

  const videoSlice = createSlice({
    name: 'videoState',
    initialState, 
    // обязательные атрибуты и имена
    reducers: {
      play: state => {
        state.h1ContOpacity = 'h1ContVideo'
        state.isVideoBg = 'videoBgShow'
        state.mainOf = 'mainCont'
        state.blurBg = 'hideviolet'
        state.class = 'speedhunters'
        state.isLetter = 'showLetter'
      },
      stop: state => { Object.assign(state, initialState) },
      full: state => { state.videoFull = 'fullScreen' },
      unfull: state => { state.videoFull = ''}
    }
  })

  export const { play, stop, full, unfull } = videoSlice.actions
  console.log(play)

  export const store = configureStore({ reducer: videoSlice.reducer })

//   export function playVideo(dispatch){
//     dispatch({type: 'play'})
//     // вызывает редьюсер 
//   }
//   export function endVideo(dispatch){
//     dispatch({type: 'stop'})
//     // вызывает редьюсер 
//   }

  
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

//   export const store = createStore(reducer)
