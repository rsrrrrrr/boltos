import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Footer from "common/Footer";
import { Button, FormControl, ControlLabel } from "react-bootstrap";

import axios from 'axios';


class Download extends Component {


    render() {

        return (
            <div className="download">
                <div className="login-header">
                    <Link to="/"><img className="logo" src="/assets/img/green-logo.jpg" alt="" /></Link>
                    <div className="right-side__header">
                        {/* <Link to="/home/dashboard">Dashboard</Link> */}
                         {/* <Link to="/download">Download</Link> */}
                        <Link to="#">Contact Us</Link>
                        <Link to="/">Sign In</Link>
                    </div>
                </div>
                <div className="create-content">
                    <div className="container">
                        <div className="create-box">
                            <p className="h4"><b>BoltOS</b> Installation Guide</p>
                            <p className="second-txt">Deploy, Manage, & Monitor</p>
                            <div className="second-box">
                                <p className="second-title">Perform All Your Rig Deployment, Management, And Monitor From The Web Remotely - 
                                All For <b>FREE</b> With No Rig Limit.
                                </p>
                                <div className="download-box">
                                    <div className="left-box">
                                        <p className="second-title">Install flashing tool: </p>
                                        <div className="first-box"><p className="h4"><a className="green-text" href="https://etcher.io/">"ethcher,</a><a className="green-text" href="https://rufus.akeo.ie/">Rufus,</a>Or<a className="green-text" href="http://hddguru.com/software/HDD-Raw-Copy-Tool/">HDD Raw Copy Tool</a>Flash OS image to drive."</p></div>
                                        
                                        <ul className="ul-box">
                                            <li><img src="assets/img/checked.png"></img><p>Open the new drive that will appear in windows after flashing.</p></li>
                                            <li><img src="assets/img/checked.png"></img><p>Edit config.txt to add your username and password, save and close file.</p></li>
                                            <li><img src="assets/img/checked.png"></img><p>Plug the drive into the rig and boot from the drive.</p></li>
                                        </ul>
                                        <Button className="download-btn" href="/os/BoltOS_0.5_img.zip">
                                            <img className="logo-download" src="/assets/img/download.png" alt="" />
                                            Download
                                        </Button>
                                    </div>
                                    <div className="right-box">
                                        <p>Flash OS Image</p>
                                        <img className="flash-img" src="/assets/img/flash.png" alt="" />
                                    </div>
                                </div>
                                <div className="last-box"><p className="h4">Login to the <b>BoltOS</b> dashboard to configure each rig with your mining profile and overclock settings. You can set up multi pool profit switching in your mining server dashboard.</p></div>
                            </div>
                        </div>
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

export default connect(mapStateToProps)(Download)
