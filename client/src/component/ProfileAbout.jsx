import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Container, Badge} from 'reactstrap'

const ProfileAbout = ({profile:{skills,bio, user:{name}}}) => {
    return (
        <Container>
         { bio && (
             <Fragment>
             <h1>{name}</h1>
             <p>{bio}</p>
             </Fragment>
         )}
         <Badge color="primary" >set skills</Badge>
         <div>
          {skills.map((skill,index)=>(
              <div key={index}>
              <ion-icon name="checkmark-outline" style={{color :"blue"}}></ion-icon>{' '} {skill}
              </div>
          ))}
         </div>
        </Container>
    )
}

ProfileAbout.propTypes = {
 profile:PropTypes.object.isRequired,
}

export default ProfileAbout
