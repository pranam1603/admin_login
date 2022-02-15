import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import {Navigate} from 'react-router-dom'

import Signup from './pages/signup'
import Login from './pages/login'
import Verify from './pages/verify'

function App() {
	return (
		<div className="App">
			<Router>	
                <Routes>
                    <Route path="/" element={<Navigate replace to="/login" />} />
                    <Route path="/signup" element={<Signup />} exact />
					<Route path="/login" element={<Login />} exact />
                    <Route path="/verify" element={<Verify />} exact />
				</Routes>
			</Router>
		</div>
	);
}

export default App;
