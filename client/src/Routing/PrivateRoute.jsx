import React from 'react'
import PropTypes from 'prop-types'
import { connect } from "react-redux"
import { Route, Redirect } from "react-router-dom"

const PrivateRoute = ({ component: Component, authUser: { isAuthentification, loading }, ...rest }) => (
    <Route
        {...rest} render={props =>
            !isAuthentification && !loading ? (
                <Redirect to='profileUser' />
            ) : (<Component {...props} />)
        }
    />
)
PrivateRoute.propTypes = {
    authUser: PropTypes.object.isRequired,
}
const mapStateToProps = state => ({
    authUser: state.authUser
})

export default connect(mapStateToProps)(PrivateRoute)
