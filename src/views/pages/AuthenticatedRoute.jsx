import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'
import AuthService from '../../service/AuthService.js'

class AuthenticatedRoute extends Component {
    render() {
        if (AuthService.checkUserLoggedin()) {
            console.log("HI");
            return <Route {...this.props} />
        } else {
            console.log("Hello");
            return <Redirect to="/login" />
        }
    }
}

export default AuthenticatedRoute