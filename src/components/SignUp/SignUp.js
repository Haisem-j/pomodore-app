// All packages needed
import React from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { URL_LINK } from '../../utils/global';


// Styles imported here
import './SignUp.scss'

class SignUp extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            username: "",
            password: "",
            register: false,
            registering: false
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.handleUsername = this.handleUsername.bind(this);
        this.registeringUser = this.registeringUser.bind(this)
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
        this.registeringUser()
        console.log(this.state);
        let user = {
            username: this.state.username,
            password: this.state.password
        }
        try {
            let response = await fetch(`${URL_LINK}/api/user/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(user)
            })

            await response.json();
            this.registeringUser()
            this.successfulRegister();
        } catch (error) {
            console.log(error);
        }

    }

    registeringUser() {
        if (!this.state.registering) {
            this.setState({
                registering: true
            })
        } else {
            this.setState({
                registering: false
            })

        }
    }

    successfulRegister() {
        setTimeout(() => {
            this.props.history.push('/login')
        }, 3000)
        this.setState({
            register: true
        })
    }

    render() {
        return (
            <div className="auth-route d-flex justify-content-center align-items-center">
                <Form className="rounded" onSubmit={this.handleSubmit}>
                    <h3>Sign up</h3>
                    {this.state.registering ? <Alert variant="info" id="alert-pomo">Registering you...</Alert> : null}
                    {this.state.register ? <Alert variant="success" id="alert-pomo">Succesfully Registered!!</Alert> : null}
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