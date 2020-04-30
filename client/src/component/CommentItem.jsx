import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Moment from 'react-moment'
import { deletCOMMENT } from '../action/post'
import { Button } from 'reactstrap'
const CommentItem = ({ deletCOMMENT, comment: { _id, text, date, user, name }, postid ,authUser}) => {
    return (
        <div>
            <h1>{text}</h1>
            <Link to={`/profile/${user}`}><h1>{name}</h1></Link>
           <p> Posted on  <Moment format='YYYY/DD/MM'>{date}</Moment></p>
           {authUser && user === authUser.user._id && (
               <Button color ='danger' onClick ={e=>deletCOMMENT(postid, _id)}>delete</Button>
           )}
        </div>
    )
}

CommentItem.propTypes = {
    deletCOMMENT: PropTypes.func.isRequired,
    comment: PropTypes.object.isRequired,
    authUser: PropTypes.object.isRequired,
    postid: PropTypes.number.isRequired,
}
const mapStateToProps = state => ({
    authUser: state.authUser
})
export default connect(mapStateToProps, {deletCOMMENT})(CommentItem)
