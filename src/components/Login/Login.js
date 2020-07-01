// All packages needed
import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';


// Styles imported here
import './Login.scss'

class Login extends React.Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="auth-route d-flex justify-content-center align-items-center">
                <Form className="rounded">
                    <h3>Sign in</h3>
                    <Form.Group controlId="formGroupText">
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="text" placeholder="Enter Username" />
                        <Form.Text className="text-muted">
                        </Form.Text>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Enter Password" />
                    </Form.Group>
                    <Button variant="primary" type="submit" className="btn-block">
                        Submit
                    </Button>
                    <p className="text-right mt-3">
                        Need an <Link to="/signup">account?</Link>
                    </p>
                </Form>
            </div>
        )
    }
}

export default Login;