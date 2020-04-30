import React,{useEffect, Fragment} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {getPosts} from '../action/post'
import {Spinner} from 'reactstrap'
import PostItem from './PostItem'
import AddComments from './AddComments'
import CommentItem from './CommentItem'
const Post = ({getPosts, post:{post,loading}, match}) => {
    useEffect(()=>{
     getPosts(match.params.id)
    },[getPosts,match.params.id])
    return (
        <Fragment>
            {loading || post === null ? <Spinner color='danger'/> :
            (<Fragment>
                <PostItem post={post} showAction={false}/>
                <AddComments postid={post._id}/>
                {post.comments.map(comment=>(
                    <CommentItem key={comment._id} comment={comment} postid={post._id}/>
                ))}
            </Fragment>)

            }
        </Fragment>
    )
}

Post.propTypes = {
post:PropTypes.object.isRequired,
getPosts :PropTypes.func.isRequired,
}
const mapStateToProps = state =>({
    post :state.post
})
export default connect(mapStateToProps, {getPosts}) (Post)
