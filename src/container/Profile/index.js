import React, { Component } from 'react'
import query from '../../common/Query'
import { connect } from 'react-redux'
import { FormGroup, ControlLabel, FormControl, Button, Row, Col } from "react-bootstrap";
import axios from 'axios';



class Profile extends Component {
	constructor() {
		super()
		this.state = {
			oldpassword: '',
			newpassword: '',

		}

	}


	oldpasswordChange(event) {
		const inputOldPassword = event.target.value;
		this.setState({
			oldpassword: inputOldPassword
		});
	}
	newpasswordChange(event) {
		const inputNewPassword = event.target.value;
		this.setState({
			newpassword: inputNewPassword
		});
	}


	handleSubmit = event => {
		event.preventDefault();
		var token = localStorage.getItem('token')
		// console.log(this.state.oldpassword);
		// event.stopPropagation();
		var headers = {
			'Authorization': 'Bearer ' + token
		}
		const reqData = {

			oldpassword: this.oldpassword.value,
			newpassword: this.newpassword.value
		}
		axios.post('https://dev.boltos.io:3000/api/v1/users/reset-password-internal', reqData, { headers: headers }).then(response => {
			// console.log('1111');

			if (response == 200) {

				alert('pass reset successfully');


			} else {
				alert('reset pass failed');
			}
		}).catch(error => {
			// console.log(error, " error");

			// show an error message
		})
		// make POST request to /api/user/login, data is email and password
	}



	componentWillMount() {
		// console.log('===>', this.props)
	}

	render() {
		return (
			<div className="profile">
				<p className="title-page">User Profile</p>
				<div className="flex-row">
					<div className="profile-box">
						<div className="flex-row">
							<div className="left-box">
								<img className="profile-img" src="/assets/img/default.jpg" alt="" />
								<small><img className="img-logo" src="/assets/img/image.png" alt="" />Click here to change image</small>
							</div>
							<div className="right-box">
								<p className="h5">Profile Name</p>
								<small>Sales Executive</small>
								<p className="bio-txt">Bio</p>
								<FormGroup controlId="formControlsTextarea">
									<FormControl className="textarea-pro" componentClass="textarea" placeholder="textarea" />
								</FormGroup>
							</div>
						</div>
						<ControlLabel>Old Password</ControlLabel>
						<FormControl type="password" placeholder="Password" inputRef={(ref) => this.oldpassword = ref} />
						<ControlLabel>New Password</ControlLabel>
						<FormControl type="password" placeholder="new password" inputRef={(ref) => this.newpassword = ref} />
						<ControlLabel>Confirm New Password</ControlLabel>
						<FormControl type="password" placeholder="confirm new Password" />
						<Button className="gray-btn" type="submit" onClick={this.handleSubmit} >Change Password</Button>
					</div>
					<div className="noti-box">
						<p className="title-page">Notifications</p>
						<Row>
							<Col sm={12} md={4}>
								<div className="flex-row">
									<p>Email</p>
									<div className="btn-group btn-group-sm btn-group-toggle" data-toggle="buttons">
										<label className="btn btn-secondary active"><input type="radio" name="options" id="option1" autoComplete="off" checked="" />On</label>
										<label className="btn btn-secondary"><input type="radio" name="options" id="option2" autoComplete="off" disabled="" />Off</label>
									</div>
								</div>
							</Col>
							<Col sm={12} md={8}>
								<ControlLabel>Email Address</ControlLabel>
								<FormControl type="email" placeholder="your email" />
							</Col>
							<Col sm={12} md={4}>
								<div className="flex-row">
									<p>SMS</p>
									<div className="btn-group btn-group-sm btn-group-toggle" data-toggle="buttons">
										<label className="btn btn-secondary active"><input type="radio" name="options" id="option1" autoComplete="off" checked="" />On</label>
										<label className="btn btn-secondary"><input type="radio" name="options" id="option2" autoComplete="off" disabled="" />Off</label>
									</div>
								</div>
							</Col>
							<Col sm={12} md={8}>
								<ControlLabel>SMS Phone Number</ControlLabel>
								<FormControl type="number" placeholder="your sms" />
							</Col>
							<Col sm={12} md={4}>
								<div className="flex-row">
									<p>Telegram</p>
									<div className="btn-group btn-group-sm btn-group-toggle" data-toggle="buttons">
										<label className="btn btn-secondary active"><input type="radio" name="options" id="option1" autoComplete="off" checked="" />On</label>
										<label className="btn btn-secondary"><input type="radio" name="options" id="option2" autoComplete="off" disabled="" />Off</label>
									</div>
								</div>
							</Col>
							<Col sm={12} md={8}>
								<ControlLabel>Telegram ID</ControlLabel>
								<FormControl type="text" placeholder="your telegram id" />
							</Col>
							<Col sm={12} md={4}>
								<div className="flex-row">
									<p>Slack</p>
									<div className="btn-group btn-group-sm btn-group-toggle" data-toggle="buttons">
										<label className="btn btn-secondary active"><input type="radio" name="options" id="option1" autoComplete="off" checked="" />On</label>
										<label className="btn btn-secondary"><input type="radio" name="options" id="option2" autoComplete="off" disabled="" />Off</label>
									</div>
								</div>
							</Col>
							<Col sm={12} md={8}>
								<ControlLabel>Slack ID</ControlLabel>
								<FormControl type="text" placeholder="your slack id" />
							</Col>
						</Row>
						<Button type="submit" className="gray-btn">Save Notifications</Button>
						<p className="title-page second-title">Two Factor Authentication</p>
						<img className="qr-img" src="/assets/img/qr.png" alt="" />
						<div className="flex-row flex-start">
							<ControlLabel>Secret Key:</ControlLabel>
							<FormControl className="bottom-label" type="text" placeholder="your text" readOnly />
						</div>
						<div className="flex-row flex-start">
							<ControlLabel>Authentication Code:</ControlLabel>
							<FormControl className="bottom-label" type="number" placeholder="your code" />
						</div>
						<Button type="submit" className="gray-btn">Enable</Button>
					</div>
				</div>
			</div>
		)
	}
}

const mapStateToProps = state => ({
	session: state.session
});

export default connect(mapStateToProps)(Profile)