import React, { Component } from 'react'
import { connect } from 'react-redux'
import Loader from 'react-loader'
import axios from 'axios';
import {
	Button,
	Table,
	FormGroup,
	FormControl,
	ControlLabel,
	Modal,
	
} from 'react-bootstrap'
var placeholder = document.createElement("li");
placeholder.className = "placeholder";
class List extends React.Component {
	constructor(props) {
	  super(props);
	  this.state = {...props};
	}

	componentWillReceiveProps (props) {
		const {colors} = this.props;
		this.setState({colors: colors});
	}

	dragStart(e) {
	  this.dragged = e.currentTarget;
	  e.dataTransfer.effectAllowed = 'move';
	  e.dataTransfer.setData('text/html', this.dragged);
	}
	dragEnd(e) {
	  this.dragged.style.display = 'flex';
	  this.dragged.parentNode.removeChild(placeholder);
	  
	  // update state
	  var data = this.state.colors;
	  var from = Number(this.dragged.dataset.id);
	  var to = Number(this.over.dataset.id);
	  if(from < to) to--;
	  data.splice(to, 0, data.splice(from, 1)[0]);
	  this.setState({colors: data});
	}
	dragOver(e) {
	  e.preventDefault();
	  this.dragged.style.display = "none";
	  if(e.target.className === 'placeholder') return;
	  this.over = e.target;
	  e.target.parentNode.insertBefore(placeholder, e.target);
	}

	deleteItem = (item) => {
		this.props.onClick(item);
	}
	  render() {
	  var listItems = this.state.colors.map((item, i) => {
		  
		return (
		  <li 
			data-id={i}
			key={i}
			draggable='true'
			onDragEnd={this.dragEnd.bind(this)}
			onDragStart={this.dragStart.bind(this)}>
			{item.accountName}
			<Button>Drag Up/Down<img className="move-img" src="/assets/img/move.png" alt="" /></Button>
			<Button className="red-btn" onClick={() => this.deleteItem(item)}>Delete</Button>
			</li>
		)
	   });
		  return (
			<ul onDragOver={this.dragOver.bind(this)} className="pools-dragging">
				{listItems}
			</ul>
		  )
	  }
  }

class Edit extends Component {
	constructor(props, context) {
		super(props, context);

		this.state = {
			smShow: false,
			lgShow: false,
			minigprofile_id: null,
			data : [],
			colors: ['Red', 'Green', 'Blue', 'Yellow', 'Black', 'White', 'Orange'],
			pools : [],
			allPools: [],
			addPoolQueue : []
		};
	}



	componentWillMount() {
		// this.addProducts(100);
		const minigprofile_id = this.props.match.params.miningprifile_id;
		this.state.minigprofile_id = minigprofile_id;
		this.getData();
	}

	update = () => {
		var token = localStorage.getItem('token')
		// console.log('token delete', token)
		// var id = localStorage.getItem('id')
		var headers = {
			'Authorization': 'Bearer ' + token
		}
		var mc_pools = '';
		if(this.state.pools.length == 1) {
			mc_pools = this.state.pools[0].mpool_id;
		} else if (this.state.pools.length == 0 ){
			mc_pools = '';
		} else {
			this.state.pools.map(pool => {
				mc_pools += '[' + pool.mpool_id + '] ';
			})
		}

		const reqData = {
			mc_id: this.state.data.mc_id,
			mc_name: this.profileName.value,
			mc_type: this.profileType.value,
			mc_pools: mc_pools,
			mc_switching: this.profileInterval.value
		}

		// console.log(reqData);
		// console.log(this.select)
		// axios.post('https://dev.boltos.io:3000/api/v1/users/mining-profiles', reqData, { headers: headers })
		axios.post('http://localhost:3000/api/v1/users/mining-profiles', reqData, { headers: headers })
			.then(res => {
				// console.log('res update =>', res)
				// this.getData();
				// console.log('token secoond', token)
				// localStorage.setItem('id', '')
				this.getData();
			})
		
	}

// API call 
getData = () => {
	var token = localStorage.getItem('token')
	// axios.get('https://dev.boltos.io:3000/api/v1/users/mining-profiles/', {
	axios.get('http://localhost:3000/api/v1/users/mining-profiles/', {
		headers: {
			'Authorization': 'Bearer ' + token,
		}
	}).then(res => {
		if (res.status == 200) {
			res.data.data.map(item => {
				// console.log(item);
				if(item.mc_id == this.state.minigprofile_id) {
					this.setState({data : item});
					
					var poolIDs = item.pools.split('] [');
					var pools = [];
					poolIDs.map(id => {
						id = id.replace(']', '');
						id = id.replace('[', '');

						var postData = {
							mp_id: id
						};
						axios.post('http://localhost:3000/api/v1/users/get-mining-pool/', postData,{headers:{'Authorization': 'Bearer ' + token}})
						.then(res => {
							if(res.status == 200) {
								// console.log(res.data.data);
								pools.push(res.data.data);
								this.setState({pools: pools});
								// console.log(this.state);
								this.setState({pools: pools});
							}
						});
					});
					
				}
			});

		} 
		else {
			this.props.history.push('/home/dashboard');
		}
	})

	axios.get('http://localhost:3000/api/v1/users/mining-pools', {
			headers: {
				'Authorization': 'Bearer ' + token,
			}
		})
		.then(res => {
			if (res.status == 200) {
				this.setState({ allPools: res.data.data });
			} else {
				this.props.history.push('/home/dashboard');
			}
		})
}

refreshColorList = () => {
	this.setState({colors: this.state.pools});
}

deletePool = (pool) => {
	this.state.pools.map((item, i) => {
		if(item.mpool_id == pool.mpool_id) {
			this.state.pools.splice(i);
			this.setState({pools : this.state.pools});
			return;
		}
	});
}

addPool = () => {
	this.setState({ lgShow: true });
	this.state.addPoolQueue = [];
	this.setState({addPoolQueue : this.state.addPoolQueue});
	this.state.allPools.map(pool => {
		var isExist = false;
		this.state.pools.map(item => {
			if(item.mpool_id == pool.mpool_id) {
				isExist = true;
			}	
		});
		if(!isExist) {
			this.state.addPoolQueue.push(pool);
			this.setState({addPoolQueue: this.state.addPoolQueue});
		}
	});
}

addSelectedPool = () => {
	// alert(this.selectedPoolForAdd.value);
	this.state.allPools.map(pool => {
		if(pool.mpool_id == this.selectedPoolForAdd.value) {
			this.state.pools.push(pool);
			this.setState({pools: this.state.pools});
			this.setState({lgShow : false});
		}
	})
}

deleteProfile = () => {
	var r = confirm("Do you want to delete this profile?");
	if(!r) {
		return;
	}

	var token = localStorage.getItem('token');
	var postData = {
		mc_id : this.state.data.mc_id
	};
	axios.post('http://localhost:3000/api/v1/users/delete-mining-profile',postData, {
			headers: {
				'Authorization': 'Bearer ' + token,
			}
		})
		.then(res => {
			// console.log(res);
			this.props.history.push('/home/miningprofile');
			
		})
}

selectChange = (event) => {
	this.state.data.type = event.target.value;
	this.setState({ data : this.state.data})
}

selectChangeInterval = (event) => {
	this.state.data.switchingIntervals = event.target.value;
	this.setState({ data : this.state.data});
}

	render() {
		const {data, pools, addPoolQueue} = this.state;
		return (
			<div className="pools">
				<Loader loaded={true} color="white" />
				<p className="title-page">Mining Server Dashboard</p>
				<p className="gray-box"><img className="edit-img" src="/assets/img/edit.png" alt="" />MultiManero | Mining Profiles</p>
				<div className="edit">
					<FormGroup>
						<ControlLabel>Profile Name</ControlLabel>
						<FormControl type="text" placeholder="Profile Name" defaultValue={data.profile}  inputRef={(ref) => this.profileName = ref} />
					</FormGroup>

					<FormGroup controlId="formControlsSelect" className="filter-select">
						<ControlLabel>Profile Type</ControlLabel>
						{
							console.log(data.type)
						}
						<FormControl componentClass="select" defaultValue={data.type} value={data.type}  onChange={this.selectChange} inputRef={(ref) => this.profileType = ref}>
							<option value="1">SinglePool</option>
							<option value="2">MultiPool</option>
							<option value="3">Profitability Pool</option>
						</FormControl>
					</FormGroup>
					<Button className="green-btn" onClick={()=> this.addPool()}>Add Pool</Button>

					<div className="general-table">
						<p className="title-page">Pools</p>
						{/* <Table striped condensed hover>
							<tbody>
								<tr>
									<td>Manero-Pool1</td>
									<td className="table-btn"><Button>Drag Up/Down<img className="move-img" src="/assets/img/move.png" alt="" /></Button></td>
									<td><Button className="red-btn">Delete</Button></td>
								</tr>
								<tr>
									<td>Manero-Pool1</td>
									<td className="table-btn"><Button>Drag Up/Down<img className="move-img" src="/assets/img/move.png" alt="" /></Button></td>
									<td><Button className="red-btn">Delete</Button></td>
								</tr>
								<tr>
									<td>Manero-Pool1</td>
									<td className="table-btn"><Button>Drag Up/Down<img className="move-img" src="/assets/img/move.png" alt="" /></Button></td>
									<td><Button className="red-btn">Delete</Button></td>
								</tr>
							</tbody>
						</Table> */}

						<div>
        					<List colors={pools} refresh={this.refreshColorList} onClick={this.deletePool}/>	
						</div>
					</div>
					
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
					<FormGroup controlId="formControlsSelect" className="filter-select">
						<ControlLabel>Switching Interval</ControlLabel>
						<FormControl componentClass="select" placeholder="select" value={data.switchingIntervals} defaultValue={data.switchingIntervals} onChange={this.selectChangeInterval} inputRef={(ref) => this.profileInterval = ref}>
							<option value="1">1 Hour</option>
							<option value="2">2 Hours</option>
							<option value="4">4 Hours</option>
							<option value="6">6 Hours</option>
							<option value="12">12 Hours</option>
							<option value="24">24 Hours</option>
							<option value="48">48 Hours</option>
						</FormControl>
					</FormGroup>
					<div className="btn-bottom">
						<Button className="green-btn" onClick={() => {this.update()}}>Update Server Info</Button>
						<Button className="red-btn" onClick={() => {this.deleteProfile()}}>Delete Server</Button>
					</div>
				</div>


				<Modal
					show={this.state.lgShow} onHide={() => this.setState({ lgShow: false })}
					bsSize="large"
					aria-labelledby="contained-modal-title-lg"
				>
					<Modal.Header closeButton>
						<Modal.Title id="contained-modal-title-lg">Add Pool</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<div className="modal-box">
						<FormGroup controlId="formControlsSelect" className="filter-select">
							<ControlLabel>Switching Interval</ControlLabel>
							<FormControl componentClass="select" placeholder="select" inputRef={(ref) => this.selectedPoolForAdd = ref}>
								{
									addPoolQueue.map((item, i) =>
										<option key={i} value={item.mpool_id}>{item.accountName}</option>
									)
								}
							</FormControl>
						</FormGroup>
						</div>
					</Modal.Body>
					<Modal.Footer>
						<Button className="green-btn" onClick={() => {this.addSelectedPool()}}>Add Pool</Button>
						<Button className="red-btn" onClick={() => {this.setState({lgShow: false})}}>Cancel</Button>
					</Modal.Footer>
				</Modal>

			</div>
		)
	}
}

const mapStateToProps = state => ({
	session: state.session
});

export default connect(mapStateToProps)(Edit)
