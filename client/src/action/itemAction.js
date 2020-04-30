import {
    GET_ITEMS,
    ADD_ITEMS,
    DELETE_ITEMS,
    ITEMS_LOADING
} from "./types"

import axios from "axios"
export const getItems=()=> dispatch=>{
axios.get('/document')
.then(res=>
    dispatch({
        type:GET_ITEMS,
        payload:res.data
    })
    )
}

export const deleteItems = id=> dispatch => {
   axios.delete(`/document/${id}`)
   .then(
       res=> dispatch({
           type:DELETE_ITEMS,
           payload:id
        
       })
       
   )
   
}
export const addItem = item=> dispatch => {
   axios.post('http://localhost:3000/document',item)
   .then(res=> dispatch({
       type:ADD_ITEMS,
       payload:res.data
   }))
  
}
export const setItemsLoading = () => {
    return {
        type: ITEMS_LOADING
    }
}