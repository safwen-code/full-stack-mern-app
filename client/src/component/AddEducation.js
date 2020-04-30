import React,{Fragment,useState} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import { Form, FormGroup, Label, Input ,Button} from 'reactstrap';
import {AddEducations} from '../action/profile'
import {withRouter} from 'react-router-dom'

const AddEducation =({AddEducations,history}) => {
    const [formData, setFormData] =useState({
        school:'',degree:'',fieldofstudy:'',to:'',current:false,description:'',form:''
       }
       )
       const [todateDisabel, toggelAbel] =useState(false)
       const {school,degree,form,to,current,description,fieldofstudy} = formData
       const onChange =e => setFormData({...formData,[e.target.name]:e.target.value})
       const onSubmit=e=>{
           e.preventDefault()
           console.log(formData)
           AddEducations(formData,history)
       }
    return (
        <Fragment>
            <Form onSubmit={e=>onSubmit(e)}>
                <FormGroup>
                    <Label for="exampleEmail">Add Education</Label>
                </FormGroup>
                <FormGroup>
                    <Label for="exampleEmail">school</Label>
                    <Input
                        type="titel"
                        name="school"
                        id="school"
                        placeholder="school of education"
                        value={school}
                        onChange={e=>onChange(e)}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="fieldofstudy">field of study</Label>
                    <Input
                        type="company"
                        name="fieldofstudy"
                        id="field of study"
                        placeholder="give me your field study "
                        value={fieldofstudy}
                        onChange={e=>onChange(e)}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="degree">degree</Label>
                    <Input
                        type="location"
                        name="degree"
                        id="degree"
                        placeholder="give me your degree education"
                        value={degree}
                        onChange={e=>onChange(e)}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="form">from Date</Label>
                    <Input
                        type="date"
                        name="form"
                        id="form"
                        placeholder="form"
                        value={form}
                        onChange={e=>onChange(e)}
                    />
                </FormGroup>
                
                 <Input type="checkbox" name='current' check={current}
                 value={current} 
                 onChange={e=>{setFormData({...formData,current:!current});
                toggelAbel(!todateDisabel)}
                }
                 /> current    
                <FormGroup>
                    <Label for="to">to  Date</Label>
                    <Input
                        type="date"
                        name="to"
                        id="to"
                        placeholder="to"
                        value={to}
                        onChange={e=>onChange(e)}
                        disabled={todateDisabel?'disabled':''}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="description">Description</Label>
                    <Input type="textarea" name="description" id="description"
                    value={description} onChange={e=>onChange(e)}
                    />
                </FormGroup>
                <Button outline color="success">Submit </Button>{' '}
            </Form>

        </Fragment>
    )
}

AddEducation.propTypes = {
 AddEducations:PropTypes.func.isRequired,
}

export default connect(null,{AddEducations})(withRouter(AddEducation))
