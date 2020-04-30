import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Moment from 'react-moment'
import { Link } from 'react-router-dom'
import { addLike, removeLike, deletPost } from '../action/post'
import { CardBody, CardText, Card, CardTitle, Button } from 'reactstrap'

const PostItem = ({
  addLike, removeLike,deletPost,
  authUser,
  post: { _id, text, name, user, likes, comments, date },
  showAction
}) => {
  return (
    <Fragment>
      
      <Card outline color="success">
        <CardBody>
          <CardTitle>{name}</CardTitle>
          <CardText>{text}</CardText>
          <p>posted on<Moment format='YYYY/MM/DD'>{date}</Moment></p>
          {showAction && <Fragment>
            <div class='rounded-sm p-1 m-1 '>
            <Button color="info" onClick={e => addLike(_id)}>
              <ion-icon name="hand-left-outline"></ion-icon>
              {likes.length > 0 && (<span>{likes.length}</span>)}</Button>
            <Button color="danger" onClick={e => removeLike(_id)}>
              <ion-icon name="hand-right-outline"></ion-icon>
            </Button>
            <Link to={`/posts/${_id}`}>
              <Button color="warning" ><ion-icon name="chatbubbles-outline"></ion-icon>
                {comments.length}</Button>
            </Link>
          </div>
          {!authUser.loading && user === authUser.user._id && (
            <Button color='danger' onClick={e=>deletPost(_id)}>delete</Button>
          )}
            </Fragment>}
          

        </CardBody>

      </Card>


    </Fragment>
  )
}
PostItem.defaultProps={
  showAction:true
}
PostItem.propTypes = {
  authUser: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
  addLike:PropTypes.func.isRequired,
  removeLike:PropTypes.func.isRequired,
  deletPost:PropTypes.func.isRequired,
}
const mapStateToProps = state => ({
  authUser: state.authUser
})
export default connect(mapStateToProps, { addLike, removeLike, deletPost })(PostItem)
