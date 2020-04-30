import {GET_POST,ERR_POST, UPDATE_LIKE, DELET_POST, ADD_POST, GET_POSTS, ADD_COMMENT,DELET_COMMENT} from './types'
import axios from 'axios'
import { setAlert } from "./alertAction"

// get all Post
export const getPost = () => async dispatch => {
    try {
         const res = await axios.get('/post')
         dispatch({
             type:GET_POST,
             payload:res.data
         })
         console.log('resultat of postes ', res)
    } catch (err) {
        dispatch({
            type: ERR_POST,
            // payload: { msg: err.response.statusText, status: err.response.status }
        })    }
}
// Add like 
export const addLike = id => async dispatch => {
    try {
         const res = await axios.put(`/post/like/${id}`)
         dispatch({
             type:UPDATE_LIKE,
             payload:{id, likes:res.data}
         })
         console.log('resultat of post of like Id ', res)
    } catch (err) {
        dispatch({
            type: ERR_POST,
            // payload: { msg: err.response.statusText, status: err.response.status }
        })    }
}
// Remove like 
export const removeLike = id => async dispatch => {
    try {
         const res = await axios.put(`/post/unlike/${id}`)
         dispatch({
             type:UPDATE_LIKE,
             payload:{id, likes:res.data}
         })
         console.log('resultat of post of unlike Id ', res)
    } catch (err) {
        dispatch({
            type: ERR_POST,
            // payload: { msg: err.response.statusText, status: err.response.status }
        })    }
}

// delet post 
export const deletPost = id => async dispatch => {
    try {
         await axios.delete(`/post/${id}`)
         dispatch({
             type:DELET_POST,
             payload:id
         })
         dispatch(setAlert('post removed','success')) 
         
    } catch (err) {
        dispatch({
            type: ERR_POST,
            // payload: { msg: err.response.statusText, status: err.response.status }
        })    }
}

// add Post 
 export const addPost = formdata => async dispatch =>{
     const config= {
         headers:{
             'Content-Type': 'application/json'
         }
     }

    try {
        const res = await axios.post('/post',formdata,config)
        dispatch ({
            type:ADD_POST,
            payload:res.data
        })        
        dispatch(setAlert('post created','success'))
    } catch (err) {
        dispatch({
            type: ERR_POST,
            // payload: { msg: err.response.statusText, status: err.response.status }
        })    

    }
 }

 // get post by user id
 export const getPosts = id => async dispatch => {
    try {
         const res = await axios.get(`/post/${id}`)
         dispatch({
             type:GET_POSTS,
             payload:res.data
         })
         console.log('resultat of post by user id ', res)
    } catch (err) {
        dispatch({
            type: ERR_POST,
            // payload: { msg: err.response.statusText, status: err.response.status }
        })    }
}

// ADD comment
export const addComment = (postid,formdata) => async dispatch =>{
    const config= {
        headers:{
            'Content-Type': 'application/json'
        }
    }

   try {
       const res = await axios.post(`/post/comment/${postid}`,formdata,config)
       dispatch ({
           type:ADD_COMMENT,
           payload:res.data
       })        
       dispatch(setAlert('comment created','success'))
   } catch (err) {
       dispatch({
           type: ERR_POST,
           // payload: { msg: err.response.statusText, status: err.response.status }
       })    

   }
}

//DELET comment
export const deletCOMMENT = ({postid, commentid}) => async dispatch => {
    try {
         await axios.delete(`/post/comment/${postid}/${commentid}`)
         dispatch({
             type:DELET_COMMENT,
             payload:commentid
         })
         dispatch(setAlert('comment removed','success')) 
         
    } catch (err) {
        dispatch({
            type: ERR_POST,
            // payload: { msg: err.response.statusText, status: err.response.status }
        })    }
}