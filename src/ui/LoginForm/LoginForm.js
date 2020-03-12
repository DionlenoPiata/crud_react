import React, { Component } from 'react';
import './LoginForm.css'

class LoginForm extends Component {

    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);

        this.state = {
            email: undefined,
            password: undefined
        }
    }

    static displayName = "ui-LoginForm";

    handleSubmit(e) {

        e.preventDefault();
        let dataToSend = {
            user: {
                email: this.state.email,
                password: this.state.password
            }
        }

        fetch('http://localhost:3001/users/authenticate', {
            method: "POST",
            body: JSON.stringify(dataToSend.user),
            headers: {
                "Content-Type": "application/json"
            }

        }).then(response => response.json())
            .then(responseJson => {
                localStorage.setItem('USER_TOKEN', responseJson.token);

            }).catch(err => {
                throw err;
            });
    }

    handleEmailChange(e) {
        this.setState({
            email: e.target.value
        })
    }

    handlePasswordChange(e) {
        this.setState({
            password: e.target.value
        })
    }

    render() {
        return (
            <div className="wrapper fadeInDown">
                <div id="formContent">

                    <div className="fadeIn first" style={{ padding: '10px' }}>
                        <img src="https://image.flaticon.com/icons/svg/1828/1828503.svg" height="100" id="icon" alt="User Icon" />
                    </div>

                    <form onSubmit={this.handleSubmit}>
                        <input type="email" onChange={this.handleEmailChange} id="login" className="fadeIn second" name="login" placeholder="login" />
                        <input type="password" onChange={this.handlePasswordChange} id="password" className="fadeIn third" name="login" placeholder="password" />
                        <input type="submit" className="fadeIn fourth" value="Log In" />
                    </form>

                    <div id="formFooter">
                        <a className="underlineHover" href="#">Forgot Password?</a>
                    </div>
                </div>
            </div>
        );
    }
}

export default LoginForm;