import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Footer from "common/Footer";
import { Button, FormControl, FormGroup,InputGroup } from "react-bootstrap";

import axios from 'axios';


class Password extends Component {
    state = {
        email: ''
    }
    createPage = () => {
        this.props.history.push('/create');
    }
    signOut = () => {
        const token = localStorage.getItem('token');
        localStorage.clear()
        window.location.pathname = '/'
    }

    createPage = () => {
        this.props.history.push('/create');
    }


    handleSubmit = event => {
        event.preventDefault();
        // event.stopPropagation();
        axios.post('https://dev.boltos.io:3000/api/v1/users/request-reset-password', {

            email: this.email.value
          
        }).then(response => {
            //if the login returns true, redirect      
            if (response && response.data) {
                //check if logged in
                // check if login is successful
             
                if (response.data.data) {
                    alert('check your mail !');
                } else {
                    alert('reset password failed !')
                }
            }
        }).catch(error => {
            // console.log(error);

            // show an error message
        })
        // make POST request to /api/user/login, data is email and password
    }




    render() {

        return (
            <div className="create">
                <div className="login-header">
                    <Link to="/"><img className="logo" src="/assets/img/green-logo.jpg" alt="" /></Link>
                    <div className="right-side__header">
                        <Link to="/home/dashboard">Dashboard</Link>
                         <Link to="/download">Download</Link>
                        <Link to="#">Contact Us</Link>
                        <Button onClick={this.signOut}>Sign In</Button>
                        <Button className="create-btn" onClick={()=>this.createPage()}>Create An Account</Button>
                    </div>
                </div>

                <div className="create-content">
                    <div className="container">
                        <form className="create-box">
                            <div className="password-box">
                                <img className="password-img" src="/assets/img/typing.jpg" alt="" />
                                <p className="h4">Forgot Password?</p>
                                <p className="second-txt">You will be emailed a link if email address is found.</p>
                                <FormGroup>
                                    <InputGroup>
                                        <InputGroup.Addon><div className="icon-email"/></InputGroup.Addon>
                                        <FormControl type="email" placeholder="email address"  inputRef={(ref) => this.email = ref} />
                                    </InputGroup>
                                </FormGroup>

                                <div className="flex-row">
                                    <Button className="password-btn" type="submit" onClick={this.handleSubmit} >Reset Password</Button>
                                    <Button className="password-btn" type="submit">Recover Username</Button>
                                </div>
                                <div className="more-information">
                                <small>By clicking Sign In, you agree to our <a href="https://app.termly.io/document/terms-of-use-for-website/bec9c303-4156-4a2b-902f-9e741e1bb2b1">Terms of Use</a> and our <a href="https://app.termly.io/document/privacy-policy/d35bc41a-dd75-4912-ae51-9d7deea90433">Privacy Policy
                                                </a>.</small>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>

                <Footer/>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    session: state.session
});

export default connect(mapStateToProps)(Password)