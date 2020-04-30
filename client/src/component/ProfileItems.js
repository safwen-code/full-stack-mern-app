import React from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'

const ProfileItems = ({ profile:
    {
        user: { _id, name, email },
        status, company, location, skills
    }
}) => {
    return (

        <div class="row">
            <div class="col-sm">
                <h1>{name}</h1>
                <h1>{email}</h1>
                <p>{status} {company && <span>at {company}</span>}</p>
                <Link to={`/profile/${_id}`}><button type="button" class="btn btn-info">profile user</button></Link> 
            </div>
            <ul>
                {skills.map((skills,index)=>(
                    <li key={index} class='primary-text'>
                        <i class='fas fa-check'/>{skills}
                    </li>
                ))}
            </ul>

        </div>
    )
}

ProfileItems.propTypes = {
    profile: PropTypes.object.isRequired,
}

export default ProfileItems
