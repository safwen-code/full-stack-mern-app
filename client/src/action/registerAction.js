import axios from "axios"
import { REGISTER_FAIL, REGISTER_SUCCESS ,USER_LOADED,
    USER_FAIL, LOGIN_SUCCESS, LOGIN_FAIL,
    LOGOUT_SUCCESS ,CLEAR_PROFILE} from './types'
import { setAlert } from "./alertAction"
import setAuthToken from "../utils/setAuthToken"


// login USER
export const login = (email, password ) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const body = JSON.stringify({email, password })
    try {
        const res = await axios.post('/auth/login', body, config)
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        })
        dispatch(userLoad())
        console.log("this is the responce of login" ,res)
    } catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
        }
        dispatch({
            type: LOGIN_FAIL
        })
        dispatch(userLoad())
    }
}


//load User
export const userLoad= () => async dispatch =>{
    if(localStorage.token){
        setAuthToken(localStorage.token)
    }
    try {
        const res = await axios.get('/auth')
        dispatch({
            type:USER_LOADED,
            payload:res.data
        })
        console.log('this is the curent user responce ', res)
    } catch (err) {
        dispatch({
            type:USER_FAIL
        })
    }
}

// register user
export const register = ({ name, email, password }) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const body = JSON.stringify({ name, email, password })
    try {
        const res = await axios.post('/user/register', body, config)
        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        })
        dispatch({
            type:CLEAR_PROFILE
        })
        dispatch(userLoad())
        console.log("this is the responce of register user" ,res)
    } catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
        }
        dispatch({
            type: REGISTER_FAIL
        })
        dispatch(userLoad())
    }
}

// logout and clear profile
export const logout =()=> dispatch=>{
    dispatch({
        type:CLEAR_PROFILE
    })
    dispatch({
        type:LOGOUT_SUCCESS
    })
   
}