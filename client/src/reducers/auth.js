import {REGISTER_SUCCESS,REGISTER_FAIL,USER_LOADED
    ,USER_FAIL,LOGIN_SUCCESS,LOGIN_FAIL,
    LOGOUT_SUCCESS, ACCOUNT_DELETED}from "../action/types"

const initialState={
    token:localStorage.getItem('token'),
    isAuthentification:false,
    loading:true,
    user:null
}
export default function(state=initialState,action){
    const {type,payload}=action
    switch(type){
        case USER_LOADED:
            return{
                ...state,
                isAuthentification:true,
                loading:false,
                user:payload
            }
         case REGISTER_SUCCESS:
         case LOGIN_SUCCESS:    
             localStorage.setItem('token',payload.token)
             return{
                 ...state,
                 ...payload,
                 loading:false,
                 isAuthentification:true,
                 
             }
             case REGISTER_FAIL:
             case USER_FAIL:    
             case LOGIN_FAIL:
             case LOGOUT_SUCCESS:
             case ACCOUNT_DELETED:        
                 localStorage.removeItem('token')
                 return{
                     ...state,
                     token:null,
                     loading:false,
                     isAuthentification:false
                 }
                 default :
                 return state
    }
}