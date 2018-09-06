import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Footer from "common/Footer";
import { Button, FormControl, FormGroup, InputGroup } from "react-bootstrap";
import querySrting from 'query-string';
import axios from 'axios';

class ResetPass extends Component {
    state = {
        password: '',
        randomkey: '',
        id: -1

    }
    
    componentDidMount() {
        // console.log(this.props.location.search) // ?randomkey=qwerty&id=1234
        const values = querySrting.parse(this.props.location.search);
        // console.log(values.randomkey, values.id);
        this.id = parseInt(values.id);
        this.randomKey = values.randomKey;
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
        // event.stopPropagation();
        // console.log(this.randomkey, this.id, this.password.value)

        axios.post('https://dev.boltos.io:3000/api/v1/users/reset-password', {
            randomKey: this.randomKey,
            id: this.id,
            password: this.password.value
        }).then(response => {
            //if the login returns true, redirect      
            if (response && response.data) {
               
                this.props.history.push('/');
                if (response.data.data) {
                 
                    this.props.history.push('/');
                } else {
                    // document.getElementById('login-error').style.visibility = "visible";
                            alert('reset pass fail !');
                }

            }
        }).catch(error => {
            // console.log(error);
            alert(error , 'Server Error');
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
                        <Button className="create-btn" onClick={() => this.creatPage()}>Create An Account</Button>
                    </div>
                </div>

                <div className="create-content">
                    <div className="container">
                        <form className="create-box">
                            <div className="password-box">
                                <p className="h4">Reset Password</p>
                                <p className="second-txt">Enter Your New Password</p>
                                <FormGroup>
                                    <FormControl type="password" placeholder="Enter Your New Password" inputRef={(ref) => this.password = ref} />
                                </FormGroup>
                                <FormGroup>
                                    <FormControl type="password" placeholder="Confirm New Password" />
                                </FormGroup>

                                <Button className="signin-btn" type="submit" onClick={this.handleSubmit} >Accept</Button>
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

export default connect(mapStateToProps)(ResetPass) 