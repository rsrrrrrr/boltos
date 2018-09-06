import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from "react-bootstrap";

export default class Header extends React.Component {
    signOut = () =>{
        const token = localStorage.getItem('token');
        localStorage.clear()
        window.location.pathname = '/'
    }

    render() {
        return (
            <div className="header">
                <Link to="/"><img className="logo" src="/assets/img/green-logo.jpg" alt="" /></Link>
                <div className="right-side__header">
                    <Link to="/home/dashboard">Dashboard</Link>
                    <Link to="/download">Download</Link>
                    <Link to="#">Contact Us</Link>
                    <Button onClick={this.signOut}>Sign Out</Button>
                    {/* <Button className="download-btn" href="/create">
                        <img className="logo-download" src="/assets/img/download.png" alt="" />
                        Download
                    </Button> */}
                </div>
            </div>
        )
    }
}