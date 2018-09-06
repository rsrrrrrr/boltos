import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'react-bootstrap'


export default class Footer extends React.Component {
	// createPage(){
	// 	this.props.history.push('/create');
	// }
	render() {
		return (
			<div className="footer">
				<div className="container">
					<div className="first-box">
						<div className="col-box">
							<p className="footer-title">Company</p>
							<Link to="/home/dashboard">Dashboard</Link>
							<Link to="#">Contact Us</Link>
							<Link to="/">Sign In</Link>
							{/* <Button className="create-btn" onClick={() => this.createPage()}>Create An Account</Button> */}
						</div>
						<div className="col-box">
							<p className="footer-title">Connnect</p>
							<div>
								<a href="https://www.instagram.com"><img className="logo" src="/assets/img/instagram.png" alt="" /></a>
								<a href="https://twitter.com/"><img className="logo" src="/assets/img/twitter.png" alt="" /></a>
								<a href="https://facebook.com/"><img className="logo" src="/assets/img/facebook.png" alt="" /></a>
								<a href="https://linkedin.com/"><img className="logo" src="/assets/img/linkedin.png" alt="" /></a>
							</div>
						</div>
					</div>
					<p>© Bolt Network LLC | Terms & Conditions | Privacy Policy</p>
				</div>
			</div>
		)
	}
}
