import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import {
    CAlert,
    CButton,
    CCard,
    CCardBody,
    CCardFooter,
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
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Util from '../../../Util/Util';
import AuthService from '../../../service/AuthService';


class RegisterComp extends Component {
    constructor(props) {
        super(props)

        this.state = {
            username: '',
            password: '',
            repeatPassword: '',
            email: '',
            dob: '',           
            startDate: '',
            showMsg:false
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
    validate = (values) => {
        console.log("IN validate");
        let errors = {}
        if (!values.username) {
            errors.username = 'Enter a User Name'
        } else if (values.username.length < 5) {
            errors.username = 'Enter atleast 5 Characters in Username'
        }

        return errors

    }

    createAccount = () => {
        // e.preventDefault();
        console.log("login clicked");

        const data = this.state;
          data.dob = Util.parseDate(this.state.startDate);
          if(AuthService.registerUser(data)) {
            this.setState({ showMsg: true })
          }
         // AuthService.registerUser(data).then(()=>this.props.history.push('/login'));
    }

    handleDateChange = startDate => {
        this.setState({
            startDate
        });
    };

    render() {
        const { startDate } = this.state;
        const accountCreationMsg = this.state.showMsg ?<CAlert color="success">User Account created. Please <Link to ='/login'>click here for login</Link></CAlert> : '';
        
        return (
            <div className="c-app c-default-layout flex-row align-items-center">
                <CContainer>
                    <CRow className="justify-content-center">
                        <CCol md="9" lg="7" xl="6">
                            <CCard className="mx-4">
                                <CCardBody className="p-4">
                                    <CForm >
                                        <h1>Register</h1>
                                        <p className="text-muted">Create your account</p>
                                        {accountCreationMsg}
                                        <CInputGroup className="mb-3">
                                            <CInputGroupPrepend>
                                                <CInputGroupText>
                                                    <CIcon name="cil-user" />
                                                </CInputGroupText>
                                            </CInputGroupPrepend>
                                            <CInput type="text" required name="username" value={this.state.username} onChange={this.handleChange} placeholder="Username" autoComplete="username" />
                                        </CInputGroup>
                                        <CInputGroup className="mb-3">
                                            <CInputGroupPrepend>
                                                <CInputGroupText>@</CInputGroupText>
                                            </CInputGroupPrepend>
                                            <CInput type="text" name="email" required value={this.state.email} onChange={this.handleChange} placeholder="Email" autoComplete="email" />
                                        </CInputGroup>
                                        <CInputGroup className="mb-3">
                                            <CInputGroupPrepend>
                                                <CInputGroupText>
                                                    <CIcon name="cil-lock-locked" />
                                                </CInputGroupText>
                                            </CInputGroupPrepend>
                                            <CInput type="password" name="password" value={this.state.password} onChange={this.handleChange} placeholder="Password" autoComplete="new-password" />
                                        </CInputGroup>
                                        <CInputGroup className="mb-3">
                                            <CInputGroupPrepend>
                                                <CInputGroupText>
                                                    <CIcon name="cil-lock-locked" />
                                                </CInputGroupText>
                                            </CInputGroupPrepend>
                                            <CInput type="password" name="repeatPassword" value={this.state.repeatPassword} onChange={this.handleChange} placeholder="Repeat password" autoComplete="new-password" />
                                        </CInputGroup>
                                        <CInputGroup className="mb-3">
                                            <CInputGroupPrepend>
                                                <CInputGroupText>
                                                    <CIcon name="cil-calendar" />
                                                </CInputGroupText>
                                            </CInputGroupPrepend>
                                            <DatePicker placeholderText="Date and time of Birth" todayButton="today" selected={startDate}
                                                peekNextMonth showMonthDropdown showYearDropdown dropdownMode="select" 
                                                dateFormat="MM/dd/yyyy " withPortal
                                                onChange={this.handleDateChange} />
                                        </CInputGroup>                                        
                                        <CButton color="success" onClick={this.createAccount} block>Create Account</CButton>
                                    </CForm>
                                </CCardBody>
                                <CCardFooter className="p-4">
                                    <CRow>
                                        <CCol xs="12" sm="6">
                                            <Link to="/login">
                                                <CButton color="primary" className="mt-3" active tabIndex={-1}>Go to Login</CButton>
                                            </Link>
                                        </CCol>
                                        <CCol xs="12" sm="6">
                                            <Link to="/login">
                                                <CButton color="primary" className="mt-3" active tabIndex={-1}>Forgot Password</CButton>
                                            </Link>
                                        </CCol>
                                    </CRow>
                                </CCardFooter>
                            </CCard>
                        </CCol>
                    </CRow>
                </CContainer>



            </div>
        )
    }

}

export default RegisterComp