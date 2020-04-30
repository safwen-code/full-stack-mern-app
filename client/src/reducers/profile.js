import { PROFILE_USER, PROFILE_ERROR , CLEAR_PROFILE ,UPDATE_PROFILE,GET_PROFIELS} from '../action/types'


const inistialState = {
    profile: null,
    profiles: {},
    loading: true,
    repos: {},
    error: {}
}
export default function (state = inistialState, action) {
    const { type, payload } = action
    switch (type) {
        case PROFILE_USER:
        case UPDATE_PROFILE:    
            return {
                ...state,
                profile: payload,
                loading: false
            }
        case GET_PROFIELS:
            return{
                ...state,
                profiles:payload,
                loading:false
            }    
        case PROFILE_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            }
        case CLEAR_PROFILE:
            return{
                ...state,
                profile:null,
                loading:false
            }    
        default:
            return state
    }
}