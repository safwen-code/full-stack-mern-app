import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getProfilesByUserID } from '../action/profile'
import { Spinner, Button} from 'reactstrap'
import { Link } from 'react-router-dom'
import ProfileTopUser from './ProfileTopUser'
import ProfileAbout from './ProfileAbout'
import ProfilExperience from './ProfilExperience'
import ProfileEducation from './ProfileEducation'
const Profile = ({ getProfilesByUserID,
    match,
    profile: { profile, loading },
    authUser
}) => {
    useEffect(() => {
        getProfilesByUserID(match.params.id)
    }, [getProfilesByUserID, match.params.id])
    return (
        <Fragment>
            {profile === null || loading ? <Spinner color='dark' /> :
                <Fragment>
                    <Link to='/profiles'> <Button color='dark'> go back to users</Button></Link>
                    {authUser.isAuthentification && authUser.loading === false &&
                        authUser.user._id === profile.user._id && (<Link to="/editeProfile">
                            <Button color="danger">
                                Edite Profile
                         </Button></Link>)
                    }
                    <div class="container-sm ml-1 p-3" >
                    <ProfileTopUser profile ={profile}/>
                    <ProfileAbout profile={profile}/>
                    <div class="container-sm ml-1 p-3" >
                    <h1>Exprience</h1>
                       {profile.exprience.length>0 ? (<Fragment>
                         {profile.exprience.map(exprience=>(
                             <ProfilExperience key={exprience._id} exprience={exprience}/>
                         ))}
                        </Fragment>):(<h4>no experience for this user</h4>)}
                    </div>
                    <div class="container-sm ml-1 p-3">
                     <h1>Education</h1>
                     {profile.education.length>0 ? (<Fragment>
                        {profile.education.map(education=>(
                            <ProfileEducation key={education._id} education={education}/>
                        ))}
                        </Fragment>):(<h4>no Education for this user</h4>)}
                    </div>
                    </div>
                </Fragment>

            }
        </Fragment>
    )
}

Profile.propTypes = {
    getProfilesByUserID: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    authUser: PropTypes.object.isRequired,
}
const mapStateToProps = state => ({
    profile: state.profile,
    authUser: state.authUser
})
export default connect(mapStateToProps, { getProfilesByUserID })(Profile)

