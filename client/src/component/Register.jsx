import React ,{Fragment, useState} from 'react'
import { Container, FormGroup, Label, Input, Form, Col, Button } from 'reactstrap'
import {connect} from "react-redux" 
import {setAlert} from '../action/alertAction'
import {register} from '../action/registerAction'
import PropTypes from 'prop-types'
import {Redirect} from "react-router-dom"
const Register =({setAlert, register,isAuthentification})=>{
    const [formData ,setFormdata] = useState({
        name:'',
        email:'',
        password:''
    })
    const {name,email,password}=formData
    const onChange = e=>
    setFormdata({...formData, [e.target.name]:e.target.value})
    const onSubmit=e=>{
        e.preventDefault()
        console.log(formData)
       register({name,email,password})
       
    }
    if(isAuthentification){
        return <Redirect to ='/profileUser'/>
    }
    return(
        <Fragment>
            
                <Container>
   
                    <Form onSubmit={e=> onSubmit(e)}>
                        <FormGroup>
                            <Label for="exampleEmail">Name</Label>
                            <Input type="name" name="name" id="name" placeholder="name placeholder" 
                            onChange={e=>onChange(e)}
                            value={name}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="exampleEmail">Email</Label>
                            <Input type="email" name="email" id="exampleEmail" placeholder="email placeholder"
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

Register.propTypes={
    setAlert:PropTypes.func.isRequired,
    register:PropTypes.func.isRequired,
    isAuthentification:PropTypes.bool,
}
const mapStateToProps =state=>({
    isAuthentification: state.authUser.isAuthentification
})
export default connect(mapStateToProps,{setAlert, register}) (Register)