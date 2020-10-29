import React, { useState } from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import { gql, useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';

const REGISTER_USER = gql`
	mutation register(
		$username: String!
		$email: String!
		$password: String!
		$confirmPassword: String!
	) {
		register(
			username: $username
			email: $email
			password: $password
			confirmPassword: $confirmPassword
		) {
			username
			email
			createdAt
		}
	}
`;

export default function Register(props) {
	const [variables, setVariables] = useState({
		email: '',
		username: '',
		password: '',
		confirmPassword: '',
	});

	const [errors, setErrors] = useState({});

	const [registerUser, { loading }] = useMutation(REGISTER_USER, {
		update: (_, __) => props.history.push('/'),
		onError: (err) => setErrors(err.graphQLErrors[0].extensions.errors),
	});

	const submitRegisterForm = (e) => {
		e.preventDefault();
		registerUser({ variables });
	};

	return (
		<Row className="bg-white py-5 justify-content-center">
			<Col sm={8} md={6} lg={6}>
				<h1 className="text-center">Register</h1>
				<Form onSubmit={submitRegisterForm}>
					<Form.Group>
						<Form.Label className={errors.email && 'text-danger'}>
							{errors.email ?? 'Email Address'}
						</Form.Label>
						<Form.Control
							type="email"
							value={variables.email}
							onChange={(e) => {
								setVariables({ ...variables, email: e.target.value });
							}}
							isInvalid={!!errors.email}
						/>
					</Form.Group>
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
					<Form.Group>
						<Form.Label className={errors.confirmPassword && 'text-danger'}>
							{errors.confirmPassword ?? 'Confirm Password'}
						</Form.Label>
						<Form.Control
							type="password"
							value={variables.confirmPassword}
							onChange={(e) => {
								setVariables({
									...variables,
									confirmPassword: e.target.value,
								});
							}}
							isInvalid={!!errors.confirmPassword}
						/>
					</Form.Group>
					<div className="text-center">
						<Button variant="success" type="submit" disabled={loading}>
							Sign Up
						</Button>
						<br />
						<small>
							Already have an account? Log in <Link to="/login">here</Link>
						</small>
					</div>
				</Form>
			</Col>
		</Row>
	);
}
