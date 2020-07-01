// All packages needed
import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { URL_LINK } from '../../assets/variables/global';


// Styles imported here
import './SignUp.scss'

class SignUp extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            username: "",
            password: ""
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.handleUsername = this.handleUsername.bind(this);
    }

    handleUsername(e) {
        this.setState({
            username: e.target.value
        })
    }
    handlePassword(e) {
        this.setState({
            password: e.target.value
        })
    }
    async handleSubmit(e) {
        e.preventDefault();
        console.log(this.state);
        let user = {
            username: this.state.username,
            password: this.state.password
        }
        try {
            let response = await fetch(`${URL_LINK}api/user/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(user)
            })
            
            let result = await response.json();
            console.log(result);
        } catch (error) {
            console.log(error);
        }

    }

    render() {
        return (
            <div className="auth-route d-flex justify-content-center align-items-center">
                <Form className="rounded" onSubmit={this.handleSubmit}>
                    <h3>Sign up</h3>
                    <Form.Group controlId="formGroupText">
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="text" placeholder="Enter Username" onChange={this.handleUsername} />
                        <Form.Text className="text-muted">
                        </Form.Text>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Enter Password" onChange={this.handlePassword} />
                    </Form.Group>
                    <Button variant="primary" type="submit" className="btn-block">
                        Sign Up
                    </Button>
                    <p className="text-right mt-3">
                        Already have an <Link to="/login">account?</Link>
                    </p>
                </Form>
            </div>
        )
    }
}

export default SignUp;