import React, { useEffect, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getCurrentProfile ,DeleteProfil } from '../action/profile'
import {  Link } from 'react-router-dom'
import { Jumbotron, Spinner, Container ,Button, Col ,Row} from 'reactstrap';
import Experience from './Experience'
import Education from './Education'

const Dachboard = ({ authUser: { user }, profile: { loading, profile }, getCurrentProfile, DeleteProfil }) => {
    useEffect(() => {
        getCurrentProfile()
    }, [getCurrentProfile])


    return loading && profile === null ?
        (<Fragment><Spinner type="grow" color="dark" /></Fragment>) :
        (<Fragment>
            <Jumbotron fluid>
                <Container fluid>
                    <h1 className="display-1">Welcome to your acount</h1>
                    <p className="lead">This is your fucking profile {user && user.name}</p>
                    {profile !== null ?
                        (<Fragment>
                            <Row>
                            <Col>
                            <Link to ='/editeProfile'>
                            <i class="glyphicon glyphicon-user">{' '}
                            <Button color ='success'>edite Profile</Button>
                            </i>
                            </Link>
                            </Col>
                            {' '}
                            <Col>
                            <Link to ='/addExperience'>
                            <i class="far fa-address-book">{' '}
                            <Button color ='info'>addExperience</Button>
                            </i>
                            </Link>
                            </Col>
                            <Col>
                            <Link to ='/addEdcuation'>
                            <i class="far fa-address-book">{' '}
                            <Button color ='info'>addEdcuation</Button>
                            </i>
                            </Link>
                            </Col>
                               
                            </Row>
                              <Experience exprience={profile.exprience}/>
                              <Education education={profile.education}/>
                            
                            </Fragment>)
                        :
                        (<Fragment>
                          <p>you must create a profile</p>
                          <Button outline color="secondary">
                          <Link to='/create-profile'> create profile</Link>   
                          </Button>{' '}  
                         </Fragment>)}
                         <Fragment>
                       
                          <div className='my-2'>
                          <Button color="danger" onClick={()=>DeleteProfil()}> delete acount</Button>
                          </div>
                         </Fragment>
                         

                </Container>
            </Jumbotron>
        </Fragment>)


}

Dachboard.propTypes = {
    authUser: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    getCurrentProfile: PropTypes.func.isRequired,
    DeleteProfil:PropTypes.func.isRequired,
}
const mapStateToProps = state => ({
    authUser: state.authUser,
    profile: state.profile
})

export default connect(mapStateToProps, { getCurrentProfile, DeleteProfil })(Dachboard)
