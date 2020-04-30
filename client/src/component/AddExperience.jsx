import React, { Fragment, useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Form, FormGroup, Label, Input ,Button} from 'reactstrap';
import {Addexperience} from '../action/profile'
import {withRouter} from 'react-router-dom'
const AddExperience =({Addexperience,history}) => {
    const [formData, setFormData] =useState({
     titel:'',company:'',form:'',to:'',current:false,description:'',location:''
    }
    )
    const [todateDisabel, toggelAbel] =useState(false)
    const {titel,company,form,to,current,description,location} = formData
    const onChange =e => setFormData({...formData,[e.target.name]:e.target.value})
    const onSubmit=e=>{
        e.preventDefault()
        console.log(formData)
        Addexperience(formData,history)
    }

    return (
        <Fragment>
            <Form onSubmit={e=>onSubmit(e)}>
                <FormGroup>
                    <Label for="exampleEmail">Add Experience</Label>
                </FormGroup>
                <FormGroup>
                    <Label for="exampleEmail">Titel</Label>
                    <Input
                        type="titel"
                        name="titel"
                        id="titel"
                        placeholder="titel of your experience"
                        value={titel}
                        onChange={e=>onChange(e)}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="company">company</Label>
                    <Input
                        type="company"
                        name="company"
                        id="company"
                        placeholder="give me your company adress "
                        value={company}
                        onChange={e=>onChange(e)}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="location">location</Label>
                    <Input
                        type="location"
                        name="location"
                        id="location"
                        placeholder="give me your adress location"
                        value={location}
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

AddExperience.propTypes = {
 Addexperience:PropTypes.func.isRequired,
}

export default connect(null,{Addexperience}) (withRouter(AddExperience))
