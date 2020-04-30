import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { addComment } from '../action/post'
import { FormGroup, Label, Input, Button } from 'reactstrap'
const AddComments = ({ addComment, postid }) => {
   const  [text,setText] = useState('')
    return (
        <div>
            <form onSubmit={e => {
                e.preventDefault()
                addComment(postid,{text})
                setText('')
            }}>
                <h1>create your post Please</h1>
                <FormGroup>
                    <Label for="exampleText">take A post</Label>
                    <Input type="textarea" name="text" id="exampleText"
                        value={text} onChange={e => setText(e.target.value)} />
                </FormGroup>
                <Button outline color="secondary"> posted</Button>
            </form>
        </div>

    )
}

AddComments.propTypes = {
    addComment: PropTypes.func.isRequired,
}

export default connect(null, { addComment })(AddComments)
