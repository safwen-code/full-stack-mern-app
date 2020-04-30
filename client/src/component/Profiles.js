import React, {Fragment,useEffect} from 'react'
import PropTypes from 'prop-types'
import {getProfiles} from '../action/profile'
import {connect} from 'react-redux'
import {Spinner} from 'reactstrap'
import ProfileItems from './ProfileItems'

const Profiles = ({getProfiles,profile:{profiles,loading}}) => {
    useEffect(()=>{
        getProfiles()
    },[getProfiles])
    return (
        <Fragment>
        { loading ?( <Fragment><Spinner color="primary" /></Fragment>):(
            <Fragment>
            <h1>list of devolopper</h1>
            <p color='primary'>check the list of profile</p>
            <div>
             {
                 profiles.length>0 ? (
                     profiles.map(profile=>(
                         <ProfileItems key={profile._id} profile={profile}/>
                     ))
                 ) : (<h4>Now Profile found</h4>)
             }
            </div>
            </Fragment>
        )

        }
        </Fragment>
    )
}

Profiles.propTypes = {
 profile:PropTypes.object.isRequired,
 getProfiles:PropTypes.func.isRequired,
}
const mapStateToProps = state=>({
    profile:state.profile
})

export default connect(mapStateToProps,{getProfiles})(Profiles)
