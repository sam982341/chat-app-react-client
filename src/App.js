import './App.scss';
import React from 'react';
import { Container } from 'react-bootstrap';
import ApolloProvider from './ApolloProvider';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

// Pages
import Register from './pages/Register';
import Home from './pages/Home';
import Login from './pages/Login';

function App() {
	return (
		<ApolloProvider>
			<BrowserRouter>
				<Container className="pt-5">
					<Route path="/register" component={Register} />
					<Route path="/login" component={Login} />
					<Route exact path="/" component={Home} />
				</Container>
			</BrowserRouter>
		</ApolloProvider>
	);
}

export default App;
