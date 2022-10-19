import { Component } from "react";
import {TextField, Button, Stack, Alert} from '@mui/material';


export default class Registration extends Component {
    constructor() {
        super();
        this.state = {};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        this.setState(
            {
                [e.target.name]: e.target.value,
            },
            () => console.log(this.state)
        );
    }

    handleSubmit(evt) {
        evt.preventDefault();
        this.setState(
            {
                alert: false
            })
        const { email, password } = this.state;
        if (email && password) {
            const body = {
                email: email,
                password: password,
            };
            const bodyJson = JSON.stringify(body);
            fetch("/api/login", {
                method: "POST",
                body: bodyJson,
                headers: {
                    "Content-Type": "application/json",
                },
            })
                .then((res) => res.json())
                .then((result) => {
                    console.log(result);
                    if (result.success === false) {
                        this.setState({
                            error: "Ops, something went wrong! E-mail and/or password incorrect",
                            alert:"error"
                        });
                    } else {
                        // eslint-disable-next-line no-restricted-globals
                        location.reload();
                        return;
                    }
                })
                .catch((err) => {
                    console.log(err);
                    this.setState({
                        error: "Ops, something went wrong! Please try again",
                        alert:"error"
                    });
                });
        } else {
            console.log("missing field");

            this.setState(
                {
                    error: "Please fill out all required fields before submitting",
                    alert:"warning"
                }
                // () => console.log(this.state)
            );
        }
    }

    render() {
        return (<Stack spacing={2} direction="column">
        <TextField required id="outlined-required" label="E-Mail" type="email" name="email" onChange={this.handleChange}/>
        <TextField id="outlined-password-input" label="Password" type="password" name="password" onChange={this.handleChange}/>
        <Button variant="contained" size="small" onClick={this.handleSubmit} >Register</Button>
        {this.state.alert && <Alert severity={this.state.alert}>{this.state.error}</Alert>}
    </Stack>

       
        );
    }
}

{/* <div className="welcomePageForm">
<h2 className="welcomePageFormTittle">Log in</h2>
<form onSubmit={this.handleSubmit}>
    <input
        onChange={this.handleChange}
        type="email"
        name="email"
        placeholder="Email Address"
    />
    <input
        onChange={this.handleChange}
        type="password"
        name="password"
        placeholder="Password"
    />
    <p className="error">{this.state.error}</p>
    <button className="welcomePageFormButton">Login</button>
</form>
</div> */}