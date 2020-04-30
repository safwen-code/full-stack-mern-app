import React,{Fragment,useState,useEffect} from 'react'
import PropTypes from 'prop-types'
import {withRouter,Link} from 'react-router-dom'
import { Label, FormGroup, Input, Button , Form} from 'reactstrap'
import {createProfile,getCurrentProfile} from '../action/profile'
import {connect} from 'react-redux'
const EditeProfile = ({createProfile, history,getCurrentProfile,
profile:{profile,loading}
}) => {
    const [displaySocialInput, ToggelSocialField] = useState(false)
    const [formData, setFormData] = useState({
        company:'',
        website:'',
        bio:'',
        status:'',
        githubusername:'',
        skills:'',
        youtube:'',
        facebook:'',
        twitter:'',
        linkedin:'',
        instagram:''
    })
    useEffect(()=>{
        getCurrentProfile()
        setFormData({
            company: loading || !profile.company ? '' : profile.company,
            website: loading || !profile.website ? '' : profile.website,
            bio: loading || !profile.bio ? '' : profile.bio,
            status: loading || !profile.status ? '' : profile.status,
            githubusername: loading || profile.githubusername ? '' : profile.githubusername,
            skills: loading || !profile.skills ? '' : profile.skills.join(','),
            youtube: loading || !profile.social ? '' : profile.social.youtube,
            facebook: loading || !profile.social ? '' : profile.social.facebook,
            twitter: loading || !profile.social ? '' : profile.social.twitter,
            linkedin: loading || !profile.social ? '' : profile.social.linkedin,
            instagram: loading || !profile.social ? '' : profile.social.instagram

        }); },[loading,getCurrentProfile])
    const {company,website,bio,status,githubusername,skills,youtube,facebook,twitter,linkedin,instagram } = formData
    const onChange = e=>setFormData({...formData,[e.target.name]:e.target.value})
    const onSubmit = e=>{
        e.preventDefault()
        console.log(formData)
        createProfile(formData ,history, true)
    }
    return (
        <Fragment>
            <h1 color='black'> create Profile </h1>
            <Form onSubmit={e=>onSubmit(e)}>
            <FormGroup>
                <Label for="exampleSelect">Select the profile status</Label>
                <Input type="select" name="status" id="exampleSelect" value={status}
                onChange={e=>onChange(e)}
                >
                    <option>developper</option>
                    <option>senior developper</option>
                    <option>junior developper</option>
                    <option>manager</option>
                    <option>instructur</option>
                    <option>learner or student</option>
                    <option>internet</option>

                </Input>
            </FormGroup>
            <FormGroup>
                <Label for="company">your own work or company </Label>
                <Input type="company" name="company" id="exampleEmail" placeholder="enter your company" 
                value={company} onChange={e=>onChange(e)}
                />
            </FormGroup>
            <FormGroup>
                <Label for="website">your own  or company website</Label>
                <Input type="website" name="website" id="exampleEmail" placeholder="enter your website"
                value={website} onChange={e=>onChange(e)}
                />
            </FormGroup>
            <FormGroup>
                <Label for="Skills">Skills</Label>
                <Input type="skills" name="skills" id="skills" placeholder="enter your skills"
                value={skills} onChange ={e=>onChange(e)}
                />
            </FormGroup>
            <FormGroup>
                <Label for="gihubRepos">github repos</Label>
                <Input type="githubusername" name="githubusername" id="exampleEmail" placeholder="enter your github username"
                value={githubusername} onChange={e=>onChange(e)}
                />
            </FormGroup>
            <FormGroup>
                <Label for="bio">Tell us about your self</Label>
                <Input type="bio" name="bio" id="exampleText"
                value={bio} onChange={e=>onChange(e)}
                />
            </FormGroup>
            <Button color="secondary" onClick={() => ToggelSocialField(!displaySocialInput)}>Add Social Network Links</Button>{' '}
            {displaySocialInput && <Fragment>
                <FormGroup>
                    <Label for="twitter">Twitter Link</Label>
                    <Input type="twitter" name="twitter" id="exampleTwitter" placeholder="enter your twitter link" 
                    value={twitter} onChange={e=>onChange(e)}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="Facebook">facebook Link</Label>
                    <Input type="facebook" name="facebook" id="exampleFacebook" placeholder="enter your facebook link" 
                    value={facebook} onChange={e=>onChange(e)}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="Youtube">youtube Link</Label>
                    <Input type="youtube" name="youtube" id="exampleYoutube" placeholder="enter your youtube chanell link please"
                    value={youtube} onChange={e=>onChange(e)}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="instagram">instagram Link</Label>
                    <Input type="instagram" name="instagram" id="exampleYoutube" placeholder="enter your instagram link please"
                    value={instagram} onChange={e=>onChange(e)}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="linkedin">Linkedin Link</Label>
                    <Input type="linkedin" name="linkedin" id="exampleLinkedin" placeholder="enter your linkedin please"
                    value={linkedin} onChange={e=>onChange(e)}
                    />
                </FormGroup>
                </Fragment>
            }
            <div className="d-flex justify-content-end">
            <Button color="success"> create</Button>
          <Link to='/profileUser'><Button color="secondary"> Go Back</Button></Link>  
            </div>
            </Form>
        </Fragment>
    )
}

EditeProfile.propTypes = {
createProfile:PropTypes.func.isRequired,
getCurrentProfile:PropTypes.func.isRequired,
}
const mapStateToProps = state=>({
    profile:state.profile
})

export default connect(mapStateToProps,{createProfile,getCurrentProfile})(withRouter(EditeProfile))
