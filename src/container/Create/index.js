import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Footer from "common/Footer";
import { Button, FormControl, ControlLabel } from "react-bootstrap";

import axios from 'axios';


class Create extends Component {

    constructor() {
        super()
        this.state = {
            firstname: "",
            lastname: '',
            username: '',
            email: '',
            password: '',
            rpassword: '',
            companyname: ''
        }
    }
    // state = {
    //     firstname: '',
    //     lastname:'',
    //     username:'',
    //     email: '',
    //     password: '',
    //     rpassword: '',
    //     companyname:''
    //   }
    firstnameChange(event) {
        const inputFirstName = event.target.value;
        this.setState({
            firstname: inputFirstName
        });
    }
    lastnameChange(event) {
        const inputLastName = event.target.value;
        this.setState({
            lastname: inputLastName
        });
    }
    usernameChange(event) {
        const inputUsername = event.target.value;
        this.setState({
            username: inputUsername
        });
    }
    emailChange(event) {
        const inputEmail = event.target.value;
        this.setState({
            email: inputEmail
        });
    }
    passwordChange(event) {
        const inputPassword = event.target.value;
        this.setState({
            password: inputPassword
        });
    }
    rpasswordChange(event) {
        const inputRPassword = event.target.value;
        this.setState({
            rpassword: inputRPassword
        });
    }
    companynameChange(event) {
        const inputCompanyName = event.target.value;
        this.setState({
            companyname: inputCompanyName
        });
    }
    handleInputChange = event => {
        const { value, name } = event.target;
        this.setState({
            [name]: value
        })
    }

    handleSubmit = event => {
        event.preventDefault();
        // console.log(this.state.firstname);
        if(this.firstname.value == ''){
            alert('enter your firstname')
        }
        else if(this.lastname.value == ''){
            alert('enter your lastname')
        }
        else if(this.username.value == ''){
            alert('enter your username')
        }
        else if(this.companyname.value == ''){
            alert('enter your companyname')
        }
        else if(this.email.value == ''){
            alert('enter your email')
        }
        else if(this.password.value == ''){
            alert('enter your password')
        }
        else if(this.rpassword.value == ''){
            alert('enter your password')
        }
        else if (this.rpassword.value == this.password.value){

            // event.stopPropagation();
            axios.post('https://dev.boltos.io:3000/api/v1/users/register', {
                firstname: this.firstname.value,
                lastname: this.lastname.value,
                username: this.username.value,
                companyname: this.companyname.value,
                email: this.email.value,
                password: this.password.value

            }).then(response => {
                console.log(response)
                //if the login returns true, redirect
                // console.log(response.data);
                if (response) {
                    // redirect 
                    
                    alert('Please Check Your Email')
                    // this.setState({acceptModal:ture})
                    this.props.history.push('/users/verify-account');
                }
            }).catch(error => {
                // console.log(error.response.status + " error");
                // console.log(error.response.data[0]);
                // show an error message
            })


        }
        else{
            alert('password nad reset password not matched')
        }
    }

    signOut = () => {
        const token = localStorage.getItem('token');
        localStorage.clear()
        window.location.pathname = '/'
    }

    render() {

        return (
            <div className="create">
                <div className="login-header">
                    <Link to="/"><img className="logo" src="/assets/img/green-logo.jpg" alt="" /></Link>
                    <div className="right-side__header">
                        {/* <Link to="/home/dashboard">Dashboard</Link> */}
                        <Link to="/download">Download</Link>
                        <Link to="#">Contact Us</Link>
                        <Link to="/">Sign In</Link>
                    </div>
                </div>

                <div className="create-content">
                    <div className="container">
                        <form className="create-box">
                            <div className="center-box">
                                <p className="h4">Create <b>BoltOS.io</b> Account</p>
                                <p className="second-txt">Let's quickly gather some brief information and you'll be on your way to gain access to a robust platform!</p>

                                <div className="flex-row">
                                    <div className="half-width">
                                        <ControlLabel>First Name</ControlLabel>
                                        <FormControl placeholder="Enter First Name Here.." inputRef={(ref) => this.firstname = ref} />
                                    </div>

                                    <div className="half-width">
                                        <ControlLabel>Last Name</ControlLabel>
                                        <FormControl type="text" placeholder="Enter Last Name Here.." inputRef={(ref) => this.lastname = ref} />
                                    </div>
                                </div>
                                <div className="flex-row">
                                    <div className="complete-width">
                                        <ControlLabel>Username</ControlLabel>
                                        <FormControl type="text" placeholder="Username" inputRef={(ref) => this.username = ref} />
                                    </div>
                                </div>
                                <div className="flex-row">
                                    <div className="half-width">
                                        <ControlLabel>Email</ControlLabel>
                                        <FormControl type="email" placeholder="Enter Email Address Here.." inputRef={(ref) => this.email = ref} />
                                    </div>

                                    <div className="half-width">
                                        <ControlLabel>Company</ControlLabel>
                                        <FormControl type="text" placeholder="Enter Company Name Here.." inputRef={(ref) => this.companyname = ref} />
                                    </div>
                                </div>
                                <div className="flex-row">
                                    <div className="half-width">
                                        <ControlLabel>Password</ControlLabel>
                                        <FormControl type="password" placeholder="Enter Password Here.." inputRef={(ref) => this.password = ref} />
                                    </div>

                                    <div className="half-width">
                                        <ControlLabel>Confirm Password</ControlLabel>
                                        <FormControl type="password" placeholder="Enter Confirmation Password Here.." inputRef={(ref) => this.rpassword = ref} />
                                    </div>
                                </div>
                                {/* <div className="flex-row">
                                    <div className="complete-width">
                                        <ControlLabel>Email</ControlLabel>
                                        <FormControl type="email" placeholder="Enter Email Address Here.." onChange={this.handleInputChange} value={this.state.firstname} />
                                    </div>
                                </div> */}

                                <Button className="create-account__btn" type="submit" onClick={this.handleSubmit} >Create Account</Button>
                                <div className="more-information">
                                    <small>By clicking Sign In, you agree to our <a href="https://app.termly.io/document/terms-of-use-for-website/bec9c303-4156-4a2b-902f-9e741e1bb2b1">Terms of Use</a> and our <a href="https://app.termly.io/document/privacy-policy/d35bc41a-dd75-4912-ae51-9d7deea90433">Privacy Policy
                                                </a>.</small>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>

                <Footer />
            </div>
        )
    }
}

const mapStateToProps = state => ({
    session: state.session
});

export default connect(mapStateToProps)(Create)