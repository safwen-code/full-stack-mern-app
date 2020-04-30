import { PROFILE_USER, PROFILE_ERROR ,
    UPDATE_PROFILE , ACCOUNT_DELETED,
    CLEAR_PROFILE,GET_PROFIELS } from './types'
import { setAlert } from "./alertAction"
import axios from 'axios'
// get the current profile
export const getCurrentProfile = () => async dispatch => {
    try {
        const res = await axios.get('profile/me')
        dispatch({
            type: PROFILE_USER,
            payload: res.data
        })
        console.log("responce for getcurrent profil",res )
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            // payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}
// create profile
export const createProfile = (formData, history, edite = false) => async dispatch => {
    try {
        const config = {
            headers: {
                'content-Type': 'application/json'
            }
        }
        const res = await axios.post('/profile', formData, config)
        console.log('create Profile', res)
        dispatch({
            type: PROFILE_USER,
            payload: res.data
        })
        dispatch(setAlert(edite ? 'profile Updates' : 'profile created', 'success'))
        if (!edite) {
            history.push('/profileUser')
        }
    } catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
        }
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}
// add Experience
export const Addexperience =(formData,history)=> async dispatch=>{
    try {
        const config = {
            headers: {
                'content-Type': 'application/json'
            }
        }
        const res = await axios.put('/profile/exprience', formData, config)
        console.log('create Profile Experience', res)
        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        })
        dispatch(setAlert('Experience Added', 'success'))
            history.push('/profileUser')
    } catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
        }
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}
// add education
export const AddEducations =(formData,history)=> async dispatch=>{
    try {
        const config = {
            headers: {
                'content-Type': 'application/json'
            }
        }
        const res = await axios.put('/profile/education', formData, config)
        console.log('create Profile Education', res)
        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        })
        dispatch(setAlert('Education ADD', 'success'))
            history.push('/profileUser')
    } catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
        }
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}
// delete exprience
export const DeletExperience = id => async dispatch=>{
    try {
        const res =await axios.delete(`/profile/exprience/${id}`);
        dispatch( {
            type:UPDATE_PROFILE,
            payload:res.data
        }
        )
        console.log("la res de suppp experience", res)
        dispatch(setAlert('experience is deleted successfuly','success'))  
    } catch (err) {
         const errors = err.response.data.errors;
        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
        }
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}
// delete education
export const DeletEducation = id => async dispatch=>{
    try {
        const res =await axios.delete(`/profile/education/${id}`);
        dispatch( {
            type:UPDATE_PROFILE,
            payload:res.data
        }
        )
        console.log("la res de suppp education", res)
        dispatch(setAlert('education is deleted successfuly','success'))  
    } catch (err) {
         const errors = err.response.data.errors;
        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
        }
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}
// delet profile 
export const DeleteProfil =()=> async dispatch =>{
    if (window.confirm('are you schur to delet the hol profile nayek')){
    try {
      const res = await axios.delete('/profile')
      dispatch({
          type: ACCOUNT_DELETED,
          payload:res.data
      })
      dispatch({type:CLEAR_PROFILE})
      dispatch(setAlert('account is deleted completly','warning'))
      

    } catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
        }
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
   }
}
// get all Profile
export const getProfiles = () => async dispatch =>{
     dispatch({type:CLEAR_PROFILE})
    try {
         const res = await axios.get('/profile')
         dispatch({
             type:GET_PROFIELS,
             payload:res.data
         })
         console.log('la resultat de get all profile',res)
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            // payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}
// get all Profile by user id
export const getProfilesByUserID = userId => async dispatch =>{
   try {
        const res = await axios.get(`/profile/user/${userId}`)
        dispatch({
            type:PROFILE_USER,
            payload:res.data
        })
        console.log('la resultat de get profile by user id',res)
   } catch (err) {
       dispatch({
           type: PROFILE_ERROR,
           // payload: { msg: err.response.statusText, status: err.response.status }
       })
   }
}

