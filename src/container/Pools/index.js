import React, { Component } from 'react'
import { connect } from 'react-redux'
import Loader from 'react-loader'
import {
	Button,
	Table,
	Row,
	Col
} from 'react-bootstrap'
import axios from 'axios';

class Pools extends Component {
	constructor(props, context) {
		super(props, context);

		this.state = {
			data: []
		};
	}

	componentWillMount() {
		this.getData()
	}

	getData = () => {
		var token = localStorage.getItem('token')
		// console.log('token dashboard', token)
		axios.get('https://dev.boltos.io:3000/api/v1/users/mining-pools', {
			headers: {
				'Authorization': 'Bearer ' + token,
			}
		})
			.then(res => {
				if (res.status == 200) {
					this.setState({ data: res.data.data })
				} else {
					this.props.history.push('/');
				}
				// console.log('res mining-profile =>', res.data)
				// this.addProducts(res.data.data.length, res.data.data)
			})
	}

	render() {
		const { data } = this.state
		return (
			<div className="pools">
				<Loader loaded={true} color="white" />
				<p className="title-page">Mining Server Dashboard</p>
				<p className="gray-box">Mining Pools</p>
				{/* <div className="chart">
					<Row>
						<Col sm={12} md={4}>
							<div className="chart-box">
								<p className="title-chart gray-btn">Chart Data</p>
								<img className="cirecle-chart-img" src="/assets/img/pie-chart.png" alt="" />
							</div>
						</Col>
						<Col sm={12} md={4}>
							<div className="chart-box">
								<p className="title-chart lightgray-btn">Chart Data</p>
								<img className="chart-img" src="/assets/img/chart.png" alt="" />
							</div>
						</Col>
						<Col sm={12} md={4}>
							<div className="chart-box">
								<p className="title-chart red-btn">Chart Data</p>
								<img className="chart-img" src="/assets/img/bar-chart.png" alt="" />
							</div>
						</Col>
					</Row>
				</div> */}
				<div className="general-table">
					<Table striped condensed hover>
						<thead>
							<tr>
								<th>Account Name</th>
								<th>Currency</th>
								<th>Stratum URL</th>
								<th>Username</th>
								<th>Password</th>
								<th>Actions</th>
							</tr>
						</thead>
						<tbody>
							{
								data.map((item, i) =>
									<tr key={i}>
										<td>{item.accountName}</td>
										<td><img className="bitcoin-img" src="/assets/img/bitcoin.png" alt="" />{item.currency}</td>
										<td>{item.stratumUrl}</td>
										<td>{item.username}</td>
										<td>{item.password}</td>
										<td className="table-btn">
											<Button className="black-btn" onClick={() => this.props.history.push('/home/edit')}>Edit</Button>
											<Button className="red-btn">Delete</Button>
										</td>
									</tr>
								)
							}
						</tbody>
					</Table>
					<div className="pagination-box">
						<Button className="btn-pagination">Showing 1 to 3 of 3 entries</Button>
						<nav className="page-box" aria-label="Page navigation example">
							<ul className="pagination justify-content-end">
								<li className="page-item disabled">
									<a className="page-link" href="#">Previous</a>
								</li>
								<li className="page-item"><a className="page-link" href="#">1</a></li>
								<li className="page-item disabled">
									<a className="page-link" href="#">Next</a>
								</li>
							</ul>
						</nav>
					</div>
				</div>
			</div >
		)
	}
}

const mapStateToProps = state => ({
	session: state.session
});

export default connect(mapStateToProps)(Pools)
