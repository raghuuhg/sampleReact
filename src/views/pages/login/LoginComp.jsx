import { Link } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import React, { Component } from 'react'
import AuthService from '../../../service/AuthService';

class LoginComp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    }
  }

  handleChange = (event) => {
    //console.log(this.state);
    this.setState(
        {
            [event.target.name]: event.target.value
        }
    )
  }

  authenticate = () => {
    var deviceInfo = {
      "deviceId":'54321',
      "deviceType":"DEVICE_TYPE_WEB",
      "notificationToken":"98765",
    }
    var data = {
      "username":this.state.username,
      "password":this.state.password,
      deviceInfo
    }
    if(AuthService.authenticateUser(data)) {
      this.props.history.push('/theLayout');
    } else {
      console.log("There is an error");
    }
    
  }

  render() {
    return (
      <div className="c-app c-default-layout flex-row align-items-center">
        <CContainer>
          <CRow className="justify-content-center">
            <CCol md="8">
              <CCardGroup>
                <CCard className="p-4">
                  <CCardBody>
                    <CForm>
                      <h1>Login</h1>
                      <p className="text-muted">Sign In to your account</p>
                      <CInputGroup className="mb-3">
                        <CInputGroupPrepend>
                          <CInputGroupText>
                            <CIcon name="cil-user" />
                          </CInputGroupText>
                        </CInputGroupPrepend>
                        <CInput type="text" required name="username" value={this.state.username} onChange={this.handleChange} placeholder="Username" autoComplete="Username" />
                      </CInputGroup>
                      <CInputGroup className="mb-4">
                        <CInputGroupPrepend>
                          <CInputGroupText>
                            <CIcon name="cil-lock-locked" />
                          </CInputGroupText>
                        </CInputGroupPrepend>
                        <CInput type="password" name="password" value={this.state.password} onChange={this.handleChange} placeholder="Password" autoComplete="current-password" />
                      </CInputGroup>
                      <CRow>
                        <CCol xs="6">
                          <CButton color="primary" onClick={this.authenticate} block className="px-4">Login</CButton>
                        </CCol>
                        <CCol xs="6" className="text-right">
                          <CButton color="link" className="px-0">Forgot password?</CButton>
                        </CCol>
                      </CRow>
                    </CForm>
                  </CCardBody>
                </CCard>
                <CCard className="text-white bg-primary py-5 d-md-down-none" style={{ width: '44%' }}>
                  <CCardBody className="text-center">
                    <div>
                      <h2>Sign up</h2>
                      <p>Welcome to finstar. An unique tool for your financial needs. Please click on the below link to register.</p>
                      <Link to="/register">
                        <CButton color="primary" className="mt-3" active tabIndex={-1}>Register Now!</CButton>
                      </Link>
                    </div>
                  </CCardBody>
                </CCard>
              </CCardGroup>
            </CCol>
          </CRow>
        </CContainer>
      </div>
    )
  }
}

export default LoginComp