import React from 'react'
import PropTypes from 'prop-types'
import Moment from 'react-moment'

const ProfilExperience = ({exprience:{titel,description,location,company,form,to}})=> {
    return (
        <div>
          <h1>{titel}</h1>
          <p>{description}</p>
          <h1>{location}</h1>
          <span>{company}</span>
          <Moment format='YYYY/MM/DD'>{form}</Moment> - {!to ? 'now' : 
          (<Moment format='YYYY/MM/DD'>{to}</Moment>)}
        </div>
    )
}

ProfilExperience.propTypes = {
exprience:PropTypes.array.isRequired,
}

export default ProfilExperience
