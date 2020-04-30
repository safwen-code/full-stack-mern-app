import React,{Fragment} from 'react'
import PropTypes from 'prop-types'
import {Table, Button} from 'reactstrap'
import Moment from 'react-moment'
import {DeletExperience } from '../action/profile'
import {connect}  from 'react-redux'

const Experience = ({exprience,DeletExperience})=> {
  const expriences = exprience.map(exp=>(
    <tr key={exp._id}>
    <td>{exp.titel}</td>
    <td>{exp.company}</td>
    <td>{exp.location}</td>
    <td>{exp.description}</td>{' '}
    <td><Moment format='YYYY/MM/DD'>{exp.form}</Moment>-{' '}
    {exp.to===null?('now'):(<Moment format='YYYY/MM/DD'>{exp.to}</Moment>)}
    </td>
    <td><Button onClick={()=>DeletExperience(exp._id)} color="warning">Spprimer</Button>{' '}</td>
    </tr>
    ))
     
    return (
        <Fragment>
        <Table responsive='sm'>
        <thead>
          <tr>
            <th>Titel</th>
            <th>Company</th>
            <th>Location</th>
            <th>Descrition</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>  
          {expriences}
     </tbody>
        </Table>
        </Fragment>

    )
}

Experience.propTypes = {
exprience:PropTypes.array.isRequired,
DeletExperience:PropTypes.func.isRequired,
}


export default connect (null,{DeletExperience}) (Experience)
