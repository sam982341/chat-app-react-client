import './App.scss';
import React from 'react';
import { Container } from 'react-bootstrap';
import ApolloProvider from './ApolloProvider';
import { BrowserRouter, Switch } from 'react-router-dom';

// Pages
import Register from './pages/Register';
import Home from './pages/Home';
import Login from './pages/Login';
import NotFound from './pages/NotFound';

import { AuthProvider } from './context/auth';
import DynamicRoute from './util/DynamicRoute';

function App() {
	return (
		<ApolloProvider>
			<AuthProvider>
				<BrowserRouter>
					<Container className="pt-5">
						<Switch>
							<DynamicRoute exact path="/" component={Home} authenticated />
							<DynamicRoute path="/register" component={Register} guest />
							<DynamicRoute path="/login" component={Login} guest />
							<DynamicRoute component={NotFound} />
						</Switch>
					</Container>
				</BrowserRouter>
			</AuthProvider>
		</ApolloProvider>
	);
}

export default App;
