import React from 'react'
import {
	BrowserRouter,
	Route,
	Switch,
	Redirect
} from 'react-router-dom'



import Home from './container/Home'
import Dashboard from './container/Dashboard'
import Login from './container/Login'
import Create from './container/Create'
import Password from './container/Password'
import ResetPass from './container/ResetPass'
import Pools from './container/Pools'
import Edit from './container/Edit'
import MiningProfile from './container/MiningProfile'
import Profile from './container/Profile'
import NotMatch from './container/404'
import Download from './container/Download'
import Verify from './container/Verify'
import Add from './container/Add';



const checkAuth = () => {
	const token = localStorage.getItem('token');
	// console.log('tokeeen auth =>', token)
	if (!token) {
		return false;
	}
	return true;
}

const AuthRoute = ({ component: component, ...rest }) => (

	<Route {...rest} render ={
		props => (
			checkAuth() ? (
				<component {...props} />
			) : (
					<Redirect to='/' />
				)
		)
	} />
)



function App() {
	return (
		<BrowserRouter>
			<Switch>
				<Route exact path="/" render={props => <Login {...props} />} />
				<Route exact path="/create" render={props => <Create {...props} />} />
				<Route exact path="/download" render={props => <Download {...props} />} />
				<Route exact path="/password" render={props => <Password {...props} />} />
				<Route exact path="/users/reset-password" render={props => <ResetPass {...props} />} />
				<Route exact path="/users/verify-account" render={props => <Verify {...props} />} />
				<Route path="/home" render={() => (
					<Home>
						<AuthRoute exact path="/home/dashboard" component={Dashboard} />
						<Route path="/home/dashboard" render={props => <Dashboard {...props} />} />
						<Route path="/home/pools" render={props => <Pools {...props} />} />
						<Route path="/home/miningprofile" render={props => <MiningProfile {...props} />} />
						<Route path="/home/edit/:miningprifile_id" render={props => <Edit {...props} />} />
						<Route path="/home/profile" render={props => <Profile {...props} />} />
						<Route path="/home/add" render={props => <Add {...props} />} />
					</Home>
				)} />
				<Route exact path="*" render={props => <NotMatch {...props} />} />
			</Switch>
		</BrowserRouter>
	)
}

export default App
