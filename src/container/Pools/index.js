import React, { Component } from 'react'
import { connect } from 'react-redux'
import Loader from 'react-loader'
import {
	Button,
	Table,
	ControlLabel,
	FormControl,
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

		this.accountName = [];
		this.currency = [];
		this.stratumUrl = [];
		this.username = [];
		this.password = [];
	}

	componentWillMount() {
		this.getData()
	}

	getData = () => {
		var token = localStorage.getItem('token')
		// console.log('token dashboard', token)
		// axios.get('https://dev.boltos.io:3000/api/v1/users/mining-pools', {
		axios.get('http://localhost:3000/api/v1/users/mining-pools', {
			headers: {
				'Authorization': 'Bearer ' + token,
			}
		})
			.then(res => {
				if (res.status == 200) {
					
					res.data.data.map(item => {
						item.isEdit = false;
					});
					this.setState({ data: res.data.data });

				} else {
					this.props.history.push('/');
				}
				console.log('res mining-profile =>', res.data)
				// this.addProducts(res.data.data.length, res.data.data)
			})
	}

	save = (index) => {
		// this.getData();
		const reqData = {
			mpool_id : this.state.data[index].mpool_id,
			accountName : this.accountName[index].value,
			currency : this.currency[index].value,
			stratumUrl : this.stratumUrl[index].value,
			username : this.username[index].value,
			password : this.password[index].value
		};

		var token = localStorage.getItem('token')

		axios.post('http://localhost:3000/api/v1/users/mining-pool',reqData, {
			headers: {
				'Authorization': 'Bearer ' + token,
			}
		}).then(res => {
			if (res.status == 200) {
				this.getData();
			} else {
				this.props.history.push('/');
			}
		});
	}

	delete = (index) => {
		var token = localStorage.getItem('token');
		const reqData = {
			mpool_id : this.state.data[index].mpool_id,
		};

		var r = confirm("Do you want to delete this pool?");
		if(!r) {
			return;
		}
		
		axios.post('http://localhost:3000/api/v1/users/delete-mining-pool',reqData, {
			headers: {
				'Authorization': 'Bearer ' + token,
			}
		}).then(res => {
			if (res.status == 200) {
				this.getData();
			} else {
				this.props.history.push('/');
			}
		});

	}

	editPool = (index) => {
		this.state.data[index].isEdit = true;
		this.setState({data: this.state.data});
	}

	cancelEditPool = (index) => {
		this.state.data[index].isEdit = false;
		this.setState({data: this.state.data});
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
										<td>
										 	{ !item.isEdit ? item.accountName : null}
										 	{ item.isEdit ?  <FormControl type="text" defaultValue={item.accountName} inputRef={(ref) => this.accountName[i] = ref} />: null}
										</td>
										<td>
											{ !item.isEdit ? <img className="bitcoin-img" src="/assets/img/bitcoin.png" alt="" /> : null}
											{ !item.isEdit ? item.currency : null}
											{ item.isEdit ? <FormControl type="text" defaultValue={item.currency} inputRef={(ref) => this.currency[i] = ref}/> : null}
										</td>
										<td>
											{ !item.isEdit ? item.stratumUrl : null}
											{ item.isEdit ? <FormControl type="text" defaultValue={item.stratumUrl} inputRef={(ref) => this.stratumUrl[i] = ref}/> : null}
										</td>
										<td>
											{ !item.isEdit ? item.username : null}
											{ item.isEdit ? <FormControl type="text" defaultValue={item.username} inputRef={(ref) => this.username[i] = ref}/>: null}
										</td>
										<td>
											{ !item.isEdit ? item.password : null}
											{ item.isEdit ? <FormControl type="text" defaultValue={item.password} inputRef={(ref) => this.password[i] = ref}/> : null}
										</td>
										<td className="table-btn">
											{/* <Button className="black-btn" onClick={() => this.props.history.push('/home/edit')}>Go To Edit</Button> */}
											{ !item.isEdit ? <Button className="black-btn" onClick={() => this.editPool(i)}>Edit</Button> : null}
											{ item.isEdit ? <Button className="green-btn" onClick={() => this.save(i)}>Save</Button>: null}
											{ item.isEdit ? <Button className="gray-btn" onClick={() => this.cancelEditPool(i)}>Cancel</Button>: null}
											<Button className="red-btn" onClick={() => this.delete(i)}>Delete</Button>
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
