import React, { useState } from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import { gql, useLazyQuery } from '@apollo/client';
import { Link } from 'react-router-dom';

import { useAuthDispatch } from '../context/auth';

const LOGIN_USER = gql`
	query login($username: String!, $password: String!) {
		login(username: $username, password: $password) {
			username
			email
			createdAt
			token
		}
	}
`;

export default function Login(props) {
	const [variables, setVariables] = useState({
		username: '',
		password: '',
	});

	const dispatch = useAuthDispatch();

	const [errors, setErrors] = useState({});

	const [loginUser, { loading }] = useLazyQuery(LOGIN_USER, {
		onError: (err) => setErrors(err.graphQLErrors[0].extensions.errors),
		onCompleted(data) {
			dispatch({ type: 'LOGIN', payload: data.login });
			props.history.push('/');
		},
	});

	const submitLoginForm = (e) => {
		e.preventDefault();
		loginUser({ variables });
	};

	return (
		<Row className="bg-white py-5 justify-content-center">
			<Col sm={8} md={6} lg={6}>
				<h1 className="text-center">Log In</h1>
				<Form onSubmit={submitLoginForm}>
					<Form.Group>
						<Form.Label className={errors.username && 'text-danger'}>
							{errors.username ?? 'Username'}
						</Form.Label>
						<Form.Control
							type="text"
							value={variables.username}
							onChange={(e) => {
								setVariables({ ...variables, username: e.target.value });
							}}
							isInvalid={!!errors.username}
						/>
					</Form.Group>
					<Form.Group>
						<Form.Label className={errors.password && 'text-danger'}>
							{errors.password ?? 'Password'}
						</Form.Label>
						<Form.Control
							type="password"
							value={variables.password}
							onChange={(e) => {
								setVariables({ ...variables, password: e.target.value });
							}}
							isInvalid={!!errors.password}
						/>
					</Form.Group>
					<div className="text-center">
						<Button variant="success" type="submit" disabled={loading}>
							Log In
						</Button>
						<br />
						<small>
							Don't have an account? Register <Link to="/register">here</Link>
						</small>
					</div>
				</Form>
			</Col>
		</Row>
	);
}
