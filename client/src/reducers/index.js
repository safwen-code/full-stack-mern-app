import {combineReducers} from "redux"
import itemReducer from "./itemReducer"

import alertReducer from './alertReducer'
import auth from './auth'
import profile from './profile'
import post from './post'

export default combineReducers({
   item:itemReducer,
   alert:alertReducer,
   authUser:auth,
   profile:profile,
   post
  
})