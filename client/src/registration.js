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
        this.setState({
            [e.target.name]: e.target.value,
        }
           ,
            () => console.log(this.state)
        );
    }

    async handleSubmit(evt) {
        evt.preventDefault();

        this.setState({
            alert: false
        }
            )
    
        const { name, email, password, confirmPassword } = this.state;
        if (name && email && password && confirmPassword) {
            if (this.state.password === this.state.confirmPassword) {
                const body = {
                    name: name,
                    email: email,
                    password: password,
                };
                const bodyJson = JSON.stringify(body);
                const fetchReq = await fetch("/api/register", {
                    method: "POST",
                    body: bodyJson,
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                const response = await fetchReq.json();
                if (response.success === true) {
                  
                     // eslint-disable-next-line no-restricted-globals
                     location.reload();
                     return 
                } else if (response.error === "email") {
                    this.setState({
                        error: "Email already registered.Please log in",
                        alert: "warning"
                    });
                    return;
                } else if (response.error === "others") {
                    this.setState({
                        error: "Ops, something went wrong! Please try again",
                        alert: "error"
                    });
                    return;
                } else {
                    this.setState({
                        error: "Ops, something went wrong! Please try again",
                        alert: "error"
                    });
                    return;
                }
            } else {
                console.log("different password");
                this.setState({
                    error: "Ops,password doesn't match",
                    alert:"warning"
                }
                   
                    // () => console.log(this.state)
                );
            }
        } else {
            console.log("missing field");
            this.setState({
                error: "Please fill out all required fields before submitting",
                alert: "warning"
            }
                
                // () => console.log(this.state)
            );
        }

}

    render() {
        return (  <Stack spacing={2} direction="column">
        <TextField required id="outlined-required" label="Name" name="name" onChange={this.handleChange}/>
        <TextField required id="outlined-required" label="E-Mail" type="email" name="email" onChange={this.handleChange}/>
        <TextField id="outlined-password-input" label="Password" type="password" name="password" onChange={this.handleChange}/>
        <TextField id="outlined-password-input" label="Confirm Password" type="password" name="confirmPassword" onChange={this.handleChange}/>
        <Button variant="contained" size="small" onClick={this.handleSubmit} >Register</Button>
        {this.state.alert && <Alert severity={this.state.alert}>{this.state.error}</Alert>}
    </Stack>);
    }
}
