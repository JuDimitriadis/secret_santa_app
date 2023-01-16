import { Component } from "react";
import {TextField, Button, Stack, Alert} from '@mui/material';


export default class Registration extends Component {
    constructor() {
        super();
        this.state = {};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    
   

    // All changes made on text fields, will call the handleChange(), to update this.State
    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value,
        }
        ,
        () => console.log(this.state)
        );
    }

    //Click on Save Button, will call handleSubmit()
    async handleSubmit(evt) {
        evt.preventDefault();

        //Function used to set different types of Alert Messages
        const settingAlert = (errorMsg, type) => {
            this.setState({
                error: errorMsg,
                alert: type
            });
        };

        //Clean up this.state.alert, in case any alert message was on the screen
        settingAlert(null, false);

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
                    return; 
                } else if (response.error === "email") {
                    settingAlert("E-mail already registered. Please proceed to Login", "warning");
                    return;
                } else if (response.error === "others") {
                    settingAlert("Ops, something went wrong! Please try again", "error");
                    return;
                } else {
                    settingAlert("Ops, something went wrong! Please try again", "error");
                    return;
                }
            } else {
                settingAlert("Ops, passwords doesn't match", "warning");
            }
        } else {
            settingAlert("Please, fill out all fields before continue", "warning");
        }
    }

    render() {
        return (  <Stack spacing={2} direction="column">
            <TextField required id="outlined-required" label="Name" name="name" onChange={this.handleChange}/>
            <TextField required id="outlined-required" label="E-Mail" type="email" name="email" onChange={this.handleChange}/>
            <TextField id="outlined-password-input" label="Password" type="password" name="password" onChange={this.handleChange}/>
            <TextField id="outlined-password-input" label="Confirm Password" type="password" name="confirmPassword" onChange={this.handleChange}/>
            <Button variant="contained" size="small" onClick={this.handleSubmit} >Save</Button>
            {this.state.alert && <Alert severity={this.state.alert}>{this.state.error}</Alert>}
        </Stack>);
    }
}
