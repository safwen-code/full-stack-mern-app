import React, { Fragment, useState } from 'react'
import { Container, FormGroup, Label, Input, Form, Col, Button, } from 'reactstrap'
import {login} from '../action/registerAction'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {Redirect} from 'react-router-dom'
const Login =({login ,isAuthentification})=>{
    const [formData ,setFormdata] = useState({
        email:'',
        password:''
    })
    const {email,password}=formData
    const onChange = e=>
    setFormdata({...formData, [e.target.name]:e.target.value})
    const onSubmit=async e=>{
        e.preventDefault()
        console.log(formData)
        login(email,password)
 
    }
    if(isAuthentification){
        return <Redirect to="/profileUser"/>
    }
    return(
        <Fragment>
            
                <Container>
   
                    <Form onSubmit={e=> onSubmit(e)}>
                        <FormGroup>
                            <Label for="exampleEmail">Email</Label>
                            <Input type="email" name="email" id="exampleEmail" placeholder="with a placeholder"
                            onChange={e=>onChange(e)}
                            value={email}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="examplePassword">Password</Label>
                            <Input type="password" name="password" id="examplePassword" placeholder="password placeholder" 
                            onChange={e=>onChange(e)}
                            value={password}
                            />
                        </FormGroup>
                        <Col sm={{ size: 10, offset: 2 }}>
                            <Button color='danger'>Submit</Button>
                        </Col>
                    </Form>
                </Container>
        </Fragment>
    )
}
Login.propTypes={
    login:PropTypes.func.isRequired,
    isAuthentification:PropTypes.bool,
}
const mapStateToProps = state =>({
    isAuthentification : state.authUser.isAuthentification
})
export default connect(mapStateToProps, {login})(Login)