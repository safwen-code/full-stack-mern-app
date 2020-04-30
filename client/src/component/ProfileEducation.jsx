import React from 'react'
import PropTypes from 'prop-types'
import Moment from 'react-moment'

const ProfileEducation = ({ education: { school, fieldofstudy, degree, form, to, description } }) => {
    return (

        <div>
            <h1>{school}</h1>
            <p>{fieldofstudy}</p>
            <h1>{degree}</h1>
            <span>{description}</span>
            <Moment format='YYYY/MM/DD'>{form}</Moment> - {!to ? 'now' :
                (<Moment format='YYYY/MM/DD'>{to}</Moment>)}
        </div>

    )
}

ProfileEducation.propTypes = {
    education: PropTypes.array.isRequired,
}

export default ProfileEducation
