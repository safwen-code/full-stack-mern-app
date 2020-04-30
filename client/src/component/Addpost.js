import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from "react-redux"
import { addPost } from '../action/post'
import { FormGroup,Label,Input, Button } from 'reactstrap'
const Addpost = ({ addPost }) => {
    const [text, setText] = useState('')
    return (
        <div>
            <form onSubmit = {e=> {
                e.preventDefault()
                addPost({ text })
                setText('')
            }}>
                <h1>create your post Please</h1>
                <FormGroup>
                    <Label for="exampleText">take A post</Label>
                    <Input type="textarea" name="text" id="exampleText" 
                    value={text}  onChange={e=>setText(e.target.value)}/>
                </FormGroup>
                <Button outline color="secondary"> posted</Button>
            </form>
        </div>
    )
}

Addpost.propTypes = {
    addPost: PropTypes.func.isRequired,
}

export default connect(null, { addPost })(Addpost)
