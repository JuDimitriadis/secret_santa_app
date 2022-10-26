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
        this.setState({data:{
            [e.target.name]: e.target.value,
        }}
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
        const { email, password } = this.state;
        if (email && password) {
            const body = {
                email: email,
                password: password,
            };
            const bodyJson = JSON.stringify(body);
            const fetchReq = await fetch("/api/login", {
                method: "POST",
                body: bodyJson,
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const response = await fetchReq.json()

                if (response.success === false) {
                    this.setState({
                        error: "Ops, something went wrong! E-mail and/or password incorrect",
                        alert:"error"
                    });
                } else {
                        // eslint-disable-next-line no-restricted-globals
                        location.reload();
                        return;
                    }
        } else {
            console.log("missing field");

            this.setState({
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
