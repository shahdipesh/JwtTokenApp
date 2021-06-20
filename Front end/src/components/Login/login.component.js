import React, { Component } from 'react'
import { Form, Button, Alert } from 'react-bootstrap';
import './login.css';
import Cookies from 'js-cookie';
import { connect } from 'react-redux';
import setLoginStatus from '../../app/user/user.actions';
const axios = require('axios').default;
class Login extends Component {
    constructor(props){
    super();
    this.state = {
        username: "a",
        password: "a",
        loginMsg:""
    }
    }
    render() {
        
        const handleSubmit = (e) => {
            e.preventDefault();
            console.log("=====inside handleSubmit");
            //if empty username and password submitted
            if(this.state.username ==="" || this.state.password === ""){
             this.setState({ loginMsg: "Please enter your username and password" }) 
            return
            }
            //if non empty then login and if status is 200 set the tokens, else the username or password is in
            const {username,password} = this.state;
            //if auth is incorrect then backend throws status 403 which rejects the api requests
            //so the catch block is handled
            axios.post('http://localhost:8080/api/login', {userName:"kismat",password:"test"})
            .then((response) => {
                console.log(response);   
                if(response.status===200) {
                Cookies.set("access", response.data.token,{expires:new Date(new Date().getTime() + 5000)});
                Cookies.set("refresh", response.data.refreshToken);
                this.props.setLoginState(true);
                }
            })
            .catch((error) => { this.setState({ loginMsg: "Incorrect username or password" }) })
        }
        return (
            <div className="login">
                <Form className="form-login" onSubmit={(e) => { handleSubmit(e) }}>
                {this.state.loginMsg?<Alert variant="danger">{this.state.loginMsg}</Alert>:null}
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="text" placeholder="Enter username" onChange={(e) => { this.setState({ username: e.target.value }) }} />
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password"
                            onChange={(e) => { this.setState({ password: e.target.value }) }}
                        />
                    </Form.Group>
                  
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        loginStatus:state.user.isUserLoggedIn
    }
}

 const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        setLoginState: (status) => {
            dispatch(setLoginStatus(status))
        }
    }
}

export default connect(null,mapDispatchToProps)(Login)