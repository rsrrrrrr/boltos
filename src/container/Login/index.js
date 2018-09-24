import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Footer from "common/Footer";
import Particles from 'react-particles-js';
import { query } from "../../common/Query";
import { Button, Row, Col, FormControl, Checkbox } from "react-bootstrap";

import axios from 'axios';

class Login extends Component {

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

    usernameChange(event) {
        const inputUsername = event.target.value;
        this.setState({
            username: inputUsername
        });
    }
    passwordChange(event) {
        const inputPassword = event.target.value;
        this.setState({
            password: inputPassword
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
        const reqData = {
            username: this.username.value,
            password: this.password.value
        }
        // axios.post('https://dev.boltos.io:3000/api/v1/users/login', reqData).then(response => {
        axios.post('http://localhost:3000/api/v1/users/login', reqData).then(response => {
            if (response && response.data) {
                //check if logged in
                // console.log(response.data);
                // check if login is successful

                if (response.data.data) {
                    const token = response.data.data.credentials.token;
                    // console.log('token login', token)
                    localStorage.setItem("token", token);
                    this.props.history.push('/home/dashboard');
                } else {
                    document.getElementById('login-error').style.visibility = "visible";
                }
            }
        }).catch(error => {
            // console.log(error);
            // console.log('Not logged in');
            // show an error message
        })
        // make POST request to /api/user/login, data is email and password
    }

    createPage = () => {
        this.props.history.push('/create');
    }

    signOut = () => {
        const token = localStorage.getItem('token');
        localStorage.clear()
        window.location.pathname = '/'
    }

    privacy = () => {
        document.getElementById('myId').style.display = "block";
        // document.getElementById('myId').style.zIndex = "1";
    }


    render() {

        return (
            <div className="login">
                <Particles
                    params={{
                        particles: {
                            line_linked: {
                                shadow: {
                                    enable: true,
                                    color: "#fff",
                                    shadow: '#fff',
                                    boxShadow: '0 0 3em #fff',
                                    opacity: 1,
                                    blur: 1,

                                }
                            }
                        }
                    }}
                    style={{
                        width: '100%',
                        position: 'absolute',
                        // backgroundImage: `url(${logo})` 
                    }}
                />
                <div className="login-header">
                    <Link to="/"><img className="logo" src="/assets/img/green-logo.jpg" alt="" /></Link>
                    <div className="right-side__header">
                        <Link to="/home/dashboard">Dashboard</Link>
                        <Link to="/download">Download</Link>
                        <Link to="#">Contact Us</Link>
                        {/* <Button onClick={this.signOut}>Sign In</Button> */}
                        <Button className="create-btn" onClick={() => this.createPage()}>Create An Account</Button>
                    </div>
                </div>

                <div className="login-content">
                    <div className="container">
                        <Row>
                            <Col sm={12} md={8}>
                                <div className="text-box">
                                    <p className="h3 login-title">BoltOS.io</p>
                                    <p className="second-title">A powerful system with innovative technologies you can depend on!</p>
                                    <p className="light-text">
                                        Experience a robust web portal that will allow you to manage and monitor your mining process with ease.
                                    </p>
                                    <Button className="create-btn" onClick={() => this.createPage()}>Create An Account</Button>
                                </div>
                            </Col>
                            <Col sm={12} md={4}>
                                <form className="login-box">
                                    <p className="h4">Sign In</p>
                                    <p className="h5 second-txt">Please enter your Username and Password.</p>

                                    <FormControl type="text" placeholder="Username" inputRef={(ref) => this.username = ref} />
                                    <FormControl type="password" placeholder="Password" inputRef={(ref) => this.password = ref} />

                                    <Checkbox>
                                        Remember me
                                    </Checkbox>
                                    <div id="login-error" >
                                        <p className="error-txt">Login failed ! invalid username or password</p>
                                    </div>
                                    <div className="more-information">
                                        <label>
                                            <small>By clicking Sign In, you agree to our <a href="https://app.termly.io/document/terms-of-use-for-website/bec9c303-4156-4a2b-902f-9e741e1bb2b1">Terms of Use</a> and our <a href="https://app.termly.io/document/privacy-policy/d35bc41a-dd75-4912-ae51-9d7deea90433">Privacy Policy
                                                </a>.</small>
                                        </label>
                                    </div>
                                    <Button className="signin-btn" type="submit" onClick={this.handleSubmit} >Sign In</Button>
                                    <Link to="/password" className="forgot-txt"><p>Forgot your password or username?</p></Link>
                                </form>
                            </Col>
                        </Row>
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

export default connect(mapStateToProps)(Login)