import React,{Fragment,useEffect} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {getPost} from '../action/post'
import {Spinner,Row,Col,Container} from 'reactstrap'
import PostItem from './PostItem'
import Addpost from './Addpost'
const Posts =({getPost,post:{posts,loading}}) => {
    useEffect(()=>
    {getPost()}
    ,[getPost])
    return loading ? <Spinner color="primary" /> : (
        <Fragment>
         <Container>     
        <h1> postes</h1>
        <p>Welcom to the community</p>
          <Addpost />
        <Row  xs="2">
        <Col >
        {posts.map(post=>(
            <PostItem key={post._id} post={post}/>
        ))}
        </Col>
        </Row>
        </Container>
        </Fragment>
    )
}

Posts.propTypes = {
 getPost :PropTypes.func.isRequired,
 post:PropTypes.object.isRequired,
}
const mapStateToProps = state =>({
    post :state.post
})
export default connect(mapStateToProps, {getPost}) (Posts)
