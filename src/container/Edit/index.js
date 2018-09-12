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
	
} from 'react-bootstrap'
var placeholder = document.createElement("li");
placeholder.className = "placeholder";
class List extends React.Component {
	constructor(props) {
	  super(props);
	  this.state = {...props};
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
	  render() {
	  var listItems = this.state.colors.map((item, i) => {
		return (
		  <li 
			data-id={i}
			key={i}
			draggable='true'
			onDragEnd={this.dragEnd.bind(this)}
			onDragStart={this.dragStart.bind(this)}>
			{item}
			<Button>Drag Up/Down<img className="move-img" src="/assets/img/move.png" alt="" /></Button>
			<Button className="red-btn">Delete</Button>
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
			colors: ['Red', 'Green', 'Blue', 'Yellow', 'Black', 'White', 'Orange']
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
		var id = localStorage.getItem('id')
		var headers = {
			'Authorization': 'Bearer ' + token
		}
		const reqData = {
			mc_id: 1,
			mc_name: this.profileName.value,
			mc_type: this.profileType.value,
			mc_pools: this.pools.value,
			mc_switching: 60
		}
		// console.log(this.select)
		axios.post('https://dev.boltos.io:3000/api/v1/users/mining-profiles', reqData, { headers: headers })
			.then(res => {
				// console.log('res update =>', res)
				// this.getData();
				// console.log('token secoond', token)
				localStorage.setItem('id', '')
				this.getData()
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
				}
			});

		} 
		else {
			this.props.history.push('/home/dashboard');
		}
	})
}

	render() {
		const {data} = this.state;
		console.log(data);
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
						<FormControl componentClass="select" value={data.type} >
							<option value="1">SinglePool</option>
							<option value="2">MultiPool</option>
							<option value="3">Profitability Pool</option>
						</FormControl>
					</FormGroup>
					<Button className="green-btn">Add Pool</Button>

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
        					<List colors={this.state.colors} />	
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
						<FormControl componentClass="select" placeholder="select">
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
						<Button className="green-btn">Update Server Info</Button>
						<Button className="red-btn">Delete Server</Button>
					</div>
				</div>
			</div>
		)
	}
}

const mapStateToProps = state => ({
	session: state.session
});

export default connect(mapStateToProps)(Edit)
