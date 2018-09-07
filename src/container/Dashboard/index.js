import React, { Component } from 'react'
import { connect } from 'react-redux'
import Loader from 'react-loader'
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import {
	Button,
	FormGroup,
	ControlLabel,
	FormControl,
	Checkbox,
	Table,
	Modal,
	Row,
	Pagination,
	Col
} from 'react-bootstrap'
import axios from 'axios'
import query from '../../common/Query';


const products = [];
const defaultValues = {
	core_mhz : 1582,
	memory_mhz : 1350,
	power_limit : 200
}

class Dashboard extends Component {
	constructor(props, context) {
		super(props, context);

		this.state = {
			smShow: false,
			lgShow: false,
			activePage: 1,
			name: 'shima',
			data: [],
			server: {
				gpus: []
			},
			mining: [],
			value: ''
		};
	}

	componentWillMount() {
		// this.addProducts(100);
		this.getData()
	}


	buttons = () => {
		return (
			<div>
				<Button onChange={() => this.start} className="green-btn">Start</Button>
				<Button className="gray-btn">Stop</Button>
				<Button onClick={() => this.setState({ lgShow: true })} className="black-btn">Edit</Button>
				<Button className="yellow-btn">Log</Button>
				<Button className="red-btn">Delete</Button>
			</div>
		)
	}

	// addProducts(quantity, array) {
	// 	console.log('quanttity =>', quantity, array)
	// 	const startId = products.length;
	// 	// this.getData()
	// 	for (let i = 0; i < quantity; i++) {
	// 		const id = startId + i;
	// 		// const el = array[i]
	// 		products.push({
	// 			hostName: array[i].hostName,
	// 			mining: array[i].mining,
	// 			status: array[i].status,
	// 			upTime: array[i].upTime,
	// 			gpu: array[i].gpu,
	// 			core: array[i].core,

	// 		});
	// 	}

	// }


	renderShowsTotal(start, to, total) {
		return (
			<p style={{ color: 'blue' }}>
				From {start} to {to}, totals is {total}&nbsp;&nbsp;(its a customize text)
			</p>
		);
	}
	start = (id) => {
		var token = localStorage.getItem('token')
		// console.log('token dashboard', token)
		var headers = {
			'Authorization': 'Bearer ' + token
		}
		const req = {
			mserver_id: id
		}
		axios.post('https://dev.boltos.io:3000/api/v1/users/server-start', req, { headers: headers })
			.then(res => {
				// console.log('res server =>', res.data)
				if (res.status == 200) {
					alert('server started')
				}
				else {
					alert('start failed')
				}
				// this.addProducts(res.data.data.length, res.data.data)
			})

	}

	stop = (id) => {
		var token = localStorage.getItem('token')
		// console.log('token dashboard', token)
		var headers = {
			'Authorization': 'Bearer ' + token
		}
		const req = {
			mserver_id: id
		}
		axios.post('https://dev.boltos.io:3000/api/v1/users/server-stop', req, { headers: headers })
			.then(res => {
				// console.log('res server =>', res.data)
				if (res.status == 200) {
					alert('server stoped')
				}
				else {
					alert('stop failed')
				}
				// this.addProducts(res.data.data.length, res.data.data)
			})

	}
	selectChange = (event) => {
		// console.log('eveeeent', event.target.value)
		this.setState({ value: event.target.value })
	}
	update = () => {
		var token = localStorage.getItem('token')
		// console.log('token delete', token)
		var id = localStorage.getItem('id')
		var headers = {
			'Authorization': 'Bearer ' + token
		}
		const reqData = {
			mserver_id: id,
			miner_name: this.minerName.value,
			target_temp: this.targetTemp.value,
			mining_config: this.state.value,
			min_fanspeed: 2
		}
		// console.log(this.select)
		axios.post('https://dev.boltos.io:3000/api/v1/users/server-update', reqData, { headers: headers })
			.then(res => {
				// console.log('res update =>', res)
				// this.getData();
				// console.log('token secoond', token)
				localStorage.setItem('id', '')
				this.setState({lgShow:false})
				this.getData()
			})
			// .catch(err =>
			// 	//  console.log('eroooor =>', err)
			// 	)

	}
	delete = (id) => {
		var token = localStorage.getItem('token')
		// console.log('token delete', token)
		var headers = {
			'Authorization': 'Bearer ' + token
		}
		const reqData = {
			mserver_id: id
		}
		axios.post('https://dev.boltos.io:3000/api/v1/users/server-delete', reqData, { headers: headers })
			.then(res => {
				// console.log('idddd', id)
				// console.log('req =>', reqData)
				// console.log('res delete =>', res)
				alert('row deleted');
				this.getData();
				// if (res.status == 200) {
				// 	console.log(res.data);
				// }
				// else {
				// 	alert('delete failed')
				// }
				// this.addProducts(res.data.data.length, res.data.data)
				// console.log('token secoond', token)
			})
			// .catch(err => 
			// 	// console.log('eroooor =>', err)
			// )

	}

	deleteModal = () =>{
		this.delete(localStorage.getItem('id'))
		// console.log(localStorage.getItem('id'))
		this.setState({lgShow: false})
		this.getData()
	}
	handlePageChange = (pageNumber) => {
		// console.log(`active page is ${pageNumber}`);
		this.setState({ activePage: pageNumber })
	}

	renderShowsTotal(start, to, total) {
		return (
			<p className="btn-pagination">
				From {start} to {to}, totals is {total}&nbsp;&nbsp;(its a customize text)
			</p>
		);
	}

	miningData = () => {
		var token = localStorage.getItem('token')
		// console.log('token dashboard', token)
		var headers = {
			'Authorization': 'Bearer ' + token
		}
		axios.get('https://dev.boltos.io:3000/api/v1/users/mining-config', { headers: headers })
			.then(res => {
				// console.log('iddd', id)
				// console.log('mining server =>', res)
				this.setState({ mining: res.data.data })
			})
	}


	getServer = (id) => {
		this.setState({server: {
			gpus: []
		}});
		this.miningData()
		this.setState({ lgShow: true })
		var token = localStorage.getItem('token')
		localStorage.setItem('id', id)
		// console.log('token dashboard', token)
		var headers = {
			'Authorization': 'Bearer ' + token
		}
		const reqData = {
			mserver_id: id
		}
		axios.post('https://dev.boltos.io:3000/api/v1/users/server-info', reqData, { headers: headers })
			.then(res => {
				// console.log('iddd', id)
				console.log('res server =>', res.data.data)
				this.setState({ server: res.data.data })
				if (res.status == 200) {
				}
				else {
					this.props.history.push('/');
				}
				// this.addProducts(res.data.data.length, res.data.data)
			})

	}

	getData = () => {
		var token = localStorage.getItem('token')
		// console.log('token dashboard', token)
		axios.get('https://dev.boltos.io:3000/api/v1/users/dashboard', {
			headers: {
				'Authorization': 'Bearer ' + token
			}
		})
			.then(res => {
				console.log('res dashboard =>', res.data);
				var tempArray = [];
				if (res.status == 200) {
					// this.setState({ data: res.data.data });
					res.data.data.map(item => {
						var exist = false;
						tempArray.map(temp => {
							if(temp.mserver_id == item.mserver_id) {
								exist = true;
							}
						});
						if(!exist) {
							tempArray.push(item);
						}
					});
					this.setState({ data: tempArray });
				}
				else {
					this.props.history.push('/');
				}
				// this.addProducts(res.data.data.length, res.data.data)
			})

	}

	render() {
		const options = {
			page: 2,  // which page you want to show as default
			sizePerPageList: [{
				text: '5', value: 5
			}, {
				text: '10', value: 10
			}, {
				text: 'All', value: products.length
			}], // you can change the dropdown list for size per page
			sizePerPage: 5,  // which size per page you want to locate as default
			pageStartIndex: 0, // where to start counting the pages
			paginationSize: 3,  // the pagination bar size.
			prePage: 'Prev', // Previous page button text
			nextPage: 'Next', // Next page button text
			firstPage: 'First', // First page button text
			lastPage: 'Last', // Last page button text
			paginationShowsTotal: this.renderShowsTotal,  // Accept bool or function
			paginationPosition: 'top'  // default is bottom, top and both is all available
			// hideSizePerPage: true > You can hide the dropdown for sizePerPage
			// alwaysShowAllBtns: true // Always show next and previous button
			// withFirstAndLast: false > Hide the going to First and Last page button
		};

		const { data, server, mining } = this.state
		return (
			<div className="dashboard">
				{/* <div className="">
					<Button onClick={() => this.start()} className="green-btn">Start</Button>
					<Button className="gray-btn" onClick={() => this.stop()}>Stop</Button>
					<Button onClick={() => this.editBtn()} className="black-btn">Edit</Button>
					<Button className="yellow-btn">Log</Button>
					<Button className="red-btn">Delete</Button>
				</div> */}
				<Loader loaded={true} color="white" />
				<p className="title-page">Mining Server Dashboard</p>
				<div className="filter-box">
					<p className="filter-txt">Filter By:</p>
					<div className="filter-inf">
						<FormGroup controlId="formControlsSelect" className="filter-select">
							<ControlLabel>Select</ControlLabel>
							<FormControl componentClass="select" placeholder="select">
								<option value="select">select</option>
								<option value="other">Mining</option>
								<option value="other">option ||</option>
								<option value="other">option |||</option>
							</FormControl>
						</FormGroup>
						<div className="btn-box">
							<Button className="gray-btn">Clear</Button>
							<Button className="green-btn">Search</Button>
						</div>
					</div>
				</div>
				<div className="search-box">
					<p className="filter-txt">Search Hosts:</p>
					<div className="filter-inf">
						<FormControl type="search" placeholder="Search" />
						<Button className="gray-btn">Update All Selected Hosts</Button>
					</div>
				</div>
				<div className="general-table">

					<Table striped condensed hover>
						<thead>
							<tr>
								<th><Checkbox /></th>
								<th>Host Name</th>
								<th>Mining Profile</th>
								<th>Status</th>
								<th>Uptime</th>
								<th>Average Gpu Temps</th>
								<th>Core/Mem Cloacks</th>
								<th>Actions</th>
							</tr>
						</thead>
						<tbody>
							{
								data.map((item, i) =>
									<tr key={i}>
										<td><Checkbox /></td>
										<td>{item.hostName}</td>
										<td>{item.miningProfile}</td>
										<td>{item.status}</td>
										<td>{item.uptime}</td>
										<td>{item.averageGpuTemps}</td>
										<td>{item.coreMemoryClocks}</td>
										<td className="table-btn">
											<Button onClick={() => this.start(item.mserver_id)} className="green-btn">Start</Button>
											<Button className="gray-btn" onClick={() => this.stop(item.mserver_id)}>Stop</Button>
											<Button onClick={() => this.getServer(item.mserver_id)} className="black-btn">Edit</Button>
											<Button className="yellow-btn">Log</Button>
											<Button className="red-btn" onClick={() => this.delete(item.mserver_id)}>Delete</Button>
										</td>
									</tr>
								)
							}
						</tbody>
					</Table>
					<div className="pagination-box">
						<Button className="btn-pagination">Showing 1 to 5 of 5 entries</Button>
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
					{/* <Pagination
						activePage={this.state.activePage}
						itemscountperpage={1}
						totalitemscount={2}
						pagerangedisplayed={3}
						onChange={this.handlePageChange}
					/> */}

					{/* <BootstrapTable data={products} pagination={true} options={options}>
						<TableHeaderColumn dataField='checkbox' isKey={true}><Checkbox /></TableHeaderColumn>
						<TableHeaderColumn dataField='hostName'>Host Name</TableHeaderColumn>
						<TableHeaderColumn dataField='mining'>Mining Profile</TableHeaderColumn>
						<TableHeaderColumn dataField='status'>Status</TableHeaderColumn>
						<TableHeaderColumn dataField='uptime'>Uptime</TableHeaderColumn>
						<TableHeaderColumn dataField='gpu'>Average Gpu Temps</TableHeaderColumn>
						<TableHeaderColumn dataField='core'>Core/Mem Cloacks</TableHeaderColumn>
						{/* <TableHeaderColumn dataField={this.buttons}>Actions</TableHeaderColumn> */}
					{/* </BootstrapTable> */}
				</div>



				{/* Modal Edit */}
				<Modal
					show={this.state.lgShow} onHide={() => this.setState({ lgShow: false })}
					bsSize="large"
					aria-labelledby="contained-modal-title-lg"
				>
					<Modal.Header closeButton>
						<Modal.Title id="contained-modal-title-lg">Server Info</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<div className="modal-box">
							<Row className="row-modal">
								<Col md={3} sm={6}>
									<ControlLabel>Host Name</ControlLabel>
									<FormControl type="text" placeholder="text" defaultValue={server.hostName} inputRef={(ref) => this.minerName = ref} />
								</Col>
								<Col md={3} sm={6}>
									<ControlLabel>UUID</ControlLabel>
									<FormControl type="text" defaultValue="text" readOnly defaultValue={server.uuid} />
								</Col>
								<Col md={3} sm={6}>
									<ControlLabel>Status</ControlLabel>
									<FormControl type="text" defaultValue="text" readOnly defaultValue={server.status} />
								</Col>
								<Col md={3} sm={6}>
									<ControlLabel>Target Temperature ℃</ControlLabel>
									<FormControl type="number" placeholder="" defaultValue={server.target_temp} inputRef={(ref) => this.targetTemp = ref} />
								</Col>
							</Row>
							<Row className="row-modal">
								<Col md={3} sm={6}>
									<ControlLabel>Mining Profile</ControlLabel>
									<FormControl onChange={this.selectChange} value={this.state.value} type="text" componentClass="select" placeholder="text" defaultValue={server.miningProfile} inputRef={(ref) => this.miningProfile = ref}>
										{
											mining.map((item, i) =>
												<option key={i} value={item.mc_id}>{item.mc_name}</option>
											)
										}
									</FormControl>
								</Col>
								<Col md={3} sm={6}>
									<ControlLabel>BoltOS Version</ControlLabel>
									<FormControl type="text" defaultValue="---" readOnly defaultValue={server.boltOsVersion} />
								</Col>
								<Col md={3} sm={6}>
									<ControlLabel>Uptime</ControlLabel>
									<FormControl type="text" defaultValue="---" readOnly defaultValue={server.uptime} />
								</Col>
								<Col md={3} sm={6}>
									<ControlLabel>Minimum Fan Speed %</ControlLabel>
									<FormControl type="number" defaultValue={server.min_fanspeed} inputRef={(ref) => this.fanspeed = ref} />
								</Col>
							</Row>
							<div className="bottom-box">
								<div style={{ width: '60%' }}>
									<div className="bottom-style">
										<div style={{ width: '30%' }}>
											<ControlLabel>GPUs in Server</ControlLabel>
											<FormControl type="text" defaultValue={server.numGpus} readOnly />
										</div>
										{
											server.gpus.map((item, i) =>
												<div style={{ width: '100%' }} key={i}>
													<Col md={6} sm={6}>
														<ControlLabel>PCI Slot</ControlLabel>
														<FormControl className="simple-input" type="text" defaultValue={item.pciSlot} />
													</Col>
													<Col md={6} sm={6}>
														<ControlLabel>GPU Make & Model</ControlLabel>
														<FormControl className="simple-input" type="text" defaultValue={item.makeModel} />
													</Col>
												</div>
											)
										}
									</div>
								</div>

								<div style={{ width: '40%' }}>
									<div className="table-modal">
										<Table striped bordered condensed hover>
											<thead>
												<tr>
													<th width="10%">Core MHz</th>
													<th width="10%">Memory MHz</th>
													<th width="20%">Power Limit (watt)</th>
												</tr>
											</thead>
											<tbody>
												<tr>
													<td className="modal-td"><FormControl className="table-input" type="number" defaultValue={defaultValues.core_mhz} /></td>
													<td className="modal-td"><FormControl className="table-input" type="number" defaultValue={defaultValues.memory_mhz} /></td>
													<td className="modal-td"><FormControl className="table-input" type="number" defaultValue={defaultValues.power_limit}/></td>
												</tr>
												<tr>
													<td className="modal-td"><FormControl className="table-input" type="number" defaultValue={defaultValues.core_mhz} /></td>
													<td className="modal-td"><FormControl className="table-input" type="number" defaultValue={defaultValues.memory_mhz} /></td>
													<td className="modal-td"><FormControl className="table-input" type="number" defaultValue={defaultValues.power_limit} /></td>
												</tr>
											</tbody>
										</Table>
									</div>
								</div>
							</div>
						</div>
					</Modal.Body>
					<Modal.Footer>
						<Button className="green-btn" onClick={() => this.update()}>Update Server Info</Button>
						<Button className="red-btn" onClick={()=>this.deleteModal()}>Delete Server</Button>
					</Modal.Footer>
				</Modal>
			</div >
		)
	}
}

const mapStateToProps = state => ({
	session: state.session
});

export default connect(mapStateToProps)(Dashboard)
