import React ,{Fragment}from 'react'
import PropTypes from 'prop-types'
import {Table,Button} from 'reactstrap'
import Moment from 'react-moment'
import {connect} from 'react-redux'
import { DeletEducation} from '../action/profile'

const Education = ({education,DeletEducation}) => {
    const educations = education.map(edu=>(
        <tr key={edu._id}>
        <td>{edu.school}</td>
        <td>{edu.degree}</td>
        <td>{edu.fieldofstudy}</td>{' '}
        <td><Moment format="YYYY/MM/DD">{edu.form}</Moment>-{' '}
        {
          edu.to===null ? ('Now'):(<Moment format='YYYY/MM/DD'>{edu.to}</Moment>)
        }
        </td>
        <td><Button onClick={()=> DeletEducation(edu._id)} color="warning"> supprimer</Button></td>
        </tr>
        ))
    return (
        <Fragment>
        <Table responsive='sm'>
        <thead>
          <tr>
            <th>Shool</th>
            <th>Degree</th>
            <th>FielOfStudy</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>  
          {educations}
     </tbody>
        </Table>
        </Fragment>
    )
}

Education.propTypes = {
 education:PropTypes.array.isRequired,
 DeletEducation:PropTypes.func.isRequired
}

export default connect(null,{DeletEducation}) (Education)
